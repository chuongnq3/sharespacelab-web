CREATE FUNCTION dbo.fn_GetDiscountRate (@OrderTotal DECIMAL(18,2))
RETURNS DECIMAL(5,2)
AS
BEGIN
    DECLARE @Rate DECIMAL(5,2);
    SET @Rate = CASE
        WHEN @OrderTotal >= 5000000  THEN 0.10
        WHEN @OrderTotal >= 1000000  THEN 0.05
        ELSE 0.00
    END;
    RETURN @Rate;
END;
GO

-- Sử dụng: tính discount cho từng đơn hàng completed
SELECT
    o.order_id,
    SUM(oi.quantity * oi.unit_price)                        AS order_total,
    dbo.fn_GetDiscountRate(SUM(oi.quantity * oi.unit_price))AS discount_rate,
    SUM(oi.quantity * oi.unit_price)
        * dbo.fn_GetDiscountRate(SUM(oi.quantity * oi.unit_price))
                                                            AS discount_amount
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'completed'
GROUP BY o.order_id
ORDER BY order_total DESC;