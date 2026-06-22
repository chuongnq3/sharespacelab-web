/* =========================================================
   PRACTICE B1 DATA
   Structure:
   Phần 0: Dataset & ERD
   Phần 1: Basic   (Query B1)
   Phần 2: Intermediate (Query B1_1)
   Phần 3: Advanced (Query B1_2)
   Phần 4: Expert   (Query B1_3)
========================================================= */

/* =========================================================
   HELPER: build exercise block HTML
   Must be declared BEFORE practiceParts so template literals
   inside the array can call buildExercise() at parse time.
========================================================= */

let exerciseCounter = 0;

function buildExercise({ level, task, thinking, sql, result }) {
  const id = `ex-${++exerciseCounter}`;

  const thinkingHtml = thinking
    ? `<div class="ex-thinking">
        <div class="ex-thinking-label">Tư duy trước khi viết</div>
        ${thinking.map(t => `<div class="ex-think-item">→ ${t}</div>`).join("")}
       </div>`
    : "";

  const levelClass = {
    Basic: "badge--basic",
    Intermediate: "badge--inter",
    Advanced: "badge--adv",
    Expert: "badge--expert"
  }[level] || "";

  return `
    <div class="exercise-wrap">
      <div class="ex-header">
        <span class="ex-badge ${levelClass}">${level}</span>
        <span class="ex-task">${task}</span>
      </div>

      ${thinkingHtml}

      <div class="ex-sql-block">
        <div class="ex-sql-toolbar">
          <span class="ex-sql-label">SQL</span>
          <button class="copy-btn" onclick="copyCode(this)" title="Copy">⎘ Copy</button>
        </div>
        <pre><code>${escapeHtmlStatic(sql)}</code></pre>
      </div>

      <div class="ex-result-area" id="result-${id}">
        <div class="ex-result-inner">${result || ""}</div>
      </div>
      <button class="show-result-btn" onclick="toggleResult('result-${id}', this)">
        ▶ Hiện kết quả
      </button>
    </div>
  `;
}

function escapeHtmlStatic(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}


/* =========================================================
   RUNTIME HELPERS
========================================================= */

function toggleResult(id, btn) {
  const area = document.getElementById(id);

  if (!area) return;

  const isOpen = area.classList.contains("open");

  area.classList.toggle("open", !isOpen);
  btn.textContent = isOpen ? "▶ Hiện kết quả" : "▼ Ẩn kết quả";
}

function copyCode(btn) {
  const code = btn.closest(".ex-sql-block")?.querySelector("code")?.textContent || "";

  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = "✓ Đã copy";
    setTimeout(() => { btn.textContent = "⎘ Copy"; }, 1500);
  });
}


/* =========================================================
   DATA
========================================================= */

const practiceParts = [

  /* -------------------------------------------------------
     PART 0: DATASET & ERD
  ------------------------------------------------------- */
  {
    id: "dataset",
    title: "Phần 0",
    subtitle: "Dataset & ERD",
    sidebarTitle: "Dataset",
    lessons: [
      {
        id: "overview",
        title: "Tổng quan dataset",
        label: "Phần 0 · Dataset Overview",
        blocks: [
          {
            heading: "Dataset B1 — Sales & Operations",
            html: `
              <p>
                Dataset B1 mô phỏng hệ thống bán hàng với 7 bảng quan hệ, phù hợp để luyện tập
                các kỹ năng SQL từ cơ bản đến nâng cao.
              </p>

              <div class="table-grid">
                <div class="table-card">
                  <div class="table-card-icon">📍</div>
                  <div class="table-card-name">regions</div>
                  <div class="table-card-desc">4 dòng — Khu vực địa lý</div>
                </div>
                <div class="table-card">
                  <div class="table-card-icon">🏷</div>
                  <div class="table-card-name">categories</div>
                  <div class="table-card-desc">4 dòng — Danh mục sản phẩm</div>
                </div>
                <div class="table-card">
                  <div class="table-card-icon">👤</div>
                  <div class="table-card-name">employees</div>
                  <div class="table-card-desc">5 dòng — Nhân viên, có self-join</div>
                </div>
                <div class="table-card">
                  <div class="table-card-icon">🧑</div>
                  <div class="table-card-name">customers</div>
                  <div class="table-card-desc">8 dòng — Khách hàng</div>
                </div>
                <div class="table-card">
                  <div class="table-card-icon">📦</div>
                  <div class="table-card-name">products</div>
                  <div class="table-card-desc">10 dòng — Sản phẩm + giá</div>
                </div>
                <div class="table-card">
                  <div class="table-card-icon">🛒</div>
                  <div class="table-card-name">orders</div>
                  <div class="table-card-desc">12 dòng — Đơn hàng + status</div>
                </div>
                <div class="table-card">
                  <div class="table-card-icon">📋</div>
                  <div class="table-card-name">order_items</div>
                  <div class="table-card-desc">20 dòng — Chi tiết đơn hàng</div>
                </div>
              </div>

              <div class="callout">
                Dataset này được thiết kế với đầy đủ: dimension table, fact table,
                self-join, snapshot price, và các status để lọc.
              </div>
            `
          }
        ]
      },

      {
        id: "erd",
        title: "Sơ đồ ERD",
        label: "Phần 0 · ERD",
        blocks: [
          {
            heading: "Entity Relationship Diagram",
            html: `
              <p>
                Sơ đồ dưới đây thể hiện các mối quan hệ chính giữa 7 bảng trong dataset.
              </p>

              <div class="erd-wrapper">
                <svg class="erd-svg" viewBox="0 0 860 520" xmlns="http://www.w3.org/2000/svg">
                  <!-- regions -->
                  <g class="erd-node" transform="translate(20,200)">
                    <rect width="140" height="90" rx="12"/>
                    <text class="erd-title" x="70" y="22">regions</text>
                    <line class="erd-divider" x1="10" y1="32" x2="130" y2="32"/>
                    <text class="erd-pk" x="14" y="48">🔑 region_id</text>
                    <text class="erd-col" x="14" y="64">region_name</text>
                    <text class="erd-col" x="14" y="80">country</text>
                  </g>

                  <!-- customers -->
                  <g class="erd-node" transform="translate(220,140)">
                    <rect width="160" height="110" rx="12"/>
                    <text class="erd-title" x="80" y="22">customers</text>
                    <line class="erd-divider" x1="10" y1="32" x2="150" y2="32"/>
                    <text class="erd-pk" x="14" y="48">🔑 customer_id</text>
                    <text class="erd-col" x="14" y="64">full_name</text>
                    <text class="erd-fk" x="14" y="80">🔗 region_id</text>
                    <text class="erd-col" x="14" y="96">registered_at</text>
                  </g>

                  <!-- orders -->
                  <g class="erd-node erd-node--fact" transform="translate(440,180)">
                    <rect width="160" height="110" rx="12"/>
                    <text class="erd-title" x="80" y="22">orders</text>
                    <line class="erd-divider" x1="10" y1="32" x2="150" y2="32"/>
                    <text class="erd-pk" x="14" y="48">🔑 order_id</text>
                    <text class="erd-fk" x="14" y="64">🔗 customer_id</text>
                    <text class="erd-fk" x="14" y="80">🔗 employee_id</text>
                    <text class="erd-col" x="14" y="96">status / date</text>
                  </g>

                  <!-- order_items -->
                  <g class="erd-node erd-node--fact" transform="translate(650,280)">
                    <rect width="160" height="110" rx="12"/>
                    <text class="erd-title" x="80" y="22">order_items</text>
                    <line class="erd-divider" x1="10" y1="32" x2="150" y2="32"/>
                    <text class="erd-pk" x="14" y="48">🔑 item_id</text>
                    <text class="erd-fk" x="14" y="64">🔗 order_id</text>
                    <text class="erd-fk" x="14" y="80">🔗 product_id</text>
                    <text class="erd-col" x="14" y="96">qty / unit_price</text>
                  </g>

                  <!-- products -->
                  <g class="erd-node" transform="translate(640,80)">
                    <rect width="160" height="110" rx="12"/>
                    <text class="erd-title" x="80" y="22">products</text>
                    <line class="erd-divider" x1="10" y1="32" x2="150" y2="32"/>
                    <text class="erd-pk" x="14" y="48">🔑 product_id</text>
                    <text class="erd-col" x="14" y="64">product_name</text>
                    <text class="erd-fk" x="14" y="80">🔗 category_id</text>
                    <text class="erd-col" x="14" y="96">unit_price</text>
                  </g>

                  <!-- categories -->
                  <g class="erd-node" transform="translate(440,20)">
                    <rect width="150" height="70" rx="12"/>
                    <text class="erd-title" x="75" y="22">categories</text>
                    <line class="erd-divider" x1="10" y1="32" x2="140" y2="32"/>
                    <text class="erd-pk" x="14" y="48">🔑 category_id</text>
                    <text class="erd-col" x="14" y="64">category_name</text>
                  </g>

                  <!-- employees -->
                  <g class="erd-node" transform="translate(220,360)">
                    <rect width="160" height="110" rx="12"/>
                    <text class="erd-title" x="80" y="22">employees</text>
                    <line class="erd-divider" x1="10" y1="32" x2="150" y2="32"/>
                    <text class="erd-pk" x="14" y="48">🔑 employee_id</text>
                    <text class="erd-col" x="14" y="64">full_name / role</text>
                    <text class="erd-fk" x="14" y="80">🔗 manager_id</text>
                    <text class="erd-col" x="14" y="96">↑ self-join</text>
                  </g>

                  <!-- RELATIONSHIPS -->
                  <!-- regions -> customers -->
                  <line class="erd-line" x1="160" y1="245" x2="220" y2="215"/>
                  <!-- customers -> orders -->
                  <line class="erd-line" x1="380" y1="200" x2="440" y2="220"/>
                  <!-- employees -> orders -->
                  <line class="erd-line" x1="380" y1="395" x2="510" y2="290"/>
                  <!-- orders -> order_items -->
                  <line class="erd-line" x1="600" y1="255" x2="650" y2="310"/>
                  <!-- products -> order_items -->
                  <line class="erd-line" x1="720" y1="190" x2="720" y2="280"/>
                  <!-- categories -> products -->
                  <line class="erd-line" x1="590" y1="55" x2="640" y2="100"/>

                  <!-- self-join arrow on employees -->
                  <path class="erd-line erd-self" d="M230,470 Q170,510 190,420 Q210,380 220,400"/>
                </svg>
              </div>

              <div class="erd-legend">
                <div class="legend-item"><span class="legend-dot legend-dot--pk"></span>Primary Key</div>
                <div class="legend-item"><span class="legend-dot legend-dot--fk"></span>Foreign Key</div>
                <div class="legend-item"><span class="legend-dot legend-dot--fact"></span>Fact Table</div>
              </div>
            `
          }
        ]
      },

      {
        id: "schema-detail",
        title: "Schema chi tiết",
        label: "Phần 0 · Schema",
        blocks: [
          {
            heading: "Grain của từng bảng",
            html: `
              <table>
                <thead>
                  <tr>
                    <th>Bảng</th>
                    <th>Grain</th>
                    <th>Primary Key</th>
                    <th>Foreign Key(s)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><b>regions</b></td><td>1 dòng = 1 khu vực</td><td>region_id</td><td>—</td></tr>
                  <tr><td><b>categories</b></td><td>1 dòng = 1 danh mục</td><td>category_id</td><td>—</td></tr>
                  <tr><td><b>employees</b></td><td>1 dòng = 1 nhân viên</td><td>employee_id</td><td>manager_id → employee_id (self)</td></tr>
                  <tr><td><b>customers</b></td><td>1 dòng = 1 khách hàng</td><td>customer_id</td><td>region_id → regions</td></tr>
                  <tr><td><b>products</b></td><td>1 dòng = 1 sản phẩm</td><td>product_id</td><td>category_id → categories</td></tr>
                  <tr><td><b>orders</b></td><td>1 dòng = 1 đơn hàng</td><td>order_id</td><td>customer_id, employee_id</td></tr>
                  <tr><td><b>order_items</b></td><td>1 dòng = 1 sản phẩm / 1 đơn hàng</td><td>item_id</td><td>order_id, product_id</td></tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "Lưu ý quan trọng",
            html: `
              <div class="note-grid">
                <div class="note-item note-item--warn">
                  <div class="note-icon">⚠</div>
                  <div>
                    <b>Snapshot price:</b> <code>order_items.unit_price</code> là giá tại thời điểm mua,
                    khác với <code>products.unit_price</code> là giá hiện tại.
                    Cần dùng giá trong <code>order_items</code> khi tính doanh thu.
                  </div>
                </div>
                <div class="note-item note-item--info">
                  <div class="note-icon">ℹ</div>
                  <div>
                    <b>Status filter:</b> Đơn hàng có 3 trạng thái: <code>completed</code>,
                    <code>pending</code>, <code>cancelled</code>.
                    Phần lớn bài tập yêu cầu chỉ tính <code>completed</code>.
                  </div>
                </div>
                <div class="note-item note-item--info">
                  <div class="note-icon">ℹ</div>
                  <div>
                    <b>Self-join:</b> Bảng <code>employees</code> có <code>manager_id</code>
                    trỏ về chính nó — dùng để luyện tập self-join và recursive CTE.
                  </div>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },

  /* -------------------------------------------------------
     PART 1: BASIC
  ------------------------------------------------------- */
  {
    id: "basic",
    title: "Phần 1",
    subtitle: "Basic — JOIN & GROUP BY",
    sidebarTitle: "Basic",
    lessons: [
      {
        id: "basic-q1-q5",
        title: "Q1 – Q5",
        label: "Phần 1 · Basic",
        blocks: [
          {
            heading: "Q1 — Liệt kê khách hàng cùng tên region",
            html: buildExercise({
              level: "Basic",
              task: "Liệt kê tất cả khách hàng cùng với tên region của họ.",
              thinking: ["Bảng chính: customers", "Join với regions theo region_id", "Lấy: full_name, email, region_name"],
              sql: `SELECT c.full_name, c.email, r.region_name
FROM customers c
JOIN regions r ON c.region_id = r.region_id;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>email</th><th>region_name</th></tr></thead>
                  <tbody>
                    <tr><td>Alice Nguyen</td><td>alice@mail.com</td><td>North</td></tr>
                    <tr><td>Bob Tran</td><td>bob@mail.com</td><td>South</td></tr>
                    <tr><td>Carol Le</td><td>carol@mail.com</td><td>Central</td></tr>
                    <tr><td>David Pham</td><td>david@mail.com</td><td>Overseas</td></tr>
                    <tr><td>Eva Do</td><td>eva@mail.com</td><td>South</td></tr>
                    <tr><td>Frank Vo</td><td>frank@mail.com</td><td>North</td></tr>
                    <tr><td>Grace Bui</td><td>grace@mail.com</td><td>Central</td></tr>
                    <tr><td>Hung Ly</td><td>hung@mail.com</td><td>North</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q2 — Số lượng khách hàng ở mỗi region",
            html: buildExercise({
              level: "Basic",
              task: "Có bao nhiêu khách hàng ở mỗi region? (giữ nguyên region cho dù không có KH)",
              thinking: ["LEFT JOIN từ regions → customers để giữ tất cả region", "GROUP BY region_name", "COUNT(customer_id) — dùng customer_id, không dùng *"],
              sql: `SELECT r.region_name, COUNT(c.customer_id) AS customer_count
FROM regions r
LEFT JOIN customers c ON r.region_id = c.region_id
GROUP BY r.region_name
ORDER BY customer_count DESC;`,
              result: `
                <table>
                  <thead><tr><th>region_name</th><th>customer_count</th></tr></thead>
                  <tbody>
                    <tr><td>North</td><td>3</td></tr>
                    <tr><td>South</td><td>2</td></tr>
                    <tr><td>Central</td><td>2</td></tr>
                    <tr><td>Overseas</td><td>1</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q3 — Sản phẩm Electronics",
            html: buildExercise({
              level: "Basic",
              task: "Liệt kê các sản phẩm thuộc category Electronics, sắp xếp giá giảm dần.",
              thinking: ["Join products với categories", "WHERE category_name = 'Electronics'"],
              sql: `SELECT p.product_name, p.unit_price, p.stock_qty
FROM products p
JOIN categories c ON p.category_id = c.category_id
WHERE c.category_name = 'Electronics'
ORDER BY p.unit_price DESC;`,
              result: `
                <table>
                  <thead><tr><th>product_name</th><th>unit_price</th><th>stock_qty</th></tr></thead>
                  <tbody>
                    <tr><td>Laptop Pro 15</td><td>25,000,000</td><td>10</td></tr>
                    <tr><td>Mechanical Keyboard</td><td>1,500,000</td><td>15</td></tr>
                    <tr><td>USB-C Hub</td><td>890,000</td><td>30</td></tr>
                    <tr><td>Wireless Mouse</td><td>450,000</td><td>50</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q4 — Tổng doanh thu mỗi đơn hàng",
            html: buildExercise({
              level: "Basic",
              task: "Tổng doanh thu của từng đơn hàng (chỉ lấy status = completed).",
              thinking: ["JOIN orders với order_items", "SUM(quantity * unit_price) — dùng giá trong order_items", "GROUP BY order_id, order_date"],
              sql: `SELECT o.order_id, o.order_date,
       SUM(oi.quantity * oi.unit_price) AS total_amount
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'completed'
GROUP BY o.order_id, o.order_date
ORDER BY total_amount DESC;`,
              result: `
                <table>
                  <thead><tr><th>order_id</th><th>order_date</th><th>total_amount</th></tr></thead>
                  <tbody>
                    <tr><td>1001</td><td>2023-01-15</td><td>25,900,000</td></tr>
                    <tr><td>1011</td><td>2024-03-15</td><td>2,850,000</td></tr>
                    <tr><td>1004</td><td>2023-05-10</td><td>2,390,000</td></tr>
                    <tr><td>1010</td><td>2024-02-20</td><td>1,980,000</td></tr>
                    <tr><td>1003</td><td>2023-03-05</td><td>1,820,000</td></tr>
                    <tr><td>1007</td><td>2023-09-14</td><td>810,000</td></tr>
                    <tr><td>1008</td><td>2023-10-30</td><td>530,000</td></tr>
                    <tr><td>1006</td><td>2023-08-01</td><td>780,000</td></tr>
                    <tr><td>1002</td><td>2023-02-20</td><td>760,000</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q5 — Khách hàng chưa đặt đơn nào",
            html: buildExercise({
              level: "Basic",
              task: "Khách hàng nào chưa đặt đơn hàng nào? Dùng LEFT JOIN + IS NULL.",
              thinking: ["LEFT JOIN customers → orders", "WHERE order_id IS NULL — lọc dòng không có đơn"],
              sql: `SELECT c.full_name, c.email
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`,
              result: `<div class="result-empty">Tất cả 8 khách hàng đều đã có ít nhất 1 đơn hàng trong dataset này.</div>`
            })
          }
        ]
      },

      {
        id: "basic-q6-q10",
        title: "Q6 – Q10",
        label: "Phần 1 · Basic",
        blocks: [
          {
            heading: "Q6 — Mỗi nhân viên xử lý bao nhiêu đơn",
            html: buildExercise({
              level: "Basic",
              task: "Mỗi nhân viên đã xử lý bao nhiêu đơn hàng?",
              thinking: ["LEFT JOIN employees → orders để giữ nhân viên chưa có đơn", "GROUP BY employee_id"],
              sql: `SELECT e.full_name, e.role, COUNT(o.order_id) AS order_count
FROM employees e
LEFT JOIN orders o ON e.employee_id = o.employee_id
GROUP BY e.employee_id, e.full_name, e.role
ORDER BY order_count DESC;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>role</th><th>order_count</th></tr></thead>
                  <tbody>
                    <tr><td>Tran Thi Bich</td><td>Sales Rep</td><td>5</td></tr>
                    <tr><td>Le Minh Cuong</td><td>Sales Rep</td><td>4</td></tr>
                    <tr><td>Pham Thu Hoa</td><td>Sales Rep</td><td>3</td></tr>
                    <tr><td>Nguyen Van An</td><td>Sales Manager</td><td>0</td></tr>
                    <tr><td>Do Quoc Dat</td><td>Intern</td><td>0</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q7 — Top 3 sản phẩm bán chạy nhất",
            html: buildExercise({
              level: "Basic",
              task: "Top 3 sản phẩm có số lượng bán nhiều nhất (chỉ tính completed).",
              thinking: ["JOIN 3 bảng: products, order_items, orders", "SUM(quantity) GROUP BY product", "LIMIT 3"],
              sql: `SELECT p.product_name, SUM(oi.quantity) AS total_qty_sold
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.status = 'completed'
GROUP BY p.product_id, p.product_name
ORDER BY total_qty_sold DESC
LIMIT 3;`,
              result: `
                <table>
                  <thead><tr><th>product_name</th><th>total_qty_sold</th></tr></thead>
                  <tbody>
                    <tr><td>Wireless Mouse</td><td>6</td></tr>
                    <tr><td>T-Shirt Basic</td><td>5</td></tr>
                    <tr><td>Mechanical Keyboard</td><td>2</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q8 — Tổng chi tiêu của từng khách hàng",
            html: buildExercise({
              level: "Basic",
              task: "Tổng chi tiêu của từng khách hàng (chỉ tính completed).",
              sql: `SELECT c.full_name, SUM(oi.quantity * oi.unit_price) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'completed'
GROUP BY c.customer_id, c.full_name
ORDER BY total_spent DESC;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>total_spent</th></tr></thead>
                  <tbody>
                    <tr><td>Alice Nguyen</td><td>31,140,000</td></tr>
                    <tr><td>Carol Le</td><td>1,820,000</td></tr>
                    <tr><td>Hung Ly</td><td>1,980,000</td></tr>
                    <tr><td>Bob Tran</td><td>1,570,000</td></tr>
                    <tr><td>Eva Do</td><td>780,000</td></tr>
                    <tr><td>Frank Vo</td><td>530,000</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q9 — Tên manager của từng nhân viên (self-join)",
            html: buildExercise({
              level: "Basic",
              task: "Tên manager của từng nhân viên. Người không có manager (CEO) vẫn hiển thị.",
              thinking: ["Self-join: employees e LEFT JOIN employees m", "e.manager_id = m.employee_id"],
              sql: `SELECT e.full_name AS employee, e.role, m.full_name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id
ORDER BY m.full_name NULLS LAST;`,
              result: `
                <table>
                  <thead><tr><th>employee</th><th>role</th><th>manager</th></tr></thead>
                  <tbody>
                    <tr><td>Nguyen Van An</td><td>Sales Manager</td><td>NULL</td></tr>
                    <tr><td>Tran Thi Bich</td><td>Sales Rep</td><td>Nguyen Van An</td></tr>
                    <tr><td>Le Minh Cuong</td><td>Sales Rep</td><td>Nguyen Van An</td></tr>
                    <tr><td>Pham Thu Hoa</td><td>Sales Rep</td><td>Nguyen Van An</td></tr>
                    <tr><td>Do Quoc Dat</td><td>Intern</td><td>Tran Thi Bich</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q10 — Doanh thu theo category",
            html: buildExercise({
              level: "Basic",
              task: "Doanh thu theo từng category (chỉ completed).",
              sql: `SELECT cat.category_name, SUM(oi.quantity * oi.unit_price) AS revenue
FROM categories cat
JOIN products p ON cat.category_id = p.category_id
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.status = 'completed'
GROUP BY cat.category_id, cat.category_name
ORDER BY revenue DESC;`,
              result: `
                <table>
                  <thead><tr><th>category_name</th><th>revenue</th></tr></thead>
                  <tbody>
                    <tr><td>Electronics</td><td>34,190,000</td></tr>
                    <tr><td>Home & Kitchen</td><td>3,960,000</td></tr>
                    <tr><td>Books</td><td>1,060,000</td></tr>
                    <tr><td>Clothing</td><td>1,450,000</td></tr>
                  </tbody>
                </table>`
            })
          }
        ]
      }
    ]
  },

  /* -------------------------------------------------------
     PART 2: INTERMEDIATE
  ------------------------------------------------------- */
  {
    id: "intermediate",
    title: "Phần 2",
    subtitle: "Intermediate — CTE & Subquery",
    sidebarTitle: "Intermediate",
    lessons: [
      {
        id: "inter-q1-q5",
        title: "Q1 – Q5",
        label: "Phần 2 · Intermediate",
        blocks: [
          {
            heading: "Q1 — Chi tiết đơn hàng theo khách hàng",
            html: buildExercise({
              level: "Intermediate",
              task: "Liệt kê tên KH, tên SP, số lượng, đơn giá, line_total cho các đơn completed.",
              sql: `SELECT
    c.full_name          AS customer,
    p.product_name,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total
FROM customers c
JOIN orders o       ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id    = oi.order_id
JOIN products p     ON oi.product_id = p.product_id
WHERE o.status = 'completed'
ORDER BY c.full_name, line_total DESC;`,
              result: `<div class="result-note">20 dòng (chỉ hiện 5 dòng đầu)</div>
                <table>
                  <thead><tr><th>customer</th><th>product_name</th><th>qty</th><th>unit_price</th><th>line_total</th></tr></thead>
                  <tbody>
                    <tr><td>Alice Nguyen</td><td>Laptop Pro 15</td><td>1</td><td>25,000,000</td><td>25,000,000</td></tr>
                    <tr><td>Alice Nguyen</td><td>Mechanical Keyboard</td><td>1</td><td>1,500,000</td><td>1,500,000</td></tr>
                    <tr><td>Alice Nguyen</td><td>Wireless Mouse</td><td>3</td><td>450,000</td><td>1,350,000</td></tr>
                    <tr><td>Alice Nguyen</td><td>USB-C Hub</td><td>1</td><td>890,000</td><td>890,000</td></tr>
                    <tr><td>Alice Nguyen</td><td>Wireless Mouse</td><td>2</td><td>450,000</td><td>900,000</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q2 — Sản phẩm giá cao nhất trong mỗi category",
            html: buildExercise({
              level: "Intermediate",
              task: "Với mỗi category, tìm sản phẩm có giá cao nhất (dùng correlated subquery).",
              thinking: ["Correlated subquery trong WHERE", "SELECT MAX(unit_price) WHERE category_id = outer.category_id"],
              sql: `SELECT
    cat.category_name,
    p.product_name,
    p.unit_price
FROM products p
JOIN categories cat ON p.category_id = cat.category_id
WHERE p.unit_price = (
    SELECT MAX(p2.unit_price)
    FROM products p2
    WHERE p2.category_id = p.category_id
)
ORDER BY cat.category_name;`,
              result: `
                <table>
                  <thead><tr><th>category_name</th><th>product_name</th><th>unit_price</th></tr></thead>
                  <tbody>
                    <tr><td>Books</td><td>Clean Code</td><td>310,000</td></tr>
                    <tr><td>Clothing</td><td>Running Shoes</td><td>950,000</td></tr>
                    <tr><td>Electronics</td><td>Laptop Pro 15</td><td>25,000,000</td></tr>
                    <tr><td>Home & Kitchen</td><td>Air Fryer 5L</td><td>1,200,000</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q3 — Doanh thu theo tháng và region",
            html: buildExercise({
              level: "Intermediate",
              task: "Tổng doanh thu theo từng tháng và từng region.",
              sql: `SELECT
    r.region_name,
    DATE_TRUNC('month', o.order_date) AS month,
    SUM(oi.quantity * oi.unit_price)  AS revenue
FROM regions r
JOIN customers c  ON r.region_id   = c.region_id
JOIN orders o     ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id  = oi.order_id
WHERE o.status = 'completed'
GROUP BY r.region_name, DATE_TRUNC('month', o.order_date)
ORDER BY month, revenue DESC;`,
              result: `<div class="result-note">Kết quả tùy ngày hiện tại — ví dụ: North có revenue cao nhất do Alice Nguyen (25.9M) vào 2023-01.</div>`
            })
          },
          {
            heading: "Q4 — Pivot số đơn theo status của từng nhân viên",
            html: buildExercise({
              level: "Intermediate",
              task: "Số lượng đơn theo từng status của mỗi nhân viên (pivot thủ công).",
              thinking: ["CASE WHEN inside SUM để tạo cột ảo theo từng status"],
              sql: `SELECT
    e.full_name,
    COUNT(o.order_id) AS total,
    SUM(CASE WHEN o.status = 'completed'  THEN 1 ELSE 0 END) AS completed,
    SUM(CASE WHEN o.status = 'pending'    THEN 1 ELSE 0 END) AS pending,
    SUM(CASE WHEN o.status = 'cancelled'  THEN 1 ELSE 0 END) AS cancelled
FROM employees e
JOIN orders o ON e.employee_id = o.employee_id
GROUP BY e.employee_id, e.full_name
ORDER BY total DESC;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>total</th><th>completed</th><th>pending</th><th>cancelled</th></tr></thead>
                  <tbody>
                    <tr><td>Tran Thi Bich</td><td>5</td><td>5</td><td>0</td><td>0</td></tr>
                    <tr><td>Le Minh Cuong</td><td>4</td><td>2</td><td>2</td><td>0</td></tr>
                    <tr><td>Pham Thu Hoa</td><td>3</td><td>2</td><td>0</td><td>1</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q5 — KH mua sản phẩm từ ít nhất 2 category",
            html: buildExercise({
              level: "Intermediate",
              task: "Khách hàng đã mua sản phẩm thuộc ít nhất 2 category khác nhau.",
              thinking: ["COUNT(DISTINCT category_id) >= 2", "HAVING clause sau GROUP BY"],
              sql: `SELECT
    c.full_name,
    COUNT(DISTINCT p.category_id) AS distinct_categories_bought
FROM customers c
JOIN orders o       ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id    = oi.order_id
JOIN products p     ON oi.product_id = p.product_id
WHERE o.status = 'completed'
GROUP BY c.customer_id, c.full_name
HAVING COUNT(DISTINCT p.category_id) >= 2
ORDER BY distinct_categories_bought DESC;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>distinct_categories_bought</th></tr></thead>
                  <tbody>
                    <tr><td>Alice Nguyen</td><td>2</td></tr>
                    <tr><td>Bob Tran</td><td>2</td></tr>
                    <tr><td>Carol Le</td><td>2</td></tr>
                    <tr><td>Hung Ly</td><td>2</td></tr>
                  </tbody>
                </table>`
            })
          }
        ]
      },

      {
        id: "inter-q6-q10",
        title: "Q6 – Q10",
        label: "Phần 2 · Intermediate",
        blocks: [
          {
            heading: "Q6 — AOV theo region (CTE)",
            html: buildExercise({
              level: "Intermediate",
              task: "Giá trị trung bình mỗi đơn hàng (AOV) theo từng region, dùng CTE.",
              sql: `WITH order_total AS (
    SELECT
        o.order_id,
        c.region_id,
        SUM(oi.quantity * oi.unit_price) AS order_value
    FROM orders o
    JOIN customers c    ON o.customer_id  = c.customer_id
    JOIN order_items oi ON o.order_id     = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY o.order_id, c.region_id
)
SELECT
    r.region_name,
    COUNT(ot.order_id)           AS total_orders,
    ROUND(AVG(ot.order_value),0) AS avg_order_value,
    SUM(ot.order_value)          AS total_revenue
FROM order_total ot
JOIN regions r ON ot.region_id = r.region_id
GROUP BY r.region_id, r.region_name
ORDER BY avg_order_value DESC;`,
              result: `
                <table>
                  <thead><tr><th>region_name</th><th>total_orders</th><th>avg_order_value</th><th>total_revenue</th></tr></thead>
                  <tbody>
                    <tr><td>North</td><td>4</td><td>8,142,500</td><td>32,570,000</td></tr>
                    <tr><td>Central</td><td>2</td><td>1,180,000</td><td>2,360,000</td></tr>
                    <tr><td>South</td><td>3</td><td>720,000</td><td>2,160,000</td></tr>
                    <tr><td>Overseas</td><td>0</td><td>—</td><td>—</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q7 — Sản phẩm có stock dưới mức trung bình",
            html: buildExercise({
              level: "Intermediate",
              task: "Sản phẩm nào có stock còn lại dưới mức trung bình toàn bộ sản phẩm?",
              sql: `SELECT
    p.product_name,
    cat.category_name,
    p.stock_qty,
    ROUND((SELECT AVG(stock_qty) FROM products), 1) AS avg_stock
FROM products p
JOIN categories cat ON p.category_id = cat.category_id
WHERE p.stock_qty < (SELECT AVG(stock_qty) FROM products)
ORDER BY p.stock_qty ASC;`,
              result: `
                <table>
                  <thead><tr><th>product_name</th><th>category_name</th><th>stock_qty</th><th>avg_stock</th></tr></thead>
                  <tbody>
                    <tr><td>Laptop Pro 15</td><td>Electronics</td><td>10</td><td>34.9</td></tr>
                    <tr><td>Mechanical Keyboard</td><td>Electronics</td><td>15</td><td>34.9</td></tr>
                    <tr><td>Air Fryer 5L</td><td>Home & Kitchen</td><td>20</td><td>34.9</td></tr>
                    <tr><td>Coffee Maker</td><td>Home & Kitchen</td><td>25</td><td>34.9</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q8 — Danh sách KH mỗi nhân viên phục vụ",
            html: buildExercise({
              level: "Intermediate",
              task: "Với mỗi nhân viên, liệt kê tên các KH họ phục vụ (không trùng).",
              sql: `SELECT
    e.full_name AS employee,
    STRING_AGG(DISTINCT c.full_name, ', ' ORDER BY c.full_name) AS customers_served,
    COUNT(DISTINCT c.customer_id) AS total_customers
FROM employees e
JOIN orders o    ON e.employee_id = o.employee_id
JOIN customers c ON o.customer_id = c.customer_id
GROUP BY e.employee_id, e.full_name
ORDER BY total_customers DESC;`,
              result: `
                <table>
                  <thead><tr><th>employee</th><th>customers_served</th><th>total_customers</th></tr></thead>
                  <tbody>
                    <tr><td>Tran Thi Bich</td><td>Alice Nguyen, Bob Tran, Frank Vo</td><td>3</td></tr>
                    <tr><td>Le Minh Cuong</td><td>Carol Le, Eva Do, Grace Bui</td><td>3</td></tr>
                    <tr><td>Pham Thu Hoa</td><td>Bob Tran, David Pham, Hung Ly</td><td>3</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q9 — Tháng doanh thu cao nhất và thấp nhất",
            html: buildExercise({
              level: "Intermediate",
              task: "Tìm tháng có doanh thu cao nhất và thấp nhất, dùng window function.",
              sql: `WITH monthly AS (
    SELECT
        DATE_TRUNC('month', o.order_date)  AS month,
        SUM(oi.quantity * oi.unit_price)   AS revenue
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT month, revenue,
    CASE
        WHEN revenue = MAX(revenue) OVER () THEN 'highest'
        WHEN revenue = MIN(revenue) OVER () THEN 'lowest'
        ELSE 'normal'
    END AS label
FROM monthly
ORDER BY revenue DESC;`,
              result: `<div class="result-note">Jan 2023 là tháng cao nhất (25.9M do Laptop). Tháng thấp nhất phụ thuộc dữ liệu.</div>`
            })
          },
          {
            heading: "Q10 — Sản phẩm chưa bao giờ bị cancelled",
            html: buildExercise({
              level: "Intermediate",
              task: "Sản phẩm xuất hiện trong completed nhưng KHÔNG xuất hiện trong cancelled.",
              sql: `SELECT p.product_name, cat.category_name
FROM products p
JOIN categories cat ON p.category_id = cat.category_id
WHERE p.product_id IN (
    SELECT oi.product_id FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'completed'
)
AND p.product_id NOT IN (
    SELECT oi.product_id FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'cancelled'
)
ORDER BY cat.category_name, p.product_name;`,
              result: `
                <table>
                  <thead><tr><th>product_name</th><th>category_name</th></tr></thead>
                  <tbody>
                    <tr><td>Wireless Mouse</td><td>Electronics</td></tr>
                    <tr><td>USB-C Hub</td><td>Electronics</td></tr>
                    <tr><td>Mechanical Keyboard</td><td>Electronics</td></tr>
                    <tr><td>SQL for Beginners</td><td>Books</td></tr>
                    <tr><td>Clean Code</td><td>Books</td></tr>
                    <tr><td>Air Fryer 5L</td><td>Home & Kitchen</td></tr>
                    <tr><td>Coffee Maker</td><td>Home & Kitchen</td></tr>
                  </tbody>
                </table>`
            })
          }
        ]
      }
    ]
  },
  /* -------------------------------------------------------
     PART 3: ADVANCED
  ------------------------------------------------------- */
  {
    id: "advanced",
    title: "Phần 3",
    subtitle: "Advanced — Window Function",
    sidebarTitle: "Advanced",
    lessons: [
      {
        id: "adv-q1-q5",
        title: "Q1 – Q5",
        label: "Phần 3 · Advanced",
        blocks: [
          {
            heading: "Q1 — KH có chi tiêu trên mức trung bình",
            html: buildExercise({
              level: "Advanced",
              task: "Khách hàng có tổng chi tiêu cao hơn mức trung bình của tất cả khách hàng.",
              thinking: ["Subquery để tính AVG(customer_total)", "HAVING so sánh với kết quả subquery"],
              sql: `SELECT c.full_name, SUM(oi.quantity * oi.unit_price) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'completed'
GROUP BY c.customer_id, c.full_name
HAVING SUM(oi.quantity * oi.unit_price) > (
    SELECT AVG(customer_total) FROM (
        SELECT SUM(oi2.quantity * oi2.unit_price) AS customer_total
        FROM orders o2
        JOIN order_items oi2 ON o2.order_id = oi2.order_id
        WHERE o2.status = 'completed'
        GROUP BY o2.customer_id
    ) sub
)
ORDER BY total_spent DESC;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>total_spent</th></tr></thead>
                  <tbody>
                    <tr><td>Alice Nguyen</td><td>31,140,000</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q2 — Rank sản phẩm theo doanh thu trong category",
            html: buildExercise({
              level: "Advanced",
              task: "Xếp hạng sản phẩm theo doanh thu trong từng category (RANK window function).",
              sql: `SELECT
    cat.category_name,
    p.product_name,
    SUM(oi.quantity * oi.unit_price) AS revenue,
    RANK() OVER (
        PARTITION BY cat.category_id
        ORDER BY SUM(oi.quantity * oi.unit_price) DESC
    ) AS rank_in_category
FROM categories cat
JOIN products p ON cat.category_id = p.category_id
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.status = 'completed'
GROUP BY cat.category_id, cat.category_name, p.product_id, p.product_name
ORDER BY cat.category_name, rank_in_category;`,
              result: `
                <table>
                  <thead><tr><th>category_name</th><th>product_name</th><th>revenue</th><th>rank</th></tr></thead>
                  <tbody>
                    <tr><td>Books</td><td>Clean Code</td><td>620,000</td><td>1</td></tr>
                    <tr><td>Books</td><td>SQL for Beginners</td><td>440,000</td><td>2</td></tr>
                    <tr><td>Electronics</td><td>Laptop Pro 15</td><td>25,000,000</td><td>1</td></tr>
                    <tr><td>Electronics</td><td>Mechanical Keyboard</td><td>3,000,000</td><td>2</td></tr>
                    <tr><td>Electronics</td><td>Wireless Mouse</td><td>2,700,000</td><td>3</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q3 — % đóng góp doanh thu theo region (CTE)",
            html: buildExercise({
              level: "Advanced",
              task: "Phần trăm đóng góp doanh thu của từng region trên tổng công ty.",
              sql: `WITH region_revenue AS (
    SELECT r.region_name, SUM(oi.quantity * oi.unit_price) AS revenue
    FROM regions r
    JOIN customers c ON r.region_id = c.region_id
    JOIN orders o ON c.customer_id = o.customer_id
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY r.region_id, r.region_name
),
total AS (
    SELECT SUM(revenue) AS grand_total FROM region_revenue
)
SELECT
    rr.region_name,
    rr.revenue,
    ROUND(rr.revenue * 100.0 / t.grand_total, 2) AS pct_contribution
FROM region_revenue rr, total t
ORDER BY pct_contribution DESC;`,
              result: `
                <table>
                  <thead><tr><th>region_name</th><th>revenue</th><th>pct_contribution</th></tr></thead>
                  <tbody>
                    <tr><td>North</td><td>32,570,000</td><td>86.41%</td></tr>
                    <tr><td>Central</td><td>2,360,000</td><td>6.26%</td></tr>
                    <tr><td>South</td><td>2,160,000</td><td>5.73%</td></tr>
                    <tr><td>Overseas</td><td>780,000</td><td>2.07%</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q4 — Running total doanh thu theo tháng",
            html: buildExercise({
              level: "Advanced",
              task: "Doanh thu theo từng tháng và running total cộng dồn.",
              thinking: ["SUM() OVER (ORDER BY month) — window function không có PARTITION"],
              sql: `WITH monthly AS (
    SELECT
        DATE_TRUNC('month', o.order_date) AS month,
        SUM(oi.quantity * oi.unit_price)  AS monthly_revenue
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT
    month,
    monthly_revenue,
    SUM(monthly_revenue) OVER (ORDER BY month) AS running_total
FROM monthly
ORDER BY month;`,
              result: `<div class="result-note">Mỗi tháng hiển thị monthly_revenue và cộng dồn từ đầu năm. Jan 2023: 25.9M → running total: 25.9M. Feb 2023: +0.76M → 26.66M...</div>`
            })
          },
          {
            heading: "Q5 — Sản phẩm chưa từng được mua",
            html: buildExercise({
              level: "Advanced",
              task: "Sản phẩm chưa xuất hiện trong bất kỳ completed order nào.",
              sql: `SELECT p.product_name, p.unit_price, cat.category_name
FROM products p
JOIN categories cat ON p.category_id = cat.category_id
WHERE p.product_id NOT IN (
    SELECT DISTINCT oi.product_id
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.status = 'completed'
);`,
              result: `
                <table>
                  <thead><tr><th>product_name</th><th>unit_price</th><th>category_name</th></tr></thead>
                  <tbody>
                    <tr><td>T-Shirt Basic</td><td>180,000</td><td>Clothing</td></tr>
                    <tr><td>Running Shoes</td><td>950,000</td><td>Clothing</td></tr>
                  </tbody>
                </table>
                <div class="result-note">Running Shoes và T-Shirt Basic chỉ xuất hiện trong cancelled/pending orders.</div>`
            })
          }
        ]
      },

      {
        id: "adv-q6-q10",
        title: "Q6 – Q10",
        label: "Phần 3 · Advanced",
        blocks: [
          {
            heading: "Q6 — Đơn hàng gần nhất của từng KH (ROW_NUMBER)",
            html: buildExercise({
              level: "Advanced",
              task: "Với mỗi KH, lấy thông tin đơn hàng gần nhất.",
              sql: `WITH ranked_orders AS (
    SELECT
        c.full_name,
        o.order_id, o.order_date, o.status,
        ROW_NUMBER() OVER (
            PARTITION BY c.customer_id
            ORDER BY o.order_date DESC
        ) AS rn
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
)
SELECT full_name, order_id, order_date, status
FROM ranked_orders WHERE rn = 1
ORDER BY order_date DESC;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>order_id</th><th>order_date</th><th>status</th></tr></thead>
                  <tbody>
                    <tr><td>Eva Do</td><td>1012</td><td>2024-04-01</td><td>pending</td></tr>
                    <tr><td>Alice Nguyen</td><td>1011</td><td>2024-03-15</td><td>completed</td></tr>
                    <tr><td>Hung Ly</td><td>1010</td><td>2024-02-20</td><td>completed</td></tr>
                    <tr><td>Grace Bui</td><td>1009</td><td>2024-01-08</td><td>pending</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q7 — Nhân viên có tỷ lệ đơn bị cancelled cao nhất",
            html: buildExercise({
              level: "Advanced",
              task: "Nhân viên nào có tỷ lệ đơn bị cancelled cao nhất?",
              sql: `SELECT
    e.full_name,
    COUNT(o.order_id) AS total_orders,
    SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_count,
    ROUND(
        SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END)
        * 100.0 / COUNT(o.order_id), 2
    ) AS cancel_rate_pct
FROM employees e
JOIN orders o ON e.employee_id = o.employee_id
GROUP BY e.employee_id, e.full_name
HAVING COUNT(o.order_id) > 0
ORDER BY cancel_rate_pct DESC;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>total_orders</th><th>cancelled_count</th><th>cancel_rate_pct</th></tr></thead>
                  <tbody>
                    <tr><td>Pham Thu Hoa</td><td>3</td><td>1</td><td>33.33%</td></tr>
                    <tr><td>Tran Thi Bich</td><td>5</td><td>0</td><td>0.00%</td></tr>
                    <tr><td>Le Minh Cuong</td><td>4</td><td>0</td><td>0.00%</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q8 — Cặp sản phẩm hay được mua cùng",
            html: buildExercise({
              level: "Advanced",
              task: "Tìm các cặp sản phẩm thường được mua cùng trong 1 đơn hàng.",
              thinking: ["Self-join order_items: oi1 JOIN oi2 cùng order_id", "oi1.product_id < oi2.product_id để tránh (A,B) và (B,A)"],
              sql: `SELECT
    p1.product_name AS product_a,
    p2.product_name AS product_b,
    COUNT(*) AS times_bought_together
FROM order_items oi1
JOIN order_items oi2
    ON oi1.order_id = oi2.order_id
    AND oi1.product_id < oi2.product_id
JOIN products p1 ON oi1.product_id = p1.product_id
JOIN products p2 ON oi2.product_id = p2.product_id
GROUP BY p1.product_id, p1.product_name, p2.product_id, p2.product_name
ORDER BY times_bought_together DESC;`,
              result: `
                <table>
                  <thead><tr><th>product_a</th><th>product_b</th><th>times_bought_together</th></tr></thead>
                  <tbody>
                    <tr><td>Wireless Mouse</td><td>Laptop Pro 15</td><td>1</td></tr>
                    <tr><td>T-Shirt Basic</td><td>SQL for Beginners</td><td>1</td></tr>
                    <tr><td>Clean Code</td><td>Air Fryer 5L</td><td>1</td></tr>
                    <tr><td>USB-C Hub</td><td>Mechanical Keyboard</td><td>1</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q9 — Doanh thu nhân viên so với team avg",
            html: buildExercise({
              level: "Advanced",
              task: "Doanh thu của từng nhân viên và chênh lệch so với trung bình team.",
              sql: `SELECT
    e.full_name,
    SUM(oi.quantity * oi.unit_price)                        AS personal_revenue,
    ROUND(AVG(SUM(oi.quantity * oi.unit_price)) OVER (), 0) AS team_avg_revenue,
    SUM(oi.quantity * oi.unit_price)
        - AVG(SUM(oi.quantity * oi.unit_price)) OVER ()     AS diff_from_avg
FROM employees e
JOIN orders o ON e.employee_id = o.employee_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'completed'
GROUP BY e.employee_id, e.full_name
ORDER BY personal_revenue DESC;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>personal_revenue</th><th>team_avg</th><th>diff_from_avg</th></tr></thead>
                  <tbody>
                    <tr><td>Tran Thi Bich</td><td>32,570,000</td><td>~13M</td><td>+19.5M</td></tr>
                    <tr><td>Le Minh Cuong</td><td>2,600,000</td><td>~13M</td><td>-10.4M</td></tr>
                    <tr><td>Pham Thu Hoa</td><td>3,980,000</td><td>~13M</td><td>-9M</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q10 — Số ngày giữa 2 đơn liên tiếp (LAG)",
            html: buildExercise({
              level: "Advanced",
              task: "Với từng KH, tính số ngày giữa 2 đơn hàng liên tiếp.",
              thinking: ["LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date)", "order_date - prev_order_date"],
              sql: `WITH order_gaps AS (
    SELECT
        c.full_name,
        o.order_id,
        o.order_date,
        LAG(o.order_date) OVER (
            PARTITION BY c.customer_id
            ORDER BY o.order_date
        ) AS prev_order_date
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.status = 'completed'
)
SELECT full_name, order_id, order_date, prev_order_date,
       order_date - prev_order_date AS days_since_last_order
FROM order_gaps
WHERE prev_order_date IS NOT NULL
ORDER BY full_name, order_date;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>order_id</th><th>order_date</th><th>prev_order_date</th><th>days_gap</th></tr></thead>
                  <tbody>
                    <tr><td>Alice Nguyen</td><td>1004</td><td>2023-05-10</td><td>2023-01-15</td><td>115</td></tr>
                    <tr><td>Alice Nguyen</td><td>1011</td><td>2024-03-15</td><td>2023-05-10</td><td>309</td></tr>
                    <tr><td>Bob Tran</td><td>1007</td><td>2023-09-14</td><td>2023-02-20</td><td>206</td></tr>
                  </tbody>
                </table>`
            })
          }
        ]
      }
    ]
  },
  
  /* -------------------------------------------------------
     PART 4: EXPERT
  ------------------------------------------------------- */
  {
    id: "expert",
    title: "Phần 4",
    subtitle: "Expert — RFM, Cohort, Recursive",
    sidebarTitle: "Expert",
    lessons: [
      {
        id: "expert-selected",
        title: "Q3, Q7, Q9 — Highlight",
        label: "Phần 4 · Expert",
        blocks: [
          {
            heading: "Q3 — Recursive CTE: Org tree",
            html: buildExercise({
              level: "Expert",
              task: "In ra chuỗi cấp bậc nhân viên: An > Bich > Dat — dùng RECURSIVE CTE.",
              thinking: [
                "Base case: manager_id IS NULL (CEO)",
                "Recursive: join employees với org_tree trên manager_id",
                "Xây dựng chuỗi: ot.chain || ' > ' || e.full_name"
              ],
              sql: `WITH RECURSIVE org_tree AS (
    -- base: khong co manager
    SELECT employee_id, full_name, manager_id, role,
           full_name::TEXT AS chain, 0 AS depth
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    SELECT e.employee_id, e.full_name, e.manager_id, e.role,
           ot.chain || ' > ' || e.full_name AS chain,
           ot.depth + 1
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.employee_id
)
SELECT employee_id, full_name, role, depth, chain
FROM org_tree
ORDER BY chain;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>role</th><th>depth</th><th>chain</th></tr></thead>
                  <tbody>
                    <tr><td>Nguyen Van An</td><td>Sales Manager</td><td>0</td><td>Nguyen Van An</td></tr>
                    <tr><td>Le Minh Cuong</td><td>Sales Rep</td><td>1</td><td>Nguyen Van An > Le Minh Cuong</td></tr>
                    <tr><td>Pham Thu Hoa</td><td>Sales Rep</td><td>1</td><td>Nguyen Van An > Pham Thu Hoa</td></tr>
                    <tr><td>Tran Thi Bich</td><td>Sales Rep</td><td>1</td><td>Nguyen Van An > Tran Thi Bich</td></tr>
                    <tr><td>Do Quoc Dat</td><td>Intern</td><td>2</td><td>Nguyen Van An > Tran Thi Bich > Do Quoc Dat</td></tr>
                  </tbody>
                </table>`
            })
          },
          {
            heading: "Q7 — RFM Score",
            html: buildExercise({
              level: "Expert",
              task: "Tính RFM score (Recency, Frequency, Monetary) và phân khúc khách hàng.",
              thinking: [
                "rfm_raw: tính recency_days, frequency, monetary",
                "rfm_scored: NTILE(3) cho từng chiều",
                "Phân khúc: Champion / Loyal / At Risk / Potential"
              ],
              sql: `WITH rfm_raw AS (
    SELECT
        c.customer_id, c.full_name,
        CURRENT_DATE - MAX(o.order_date) AS recency_days,
        COUNT(DISTINCT o.order_id)       AS frequency,
        SUM(oi.quantity * oi.unit_price) AS monetary
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY c.customer_id, c.full_name
),
rfm_scored AS (
    SELECT *,
        NTILE(3) OVER (ORDER BY recency_days ASC)  AS r_score,
        NTILE(3) OVER (ORDER BY frequency DESC)    AS f_score,
        NTILE(3) OVER (ORDER BY monetary DESC)     AS m_score
    FROM rfm_raw
)
SELECT full_name, recency_days, frequency, monetary,
       r_score, f_score, m_score,
       r_score + f_score + m_score AS rfm_total,
       CASE
           WHEN r_score=3 AND f_score=3 AND m_score=3 THEN 'Champion'
           WHEN r_score>=2 AND f_score>=2              THEN 'Loyal'
           WHEN r_score=1                              THEN 'At Risk'
           ELSE 'Potential'
       END AS segment
FROM rfm_scored
ORDER BY rfm_total DESC;`,
              result: `
                <table>
                  <thead><tr><th>full_name</th><th>recency</th><th>freq</th><th>monetary</th><th>segment</th></tr></thead>
                  <tbody>
                    <tr><td>Alice Nguyen</td><td>~400d</td><td>3</td><td>31.1M</td><td>Loyal</td></tr>
                    <tr><td>Eva Do</td><td>~60d</td><td>1</td><td>780K</td><td>Potential</td></tr>
                    <tr><td>Hung Ly</td><td>~460d</td><td>1</td><td>1.98M</td><td>At Risk</td></tr>
                  </tbody>
                </table>
                <div class="result-note">Kết quả recency thay đổi theo ngày chạy query (CURRENT_DATE).</div>`
            })
          },
          {
            heading: "Q9 — Moving Average 3 tháng",
            html: buildExercise({
              level: "Expert",
              task: "Moving average 3 tháng của doanh thu + month-over-month growth %.",
              thinking: [
                "AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)",
                "LAG(revenue) để tính mom_change",
                "NULLIF trong phép chia để tránh div/0"
              ],
              sql: `WITH monthly_rev AS (
    SELECT
        DATE_TRUNC('month', o.order_date) AS month,
        SUM(oi.quantity * oi.unit_price)  AS revenue
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.status = 'completed'
    GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT month, revenue,
    ROUND(AVG(revenue) OVER (
        ORDER BY month
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 0) AS moving_avg_3m,
    revenue - LAG(revenue) OVER (ORDER BY month) AS mom_change,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month))
        * 100.0 / NULLIF(LAG(revenue) OVER (ORDER BY month), 0)
    , 2) AS mom_growth_pct
FROM monthly_rev
ORDER BY month;`,
              result: `<div class="result-note">Jan 2023: revenue=25.9M, moving_avg=25.9M (chỉ 1 tháng). Feb 2023: revenue=0.76M, mom_change=-25.14M. Moving avg làm dữ liệu mượt hơn để nhìn xu hướng.</div>`
            })
          }
        ]
      }
    ]
  }
];



/* =========================================================
   STATE
========================================================= */

let currentPartIndex = 0;
let currentLessonIndex = 0;
let currentSearchKeyword = "";
let isInitialized = false;

let sidebarTitle  = null;
let sidebarList   = null;
let lessonLabel   = null;
let lessonTitle   = null;
let lessonContent = null;
let prevBtn       = null;
let nextBtn       = null;


/* =========================================================
   INIT
========================================================= */

window.addEventListener("common-loaded", initPracticeB1);

window.addEventListener("global-search", event => {
  currentSearchKeyword = event.detail?.keyword || "";
  applySearch(currentSearchKeyword);
});

function initPracticeB1(event) {
  if (isInitialized) return;

  currentPartIndex  = normalizePartIndex(event?.detail?.currentPartIndex, practiceParts.length);
  currentLessonIndex = getCurrentLessonIndex(currentPartIndex);

  sidebarTitle  = document.getElementById("sidebarTitle");
  sidebarList   = document.getElementById("sidebarList");
  lessonLabel   = document.getElementById("lessonLabel");
  lessonTitle   = document.getElementById("lessonTitle");
  lessonContent = document.getElementById("lessonContent");
  prevBtn       = document.getElementById("prevBtn");
  nextBtn       = document.getElementById("nextBtn");

  const required = [sidebarTitle, sidebarList, lessonLabel, lessonTitle, lessonContent, prevBtn, nextBtn];

  if (required.some(el => !el)) {
    console.error("Practice B1 init failed: missing DOM elements.");
    return;
  }

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
  const part = practiceParts[currentPartIndex];

  sidebarTitle.textContent = part.sidebarTitle;

  sidebarList.innerHTML = `
    <div class="sidebar-section-label">${part.title}</div>
    ${part.lessons.map((lesson, index) => `
      <a class="sidebar-link ${index === currentLessonIndex ? "active" : ""}" data-lesson-index="${index}">
        ${lesson.title}
      </a>
    `).join("")}
  `;

  sidebarList.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", () => {
      currentLessonIndex = Number(link.dataset.lessonIndex);
      renderAll();
      scrollContentTop();
    });
  });
}

function renderLesson() {
  exerciseCounter = 0;

  const part   = practiceParts[currentPartIndex];
  const lesson = part.lessons[currentLessonIndex];

  lessonLabel.textContent = lesson.label;
  lessonTitle.textContent = lesson.title;

  lessonContent.innerHTML = lesson.blocks.map(block => `
    <section class="lesson-block">
      <h2>${block.heading}</h2>
      ${block.html}
    </section>
  `).join("");

  prevBtn.disabled = currentPartIndex === 0 && currentLessonIndex === 0;

  nextBtn.disabled =
    currentPartIndex === practiceParts.length - 1 &&
    currentLessonIndex === part.lessons.length - 1;
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
    currentLessonIndex = practiceParts[currentPartIndex].lessons.length - 1;
  }

  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll();
  scrollContentTop();
}

function goNext() {
  const part = practiceParts[currentPartIndex];

  if (currentLessonIndex < part.lessons.length - 1) {
    currentLessonIndex++;
  } else if (currentPartIndex < practiceParts.length - 1) {
    currentPartIndex++;
    currentLessonIndex = 0;
  }

  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll();
  scrollContentTop();
}


/* =========================================================
   SEARCH
========================================================= */

function applySearch(keyword) {
  const normalized = String(keyword || "").trim().toLowerCase();

  document.querySelectorAll(".lesson-block").forEach(block => {
    block.style.display =
      !normalized || block.textContent.toLowerCase().includes(normalized)
        ? ""
        : "none";
  });

  updateSearchEmptyState(normalized);
}

function updateSearchEmptyState(normalizedKeyword) {
  const old = lessonContent.querySelector(".search-empty-state");

  if (old) old.remove();

  if (!normalizedKeyword) return;

  const visible = Array.from(
    lessonContent.querySelectorAll(".lesson-block")
  ).filter(block => block.style.display !== "none");

  if (visible.length > 0) return;

  lessonContent.insertAdjacentHTML(
    "beforeend",
    `<div class="search-empty-state">Không tìm thấy nội dung phù hợp.</div>`
  );
}


/* =========================================================
   URL / STATE UTILITIES
========================================================= */

function getCurrentLessonIndex(partIndex) {
  const params    = new URLSearchParams(window.location.search);
  const rawLesson = params.get("lesson");

  if (rawLesson === null) return 0;

  const byIndex = Number(rawLesson);

  if (Number.isInteger(byIndex)) {
    return normalizeLessonIndex(partIndex, byIndex);
  }

  const found = practiceParts[partIndex].lessons.findIndex(lesson => lesson.id === rawLesson);

  return found < 0 ? 0 : found;
}

function normalizePartIndex(value, total) {
  const index = Number(value);

  if (!Number.isInteger(index) || index < 0 || index >= total) {
    return 0;
  }

  return index;
}

function normalizeLessonIndex(partIndex, lessonIndex) {
  const part = practiceParts[partIndex];

  if (!part) return 0;

  const index = Number(lessonIndex);

  if (!Number.isInteger(index) || index < 0 || index >= part.lessons.length) {
    return 0;
  }

  return index;
}

function syncUrlState(partIndex, lessonIndex) {
  const part   = practiceParts[partIndex];
  const lesson = part?.lessons?.[lessonIndex];

  if (!part || !lesson) return;

  const url = new URL(window.location.href);

  url.searchParams.set("part", String(partIndex));
  url.searchParams.set("lesson", lesson.id);

  window.history.replaceState({}, "", url.toString());
  window.dispatchEvent(new CustomEvent("part-changed"));
}

function scrollContentTop() {
  document.querySelector(".content-body")?.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  document.querySelector(".content")?.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}  
  