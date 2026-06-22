CREATE FUNCTION dbo.fn_FormatVND (@Amount DECIMAL(18,2))
RETURNS VARCHAR(50)
AS
BEGIN
    RETURN FORMAT(@Amount, 'N0', 'vi-VN') + ' VND';
END;
GO

-- Sử dụng:
SELECT
    product_name,
    unit_price,
    dbo.fn_FormatVND(unit_price) AS price_formatted,
	FORMAT(unit_price, 'N0', 'vi-VN') + ' VND'

FROM products
ORDER BY unit_price DESC;