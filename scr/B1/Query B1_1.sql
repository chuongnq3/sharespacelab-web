-- Q1: Liệt kê tên khách hàng, tên sản phẩm và số lượng đã mua trong các đơn completed
SELECT
    c.full_name          AS customer,
    p.product_name,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total
FROM customers c
JOIN orders o      ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id   = oi.order_id
JOIN products p    ON oi.product_id  = p.product_id
WHERE o.status = 'completed'
ORDER BY c.full_name, line_total DESC;


-- Q2: Với mỗi category, tìm sản phẩm có giá cao nhất
SELECT
    cat.category_name,
    p.product_name,
    p.unit_price
FROM products p
JOIN categories cat ON p.category_id = cat.category_id
WHERE p.unit_price = (
    SELECT MAX(p2.unit_price)
    FROM products p2
    WHERE p2.category_id = p.category_id
)
ORDER BY cat.category_name;


-- Q3: Tổng doanh thu theo từng tháng và từng region
SELECT
    r.region_name,
    DATE_TRUNC('month', o.order_date)       AS month,
    SUM(oi.quantity * oi.unit_price)        AS revenue
FROM regions r
JOIN customers c  ON r.region_id    = c.region_id
JOIN orders o     ON c.customer_id  = o.customer_id
JOIN order_items oi ON o.order_id   = oi.order_id
WHERE o.status = 'completed'
GROUP BY r.region_name, DATE_TRUNC('month', o.order_date)
ORDER BY month, revenue DESC;


-- Q4: Số lượng đơn hàng theo từng status của từng nhân viên (pivot thủ công)
SELECT
    e.full_name,
    COUNT(o.order_id)                                           AS total,
    SUM(CASE WHEN o.status = 'completed'  THEN 1 ELSE 0 END)   AS completed,
    SUM(CASE WHEN o.status = 'pending'    THEN 1 ELSE 0 END)   AS pending,
    SUM(CASE WHEN o.status = 'cancelled'  THEN 1 ELSE 0 END)   AS cancelled
FROM employees e
JOIN orders o ON e.employee_id = o.employee_id
GROUP BY e.employee_id, e.full_name
ORDER BY total DESC;


-- Q5: Khách hàng đã mua sản phẩm thuộc ít nhất 2 category khác nhau
SELECT
    c.full_name,
    COUNT(DISTINCT p.category_id)   AS distinct_categories_bought
FROM customers c
JOIN orders o       ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id    = oi.order_id
JOIN products p     ON oi.product_id = p.product_id
WHERE o.status = 'completed'
GROUP BY c.customer_id, c.full_name
HAVING COUNT(DISTINCT p.category_id) >= 2
ORDER BY distinct_categories_bought DESC;


-- Q6: Tính giá trị trung bình mỗi đơn hàng (AOV) theo từng region
WITH order_total AS (
    SELECT
        o.order_id,
        c.region_id,
        SUM(oi.quantity * oi.unit_price) AS order_value
    FROM orders o
    JOIN customers c    ON o.customer_id  = c.customer_id
    JOIN order_items oi ON o.order_id     = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY o.order_id, c.region_id
)
SELECT
    r.region_name,
    COUNT(ot.order_id)                      AS total_orders,
    ROUND(AVG(ot.order_value), 0)           AS avg_order_value,
    SUM(ot.order_value)                     AS total_revenue
FROM order_total ot
JOIN regions r ON ot.region_id = r.region_id
GROUP BY r.region_id, r.region_name
ORDER BY avg_order_value DESC;


-- Q7: Sản phẩm nào có stock còn lại dưới mức trung bình toàn bộ sản phẩm?
SELECT
    p.product_name,
    cat.category_name,
    p.stock_qty,
    ROUND(AVG(p2.stock_qty) OVER (), 1) AS avg_stock
FROM products p
JOIN categories cat ON p.category_id = cat.category_id
CROSS JOIN (SELECT AVG(stock_qty) AS avg_qty FROM products) avg_all
JOIN products p2 ON TRUE   -- trick để dùng window trên toàn bảng
WHERE p.stock_qty < (SELECT AVG(stock_qty) FROM products)
GROUP BY p.product_id, p.product_name, cat.category_name,
         p.stock_qty, avg_all.avg_qty
ORDER BY p.stock_qty ASC;

-- Cách viết gọn hơn (cùng kết quả):
SELECT
    p.product_name,
    cat.category_name,
    p.stock_qty,
    ROUND((SELECT AVG(stock_qty) FROM products), 1) AS avg_stock
FROM products p
JOIN categories cat ON p.category_id = cat.category_id
WHERE p.stock_qty < (SELECT AVG(stock_qty) FROM products)
ORDER BY p.stock_qty ASC;


-- Q8: Với mỗi nhân viên, liệt kê tên khách hàng họ phục vụ (không trùng)
SELECT
    e.full_name          AS employee,
    STRING_AGG(DISTINCT c.full_name, ', ' ORDER BY c.full_name)
                         AS customers_served,
    COUNT(DISTINCT c.customer_id) AS total_customers
FROM employees e
JOIN orders o    ON e.employee_id  = o.employee_id
JOIN customers c ON o.customer_id  = c.customer_id
GROUP BY e.employee_id, e.full_name
ORDER BY total_customers DESC;


-- Q9: Tìm tháng có doanh thu cao nhất và thấp nhất
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', o.order_date)       AS month,
        SUM(oi.quantity * oi.unit_price)        AS revenue
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT
    month,
    revenue,
    CASE
        WHEN revenue = MAX(revenue) OVER () THEN 'highest'
        WHEN revenue = MIN(revenue) OVER () THEN 'lowest'
        ELSE 'normal'
    END AS label
FROM monthly
ORDER BY revenue DESC;


-- Q10: Danh sách sản phẩm chưa bao giờ bị cancelled
-- (chỉ xuất hiện trong completed orders, không có trong cancelled orders)
SELECT
    p.product_name,
    cat.category_name
FROM products p
JOIN categories cat ON p.category_id = cat.category_id
WHERE p.product_id IN (
    SELECT oi.product_id
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'completed'
)
AND p.product_id NOT IN (
    SELECT oi.product_id
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'cancelled'
)
ORDER BY cat.category_name, p.product_name;