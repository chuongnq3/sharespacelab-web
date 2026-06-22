select * from [dbo].[categories]

select * from [dbo].[customers]

select * from [dbo].[employees]

select * from [dbo].[order_items]

select * from [dbo].[orders]

select * from [dbo].[products]

select * from [dbo].[regions]

-- Q8: Tổng chi tiêu của từng khách hàng (chỉ tính completed)

select * from [dbo].[orders] 

select * from [dbo].[order_items]

select * from [dbo].[customers]







SELECT *
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';