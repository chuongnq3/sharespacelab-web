CREATE FUNCTION dbo.fn_TopProductsByCategory (
    @CategoryID INT,
    @TopN       INT
)
RETURNS TABLE
AS
RETURN (
    SELECT TOP (@TopN)
        p.product_id,
        p.product_name,
        p.unit_price,
        SUM(oi.quantity)                 AS total_qty_sold,
        SUM(oi.quantity * oi.unit_price) AS total_revenue
    FROM products p
    JOIN order_items oi ON p.product_id  = oi.product_id
    JOIN orders o       ON oi.order_id   = o.order_id
    WHERE p.category_id = @CategoryID
      AND o.status = 'completed'
    GROUP BY p.product_id, p.product_name, p.unit_price
    ORDER BY total_qty_sold DESC
);
GO

-- Top 2 Electronics bán chạy nhất:
SELECT * FROM dbo.fn_TopProductsByCategory(1, 2);

-- Gọi cho tất cả category:
SELECT
    cat.category_name,
    f.product_name,
    f.total_qty_sold,
    f.total_revenue
FROM categories cat
CROSS APPLY dbo.fn_TopProductsByCategory(cat.category_id, 2) f
ORDER BY cat.category_name, f.total_qty_sold DESC;