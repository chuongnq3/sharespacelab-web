CREATE PROCEDURE dbo.sp_EmployeePerformance
    @EmployeeID     INT,
    @FromDate       DATE = NULL,
    @ToDate         DATE = NULL,
    @TotalOrders    INT          OUTPUT,
    @TotalRevenue   DECIMAL(18,2) OUTPUT,
    @CompletionRate DECIMAL(5,2) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    SET @FromDate = ISNULL(@FromDate, '2000-01-01');
    SET @ToDate   = ISNULL(@ToDate, GETDATE());

    -- Tính các chỉ số qua OUTPUT
    SELECT
        @TotalOrders    = COUNT(DISTINCT o.order_id),
        @TotalRevenue   = ISNULL(SUM(CASE WHEN o.status = 'completed'
                                     THEN oi.quantity * oi.unit_price
                                     ELSE 0 END), 0),
        @CompletionRate = ROUND(
            100.0 * SUM(CASE WHEN o.status = 'completed' THEN 1 ELSE 0 END)
                  / NULLIF(COUNT(o.order_id), 0), 2)
    FROM orders o
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.employee_id = @EmployeeID
      AND o.order_date BETWEEN @FromDate AND @ToDate;

    -- In chi tiết từng đơn
    SELECT
        o.order_id,
        o.order_date,
        o.status,
        SUM(oi.quantity * oi.unit_price) AS order_total
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.employee_id = @EmployeeID
      AND o.order_date BETWEEN @FromDate AND @ToDate
    GROUP BY o.order_id, o.order_date, o.status
    ORDER BY o.order_date;
END;
GO

-- Gọi SP cho Trần Thị Bích (employee_id = 2):
DECLARE
    @Orders   INT,
    @Revenue  DECIMAL(18,2),
    @Rate     DECIMAL(5,2);

EXEC dbo.sp_EmployeePerformance
    @EmployeeID     = 2,
    @FromDate       = '2023-01-01',
    @ToDate         = '2024-12-31',
    @TotalOrders    = @Orders    OUTPUT,
    @TotalRevenue   = @Revenue   OUTPUT,
    @CompletionRate = @Rate      OUTPUT;

SELECT
    @Orders  AS total_orders,
    @Revenue AS total_revenue,
    @Rate    AS completion_rate_pct;