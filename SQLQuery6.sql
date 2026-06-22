CREATE FUNCTION dbo.fn_Tenuredays (@HireDate DATE)
RETURNS INT
AS
BEGIN
    RETURN DATEDIFF(DAY, @HireDate, GETDATE());
END;
GO

-- Sử dụng:
SELECT
    full_name,
    role,
    hire_date,
    dbo.fn_TenureDays(hire_date)        AS days_worked,
    dbo.fn_TenureDays(hire_date) / 365  AS years_approx
FROM employees
ORDER BY hire_date;