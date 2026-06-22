/* =========================================================
   HELPER BLOCK — phải khai báo TRƯỚC funcProcParts
========================================================= */

let exerciseCounter = 0;

function buildExercise({ level, tag, task, thinking, sql, result, note }) {
  const id = `ex-${++exerciseCounter}`;

  const levelClass = {
    "Scalar Function":        "badge--scalar",
    "Table Function":         "badge--table",
    "Stored Procedure":       "badge--proc",
    "Advanced":               "badge--adv",
    "Tổng hợp":               "badge--expert"
  }[tag || level] || "badge--scalar";

  const thinkingHtml = thinking ? `
    <div class="ex-thinking">
      <div class="ex-thinking-label">Tư duy trước khi viết</div>
      ${thinking.map(t => `<div class="ex-think-item">→ ${t}</div>`).join("")}
    </div>` : "";

  const noteHtml = note ? `<div class="ex-note">${note}</div>` : "";

  return `
    <div class="exercise-wrap">
      <div class="ex-header">
        <span class="ex-badge ${levelClass}">${tag || level}</span>
        <span class="ex-task">${task}</span>
      </div>
      ${thinkingHtml}
      <div class="ex-sql-block">
        <div class="ex-sql-toolbar">
          <span class="ex-sql-label">T-SQL · SQL Server</span>
          <button class="copy-btn" onclick="copyCode(this)">⎘ Copy</button>
        </div>
        <pre><code>${escapeHtmlStatic(sql)}</code></pre>
      </div>
      ${noteHtml}
      <div class="ex-result-area" id="result-${id}">
        <div class="ex-result-inner">${result || "<em>Chạy trên SQL Server để xem kết quả.</em>"}</div>
      </div>
      <button class="show-result-btn" onclick="toggleResult('result-${id}', this)">
        ▶ Show Result
      </button>
    </div>`;
}

function buildTheory({ icon, title, body }) {
  return `
    <div class="theory-block">
      <div class="theory-title">
        <span class="theory-icon">${icon}</span>
        ${title}
      </div>
      <div class="theory-body">${body}</div>
    </div>`;
}

function buildCompare(rows) {
  return `
    <table class="compare-table">
      <thead>
        <tr>${rows[0].map(h => `<th>${h}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows.slice(1).map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>`;
}

function escapeHtmlStatic(v) {
  return String(v)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function toggleResult(id, btn) {
  const area = document.getElementById(id);
  if (!area) return;
  const isOpen = area.classList.contains("open");
  area.classList.toggle("open", !isOpen);
  btn.textContent = isOpen ? "▶ Show Result" : "▼ Hide Result";
}

function copyCode(btn) {
  const code = btn.closest(".ex-sql-block")?.querySelector("code")?.textContent || "";
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = "✓ Copied";
    setTimeout(() => { btn.textContent = "⎘ Copy"; }, 1500);
  });
}


/* =========================================================
   DATA
========================================================= */

const funcProcParts = [

  /* =====================================================
     PART 0 — TỔNG QUAN
  ===================================================== */
  {
    id: "overview",
    title: "Part 0",
    subtitle: "Tổng quan",
    sidebarTitle: "Tổng quan",
    lessons: [
      {
        id: "what-why",
        title: "Function & SP là gì?",
        label: "Part 0 · Tổng quan",
        blocks: [
          {
            heading: "Tại sao cần Function & Stored Procedure?",
            html: `
              <p>
                Khi làm việc với dữ liệu thực tế, có những đoạn logic SQL được dùng đi dùng lại
                ở nhiều nơi: tính doanh thu, lọc khách hàng theo điều kiện, cập nhật trạng thái đơn hàng...
                Nếu viết lại SQL mỗi lần là:
              </p>
              <div class="problem-list">
                <div class="problem-item problem-item--bad">Khó bảo trì — sửa 1 chỗ phải sửa nhiều nơi</div>
                <div class="problem-item problem-item--bad">Dễ sai — copy-paste gây nhau logic</div>
                <div class="problem-item problem-item--bad">Khó đọc — query phức tạp nằm rải rác</div>
              </div>
              <p>Function và Stored Procedure giải quyết điều này bằng cách:</p>
              <div class="problem-list">
                <div class="problem-item problem-item--good">Đóng gói logic vào 1 chỗ — gọi lại bất cứ lúc nào</div>
                <div class="problem-item problem-item--good">Có tên rõ ràng — code tự giải thích</div>
                <div class="problem-item problem-item--good">Kiểm soát input/output rõ ràng</div>
              </div>`
          },
          {
            heading: "So sánh tổng quan",
            html: buildCompare([
              ["Tiêu chí", "Scalar Function", "Table-valued Function", "Stored Procedure"],
              ["Trả về", "1 giá trị đơn (scalar)", "1 bảng dữ liệu", "Không trả về (hoặc OUT param)"],
              ["Gọi trong SELECT", "✓ Có", "✓ Có (inline)", "✗ Không"],
              ["Thực hiện DML (INSERT/UPDATE/DELETE)", "✗ Không", "✗ Không", "✓ Có"],
              ["Dùng tham số đầu vào", "✓ Có", "✓ Có", "✓ Có"],
              ["Dùng tham số đầu ra (OUTPUT)", "✗ Không", "✗ Không", "✓ Có"],
              ["BEGIN TRANSACTION bên trong", "✗ Không", "✗ Không", "✓ Có"],
              ["Use case chính", "Format/tính toán đơn giản", "Lọc data có tham số", "Logic phức tạp, side-effect"]
            ])
          }
        ]
      },

      {
        id: "syntax-overview",
        title: "Cú pháp tổng quát",
        label: "Part 0 · Tổng quan",
        blocks: [
          {
            heading: "Scalar Function — cú pháp cơ bản",
            html: `
              <pre><code>CREATE FUNCTION dbo.TenFunction (@Param1 KieuDuLieu)
RETURNS KieuTraVe
AS
BEGIN
    DECLARE @KetQua KieuTraVe;
    -- logic tinh toan
    SET @KetQua = ...;
    RETURN @KetQua;
END;</code></pre>
              ${buildTheory({
                icon: "💡",
                title: "Lưu ý quan trọng",
                body: `
                  <ul>
                    <li>Bắt buộc có <code>RETURNS</code> khai báo kiểu trả về.</li>
                    <li>Bắt buộc có <code>RETURN</code> trả về giá trị.</li>
                    <li>Không được thực hiện INSERT/UPDATE/DELETE bên trong.</li>
                    <li>Gọi: <code>SELECT dbo.TenFunction(tham_so)</code> — phải có prefix <code>dbo.</code></li>
                  </ul>`
              })}`
          },
          {
            heading: "Table-valued Function — cú pháp cơ bản",
            html: `
              <pre><code>-- Inline TVF (đơn giản, hiệu năng tốt hơn)
CREATE FUNCTION dbo.TenFunction (@Param1 KieuDuLieu)
RETURNS TABLE
AS
RETURN (
    SELECT ... FROM ... WHERE ...
);

-- Multi-statement TVF
CREATE FUNCTION dbo.TenFunction (@Param1 KieuDuLieu)
RETURNS @KetQua TABLE (Col1 KieuDuLieu, Col2 KieuDuLieu)
AS
BEGIN
    INSERT INTO @KetQua
    SELECT ... FROM ...;
    RETURN;
END;</code></pre>
              ${buildTheory({
                icon: "💡",
                title: "Nên dùng Inline TVF khi có thể",
                body: "Inline TVF được SQL Server tối ưu hóa tốt hơn vì nó được 'inlined' vào query — tương tự như CTE. Multi-statement TVF là blackbox với optimizer."
              })}`
          },
          {
            heading: "Stored Procedure — cú pháp cơ bản",
            html: `
              <pre><code>CREATE PROCEDURE dbo.TenProcedure
    @Param1 KieuDuLieu,
    @Param2 KieuDuLieu = GiaTriMacDinh,   -- optional param
    @OutputParam KieuDuLieu OUTPUT         -- output param
AS
BEGIN
    SET NOCOUNT ON;  -- ẩn thông báo "X rows affected"
    -- logic xử lý
    SELECT ...;
    SET @OutputParam = ...;
END;

-- Gọi procedure:
EXEC dbo.TenProcedure @Param1 = ..., @Param2 = ...;</code></pre>
              ${buildTheory({
                icon: "💡",
                title: "SET NOCOUNT ON — nên luôn đặt",
                body: "Tắt thông báo số dòng bị ảnh hưởng sau mỗi lệnh. Giúp giảm network traffic và tránh lỗi ở một số ORM/driver đọc kết quả."
              })}`
          }
        ]
      }
    ]
  },

  /* =====================================================
     PART 1 — SCALAR FUNCTION
  ===================================================== */
  {
    id: "scalar",
    title: "Part 1",
    subtitle: "Scalar Function",
    sidebarTitle: "Scalar Function",
    lessons: [
      {
        id: "scalar-theory",
        title: "Lý thuyết Scalar Function",
        label: "Part 1 · Scalar Function",
        blocks: [
          {
            heading: "Scalar Function là gì?",
            html: `
              <p>
                Scalar Function nhận vào 0 hoặc nhiều tham số và trả về
                <strong>đúng 1 giá trị đơn</strong> (số, chuỗi, ngày...).
                Có thể dùng trực tiếp trong <code>SELECT</code>, <code>WHERE</code>, <code>ORDER BY</code>.
              </p>
              <div class="use-case-grid">
                <div class="use-case-card">
                  <div class="use-case-icon">🔢</div>
                  <div class="use-case-title">Tính toán số học</div>
                  <div class="use-case-desc">Tính tiền thuế, discount, margin</div>
                </div>
                <div class="use-case-card">
                  <div class="use-case-icon">📅</div>
                  <div class="use-case-title">Xử lý ngày tháng</div>
                  <div class="use-case-desc">Format ngày, tính số ngày, quý / tháng</div>
                </div>
                <div class="use-case-card">
                  <div class="use-case-icon">🏷</div>
                  <div class="use-case-title">Phân loại / Label</div>
                  <div class="use-case-desc">Xếp nhóm theo giá trị, trả về nhãn</div>
                </div>
                <div class="use-case-card">
                  <div class="use-case-icon">📝</div>
                  <div class="use-case-title">Format chuỗi</div>
                  <div class="use-case-desc">Ghép tên, format mã khách hàng</div>
                </div>
              </div>`
          }
        ]
      },

      {
        id: "scalar-ex1",
        title: "Bài tập 1 — Format & Tính toán",
        label: "Part 1 · Scalar Function",
        blocks: [
          {
            heading: "F1 — Format tiền VND",
            html: buildExercise({
              tag: "Scalar Function",
              task: "Tạo function format số tiền thành chuỗi VND có dấu phân cách hàng nghìn.",
              thinking: [
                "Dùng FORMAT() của SQL Server để format số",
                "Thêm chữ 'VND' ở cuối",
                "Trả về VARCHAR"
              ],
              sql: `CREATE FUNCTION dbo.fn_FormatVND (@Amount DECIMAL(18,2))
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
    dbo.fn_FormatVND(unit_price) AS price_formatted
FROM products
ORDER BY unit_price DESC;`,
              result: `
                <table>
                  <thead><tr><th>product_name</th><th>unit_price</th><th>price_formatted</th></tr></thead>
                  <tbody>
                    <tr><td>Laptop Pro 15</td><td>25000000</td><td>25.000.000 VND</td></tr>
                    <tr><td>Mechanical Keyboard</td><td>1500000</td><td>1.500.000 VND</td></tr>
                    <tr><td>Air Fryer 5L</td><td>1200000</td><td>1.200.000 VND</td></tr>
                    <tr><td>Running Shoes</td><td>950000</td><td>950.000 VND</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "F2 — Tính discount theo giá trị đơn hàng",
            html: buildExercise({
              tag: "Scalar Function",
              task: "Tạo function tính % discount dựa trên tổng giá trị đơn hàng. >= 5M: 10%, >= 1M: 5%, còn lại: 0%.",
              thinking: [
                "Dùng IF/ELSE hoặc CASE bên trong function",
                "Input: tổng giá trị đơn (@OrderTotal DECIMAL)",
                "Output: DECIMAL — tỉ lệ discount"
              ],
              sql: `CREATE FUNCTION dbo.fn_GetDiscountRate (@OrderTotal DECIMAL(18,2))
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
ORDER BY order_total DESC;`,
              result: `
                <table>
                  <thead><tr><th>order_id</th><th>order_total</th><th>discount_rate</th><th>discount_amount</th></tr></thead>
                  <tbody>
                    <tr><td>1001</td><td>25,900,000</td><td>0.10</td><td>2,590,000</td></tr>
                    <tr><td>1011</td><td>2,850,000</td><td>0.05</td><td>142,500</td></tr>
                    <tr><td>1004</td><td>2,390,000</td><td>0.05</td><td>119,500</td></tr>
                    <tr><td>1010</td><td>1,980,000</td><td>0.05</td><td>99,000</td></tr>
                    <tr><td>1003</td><td>1,820,000</td><td>0.05</td><td>91,000</td></tr>
                    <tr><td>1006</td><td>780,000</td><td>0.00</td><td>0</td></tr>
                  </tbody>
                </table>`,
              note: `<div class="callout">Lưu ý: Scalar function bị gọi mỗi lần trên mỗi dòng — với bảng lớn có thể ảnh hưởng hiệu năng. Nên tính toán trong CTE trước, sau đó gọi function trên kết quả đã tổng hợp.</div>`
            })
          },
          {
            heading: "F3 — Phân loại khách hàng theo chi tiêu",
            html: buildExercise({
              tag: "Scalar Function",
              task: "Tạo function phân khúc khách hàng theo tổng chi tiêu: VIP (>= 10M), Gold (>= 2M), Silver (>= 500K), Bronze.",
              sql: `CREATE FUNCTION dbo.fn_CustomerSegment (@TotalSpent DECIMAL(18,2))
RETURNS VARCHAR(20)
AS
BEGIN
    RETURN CASE
        WHEN @TotalSpent >= 10000000 THEN 'VIP'
        WHEN @TotalSpent >= 2000000  THEN 'Gold'
        WHEN @TotalSpent >= 500000   THEN 'Silver'
        ELSE 'Bronze'
    END;
END;
GO

-- Sử dụng:
WITH customer_spent AS (
    SELECT
        c.customer_id,
        c.full_name,
        SUM(oi.quantity * oi.unit_price) AS total_spent
    FROM customers c
    JOIN orders o      ON c.customer_id = o.customer_id
    JOIN order_items oi ON o.order_id   = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY c.customer_id, c.full_name
)
SELECT
    full_name,
    total_spent,
    dbo.fn_CustomerSegment(total_spent) AS segment
FROM customer_spent
ORDER BY total_spent DESC;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>total_spent</th><th>segment</th></tr></thead>
                  <tbody>
                    <tr><td>Alice Nguyen</td><td>31,140,000</td><td>VIP</td></tr>
                    <tr><td>Hung Ly</td><td>1,980,000</td><td>Silver</td></tr>
                    <tr><td>Carol Le</td><td>1,820,000</td><td>Silver</td></tr>
                    <tr><td>Bob Tran</td><td>1,570,000</td><td>Silver</td></tr>
                    <tr><td>Eva Do</td><td>780,000</td><td>Silver</td></tr>
                    <tr><td>Frank Vo</td><td>530,000</td><td>Silver</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "F4 — Tính số ngày hoạt động của nhân viên",
            html: buildExercise({
              tag: "Scalar Function",
              task: "Tạo function tính số ngày làm việc từ ngày tuyển dụng đến hôm nay.",
              sql: `CREATE FUNCTION dbo.fn_Tenuredays (@HireDate DATE)
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
ORDER BY hire_date;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>role</th><th>hire_date</th><th>days_worked</th><th>years_approx</th></tr></thead>
                  <tbody>
                    <tr><td>Nguyen Van An</td><td>Sales Manager</td><td>2018-03-01</td><td>~2655</td><td>7</td></tr>
                    <tr><td>Tran Thi Bich</td><td>Sales Rep</td><td>2020-06-15</td><td>~1816</td><td>4</td></tr>
                    <tr><td>Le Minh Cuong</td><td>Sales Rep</td><td>2021-01-10</td><td>~1606</td><td>4</td></tr>
                    <tr><td>Pham Thu Hoa</td><td>Sales Rep</td><td>2022-09-01</td><td>~1002</td><td>2</td></tr>
                    <tr><td>Do Quoc Dat</td><td>Intern</td><td>2024-02-01</td><td>~490</td><td>1</td></tr>
                  </tbody>
                </table>`,
              note: `<div class="note">Kết quả days_worked thay đổi theo ngày chạy query vì dùng GETDATE().</div>`
            })
          }
        ]
      }
    ]
  },

  /* =====================================================
     PART 2 — TABLE-VALUED FUNCTION
  ===================================================== */
  {
    id: "tvf",
    title: "Part 2",
    subtitle: "Table-valued Function",
    sidebarTitle: "Table-valued Function",
    lessons: [
      {
        id: "tvf-theory",
        title: "Lý thuyết TVF",
        label: "Part 2 · Table-valued Function",
        blocks: [
          {
            heading: "Table-valued Function là gì?",
            html: `
              <p>
                TVF trả về một <strong>bảng dữ liệu</strong> thay vì 1 giá trị đơn.
                Có thể dùng trong <code>FROM</code> như một bảng bình thường,
                và có thể <code>JOIN</code> với các bảng khác.
              </p>
              ${buildCompare([
                ["", "Inline TVF", "Multi-statement TVF"],
                ["Cú pháp RETURNS", "<code>RETURNS TABLE</code>", "<code>RETURNS @t TABLE (...)</code>"],
                ["Nội dung", "1 SELECT duy nhất", "Nhiều lệnh, INSERT vào @t"],
                ["Hiệu năng", "Tốt — optimizer có thể inline", "Kém hơn — blackbox"],
                ["Khi nào dùng", "Phần lớn trường hợp", "Khi cần logic phức tạp, nhiều bước"]
              ])}
              ${buildTheory({
                icon: "✅",
                title: "Best practice",
                body: "Luôn ưu tiên Inline TVF. Chỉ dùng Multi-statement TVF khi logic không thể viết trong 1 SELECT (ví dụ: cần vòng lặp, điều kiện phức tạp)."
              })}`
          }
        ]
      },

      {
        id: "tvf-ex",
        title: "Bài tập TVF",
        label: "Part 2 · Table-valued Function",
        blocks: [
          {
            heading: "F5 — Lấy đơn hàng của khách hàng theo khoảng thời gian",
            html: buildExercise({
              tag: "Table Function",
              task: "Tạo inline TVF lấy tất cả đơn hàng của 1 khách hàng trong khoảng thời gian, kèm tổng tiền mỗi đơn.",
              thinking: [
                "Input: @CustomerID INT, @FromDate DATE, @ToDate DATE",
                "Inline TVF: RETURNS TABLE AS RETURN (SELECT ...)",
                "JOIN orders, order_items, GROUP BY order"
              ],
              sql: `CREATE FUNCTION dbo.fn_GetCustomerOrders (
    @CustomerID INT,
    @FromDate   DATE,
    @ToDate     DATE
)
RETURNS TABLE
AS
RETURN (
    SELECT
        o.order_id,
        o.order_date,
        o.status,
        SUM(oi.quantity * oi.unit_price) AS order_total,
        COUNT(oi.item_id)                AS item_count
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.customer_id = @CustomerID
      AND o.order_date BETWEEN @FromDate AND @ToDate
    GROUP BY o.order_id, o.order_date, o.status
);
GO

-- Sử dụng cho Alice Nguyen (customer_id = 1):
SELECT * FROM dbo.fn_GetCustomerOrders(1, '2023-01-01', '2024-12-31')
ORDER BY order_date;

-- JOIN với bảng khác:
SELECT
    c.full_name,
    f.order_id,
    f.order_date,
    f.order_total,
    f.status
FROM customers c
CROSS APPLY dbo.fn_GetCustomerOrders(c.customer_id, '2023-01-01', '2024-12-31') f
ORDER BY c.full_name, f.order_date;`,
              result: `
                <table>
                  <thead><tr><th>order_id</th><th>order_date</th><th>status</th><th>order_total</th><th>item_count</th></tr></thead>
                  <tbody>
                    <tr><td>1001</td><td>2023-01-15</td><td>completed</td><td>25,900,000</td><td>2</td></tr>
                    <tr><td>1004</td><td>2023-05-10</td><td>completed</td><td>2,390,000</td><td>2</td></tr>
                    <tr><td>1011</td><td>2024-03-15</td><td>completed</td><td>2,850,000</td><td>2</td></tr>
                  </tbody>
                </table>`,
              note: `<div class="callout"><b>CROSS APPLY</b>: Dùng để gọi TVF cho mỗi dòng của bảng ngoài — tương tự INNER JOIN nhưng truyền tham số từ từng dòng. <b>OUTER APPLY</b>: giữ lại cả dòng không có kết quả (tương tự LEFT JOIN).</div>`
            })
          },
          {
            heading: "F6 — Lấy top N sản phẩm bán chạy nhất trong category",
            html: buildExercise({
              tag: "Table Function",
              task: "Tạo TVF lấy top N sản phẩm bán chạy nhất của 1 category cụ thể (chỉ completed orders).",
              thinking: [
                "Input: @CategoryID INT, @TopN INT",
                "JOIN products → order_items → orders",
                "Dùng TOP(@TopN) với ORDER BY total_qty DESC"
              ],
              sql: `CREATE FUNCTION dbo.fn_TopProductsByCategory (
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
ORDER BY cat.category_name, f.total_qty_sold DESC;`,
              result: `
                <table>
                  <thead><tr><th>product_name</th><th>total_qty_sold</th><th>total_revenue</th></tr></thead>
                  <tbody>
                    <tr><td>Wireless Mouse</td><td>6</td><td>2,700,000</td></tr>
                    <tr><td>Mechanical Keyboard</td><td>2</td><td>3,000,000</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "F7 — Báo cáo doanh thu theo region trong tháng",
            html: buildExercise({
              tag: "Table Function",
              task: "Tạo TVF trả về báo cáo doanh thu theo region cho 1 tháng cụ thể (year + month).",
              sql: `CREATE FUNCTION dbo.fn_RevenueByRegion (
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
ORDER BY total_revenue DESC;`,
              result: `
                <table>
                  <thead><tr><th>region_name</th><th>total_orders</th><th>unique_customers</th><th>total_revenue</th></tr></thead>
                  <tbody>
                    <tr><td>North</td><td>1</td><td>1</td><td>25,900,000</td></tr>
                  </tbody>
                </table>`
            })
          }
        ]
      }
    ]
  },

  /* =====================================================
     PART 3 — STORED PROCEDURE CƠ BẢN
  ===================================================== */
  {
    id: "sp-basic",
    title: "Part 3",
    subtitle: "Stored Procedure — Cơ bản",
    sidebarTitle: "SP — Cơ bản",
    lessons: [
      {
        id: "sp-theory",
        title: "Lý thuyết Stored Procedure",
        label: "Part 3 · Stored Procedure",
        blocks: [
          {
            heading: "Stored Procedure là gì?",
            html: `
              <p>
                Stored Procedure (SP) là một khối lệnh SQL được lưu trên server với tên cụ thể.
                Khác với Function, SP có thể thực hiện mọi lệnh SQL bao gồm:
                <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>,
                <code>BEGIN TRANSACTION</code>, <code>RAISERROR</code>...
              </p>
              <div class="use-case-grid">
                <div class="use-case-card">
                  <div class="use-case-icon">📥</div>
                  <div class="use-case-title">CRUD nghiệp vụ</div>
                  <div class="use-case-desc">Thêm, sửa, xóa dữ liệu theo quy trình</div>
                </div>
                <div class="use-case-card">
                  <div class="use-case-icon">📊</div>
                  <div class="use-case-title">Báo cáo động</div>
                  <div class="use-case-desc">Báo cáo nhận tham số lọc từ người dùng</div>
                </div>
                <div class="use-case-card">
                  <div class="use-case-icon">🔄</div>
                  <div class="use-case-title">ETL / Xử lý hàng loạt</div>
                  <div class="use-case-desc">Xử lý dữ liệu theo lô, lịch trình</div>
                </div>
                <div class="use-case-card">
                  <div class="use-case-icon">🛡</div>
                  <div class="use-case-title">Bảo mật</div>
                  <div class="use-case-desc">Cấp quyền EXEC thay vì quyền table trực tiếp</div>
                </div>
              </div>
              ${buildTheory({
                icon: "⚠",
                title: "SP vs Function — khi nào chọn cái nào?",
                body: `
                  <ul>
                    <li>Cần <b>đọc dữ liệu</b> để dùng trong SELECT → dùng <b>Function</b></li>
                    <li>Cần <b>thay đổi dữ liệu</b> (INSERT/UPDATE/DELETE) → dùng <b>SP</b></li>
                    <li>Cần <b>nhiều bước xử lý phức tạp</b> với transaction → dùng <b>SP</b></li>
                    <li>Cần <b>trả về nhiều result set</b> → dùng <b>SP</b></li>
                  </ul>`
              })}`
          }
        ]
      },

      {
        id: "sp-ex-basic",
        title: "Bài tập SP — Cơ bản",
        label: "Part 3 · Stored Procedure",
        blocks: [
          {
            heading: "SP1 — Báo cáo doanh thu có lọc tham số",
            html: buildExercise({
              tag: "Stored Procedure",
              task: "Tạo SP báo cáo doanh thu: lọc theo region (optional), khoảng thời gian, và status. Nếu không truyền region thì lấy tất cả.",
              thinking: [
                "@RegionID INT = NULL → NULL = lấy tất cả region",
                "Dùng (c.region_id = @RegionID OR @RegionID IS NULL)",
                "SET NOCOUNT ON ở đầu"
              ],
              sql: `CREATE PROCEDURE dbo.sp_RevenueReport
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
    @RegionID = 1;`,
              result: `
                <table>
                  <thead><tr><th>region_name</th><th>total_orders</th><th>unique_customers</th><th>total_revenue</th></tr></thead>
                  <tbody>
                    <tr><td>North</td><td>4</td><td>2</td><td>32,570,000</td></tr>
                    <tr><td>Central</td><td>2</td><td>2</td><td>2,360,000</td></tr>
                    <tr><td>South</td><td>3</td><td>2</td><td>2,160,000</td></tr>
                    <tr><td>Overseas</td><td>1</td><td>1</td><td>780,000</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "SP2 — Thêm đơn hàng mới (với validation)",
            html: buildExercise({
              tag: "Stored Procedure",
              task: "Tạo SP thêm đơn hàng mới. Kiểm tra: customer_id phải tồn tại, employee_id phải tồn tại. Trả về order_id vừa tạo qua OUTPUT param.",
              thinking: [
                "Kiểm tra tồn tại trước khi INSERT — RAISERROR nếu sai",
                "@NewOrderID INT OUTPUT — trả về ID vừa insert",
                "Dùng SCOPE_IDENTITY() lấy ID vừa insert"
              ],
              sql: `CREATE PROCEDURE dbo.sp_CreateOrder
    @CustomerID  INT,
    @EmployeeID  INT,
    @OrderDate   DATE        = NULL,
    @Status      VARCHAR(20) = 'pending',
    @NewOrderID  INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Lấy ngày hôm nay nếu không truyền
    SET @OrderDate = ISNULL(@OrderDate, CAST(GETDATE() AS DATE));

    -- Validation: customer phải tồn tại
    IF NOT EXISTS (SELECT 1 FROM customers WHERE customer_id = @CustomerID)
    BEGIN
        RAISERROR('CustomerID %d không tồn tại.', 16, 1, @CustomerID);
        RETURN;
    END;

    -- Validation: employee phải tồn tại
    IF NOT EXISTS (SELECT 1 FROM employees WHERE employee_id = @EmployeeID)
    BEGIN
        RAISERROR('EmployeeID %d không tồn tại.', 16, 1, @EmployeeID);
        RETURN;
    END;

    -- Validation: status hợp lệ
    IF @Status NOT IN ('pending', 'completed', 'cancelled')
    BEGIN
        RAISERROR('Status "%s" không hợp lệ.', 16, 1, @Status);
        RETURN;
    END;

    INSERT INTO orders (customer_id, employee_id, order_date, status)
    VALUES (@CustomerID, @EmployeeID, @OrderDate, @Status);

    SET @NewOrderID = SCOPE_IDENTITY();
END;
GO

-- Gọi SP:
DECLARE @NewID INT;
EXEC dbo.sp_CreateOrder
    @CustomerID = 1,
    @EmployeeID = 2,
    @NewOrderID = @NewID OUTPUT;

SELECT @NewID AS new_order_id;
SELECT * FROM orders WHERE order_id = @NewID;`,
              result: `
                <table>
                  <thead><tr><th>new_order_id</th></tr></thead>
                  <tbody><tr><td>1013</td></tr></tbody>
                </table>
                <div class="result-note">Đơn hàng mới được tạo với order_id = 1013, status = 'pending'.</div>`
            })
          },
          {
            heading: "SP3 — Cập nhật status đơn hàng",
            html: buildExercise({
              tag: "Stored Procedure",
              task: "Tạo SP cập nhật status đơn hàng. Chỉ cho phép chuyển: pending → completed hoặc pending → cancelled. Không cho phép sửa đơn đã completed/cancelled.",
              thinking: [
                "Kiểm tra đơn hàng tồn tại",
                "Kiểm tra trạng thái hiện tại trước khi đổi",
                "Chỉ từ 'pending' mới được chuyển → dùng CASE logic validation"
              ],
              sql: `CREATE PROCEDURE dbo.sp_UpdateOrderStatus
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
    @UpdatedBy = 3;`,
              result: `
                <table>
                  <thead><tr><th>order_id</th><th>new_status</th><th>updated_by</th><th>updated_at</th></tr></thead>
                  <tbody>
                    <tr><td>1009</td><td>completed</td><td>Le Minh Cuong</td><td>2026-06-07 ...</td></tr>
                  </tbody>
                </table>`
            })
          }
        ]
      }
    ]
  },

  /* =====================================================
     PART 4 — STORED PROCEDURE NÂNG CAO
  ===================================================== */
  {
    id: "sp-advanced",
    title: "Part 4",
    subtitle: "Stored Procedure — Nâng cao",
    sidebarTitle: "SP — Nâng cao",
    lessons: [
      {
        id: "sp-ex-adv",
        title: "SP với Transaction & Error Handling",
        label: "Part 4 · SP Nâng cao",
        blocks: [
          {
            heading: "SP4 — Đặt hàng với nhiều sản phẩm (Transaction)",
            html: buildExercise({
              tag: "Advanced",
              task: "Tạo SP đặt đơn hàng kèm nhiều sản phẩm trong 1 transaction. Nếu bất kỳ bước nào lỗi, ROLLBACK toàn bộ. Kiểm tra stock trước khi đặt.",
              thinking: [
                "Dùng TABLE-VALUED PARAMETER hoặc truyền JSON danh sách sản phẩm",
                "BEGIN TRANSACTION → INSERT orders → INSERT order_items → COMMIT",
                "TRY...CATCH → ROLLBACK nếu lỗi",
                "Kiểm tra stock_qty đủ không trước khi INSERT"
              ],
              sql: `-- Bước 1: Tạo table type cho danh sách sản phẩm
CREATE TYPE dbo.OrderItemList AS TABLE (
    product_id INT          NOT NULL,
    quantity   INT          NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
);
GO

-- Bước 2: Tạo SP
CREATE PROCEDURE dbo.sp_PlaceOrder
    @CustomerID INT,
    @EmployeeID INT,
    @Items      dbo.OrderItemList READONLY,  -- table-valued param
    @NewOrderID INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Kiểm tra stock đủ
        IF EXISTS (
            SELECT 1
            FROM @Items i
            JOIN products p ON i.product_id = p.product_id
            WHERE p.stock_qty < i.quantity
        )
        BEGIN
            RAISERROR('Một số sản phẩm không đủ stock.', 16, 1);
        END;

        -- Insert đơn hàng
        INSERT INTO orders (customer_id, employee_id, order_date, status)
        VALUES (@CustomerID, @EmployeeID, GETDATE(), 'pending');

        SET @NewOrderID = SCOPE_IDENTITY();

        -- Insert từng sản phẩm
        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
        SELECT @NewOrderID, product_id, quantity, unit_price
        FROM @Items;

        -- Trừ stock
        UPDATE p
        SET p.stock_qty = p.stock_qty - i.quantity
        FROM products p
        JOIN @Items i ON p.product_id = i.product_id;

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrMsg NVARCHAR(500) = ERROR_MESSAGE();
        RAISERROR(@ErrMsg, 16, 1);
    END CATCH;
END;
GO

-- Sử dụng: đặt hàng với 2 sản phẩm
DECLARE @MyItems dbo.OrderItemList;
INSERT INTO @MyItems VALUES
    (2, 2, 450000),   -- Wireless Mouse x2
    (6, 1, 220000);   -- SQL for Beginners x1

DECLARE @NewID INT;
EXEC dbo.sp_PlaceOrder
    @CustomerID = 5,
    @EmployeeID = 3,
    @Items      = @MyItems,
    @NewOrderID = @NewID OUTPUT;

SELECT @NewID AS new_order_id;`,
              note: `<div class="callout"><b>Table-valued Parameter (TVP)</b> cho phép truyền cả một bảng dữ liệu vào SP — hiệu quả hơn việc gọi SP nhiều lần. Kiểu phải được tạo trước bằng <code>CREATE TYPE</code>.</div>`
            })
          },
          {
            heading: "SP5 — Báo cáo hiệu suất nhân viên (OUTPUT params)",
            html: buildExercise({
              tag: "Advanced",
              task: "Tạo SP tính hiệu suất của 1 nhân viên: tổng đơn, tổng doanh thu, tỉ lệ hoàn thành. Trả về qua OUTPUT params và in kết quả chi tiết.",
              sql: `CREATE PROCEDURE dbo.sp_EmployeePerformance
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
    @Rate    AS completion_rate_pct;`,
              result: `
                <table>
                  <thead><tr><th>total_orders</th><th>total_revenue</th><th>completion_rate_pct</th></tr></thead>
                  <tbody>
                    <tr><td>5</td><td>32,570,000</td><td>100.00</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "SP6 — Tính RFM và cập nhật phân khúc (batch update)",
            html: buildExercise({
              tag: "Advanced",
              task: "Tạo SP tính RFM score và cập nhật cột segment trên bảng customers (giả sử đã có cột segment VARCHAR(20)).",
              thinking: [
                "Tính rfm_raw trong CTE: recency, frequency, monetary",
                "Dùng NTILE(3) cho từng chiều",
                "UPDATE customers SET segment = CASE ... dựa trên RFM score"
              ],
              sql: `-- Giả sử đã thêm cột segment vào customers:
-- ALTER TABLE customers ADD segment VARCHAR(20) NULL;

CREATE PROCEDURE dbo.sp_UpdateCustomerSegments
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        WITH rfm_raw AS (
            SELECT
                c.customer_id,
                DATEDIFF(DAY, MAX(o.order_date), GETDATE()) AS recency_days,
                COUNT(DISTINCT o.order_id)                  AS frequency,
                SUM(oi.quantity * oi.unit_price)            AS monetary
            FROM customers c
            JOIN orders o       ON c.customer_id = o.customer_id
            JOIN order_items oi ON o.order_id    = oi.order_id
            WHERE o.status = 'completed'
            GROUP BY c.customer_id
        ),
        rfm_scored AS (
            SELECT *,
                NTILE(3) OVER (ORDER BY recency_days ASC)  AS r_score,
                NTILE(3) OVER (ORDER BY frequency DESC)    AS f_score,
                NTILE(3) OVER (ORDER BY monetary DESC)     AS m_score
            FROM rfm_raw
        )
        UPDATE c
        SET c.segment = CASE
            WHEN s.r_score = 3 AND s.f_score = 3 AND s.m_score = 3 THEN 'VIP'
            WHEN s.r_score >= 2 AND s.f_score >= 2                  THEN 'Loyal'
            WHEN s.r_score = 1                                       THEN 'At Risk'
            ELSE 'Potential'
        END
        FROM customers c
        JOIN rfm_scored s ON c.customer_id = s.customer_id;

        COMMIT TRANSACTION;

        -- Báo cáo sau cập nhật
        SELECT segment, COUNT(*) AS customer_count
        FROM customers
        WHERE segment IS NOT NULL
        GROUP BY segment
        ORDER BY customer_count DESC;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

EXEC dbo.sp_UpdateCustomerSegments;`,
              result: `
                <table>
                  <thead><tr><th>segment</th><th>customer_count</th></tr></thead>
                  <tbody>
                    <tr><td>Loyal</td><td>2</td></tr>
                    <tr><td>Potential</td><td>2</td></tr>
                    <tr><td>At Risk</td><td>2</td></tr>
                    <tr><td>VIP</td><td>0</td></tr>
                  </tbody>
                </table>`,
              note: `<div class="note">THROW (SQL Server 2012+) re-raise lỗi gốc kèm đầy đủ thông tin. Tốt hơn RAISERROR trong CATCH block.</div>`
            })
          }
        ]
      }
    ]
  },

  /* =====================================================
     PART 5 — BÀI TẬP TỔNG HỢP
  ===================================================== */
  {
    id: "exercises",
    title: "Part 5",
    subtitle: "Bài tập tổng hợp",
    sidebarTitle: "Bài tập",
    lessons: [
      {
        id: "ex-mix",
        title: "Bài tập kết hợp",
        label: "Part 5 · Bài tập tổng hợp",
        blocks: [
          {
            heading: "BT1 — Xây dựng bộ công cụ báo cáo hoàn chỉnh",
            html: buildExercise({
              tag: "Tổng hợp",
              task: "Viết 1 SP báo cáo doanh thu sử dụng scalar function dbo.fn_FormatVND và dbo.fn_CustomerSegment đã tạo ở Part 1. Kết quả hiển thị số tiền đã format và phân khúc khách hàng.",
              thinking: [
                "Gọi hàm fn_FormatVND() để format cột total_spent",
                "Gọi hàm fn_CustomerSegment() để lấy segment",
                "SP nhận @FromDate, @ToDate, @MinSpent (lọc KH có chi tiêu tối thiểu)"
              ],
              sql: `CREATE PROCEDURE dbo.sp_CustomerSummaryReport
    @FromDate DATE = NULL,
    @ToDate   DATE = NULL,
    @MinSpent DECIMAL(18,2) = 0
AS
BEGIN
    SET NOCOUNT ON;

    SET @FromDate = ISNULL(@FromDate, '2020-01-01');
    SET @ToDate   = ISNULL(@ToDate, GETDATE());

    WITH customer_stats AS (
        SELECT
            c.customer_id,
            c.full_name,
            r.region_name,
            COUNT(DISTINCT o.order_id)           AS total_orders,
            SUM(oi.quantity * oi.unit_price)     AS total_spent,
            MAX(o.order_date)                    AS last_order_date,
            DATEDIFF(DAY, MAX(o.order_date), GETDATE()) AS days_since_last
        FROM customers c
        JOIN regions r      ON c.region_id    = r.region_id
        JOIN orders o       ON c.customer_id  = o.customer_id
        JOIN order_items oi ON o.order_id     = oi.order_id
        WHERE o.status = 'completed'
          AND o.order_date BETWEEN @FromDate AND @ToDate
        GROUP BY c.customer_id, c.full_name, r.region_name
    )
    SELECT
        full_name,
        region_name,
        total_orders,
        total_spent,
        dbo.fn_FormatVND(total_spent)           AS total_spent_fmt,
        dbo.fn_CustomerSegment(total_spent)     AS segment,
        last_order_date,
        days_since_last
    FROM customer_stats
    WHERE total_spent >= @MinSpent
    ORDER BY total_spent DESC;
END;
GO

-- Gọi: lấy KH có tổng chi tiêu >= 500,000
EXEC dbo.sp_CustomerSummaryReport
    @FromDate = '2023-01-01',
    @ToDate   = '2024-12-31',
    @MinSpent = 500000;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>region</th><th>total_orders</th><th>total_spent_fmt</th><th>segment</th><th>days_since_last</th></tr></thead>
                  <tbody>
                    <tr><td>Alice Nguyen</td><td>North</td><td>3</td><td>31.140.000 VND</td><td>VIP</td><td>~450</td></tr>
                    <tr><td>Hung Ly</td><td>North</td><td>1</td><td>1.980.000 VND</td><td>Silver</td><td>~470</td></tr>
                    <tr><td>Carol Le</td><td>Central</td><td>1</td><td>1.820.000 VND</td><td>Silver</td><td>~825</td></tr>
                    <tr><td>Bob Tran</td><td>South</td><td>2</td><td>1.570.000 VND</td><td>Silver</td><td>~630</td></tr>
                    <tr><td>Eva Do</td><td>South</td><td>1</td><td>780.000 VND</td><td>Silver</td><td>~430</td></tr>
                    <tr><td>Frank Vo</td><td>North</td><td>1</td><td>530.000 VND</td><td>Silver</td><td>~585</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "BT2 — Hệ thống kiểm tra stock và cảnh báo",
            html: buildExercise({
              tag: "Tổng hợp",
              task: "Viết SP kiểm tra stock toàn bộ sản phẩm, cảnh báo sản phẩm sắp hết hàng (< 20), và trả về summary qua OUTPUT param.",
              sql: `CREATE PROCEDURE dbo.sp_StockAlert
    @ThresholdQty   INT = 20,
    @LowStockCount  INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Sản phẩm sắp hết hàng
    SELECT
        p.product_id,
        p.product_name,
        cat.category_name,
        p.stock_qty,
        CASE
            WHEN p.stock_qty = 0  THEN 'OUT OF STOCK'
            WHEN p.stock_qty < @ThresholdQty THEN 'LOW STOCK'
            ELSE 'OK'
        END                                         AS stock_status,
        -- Ước tính số đơn có thể phục vụ thêm
        p.stock_qty                                 AS remaining_units
    FROM products p
    JOIN categories cat ON p.category_id = cat.category_id
    WHERE p.stock_qty < @ThresholdQty
    ORDER BY p.stock_qty ASC;

    -- OUTPUT: số sản phẩm cần cảnh báo
    SELECT @LowStockCount = COUNT(*)
    FROM products
    WHERE stock_qty < @ThresholdQty;
END;
GO

DECLARE @Count INT;
EXEC dbo.sp_StockAlert
    @ThresholdQty  = 20,
    @LowStockCount = @Count OUTPUT;

SELECT @Count AS products_needing_attention;`,
              result: `
                <table>
                  <thead><tr><th>product_name</th><th>category_name</th><th>stock_qty</th><th>stock_status</th></tr></thead>
                  <tbody>
                    <tr><td>Laptop Pro 15</td><td>Electronics</td><td>10</td><td>LOW STOCK</td></tr>
                    <tr><td>Mechanical Keyboard</td><td>Electronics</td><td>15</td><td>LOW STOCK</td></tr>
                  </tbody>
                </table>
                <div class="result-note">@Count OUTPUT = 2</div>`
            })
          },
          {
            heading: "BT3 — TVF + SP: Pipeline phân tích đơn hàng theo nhân viên",
            html: buildExercise({
              tag: "Tổng hợp",
              task: "Viết inline TVF lấy chi tiết đơn hàng của nhân viên + SP tổng hợp dùng TVF đó làm nguồn dữ liệu. Kết hợp cả 2 loại object trong 1 pipeline.",
              sql: `-- Bước 1: TVF lấy chi tiết đơn hàng của 1 nhân viên
CREATE FUNCTION dbo.fn_EmployeeOrders (
    @EmployeeID INT,
    @Status     VARCHAR(20) = NULL
)
RETURNS TABLE
AS
RETURN (
    SELECT
        o.order_id,
        o.order_date,
        o.status,
        c.full_name                              AS customer_name,
        r.region_name,
        SUM(oi.quantity * oi.unit_price)         AS order_total,
        COUNT(oi.item_id)                        AS item_count
    FROM orders o
    JOIN customers c    ON o.customer_id  = c.customer_id
    JOIN regions r      ON c.region_id    = r.region_id
    JOIN order_items oi ON o.order_id     = oi.order_id
    WHERE o.employee_id = @EmployeeID
      AND (o.status = @Status OR @Status IS NULL)
    GROUP BY o.order_id, o.order_date, o.status,
             c.full_name, r.region_name
);
GO

-- Bước 2: SP tổng hợp dùng TVF phía trên
CREATE PROCEDURE dbo.sp_TeamPerformanceDashboard
    @FromDate DATE = NULL,
    @ToDate   DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SET @FromDate = ISNULL(@FromDate, '2023-01-01');
    SET @ToDate   = ISNULL(@ToDate, GETDATE());

    -- Tổng hợp theo nhân viên, dùng CROSS APPLY + TVF
    SELECT
        e.full_name                              AS employee,
        e.role,
        m.full_name                              AS manager,
        COUNT(f.order_id)                        AS total_orders,
        SUM(CASE WHEN f.status='completed'
                 THEN 1 ELSE 0 END)              AS completed,
        SUM(CASE WHEN f.status='cancelled'
                 THEN 1 ELSE 0 END)              AS cancelled,
        ISNULL(SUM(CASE WHEN f.status='completed'
                        THEN f.order_total END), 0) AS revenue,
        dbo.fn_FormatVND(
            ISNULL(SUM(CASE WHEN f.status='completed'
                            THEN f.order_total END), 0)
        )                                        AS revenue_fmt
    FROM employees e
    LEFT JOIN employees m ON e.manager_id = m.employee_id
    OUTER APPLY dbo.fn_EmployeeOrders(e.employee_id, NULL) f
    WHERE f.order_date BETWEEN @FromDate AND @ToDate
       OR f.order_date IS NULL
    GROUP BY e.employee_id, e.full_name, e.role, m.full_name
    ORDER BY revenue DESC;
END;
GO

EXEC dbo.sp_TeamPerformanceDashboard
    @FromDate = '2023-01-01',
    @ToDate   = '2024-12-31';`,
              result: `
                <table>
                  <thead><tr><th>employee</th><th>role</th><th>total_orders</th><th>completed</th><th>cancelled</th><th>revenue_fmt</th></tr></thead>
                  <tbody>
                    <tr><td>Tran Thi Bich</td><td>Sales Rep</td><td>5</td><td>5</td><td>0</td><td>32.570.000 VND</td></tr>
                    <tr><td>Pham Thu Hoa</td><td>Sales Rep</td><td>3</td><td>2</td><td>1</td><td>3.980.000 VND</td></tr>
                    <tr><td>Le Minh Cuong</td><td>Sales Rep</td><td>4</td><td>2</td><td>0</td><td>2.600.000 VND</td></tr>
                  </tbody>
                </table>`,
              note: `<div class="callout">Đây là ví dụ kết hợp: <b>Scalar Function</b> (fn_FormatVND) + <b>TVF</b> (fn_EmployeeOrders) + <b>SP</b> (sp_TeamPerformanceDashboard). Mỗi object có một nhiệm vụ rõ ràng và có thể tái sử dụng độc lập.</div>`
            })
          }
        ]
      }
    ]
  }
];


/* =========================================================
   STATE & INIT
========================================================= */

let currentPartIndex  = 0;
let currentLessonIndex = 0;
let currentSearchKeyword = "";
let isInitialized = false;

let sidebarTitle, sidebarList, lessonLabel, lessonTitle, lessonContent, prevBtn, nextBtn;

window.addEventListener("common-loaded", initFuncProc);

window.addEventListener("global-search", e => {
  currentSearchKeyword = e.detail?.keyword || "";
  applySearch(currentSearchKeyword);
});

function initFuncProc(event) {
  if (isInitialized) return;

  currentPartIndex   = normalizeIdx(event?.detail?.currentPartIndex, funcProcParts.length);
  currentLessonIndex = getLessonIdxFromUrl(currentPartIndex);

  sidebarTitle  = document.getElementById("sidebarTitle");
  sidebarList   = document.getElementById("sidebarList");
  lessonLabel   = document.getElementById("lessonLabel");
  lessonTitle   = document.getElementById("lessonTitle");
  lessonContent = document.getElementById("lessonContent");
  prevBtn       = document.getElementById("prevBtn");
  nextBtn       = document.getElementById("nextBtn");

  if ([sidebarTitle, sidebarList, lessonLabel, lessonTitle, lessonContent, prevBtn, nextBtn].some(el => !el)) return;

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);
  isInitialized = true;

  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll();
}

/* =========================================================
   RENDER
========================================================= */

function renderSidebar() {
  const part = funcProcParts[currentPartIndex];
  sidebarTitle.textContent = part.sidebarTitle;
  sidebarList.innerHTML = `
    <div class="sidebar-section-label">${part.title}</div>
    ${part.lessons.map((l, i) => `
      <a class="sidebar-link ${i === currentLessonIndex ? "active" : ""}" data-i="${i}">${l.title}</a>
    `).join("")}`;
  sidebarList.querySelectorAll(".sidebar-link").forEach(a => {
    a.addEventListener("click", () => {
      currentLessonIndex = Number(a.dataset.i);
      renderAll(); scrollContentTop();
    });
  });
}

function renderLesson() {
  exerciseCounter = 0;
  const part   = funcProcParts[currentPartIndex];
  const lesson = part.lessons[currentLessonIndex];
  lessonLabel.textContent = lesson.label;
  lessonTitle.textContent = lesson.title;
  lessonContent.innerHTML = lesson.blocks.map(b => `
    <section class="lesson-block"><h2>${b.heading}</h2>${b.html}</section>
  `).join("");
  // Prev button
  prevBtn.disabled = currentPartIndex === 0 && currentLessonIndex === 0;

  // Next button: cuoi lesson cua part → doi text + van active neu con part tiep theo
  const isLastLessonInPart = currentLessonIndex === part.lessons.length - 1;
  const isLastPart         = currentPartIndex === funcProcParts.length - 1;

  if (isLastLessonInPart && !isLastPart) {
    const nextPart = funcProcParts[currentPartIndex + 1];
    nextBtn.textContent = `${nextPart.title}: ${nextPart.subtitle} →`;
    nextBtn.classList.add("btn--next-part");
    nextBtn.disabled = false;
  } else {
    nextBtn.textContent = "Next →";
    nextBtn.classList.remove("btn--next-part");
    nextBtn.disabled = isLastLessonInPart && isLastPart;
  }
}

function renderAll() {
  renderSidebar();
  renderLesson();
  applySearch(currentSearchKeyword);
}

/* =========================================================
   NAVIGATION
========================================================= */

function goPrev() {
  if (currentLessonIndex > 0) {
    currentLessonIndex--;
  } else if (currentPartIndex > 0) {
    currentPartIndex--;
    currentLessonIndex = funcProcParts[currentPartIndex].lessons.length - 1;
  }
  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll(); scrollContentTop();
}

function goNext() {
  const part = funcProcParts[currentPartIndex];
  if (currentLessonIndex < part.lessons.length - 1) {
    currentLessonIndex++;
  } else if (currentPartIndex < funcProcParts.length - 1) {
    currentPartIndex++;
    currentLessonIndex = 0;
  }
  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll(); scrollContentTop();
}

/* =========================================================
   SEARCH
========================================================= */

function applySearch(kw) {
  const q = String(kw || "").trim().toLowerCase();
  document.querySelectorAll(".lesson-block").forEach(b => {
    b.style.display = !q || b.textContent.toLowerCase().includes(q) ? "" : "none";
  });
  const old = lessonContent.querySelector(".search-empty-state");
  if (old) old.remove();
  if (q && !Array.from(lessonContent.querySelectorAll(".lesson-block")).some(b => b.style.display !== "none")) {
    lessonContent.insertAdjacentHTML("beforeend", `<div class="search-empty-state">Không tìm thấy nội dung phù hợp.</div>`);
  }
}

/* =========================================================
   URL / STATE
========================================================= */

function getLessonIdxFromUrl(partIdx) {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("lesson");
  if (!raw) return 0;
  const byNum = Number(raw);
  if (Number.isInteger(byNum)) return normalizeLessonIdx(partIdx, byNum);
  const found = funcProcParts[partIdx].lessons.findIndex(l => l.id === raw);
  return found < 0 ? 0 : found;
}

function normalizeIdx(v, total) {
  const i = Number(v);
  return (Number.isInteger(i) && i >= 0 && i < total) ? i : 0;
}

function normalizeLessonIdx(partIdx, i) {
  const part = funcProcParts[partIdx];
  return (part && Number.isInteger(i) && i >= 0 && i < part.lessons.length) ? i : 0;
}

function syncUrlState(partIdx, lessonIdx) {
  const part   = funcProcParts[partIdx];
  const lesson = part?.lessons?.[lessonIdx];
  if (!lesson) return;
  const url = new URL(window.location.href);
  url.searchParams.set("part",   String(partIdx));
  url.searchParams.set("lesson", lesson.id);
  window.history.replaceState({}, "", url.toString());
  window.dispatchEvent(new CustomEvent("part-changed"));
}

function scrollContentTop() {
  document.querySelector(".content-body")?.scrollTo({ top: 0, behavior: "smooth" });
  window.scrollTo({ top: 0, behavior: "smooth" });
}