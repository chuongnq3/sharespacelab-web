-- ============================================================
-- LOI GIAI - STORED PROCEDURE (5 CAP DO)
-- ============================================================

USE FuncPractice;
GO

-- ============================================================
-- [SP01] EASY - usp_GetCustomerSummary
-- ============================================================
CREATE OR ALTER PROCEDURE usp_GetCustomerSummary
    @cust_id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Validate
    IF NOT EXISTS (SELECT 1 FROM Customers WHERE cust_id = @cust_id)
        RAISERROR('Khach hang voi cust_id = %d khong ton tai.', 16, 1, @cust_id);

    -- [Result set 1] Thong tin khach hang
    SELECT
        c.cust_id,
        c.full_name,
        -- Tuoi chinh xac
        DATEDIFF(YEAR, c.birth_date, GETDATE())
        - CASE
            WHEN MONTH(c.birth_date) > MONTH(GETDATE())
              OR (MONTH(c.birth_date) = MONTH(GETDATE())
                  AND DAY(c.birth_date) > DAY(GETDATE()))
            THEN 1 ELSE 0
          END                                           AS tuoi,
        c.segment,
        c.city,
        -- Nam thanh vien chinh xac
        DATEDIFF(YEAR, c.open_date, GETDATE())
        - CASE
            WHEN MONTH(c.open_date) > MONTH(GETDATE())
              OR (MONTH(c.open_date) = MONTH(GETDATE())
                  AND DAY(c.open_date) > DAY(GETDATE()))
            THEN 1 ELSE 0
          END                                           AS ngay_thanh_vien
    FROM Customers c
    WHERE c.cust_id = @cust_id;

    -- [Result set 2] Danh sach hop dong
    SELECT
        cn.contract_id,
        p.prod_name                                     AS san_pham,
        p.category,
        cn.principal,
        cn.outstanding,
        cn.interest_rate,
        cn.dpd,
        cn.status,
        CASE
            WHEN cn.maturity_date < CAST(GETDATE() AS DATE) THEN 0
            ELSE DATEDIFF(DAY, CAST(GETDATE() AS DATE), cn.maturity_date)
        END                                             AS han_con_lai
    FROM Contracts cn
    JOIN Products p ON p.prod_id = cn.prod_id
    WHERE cn.cust_id = @cust_id
    ORDER BY cn.status, cn.outstanding DESC;
END;
GO

-- ============================================================
-- [SP02] MEDIUM - usp_SearchContracts
-- ============================================================
CREATE OR ALTER PROCEDURE usp_SearchContracts
    @segment    VARCHAR(10)  = NULL,
    @category   VARCHAR(20)  = NULL,
    @status     VARCHAR(10)  = NULL,
    @dpd_min    INT          = 0,
    @dpd_max    INT          = 99999,
    @sort_by    VARCHAR(20)  = 'outstanding',
    @sort_dir   VARCHAR(4)   = 'DESC',
    @page       INT          = 1,
    @page_size  INT          = 10
AS
BEGIN
    SET NOCOUNT ON;

    -- Normalize / guard parameters
    IF @page      < 1  SET @page      = 1;
    IF @page_size < 1  SET @page_size = 10;
    IF @dpd_min IS NULL SET @dpd_min = 0;
    IF @dpd_max IS NULL SET @dpd_max = 99999;

    -- Validate sort_by
    IF LOWER(ISNULL(@sort_by,'')) NOT IN ('outstanding','dpd','principal')
        SET @sort_by = 'outstanding';

    -- Validate sort_dir
    IF UPPER(ISNULL(@sort_dir,'')) NOT IN ('ASC','DESC')
        SET @sort_dir = 'DESC';

    -- Dem tong dong (dung bien de tai su dung)
    DECLARE @total_rows  INT;
    DECLARE @total_pages INT;

    SELECT @total_rows = COUNT(*)
    FROM Contracts  cn
    JOIN Customers  cu ON cu.cust_id  = cn.cust_id
    JOIN Products   p  ON p.prod_id   = cn.prod_id
    WHERE (@segment  IS NULL OR cu.segment  = @segment)
      AND (@category IS NULL OR p.category  = @category)
      AND (@status   IS NULL OR cn.status   = @status)
      AND cn.dpd BETWEEN @dpd_min AND @dpd_max;

    SET @total_pages = CEILING(CAST(@total_rows AS FLOAT) / @page_size);
    IF @total_pages < 1 SET @total_pages = 1;

    -- [Result set 1] Metadata
    SELECT
        @total_rows   AS total_rows,
        @total_pages  AS total_pages,
        @page         AS current_page,
        @page_size    AS page_size;

    -- [Result set 2] Data - dung dynamic SQL cho ORDER BY dong
    DECLARE @sql NVARCHAR(MAX);
    DECLARE @params NVARCHAR(MAX);

    SET @sql = N'
    SELECT
        cn.contract_id,
        cn.cust_id,
        cu.full_name,
        cu.segment,
        p.prod_name,
        p.category,
        cn.principal,
        cn.outstanding,
        cn.interest_rate,
        cn.dpd,
        cn.status,
        ROW_NUMBER() OVER (ORDER BY cn.' + QUOTENAME(@sort_by) + N' ' + @sort_dir + N') AS row_num
    FROM Contracts  cn
    JOIN Customers  cu ON cu.cust_id = cn.cust_id
    JOIN Products   p  ON p.prod_id  = cn.prod_id
    WHERE (@segment  IS NULL OR cu.segment  = @segment)
      AND (@category IS NULL OR p.category  = @category)
      AND (@status   IS NULL OR cn.status   = @status)
      AND cn.dpd BETWEEN @dpd_min AND @dpd_max
    ORDER BY cn.' + QUOTENAME(@sort_by) + N' ' + @sort_dir + N'
    OFFSET (@page - 1) * @page_size ROWS
    FETCH NEXT @page_size ROWS ONLY;';

    SET @params = N'@segment VARCHAR(10), @category VARCHAR(20), @status VARCHAR(10),
                    @dpd_min INT, @dpd_max INT, @page INT, @page_size INT';

    EXEC sp_executesql @sql, @params,
        @segment   = @segment,
        @category  = @category,
        @status    = @status,
        @dpd_min   = @dpd_min,
        @dpd_max   = @dpd_max,
        @page      = @page,
        @page_size = @page_size;
END;
GO

-- ============================================================
-- [SP03] HARD - usp_ProcessPayment
-- ============================================================
CREATE OR ALTER PROCEDURE usp_ProcessPayment
    @contract_id    INT,
    @amount         BIGINT,
    @channel        VARCHAR(20),
    @txn_date       DATETIME     = NULL,
    @note           NVARCHAR(200) = NULL,
    @new_txn_id     INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    IF @txn_date IS NULL SET @txn_date = GETDATE();

    -- ── 1. Validate ─────────────────────────────────────────
    IF NOT EXISTS (
        SELECT 1 FROM Contracts WHERE contract_id = @contract_id AND status = 'ACTIVE'
    )
        THROW 50001, 'Hop dong khong ton tai hoac khong o trang thai ACTIVE.', 1;

    IF @amount <= 0
        THROW 50002, 'So tien thanh toan phai > 0.', 1;

    IF UPPER(@channel) NOT IN ('ONLINE','TELLER','ATM','AUTO')
        THROW 50003, 'Channel khong hop le. Chap nhan: ONLINE, TELLER, ATM, AUTO.', 1;

    -- ── Lay thong tin hop dong ───────────────────────────────
    DECLARE @outstanding_cu  BIGINT;
    DECLARE @interest_rate   DECIMAL(5,2);
    DECLARE @min_payment     BIGINT;

    SELECT
        @outstanding_cu = outstanding,
        @interest_rate  = interest_rate
    FROM Contracts WHERE contract_id = @contract_id;

    -- So tien den han toi thieu uoc tinh (goc + lai, buffer 110%)
    SET @min_payment = CAST(@outstanding_cu * @interest_rate / 100.0 / 12 * 1.1 AS BIGINT);

    BEGIN TRANSACTION;
    BEGIN TRY

        -- ── 2. Insert giao dich chinh ───────────────────────
        DECLARE @next_id INT;
        SELECT @next_id = ISNULL(MAX(txn_id), 10000) + 1 FROM Transactions;

        INSERT INTO Transactions (txn_id, contract_id, txn_date, txn_type, amount, channel, note)
        VALUES (@next_id, @contract_id, @txn_date, 'PAYMENT',
                @amount, UPPER(@channel), ISNULL(@note, N'Thanh toan hop dong'));

        SET @new_txn_id = @next_id;

        -- ── 3. Cap nhat hop dong ────────────────────────────
        DECLARE @outstanding_moi BIGINT = CASE
            WHEN @outstanding_cu - @amount < 0 THEN 0
            ELSE @outstanding_cu - @amount
        END;

        DECLARE @status_moi VARCHAR(10) = CASE
            WHEN @outstanding_moi = 0 THEN 'CLOSED'
            ELSE 'ACTIVE'
        END;

        DECLARE @dpd_moi INT;
        SELECT @dpd_moi = CASE
            WHEN @amount >= @min_payment THEN 0
            ELSE dpd
        END
        FROM Contracts WHERE contract_id = @contract_id;

        UPDATE Contracts SET
            outstanding = @outstanding_moi,
            status      = @status_moi,
            dpd         = @dpd_moi
        WHERE contract_id = @contract_id;

        -- ── 4. Hoan tien du neu tra qua ─────────────────────
        DECLARE @hoan_du BIGINT = 0;
        IF @amount > @outstanding_cu
        BEGIN
            SET @hoan_du = @amount - @outstanding_cu;
            SELECT @next_id = ISNULL(MAX(txn_id), 10000) + 1 FROM Transactions;
            INSERT INTO Transactions (txn_id, contract_id, txn_date, txn_type, amount, channel, note)
            VALUES (@next_id, @contract_id, @txn_date, 'WAIVER',
                    @hoan_du, UPPER(@channel), N'Hoan tien du khi tat toan');
        END;

        -- ── 5. Result set tom tat ───────────────────────────
        SELECT
            @contract_id        AS contract_id,
            @outstanding_cu     AS outstanding_truoc,
            @outstanding_moi    AS outstanding_sau,
            @amount             AS so_tien_thuc_tra,
            @hoan_du            AS hoan_du,
            @status_moi         AS trang_thai_moi;

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- ============================================================
-- [SP04] VERY HARD - usp_PortfolioRiskReport
-- ============================================================
CREATE OR ALTER PROCEDURE usp_PortfolioRiskReport
    @as_of_date     DATE        = NULL,
    @segment        VARCHAR(10) = NULL,
    @output_mode    TINYINT     = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- Validate
    IF @output_mode NOT IN (1, 2, 3)
        THROW 50010, '@output_mode chi chap nhan gia tri 1 (Summary), 2 (Detail), hoac 3 (Both).', 1;

    IF @as_of_date IS NULL SET @as_of_date = CAST(GETDATE() AS DATE);

    -- Tong outstanding toan danh muc (dung lam mau so ty le)
    DECLARE @total_outstanding BIGINT;
    SELECT @total_outstanding = SUM(outstanding)
    FROM Contracts
    WHERE status = 'ACTIVE';

    DECLARE @total_active INT;
    SELECT @total_active = COUNT(*)
    FROM Contracts
    WHERE status = 'ACTIVE';

    -- CTE chung cho ca 2 result set
    ;WITH dpd_classified AS (
        SELECT
            cn.contract_id,
            cn.cust_id,
            cn.prod_id,
            cn.principal,
            cn.outstanding,
            cn.interest_rate,
            cn.dpd,
            cn.status,
            CASE
                WHEN cn.dpd = 0              THEN 'NORMAL'
                WHEN cn.dpd BETWEEN 1  AND 29  THEN 'WATCH'
                WHEN cn.dpd BETWEEN 30 AND 89  THEN 'SUB_STANDARD'
                ELSE 'NPL'
            END                             AS dpd_band,
            CASE
                WHEN cn.dpd = 0              THEN 0.00
                WHEN cn.dpd BETWEEN 1  AND 29  THEN 0.02
                WHEN cn.dpd BETWEEN 30 AND 89  THEN 0.20
                ELSE 0.50
            END                             AS provision_rate,
            -- Health score
            CASE
                WHEN cn.dpd = 0              THEN 10
                WHEN cn.dpd BETWEEN 1  AND 29  THEN 7
                WHEN cn.dpd BETWEEN 30 AND 89  THEN 3
                ELSE 0
            END * LOG(1 + cn.outstanding / 1000000.0) AS health_score
        FROM Contracts cn
        WHERE cn.status = 'ACTIVE'
          AND (@segment IS NULL OR EXISTS (
                SELECT 1 FROM Customers cu
                WHERE cu.cust_id = cn.cust_id AND cu.segment = @segment))
    ),
    -- Score moi nhat <= @as_of_date cho tung khach hang
    latest_score AS (
        SELECT cn.contract_id, s.score_value, s.score_band, s.score_month
        FROM Contracts cn
        CROSS APPLY (
            SELECT TOP 1 score_value, score_band, score_month
            FROM Scores
            WHERE cust_id = cn.cust_id
              AND score_month <= @as_of_date
            ORDER BY score_month DESC
        ) s
        WHERE cn.status = 'ACTIVE'
    )

    -- ── [Result set 1] SUMMARY ──────────────────────────────
    SELECT
        cu.segment,
        dc.dpd_band,
        COUNT(*)                                                        AS so_hd,
        SUM(dc.principal)                                               AS tong_principal,
        SUM(dc.outstanding)                                             AS tong_outstanding,
        ROUND(SUM(dc.outstanding) * 100.0 / NULLIF(@total_outstanding, 0), 2)
                                                                        AS ty_le_outstanding_pct,
        CAST(SUM(dc.outstanding * dc.provision_rate) AS BIGINT)         AS provision,
        ROUND(AVG(CAST(ls.score_value AS FLOAT)), 1)                    AS avg_score,
        ROUND(COUNT(*) * 100.0 / NULLIF(@total_active, 0), 2)          AS pct_of_portfolio
    FROM dpd_classified dc
    JOIN Customers cu ON cu.cust_id = dc.cust_id
    LEFT JOIN latest_score ls ON ls.contract_id = dc.contract_id
    GROUP BY cu.segment, dc.dpd_band
    HAVING @output_mode IN (1, 3)
    ORDER BY cu.segment, dc.dpd_band;

    -- ── [Result set 2] DETAIL ────────────────────────────────
    SELECT
        dc.contract_id,
        dc.cust_id,
        cu.full_name,
        cu.segment,
        p.prod_name,
        p.category,
        dc.principal,
        dc.outstanding,
        dc.interest_rate,
        dc.dpd,
        dc.dpd_band,
        dc.status,
        ROUND(dc.health_score, 2)                                       AS health_score,
        ls.score_value,
        ls.score_band,
        ls.score_month                                                  AS thang_score,
        CAST(dc.outstanding * dc.provision_rate AS BIGINT)              AS provision_amount,
        RANK() OVER (ORDER BY dc.health_score ASC)                      AS risk_rank
    FROM dpd_classified dc
    JOIN Customers cu ON cu.cust_id = dc.cust_id
    JOIN Products  p  ON p.prod_id  = dc.prod_id
    LEFT JOIN latest_score ls ON ls.contract_id = dc.contract_id
    HAVING @output_mode IN (2, 3)   -- trick: HAVING khong co GROUP BY = WHERE toan cuc
    ORDER BY dc.health_score ASC;
END;
GO

-- ============================================================
-- [SP05] EXTREME - usp_GenerateRepaymentSchedule
-- ============================================================
CREATE OR ALTER PROCEDURE usp_GenerateRepaymentSchedule
    @contract_id    INT,
    @recalc_from    DATE    = NULL,
    @save_to_table  BIT     = 0,
    @debug          BIT     = 0
AS
BEGIN
    SET NOCOUNT ON;

    -- ── Validate ─────────────────────────────────────────────
    IF NOT EXISTS (SELECT 1 FROM Contracts WHERE contract_id = @contract_id)
        THROW 50020, 'contract_id khong ton tai.', 1;

    -- ── Lay thong tin hop dong ────────────────────────────────
    DECLARE @P              FLOAT;
    DECLARE @r              FLOAT;
    DECLARE @n              INT;
    DECLARE @disbursed      DATE;
    DECLARE @interest_rate  DECIMAL(5,2);

    SELECT
        @P             = CAST(principal AS FLOAT),
        @interest_rate = interest_rate,
        @r             = interest_rate / 100.0 / 12,
        @n             = term_months,
        @disbursed     = disbursed_date
    FROM Contracts
    WHERE contract_id = @contract_id;

    -- ── Xu ly @recalc_from ────────────────────────────────────
    DECLARE @tong_da_tra    FLOAT  = 0;
    DECLARE @ky_bat_dau     INT    = 1;
    DECLARE @P_recalc       FLOAT  = @P;   -- principal tai ky bat dau
    DECLARE @n_recalc       INT    = @n;   -- so ky con lai

    IF @recalc_from IS NOT NULL
    BEGIN
        -- Tong PAYMENT truoc @recalc_from
        SELECT @tong_da_tra = ISNULL(SUM(CAST(t.amount AS FLOAT)), 0)
        FROM Transactions t
        JOIN Contracts cn ON cn.contract_id = t.contract_id
        WHERE t.contract_id = @contract_id
          AND t.txn_type    = 'PAYMENT'
          AND CAST(t.txn_date AS DATE) < @recalc_from;

        -- Ky bat dau = so thang tu disbursed_date den @recalc_from (1-based)
        SET @ky_bat_dau = DATEDIFF(MONTH, @disbursed, @recalc_from) + 1;
        IF @ky_bat_dau < 1 SET @ky_bat_dau = 1;

        SET @P_recalc  = @P - @tong_da_tra;
        IF @P_recalc < 0 SET @P_recalc = 0;

        SET @n_recalc  = @n - @ky_bat_dau + 1;
        IF @n_recalc < 1 SET @n_recalc = 1;
    END;

    -- ── Tinh EMI ─────────────────────────────────────────────
    DECLARE @EMI_full    FLOAT = @P    * @r * POWER(1+@r, @n)        / (POWER(1+@r, @n)        - 1);
    DECLARE @EMI_recalc  FLOAT = @P_recalc * @r * POWER(1+@r, @n_recalc) / (POWER(1+@r, @n_recalc) - 1);
    IF @r = 0 BEGIN
        SET @EMI_full   = @P     / @n;
        SET @EMI_recalc = @P_recalc / @n_recalc;
    END;

    -- ── Debug info ────────────────────────────────────────────
    IF @debug = 1
        SELECT
            @contract_id    AS contract_id,
            CAST(@P AS BIGINT)          AS P,
            @r              AS r,
            @n              AS n,
            CAST(@EMI_full AS BIGINT)   AS EMI_full,
            @recalc_from    AS recalc_from,
            CAST(@tong_da_tra AS BIGINT)    AS tong_da_tra,
            @ky_bat_dau     AS ky_bat_dau,
            CAST(@P_recalc AS BIGINT)       AS P_recalc,
            @n_recalc       AS n_recalc,
            CAST(@EMI_recalc AS BIGINT)     AS EMI_recalc;

    -- ── Tao bang neu can ─────────────────────────────────────
    IF @save_to_table = 1 AND OBJECT_ID('RepaymentSchedule','U') IS NULL
    BEGIN
        CREATE TABLE RepaymentSchedule (
            contract_id         INT         NOT NULL,
            ky_so               INT         NOT NULL,
            ngay_den_han        DATE        NOT NULL,
            outstanding_dau_ky  BIGINT,
            lai_ky              BIGINT,
            goc_ky              BIGINT,
            tra_tong            BIGINT,
            outstanding_cuoi_ky BIGINT,
            trang_thai          VARCHAR(10),
            created_at          DATETIME    DEFAULT GETDATE(),
            PRIMARY KEY (contract_id, ky_so)
        );
    END;

    -- ── Recursive CTE sinh lich ──────────────────────────────
    -- Giai doan 1: cac ky truoc @ky_bat_dau (dung EMI_full, chi khi @recalc_from IS NOT NULL)
    -- Giai doan 2: cac ky tu @ky_bat_dau tro di (dung EMI_recalc va P_recalc)
    ;WITH sched AS (
        -- Anchor: ky dau tien
        SELECT
            1                                           AS ky_so,
            CAST(DATEADD(MONTH, 1, @disbursed) AS DATE) AS ngay_den_han,
            -- Ky truoc recalc_from dung P goc; ky recalc_from tro di dung P_recalc
            CASE WHEN @recalc_from IS NULL OR 1 >= @ky_bat_dau
                 THEN @P_recalc ELSE @P END             AS outstanding_dau_ky,
            CASE WHEN @recalc_from IS NULL OR 1 >= @ky_bat_dau
                 THEN @P_recalc * @r ELSE @P * @r END   AS lai_ky,
            CASE WHEN @recalc_from IS NULL OR 1 >= @ky_bat_dau
                 THEN @EMI_recalc - @P_recalc * @r
                 ELSE @EMI_full - @P * @r END           AS goc_ky,
            CASE WHEN @recalc_from IS NULL OR 1 >= @ky_bat_dau
                 THEN @EMI_recalc ELSE @EMI_full END     AS tra_tong,
            CASE WHEN @recalc_from IS NULL OR 1 >= @ky_bat_dau
                 THEN @P_recalc - (@EMI_recalc - @P_recalc * @r)
                 ELSE @P       - (@EMI_full    - @P        * @r) END AS outstanding_cuoi_ky

        UNION ALL

        SELECT
            s.ky_so + 1,
            CAST(DATEADD(MONTH, s.ky_so + 1, @disbursed) AS DATE),
            s.outstanding_cuoi_ky,
            -- Lai ky
            CASE WHEN s.ky_so + 1 = @n THEN 0
                 ELSE s.outstanding_cuoi_ky * @r END,
            -- Goc ky: ky cuoi tra het du no de tranh float drift
            CASE WHEN s.ky_so + 1 = @n THEN s.outstanding_cuoi_ky
                 ELSE
                     CASE WHEN s.ky_so + 1 >= @ky_bat_dau
                          THEN @EMI_recalc - s.outstanding_cuoi_ky * @r
                          ELSE @EMI_full   - s.outstanding_cuoi_ky * @r END
            END,
            -- tra_tong
            CASE WHEN s.ky_so + 1 = @n THEN s.outstanding_cuoi_ky
                 ELSE
                     CASE WHEN s.ky_so + 1 >= @ky_bat_dau
                          THEN @EMI_recalc
                          ELSE @EMI_full END
            END,
            -- outstanding_cuoi_ky
            CASE WHEN s.ky_so + 1 = @n THEN 0.0
                 ELSE
                     CASE WHEN s.ky_so + 1 >= @ky_bat_dau
                          THEN s.outstanding_cuoi_ky - (@EMI_recalc - s.outstanding_cuoi_ky * @r)
                          ELSE s.outstanding_cuoi_ky - (@EMI_full   - s.outstanding_cuoi_ky * @r) END
            END
        FROM sched s
        WHERE s.ky_so < @n
          AND s.outstanding_cuoi_ky > 0.5
    ),
    -- Tinh trang thai moi ky
    paid_per_period AS (
        SELECT
            ky_so,
            ngay_den_han,
            CAST(ROUND(outstanding_dau_ky, 0) AS BIGINT)   AS outstanding_dau_ky,
            CAST(ROUND(lai_ky, 0) AS BIGINT)                AS lai_ky,
            CAST(ROUND(goc_ky, 0) AS BIGINT)                AS goc_ky,
            CAST(ROUND(tra_tong, 0) AS BIGINT)              AS tra_tong,
            CAST(ROUND(outstanding_cuoi_ky, 0) AS BIGINT)   AS outstanding_cuoi_ky
        FROM sched
    ),
    status_calc AS (
        SELECT
            pp.*,
            ISNULL((
                SELECT SUM(t.amount)
                FROM Transactions t
                WHERE t.contract_id = @contract_id
                  AND t.txn_type    = 'PAYMENT'
                  AND CAST(t.txn_date AS DATE) >  DATEADD(MONTH, pp.ky_so - 1, @disbursed)
                  AND CAST(t.txn_date AS DATE) <= pp.ngay_den_han
            ), 0)                                           AS da_tra,
            CAST(GETDATE() AS DATE)                         AS today
        FROM paid_per_period pp
    )
    SELECT
        ky_so,
        ngay_den_han,
        outstanding_dau_ky,
        lai_ky,
        goc_ky,
        tra_tong,
        outstanding_cuoi_ky,
        CASE
            WHEN da_tra >= tra_tong                             THEN 'PAID'
            WHEN da_tra >  0 AND da_tra < tra_tong             THEN 'PARTIAL'
            WHEN da_tra =  0 AND ngay_den_han < today          THEN 'OVERDUE'
            ELSE 'PENDING'
        END                                                 AS trang_thai
    INTO #schedule_tmp
    FROM status_calc
    OPTION (MAXRECURSION 360);

    -- ── Luu vao bang neu yeu cau ─────────────────────────────
    IF @save_to_table = 1
    BEGIN
        BEGIN TRANSACTION;
        BEGIN TRY
            DELETE FROM RepaymentSchedule WHERE contract_id = @contract_id;

            INSERT INTO RepaymentSchedule
                (contract_id, ky_so, ngay_den_han, outstanding_dau_ky,
                 lai_ky, goc_ky, tra_tong, outstanding_cuoi_ky, trang_thai)
            SELECT
                @contract_id, ky_so, ngay_den_han, outstanding_dau_ky,
                lai_ky, goc_ky, tra_tong, outstanding_cuoi_ky, trang_thai
            FROM #schedule_tmp;

            COMMIT TRANSACTION;
        END TRY
        BEGIN CATCH
            ROLLBACK TRANSACTION;
            THROW;
        END CATCH;
    END;

    -- ── Luon tra ve schedule ─────────────────────────────────
    SELECT * FROM #schedule_tmp ORDER BY ky_so;

    DROP TABLE #schedule_tmp;
END;
GO

-- ============================================================
-- TEST CASES (bo comment de chay)
-- ============================================================

-- [SP01]
-- EXEC usp_GetCustomerSummary @cust_id = 1;
-- EXEC usp_GetCustomerSummary @cust_id = 3;
-- EXEC usp_GetCustomerSummary @cust_id = 999;

-- [SP02]
-- EXEC usp_SearchContracts;
-- EXEC usp_SearchContracts @segment='PREMIUM', @sort_by='dpd';
-- EXEC usp_SearchContracts @status='NPL', @sort_by='outstanding', @sort_dir='DESC';
-- EXEC usp_SearchContracts @page=2, @page_size=5;
-- EXEC usp_SearchContracts @sort_by='INVALID', @sort_dir='XYZ';

-- [SP03]
-- DECLARE @id INT;
-- EXEC usp_ProcessPayment 1001, 25000000, 'ONLINE', NULL, N'Test payment', @id OUTPUT;
-- SELECT @id AS new_txn_id;
-- EXEC usp_ProcessPayment 1010, 999999999, 'TELLER', NULL, N'Tat toan', @id OUTPUT;
-- EXEC usp_ProcessPayment 1006, 1000000, 'ONLINE', NULL, NULL, @id OUTPUT;   -- error
-- EXEC usp_ProcessPayment 1001, -500000, 'ONLINE', NULL, NULL, @id OUTPUT;   -- error

-- [SP04]
-- EXEC usp_PortfolioRiskReport;
-- EXEC usp_PortfolioRiskReport @output_mode = 1;
-- EXEC usp_PortfolioRiskReport @output_mode = 2, @segment = 'PREMIUM';
-- EXEC usp_PortfolioRiskReport @output_mode = 3, @as_of_date = '2024-01-31';
-- EXEC usp_PortfolioRiskReport @output_mode = 9;  -- error

-- [SP05]
-- EXEC usp_GenerateRepaymentSchedule @contract_id = 1001;
-- EXEC usp_GenerateRepaymentSchedule @contract_id = 1001, @save_to_table = 1;
-- SELECT * FROM RepaymentSchedule WHERE contract_id = 1001;
-- EXEC usp_GenerateRepaymentSchedule @contract_id = 1001,
--      @recalc_from = '2024-04-01', @save_to_table = 1, @debug = 1;
-- EXEC usp_GenerateRepaymentSchedule @contract_id = 9999;  -- error
GO
