CREATE PROCEDURE dbo.sp_UpdateOrderStatus
    @OrderID   INT,
    @NewStatus VARCHAR(20),
    @UpdatedBy INT   -- employee_id thực hiện
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CurrentStatus VARCHAR(20);

    -- Kiểm tra đơn hàng tồn tại
    SELECT @CurrentStatus = status
    FROM orders
    WHERE order_id = @OrderID;

    IF @CurrentStatus IS NULL
    BEGIN
        RAISERROR('OrderID %d không tồn tại.', 16, 1, @OrderID);
        RETURN;
    END;

    -- Không sửa đơn đã hoàn tất hoặc đã hủy
    IF @CurrentStatus IN ('completed', 'cancelled')
    BEGIN
        RAISERROR('Không thể sửa đơn hàng có status "%s".', 16, 1, @CurrentStatus);
        RETURN;
    END;

    -- Chỉ cho phép chuyển sang completed hoặc cancelled
    IF @NewStatus NOT IN ('completed', 'cancelled')
    BEGIN
        RAISERROR('Chỉ được chuyển sang completed hoặc cancelled.', 16, 1, @NewStatus);
        RETURN;
    END;

    UPDATE orders
    SET status = @NewStatus
    WHERE order_id = @OrderID;

    -- Trả về kết quả sau cập nhật
    SELECT
        o.order_id,
        o.status          AS new_status,
        e.full_name       AS updated_by,
        GETDATE()         AS updated_at
    FROM orders o
    JOIN employees e ON e.employee_id = @UpdatedBy
    WHERE o.order_id = @OrderID;
END;
GO

-- Cập nhật đơn 1009 (pending) sang completed:
EXEC dbo.sp_UpdateOrderStatus
    @OrderID   = 1009,
    @NewStatus = 'completed',
    @UpdatedBy = 3;