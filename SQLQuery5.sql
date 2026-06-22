CREATE FUNCTION dbo.fn_CustomerSegment (@TotalSpent DECIMAL(18,2))
RETURNS VARCHAR(20)
AS
BEGIN
    RETURN CASE
        WHEN @TotalSpent >= 10000000 THEN 'VIP'
        WHEN @TotalSpent >= 2000000  THEN 'Gold'
        WHEN @TotalSpent >= 500000   THEN 'Silver'
        ELSE 'Bronze'
    END;
END;
GO

-- Sử dụng:
WITH customer_spent AS (
    SELECT
        c.customer_id,
        c.full_name,
        SUM(oi.quantity * oi.unit_price) AS total_spent
    FROM customers c
    JOIN orders o      ON c.customer_id = o.customer_id
    JOIN order_items oi ON o.order_id   = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY c.customer_id, c.full_name
)
SELECT
    full_name,
    total_spent,
    dbo.fn_CustomerSegment(total_spent) AS segment
FROM customer_spent
ORDER BY total_spent DESC;