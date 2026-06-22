-- Q1: Phát hiện khách hàng "at risk" — từng mua đều đặn nhưng 90 ngày gần nhất không có đơn nào
WITH order_stats AS (
    SELECT
        c.customer_id,
        c.full_name,
        COUNT(o.order_id)                               AS total_orders,
        MAX(o.order_date)                               AS last_order_date,
        ROUND(AVG(o.order_date - LAG(o.order_date) OVER (
            PARTITION BY c.customer_id ORDER BY o.order_date
        )), 0)                                          AS avg_days_between_orders
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.status = 'completed'
    GROUP BY c.customer_id, c.full_name
)
SELECT
    full_name,
    total_orders,
    last_order_date,
    avg_days_between_orders,
    CURRENT_DATE - last_order_date AS days_since_last_order
FROM order_stats
WHERE total_orders >= 2
  AND CURRENT_DATE - last_order_date > 90
ORDER BY days_since_last_order DESC;


-- Q2: Tính cohort retention — nhóm khách theo tháng đăng ký, xem còn mua ở tháng +1, +2, +3 không
WITH cohort_base AS (
    SELECT
        c.customer_id,
        DATE_TRUNC('month', c.registered_at)            AS cohort_month
    FROM customers c
),
customer_orders AS (
    SELECT
        o.customer_id,
        DATE_TRUNC('month', o.order_date)               AS order_month
    FROM orders o
    WHERE o.status = 'completed'
),
cohort_activity AS (
    SELECT
        cb.cohort_month,
        cb.customer_id,
        EXTRACT(MONTH FROM AGE(co.order_month, cb.cohort_month))
            + EXTRACT(YEAR FROM AGE(co.order_month, cb.cohort_month)) * 12
                                                        AS months_since_cohort
    FROM cohort_base cb
    JOIN customer_orders co ON cb.customer_id = co.customer_id
    WHERE co.order_month >= cb.cohort_month
),
cohort_size AS (
    SELECT cohort_month, COUNT(DISTINCT customer_id) AS cohort_count
    FROM cohort_base
    GROUP BY cohort_month
)
SELECT
    ca.cohort_month,
    cs.cohort_count,
    ca.months_since_cohort                              AS month_offset,
    COUNT(DISTINCT ca.customer_id)                      AS active_customers,
    ROUND(COUNT(DISTINCT ca.customer_id) * 100.0 / cs.cohort_count, 1)
                                                        AS retention_pct
FROM cohort_activity ca
JOIN cohort_size cs ON ca.cohort_month = cs.cohort_month
GROUP BY ca.cohort_month, cs.cohort_count, ca.months_since_cohort
ORDER BY ca.cohort_month, ca.months_since_cohort;


-- Q3: Duyệt cây phân cấp manager bằng recursive CTE — in ra full chain "An > Bich > Dat"
WITH RECURSIVE org_tree AS (
    -- base: CEO (không có manager)
    SELECT
        employee_id,
        full_name,
        manager_id,
        role,
        full_name::TEXT                                 AS chain,
        0                                               AS depth
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    SELECT
        e.employee_id,
        e.full_name,
        e.manager_id,
        e.role,
        ot.chain || ' > ' || e.full_name                AS chain,
        ot.depth + 1                                    AS depth
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.employee_id
)
SELECT employee_id, full_name, role, depth, chain
FROM org_tree
ORDER BY chain;


-- Q4: Tìm "power products" — sản phẩm mà nếu loại khỏi dataset thì doanh thu giảm > 30%
WITH total_revenue AS (
    SELECT SUM(oi.quantity * oi.unit_price) AS grand_total
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'completed'
),
product_revenue AS (
    SELECT
        p.product_id,
        p.product_name,
        SUM(oi.quantity * oi.unit_price)                AS product_total
    FROM products p
    JOIN order_items oi ON p.product_id = oi.product_id
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'completed'
    GROUP BY p.product_id, p.product_name
)
SELECT
    pr.product_name,
    pr.product_total,
    tr.grand_total,
    ROUND(pr.product_total * 100.0 / tr.grand_total, 2) AS pct_of_total,
    ROUND((tr.grand_total - pr.product_total) * 100.0 / tr.grand_total, 2)
                                                        AS revenue_if_removed_pct
FROM product_revenue pr, total_revenue tr
WHERE pr.product_total * 1.0 / tr.grand_total > 0.30
ORDER BY pct_of_total DESC;


-- Q5: Phân tích Market Basket — tính lift giữa các cặp sản phẩm
-- lift > 1: 2 sản phẩm có xu hướng mua cùng nhau nhiều hơn ngẫu nhiên
WITH total_orders AS (
    SELECT COUNT(DISTINCT order_id) AS n FROM orders WHERE status = 'completed'
),
product_freq AS (
    SELECT oi.product_id, COUNT(DISTINCT oi.order_id) AS freq
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'completed'
    GROUP BY oi.product_id
),
pair_freq AS (
    SELECT
        oi1.product_id AS pid_a,
        oi2.product_id AS pid_b,
        COUNT(DISTINCT oi1.order_id) AS pair_count
    FROM order_items oi1
    JOIN order_items oi2
        ON oi1.order_id = oi2.order_id
        AND oi1.product_id < oi2.product_id
    JOIN orders o ON oi1.order_id = o.order_id
    WHERE o.status = 'completed'
    GROUP BY oi1.product_id, oi2.product_id
)
SELECT
    p1.product_name                                     AS product_a,
    p2.product_name                                     AS product_b,
    pf.pair_count,
    ROUND(pf.pair_count * 1.0 / t.n, 4)                AS support,
    ROUND(
        (pf.pair_count * 1.0 / t.n)
        / ((fa.freq * 1.0 / t.n) * (fb.freq * 1.0 / t.n))
    , 2)                                                AS lift
FROM pair_freq pf
JOIN products p1 ON pf.pid_a = p1.product_id
JOIN products p2 ON pf.pid_b = p2.product_id
JOIN product_freq fa ON pf.pid_a = fa.product_id
JOIN product_freq fb ON pf.pid_b = fb.product_id
CROSS JOIN total_orders t
ORDER BY lift DESC;


-- Q6: Phân tích thay đổi giá sản phẩm — so sánh unit_price trong order_items vs giá hiện tại
-- (order_items snapshot giá tại thời điểm mua, products là giá hiện tại)
WITH price_history AS (
    SELECT
        p.product_id,
        p.product_name,
        p.unit_price                                    AS current_price,
        oi.unit_price                                   AS sold_price,
        o.order_date,
        oi.unit_price - p.unit_price                    AS price_diff,
        ROUND((oi.unit_price - p.unit_price) * 100.0 / p.unit_price, 2)
                                                        AS pct_diff
    FROM products p
    JOIN order_items oi ON p.product_id = oi.product_id
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'completed'
),
summary AS (
    SELECT
        product_id,
        product_name,
        current_price,
        MIN(sold_price)                                 AS min_sold_price,
        MAX(sold_price)                                 AS max_sold_price,
        ROUND(AVG(sold_price), 0)                       AS avg_sold_price,
        ROUND(AVG(pct_diff), 2)                         AS avg_pct_diff_from_current
    FROM price_history
    GROUP BY product_id, product_name, current_price
)
SELECT *, CASE
    WHEN avg_pct_diff_from_current > 5  THEN 'price dropped'
    WHEN avg_pct_diff_from_current < -5 THEN 'price increased'
    ELSE 'stable'
END AS price_trend
FROM summary
ORDER BY ABS(avg_pct_diff_from_current) DESC;


-- Q7: Tính RFM score (Recency, Frequency, Monetary) cho từng khách hàng
WITH rfm_raw AS (
    SELECT
        c.customer_id,
        c.full_name,
        CURRENT_DATE - MAX(o.order_date)                AS recency_days,
        COUNT(DISTINCT o.order_id)                      AS frequency,
        SUM(oi.quantity * oi.unit_price)                AS monetary
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY c.customer_id, c.full_name
),
rfm_scored AS (
    SELECT *,
        NTILE(3) OVER (ORDER BY recency_days ASC)       AS r_score, -- ít ngày = tốt hơn
        NTILE(3) OVER (ORDER BY frequency DESC)         AS f_score,
        NTILE(3) OVER (ORDER BY monetary DESC)          AS m_score
    FROM rfm_raw
)
SELECT
    full_name,
    recency_days,
    frequency,
    monetary,
    r_score, f_score, m_score,
    r_score + f_score + m_score                         AS rfm_total,
    CASE
        WHEN r_score = 3 AND f_score = 3 AND m_score = 3 THEN 'Champion'
        WHEN r_score >= 2 AND f_score >= 2              THEN 'Loyal'
        WHEN r_score = 1                                THEN 'At Risk'
        ELSE 'Potential'
    END                                                 AS segment
FROM rfm_scored
ORDER BY rfm_total DESC;


-- Q8: Phát hiện bất thường — đơn hàng có giá bán trong order_items khác giá products > 5%
SELECT
    o.order_id,
    o.order_date,
    c.full_name                                         AS customer,
    p.product_name,
    p.unit_price                                        AS current_price,
    oi.unit_price                                       AS sold_price,
    ROUND(ABS(oi.unit_price - p.unit_price) * 100.0 / p.unit_price, 2)
                                                        AS price_deviation_pct
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
JOIN products p ON oi.product_id = p.product_id
JOIN customers c ON o.customer_id = c.customer_id
WHERE ABS(oi.unit_price - p.unit_price) * 1.0 / p.unit_price > 0.05
ORDER BY price_deviation_pct DESC;


-- Q9: Tính moving average 3 tháng của doanh thu để lọc nhiễu xu hướng
WITH monthly_rev AS (
    SELECT
        DATE_TRUNC('month', o.order_date)               AS month,
        SUM(oi.quantity * oi.unit_price)                AS revenue
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT
    month,
    revenue,
    ROUND(AVG(revenue) OVER (
        ORDER BY month
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 0)                                               AS moving_avg_3m,
    revenue - LAG(revenue) OVER (ORDER BY month)        AS mom_change,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month))
        * 100.0 / NULLIF(LAG(revenue) OVER (ORDER BY month), 0)
    , 2)                                                AS mom_growth_pct
FROM monthly_rev
ORDER BY month;


-- Q10: Full sales performance report — kết hợp tất cả: nhân viên, team contribution,
-- rank trong team, so sánh với kỳ trước (mock year-over-year)
WITH emp_revenue AS (
    SELECT
        e.employee_id,
        e.full_name,
        e.role,
        m.full_name                                     AS manager_name,
        EXTRACT(YEAR FROM o.order_date)                 AS year,
        SUM(oi.quantity * oi.unit_price)                AS revenue,
        COUNT(DISTINCT o.order_id)                      AS order_count,
        COUNT(DISTINCT o.customer_id)                   AS customer_count
    FROM employees e
    LEFT JOIN employees m ON e.manager_id = m.employee_id
    JOIN orders o ON e.employee_id = o.employee_id
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY e.employee_id, e.full_name, e.role, m.full_name,
             EXTRACT(YEAR FROM o.order_date)
)
SELECT
    full_name,
    role,
    manager_name,
    year,
    revenue,
    order_count,
    customer_count,
    RANK() OVER (PARTITION BY year ORDER BY revenue DESC)
                                                        AS rank_in_year,
    ROUND(revenue * 100.0 / SUM(revenue) OVER (PARTITION BY year), 2)
                                                        AS pct_of_team,
    revenue - LAG(revenue) OVER (PARTITION BY employee_id ORDER BY year)
                                                        AS yoy_change,
    ROUND(
        (revenue - LAG(revenue) OVER (PARTITION BY employee_id ORDER BY year))
        * 100.0
        / NULLIF(LAG(revenue) OVER (PARTITION BY employee_id ORDER BY year), 0)
    , 2)                                                AS yoy_growth_pct
FROM emp_revenue
ORDER BY year, rank_in_year;