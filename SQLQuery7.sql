CREATE FUNCTION dbo.fn_GetCustomerOrders (
    @CustomerID INT,
    @FromDate   DATE,
    @ToDate     DATE
)
RETURNS TABLE
AS
RETURN (
    SELECT
        o.order_id,
        o.order_date,
        o.status,
        SUM(oi.quantity * oi.unit_price) AS order_total,
        COUNT(oi.item_id)                AS item_count
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.customer_id = @CustomerID
      AND o.order_date BETWEEN @FromDate AND @ToDate
    GROUP BY o.order_id, o.order_date, o.status
);
GO

-- Sử dụng cho Alice Nguyen (customer_id = 1):
SELECT * FROM dbo.fn_GetCustomerOrders(1, '2023-01-01', '2024-12-31')
ORDER BY order_date;

-- JOIN với bảng khác:
SELECT
    c.full_name,
    f.order_id,
    f.order_date,
    f.order_total,
    f.status
FROM customers c
CROSS APPLY dbo.fn_GetCustomerOrders(c.customer_id, '2023-01-01', '2024-12-31') f
ORDER BY c.full_name, f.order_date;