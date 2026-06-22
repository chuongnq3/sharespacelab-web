-- Q1: Khách hàng có tổng chi tiêu cao hơn mức trung bình của tất cả khách hàng
SELECT c.full_name, SUM(oi.quantity * oi.unit_price) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'completed'
GROUP BY c.customer_id, c.full_name
HAVING SUM(oi.quantity * oi.unit_price) > (
    SELECT AVG(customer_total) FROM (
        SELECT SUM(oi2.quantity * oi2.unit_price) AS customer_total
        FROM orders o2
        JOIN order_items oi2 ON o2.order_id = oi2.order_id
        WHERE o2.status = 'completed'
        GROUP BY o2.customer_id
    ) sub
)
ORDER BY total_spent DESC;


-- Q2: Rank sản phẩm theo doanh thu trong từng category (window function)
SELECT
    cat.category_name,
    p.product_name,
    SUM(oi.quantity * oi.unit_price) AS revenue,
    RANK() OVER (
        PARTITION BY cat.category_id
        ORDER BY SUM(oi.quantity * oi.unit_price) DESC
    ) AS rank_in_category
FROM categories cat
JOIN products p ON cat.category_id = p.category_id
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.status = 'completed'
GROUP BY cat.category_id, cat.category_name, p.product_id, p.product_name
ORDER BY cat.category_name, rank_in_category;


-- Q3: % đóng góp doanh thu của từng region trên tổng toàn công ty (CTE)
WITH region_revenue AS (
    SELECT r.region_name, SUM(oi.quantity * oi.unit_price) AS revenue
    FROM regions r
    JOIN customers c ON r.region_id = c.region_id
    JOIN orders o ON c.customer_id = o.customer_id
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY r.region_id, r.region_name
),
total AS (
    SELECT SUM(revenue) AS grand_total FROM region_revenue
)
SELECT
    rr.region_name,
    rr.revenue,
    ROUND(rr.revenue * 100.0 / t.grand_total, 2) AS pct_contribution
FROM region_revenue rr, total t
ORDER BY pct_contribution DESC;


-- Q4: Doanh thu theo từng tháng, cộng dồn theo thời gian (running total)
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', o.order_date) AS month,
        SUM(oi.quantity * oi.unit_price)  AS monthly_revenue
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT
    month,
    monthly_revenue,
    SUM(monthly_revenue) OVER (ORDER BY month) AS running_total
FROM monthly
ORDER BY month;


-- Q5: Sản phẩm chưa từng được mua (không xuất hiện trong bất kỳ completed order nào)
SELECT p.product_name, p.unit_price, cat.category_name
FROM products p
JOIN categories cat ON p.category_id = cat.category_id
WHERE p.product_id NOT IN (
    SELECT DISTINCT oi.product_id
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'completed'
);


-- Q6: Với mỗi khách hàng, lấy thông tin đơn hàng gần nhất (latest order)
WITH ranked_orders AS (
    SELECT
        c.full_name,
        o.order_id,
        o.order_date,
        o.status,
        ROW_NUMBER() OVER (PARTITION BY c.customer_id ORDER BY o.order_date DESC) AS rn
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
)
SELECT full_name, order_id, order_date, status
FROM ranked_orders
WHERE rn = 1
ORDER BY order_date DESC;


-- Q7: Nhân viên nào có tỷ lệ đơn bị cancelled cao nhất?
SELECT
    e.full_name,
    COUNT(o.order_id)                                           AS total_orders,
    SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END)    AS cancelled_count,
    ROUND(
        SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END)
        * 100.0 / COUNT(o.order_id), 2
    ) AS cancel_rate_pct
FROM employees e
JOIN orders o ON e.employee_id = o.employee_id
GROUP BY e.employee_id, e.full_name
HAVING COUNT(o.order_id) > 0
ORDER BY cancel_rate_pct DESC;


-- Q8: Tìm các cặp sản phẩm thường được mua cùng nhau trong 1 đơn hàng
SELECT
    p1.product_name AS product_a,
    p2.product_name AS product_b,
    COUNT(*)        AS times_bought_together
FROM order_items oi1
JOIN order_items oi2
    ON oi1.order_id = oi2.order_id
    AND oi1.product_id < oi2.product_id   -- tránh duplicate (A,B) và (B,A)
JOIN products p1 ON oi1.product_id = p1.product_id
JOIN products p2 ON oi2.product_id = p2.product_id
GROUP BY p1.product_id, p1.product_name, p2.product_id, p2.product_name
ORDER BY times_bought_together DESC;


-- Q9: So sánh doanh thu từng nhân viên với mức trung bình của toàn team (window function)
SELECT
    e.full_name,
    SUM(oi.quantity * oi.unit_price)                          AS personal_revenue,
    ROUND(AVG(SUM(oi.quantity * oi.unit_price)) OVER (), 0)   AS team_avg_revenue,
    SUM(oi.quantity * oi.unit_price)
        - AVG(SUM(oi.quantity * oi.unit_price)) OVER ()       AS diff_from_avg
FROM employees e
JOIN orders o ON e.employee_id = o.employee_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'completed'
GROUP BY e.employee_id, e.full_name
ORDER BY personal_revenue DESC;


-- Q10: Chuỗi mua hàng của từng khách: số ngày giữa 2 đơn liên tiếp (LAG)
WITH order_gaps AS (
    SELECT
        c.full_name,
        o.order_id,
        o.order_date,
        LAG(o.order_date) OVER (
            PARTITION BY c.customer_id
            ORDER BY o.order_date
        ) AS prev_order_date
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.status = 'completed'
)
SELECT
    full_name,
    order_id,
    order_date,
    prev_order_date,
    order_date - prev_order_date AS days_since_last_order
FROM order_gaps
WHERE prev_order_date IS NOT NULL
ORDER BY full_name, order_date;