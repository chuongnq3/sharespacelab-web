CREATE PROCEDURE dbo.sp_RevenueReport
    @FromDate  DATE    = NULL,
    @ToDate    DATE    = NULL,
    @RegionID  INT     = NULL,
    @Status    VARCHAR(20) = 'completed'
AS
BEGIN
    SET NOCOUNT ON;

    -- Mặc định: 30 ngày gần nhất nếu không truyền ngày
    SET @FromDate = ISNULL(@FromDate, DATEADD(DAY, -30, GETDATE()));
    SET @ToDate   = ISNULL(@ToDate,   GETDATE());

    SELECT
        r.region_name,
        COUNT(DISTINCT o.order_id)           AS total_orders,
        COUNT(DISTINCT o.customer_id)        AS unique_customers,
        SUM(oi.quantity * oi.unit_price)     AS total_revenue,
        ROUND(AVG(SUM(oi.quantity * oi.unit_price))
            OVER (PARTITION BY r.region_id), 0) AS avg_order_value
    FROM regions r
    JOIN customers c  ON r.region_id   = c.region_id
    JOIN orders o     ON c.customer_id = o.customer_id
    JOIN order_items oi ON o.order_id  = oi.order_id
    WHERE o.status = @Status
      AND o.order_date BETWEEN @FromDate AND @ToDate
      AND (c.region_id = @RegionID OR @RegionID IS NULL)
    GROUP BY r.region_id, r.region_name
    ORDER BY total_revenue DESC;
END;
GO

-- Gọi SP:
EXEC dbo.sp_RevenueReport
    @FromDate = '2023-01-01',
    @ToDate   = '2024-12-31';

-- Lọc theo region North (region_id = 1):
EXEC dbo.sp_RevenueReport
    @FromDate = '2023-01-01',
    @ToDate   = '2024-12-31',
    @RegionID = 1;