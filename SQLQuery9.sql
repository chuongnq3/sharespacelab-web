CREATE FUNCTION dbo.fn_RevenueByRegion (
    @Year  INT,
    @Month INT
)
RETURNS TABLE
AS
RETURN (
    SELECT
        r.region_id,
        r.region_name,
        COUNT(DISTINCT o.order_id)           AS total_orders,
        COUNT(DISTINCT o.customer_id)        AS unique_customers,
        SUM(oi.quantity * oi.unit_price)     AS total_revenue,
        AVG(SUM(oi.quantity * oi.unit_price))
            OVER (PARTITION BY r.region_id)  AS avg_order_value
    FROM regions r
    JOIN customers c  ON r.region_id   = c.region_id
    JOIN orders o     ON c.customer_id = o.customer_id
    JOIN order_items oi ON o.order_id  = oi.order_id
    WHERE o.status = 'completed'
      AND YEAR(o.order_date)  = @Year
      AND MONTH(o.order_date) = @Month
    GROUP BY r.region_id, r.region_name
);
GO

-- Doanh thu tháng 1 năm 2023:
SELECT * FROM dbo.fn_RevenueByRegion(2023, 1)
ORDER BY total_revenue DESC;