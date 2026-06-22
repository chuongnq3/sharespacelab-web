-- Q1: Liệt kê tất cả khách hàng cùng với tên region của họ
SELECT c.full_name, c.email, r.region_name
FROM customers c
JOIN regions r ON c.region_id = r.region_id;

-- Q2: Có bao nhiêu khách hàng ở mỗi region?
SELECT r.region_name, COUNT(c.customer_id) AS customer_count
FROM customers r
LEFT JOIN  regions ON r.region_id = c.region_id
GROUP BY r.region_name
ORDER BY customer_count DESC;

Q2: Có bao nhiêu khách hàng ở mỗi region?

SELECT
    r.region_name,
    COUNT(c.customer_id) AS total_customers
FROM customer c
INNER JOIN region r
    ON c.region_id = r.region_id
GROUP BY r.region_name
ORDER BY total_customers DESC;

-- Q3: Liệt kê các sản phẩm thuộc category "Electronics"
SELECT p.product_name, p.unit_price, p.stock_qty
FROM products p
JOIN categories c ON p.category_id = c.category_id
WHERE c.category_name = 'Electronics'
ORDER BY p.unit_price DESC;



-- Q4: Tổng doanh thu của từng đơn hàng (chỉ lấy status = 'completed')
SELECT o.order_id, o.order_date, SUM(oi.quantity * oi.unit_price) AS total_amount
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'completed'
GROUP BY o.order_id, o.order_date
ORDER BY total_amount DESC;

SELECT
    oi.order_id,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM dbo.order_items oi
INNER JOIN dbo.orders o
    ON oi.order_id = o.order_id
WHERE o.status = 'completed'
GROUP BY oi.order_id
ORDER BY oi.order_id;

-- Q5: Khách hàng nào chưa đặt đơn hàng nào?
SELECT c.full_name, c.email
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

SELECT
    c.customer_id,
    c.full_name
FROM dbo.customers c
LEFT JOIN dbo.orders o
    ON c.customer_id = o.customer_id
WHERE o.customer_id IS NULL

-- Q6: Mỗi nhân viên đã xử lý bao nhiêu đơn hàng?
SELECT e.full_name, e.role, COUNT(o.order_id) AS order_count
FROM employees e
LEFT JOIN orders o ON e.employee_id = o.employee_id
GROUP BY e.employee_id, e.full_name, e.role
ORDER BY order_count DESC;

-- Q7: Top 3 sản phẩm bán chạy nhất (theo số lượng)
SELECT p.product_name, SUM(oi.quantity) AS total_qty_sold
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.status = 'completed'
GROUP BY p.product_id, p.product_name
ORDER BY total_qty_sold DESC
LIMIT 3;

SELECT TOP 3
    p.product_name,
    SUM(oi.quantity) AS total_quantity
FROM dbo.order_items oi
INNER JOIN dbo.products p
    ON oi.product_id = p.product_id
GROUP BY
    p.product_name
ORDER BY
    total_quantity DESC;

SELECT TOP 3
    p.product_id,
    p.product_name,
    SUM(oi.quantity) AS total_quantity
FROM dbo.order_items oi
INNER JOIN dbo.orders o
    ON oi.order_id = o.order_id
INNER JOIN dbo.products p
    ON oi.product_id = p.product_id
WHERE o.status = 'completed'
GROUP BY
    p.product_id,
    p.product_name
ORDER BY
    total_quantity DESC;


-- Q8: Tổng chi tiêu của từng khách hàng (chỉ tính completed)
SELECT c.full_name, SUM(oi.quantity * oi.unit_price) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'completed'
GROUP BY c.customer_id, c.full_name
ORDER BY total_spent DESC;

SELECT
    c.customer_id,
    c.full_name,
    SUM(oi.quantity * oi.unit_price) AS total_spending
FROM dbo.customers c
INNER JOIN dbo.orders o
    ON c.customer_id = o.customer_id
INNER JOIN dbo.order_items oi
    ON o.order_id = oi.order_id
WHERE o.status = 'completed'
GROUP BY
    c.customer_id,
    c.full_name
ORDER BY
    total_spending DESC;

-- Q9: Tên manager của từng nhân viên (self-join)
SELECT e.full_name AS employee, e.role, m.full_name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id
ORDER BY m.full_name NULLS LAST;

-- Q10: Doanh thu theo từng category (chỉ completed)
SELECT cat.category_name, SUM(oi.quantity * oi.unit_price) AS revenue
FROM categories cat
JOIN products p ON cat.category_id = p.category_id
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.status = 'completed'
GROUP BY cat.category_id, cat.category_name
ORDER BY revenue DESC;