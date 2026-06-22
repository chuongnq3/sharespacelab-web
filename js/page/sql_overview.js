/* =========================================================
   SQL OVERVIEW DATA
========================================================= */

const courseParts = [
  {
    id: "part-1",
    title: "Phần 1",
    subtitle: "Tổng quan SQL và ý nghĩa ra đời",
    sidebarTitle: "SQL Tutorial",
    lessons: [
      {
        id: "intro",
        title: "SQL Intro",
        label: "Phần 1 · SQL Foundation",
        blocks: [
          {
            heading: "Introduction to SQL",
            html: `
              <p>
                SQL là viết tắt của <b>Structured Query Language</b>.
                Đây là ngôn ngữ dùng để truy vấn, tổng hợp, kiểm tra và thao tác dữ liệu trong database.
              </p>

              <div class="callout">
                SQL không chỉ là ngôn ngữ lập trình. SQL là ngôn ngữ để hỏi dữ liệu.
              </div>
            `
          },
          {
            heading: "What is SQL?",
            html: `
              <p>
                SQL là chuẩn ngôn ngữ dùng để làm việc với dữ liệu có cấu trúc.
                Dữ liệu thường được lưu trong các bảng, gồm hàng và cột.
              </p>

              <ul>
                <li>SQL giúp truy xuất dữ liệu từ database.</li>
                <li>SQL giúp tổng hợp dữ liệu theo business question.</li>
                <li>SQL giúp kiểm tra, đối chiếu và phân tích dữ liệu.</li>
                <li>SQL là nền tảng quan trọng của Data Analyst, Business Analyst, Risk Analyst và BI.</li>
              </ul>
            `
          },
          {
            heading: "What can SQL do?",
            html: `
              <ul>
                <li>Lọc dữ liệu theo điều kiện.</li>
                <li>Tổng hợp dữ liệu theo nhóm.</li>
                <li>Kết nối nhiều bảng dữ liệu.</li>
                <li>Tính toán chỉ số, tỷ lệ, chênh lệch, xu hướng.</li>
                <li>Phát hiện bất thường trong dữ liệu.</li>
              </ul>

              <pre><code>SELECT branch_code,
       SUM(balance) AS total_balance
FROM loan_balance
WHERE report_month = '202605'
GROUP BY branch_code
ORDER BY total_balance DESC;</code></pre>
            `
          }
        ]
      },
      {
        id: "why-sql",
        title: "Vì sao SQL ra đời?",
        label: "Phần 1 · SQL Foundation",
        blocks: [
          {
            heading: "Vấn đề dữ liệu trong doanh nghiệp",
            html: `
              <p>
                Doanh nghiệp phát sinh dữ liệu liên tục: khách hàng, giao dịch,
                dư nợ, số dư, rủi ro, vận hành, báo cáo.
              </p>

              <p>
                Khi dữ liệu tăng lên hàng triệu hoặc hàng tỷ dòng,
                con người không thể xử lý thủ công bằng file rời rạc.
              </p>
            `
          },
          {
            heading: "SQL giải quyết vấn đề gì?",
            html: `
              <table>
                <thead>
                  <tr>
                    <th>Vấn đề</th>
                    <th>SQL hỗ trợ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dữ liệu lớn, khó tìm kiếm</td>
                    <td>Lọc và truy vấn nhanh theo điều kiện</td>
                  </tr>
                  <tr>
                    <td>Cần báo cáo tổng hợp</td>
                    <td>GROUP BY, SUM, COUNT, AVG</td>
                  </tr>
                  <tr>
                    <td>Dữ liệu nằm ở nhiều bảng</td>
                    <td>JOIN để kết nối bảng</td>
                  </tr>
                  <tr>
                    <td>Cần phân tích biến động theo kỳ</td>
                    <td>LAG, LEAD, window function</td>
                  </tr>
                </tbody>
              </table>
            `
          }
        ]
      },
      {
        id: "ai-era",
        title: "SQL trong thời đại AI",
        label: "Phần 1 · AI Era",
        blocks: [
          {
            heading: "Cách học SQL đang thay đổi",
            html: `
              <p>
                Trước đây, người học thường bắt đầu bằng việc nhớ syntax.
                Hiện nay, AI có thể hỗ trợ sinh câu SQL khá tốt.
              </p>

              <div class="note">
                Kỹ năng quan trọng hơn là hiểu bài toán, hiểu dữ liệu,
                mô tả logic và validate kết quả.
              </div>
            `
          },
          {
            heading: "Quy trình hiện đại",
            html: `
              <div class="flow">
                <span>Business Question</span>
                <span>Hiểu dữ liệu</span>
                <span>Mô tả logic</span>
                <span>AI generate SQL</span>
                <span>Validate output</span>
                <span>Insight</span>
              </div>
            `
          },
          {
            heading: "Thông điệp chính",
            html: `
              <div class="callout">
                AI có thể viết SQL giúp bạn,
                nhưng AI không thể tự chịu trách nhiệm thay bạn về ý nghĩa business của kết quả.
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    id: "part-2",
    title: "Phần 2",
    subtitle: "Các loại dữ liệu và hệ quản trị cơ sở dữ liệu",
    sidebarTitle: "Data & Database",
    lessons: [
      {
        id: "data-types",
        title: "Các loại dữ liệu",
        label: "Phần 2 · Data Landscape",
        blocks: [
          {
            heading: "Structured, Semi-structured, Unstructured",
            html: `
              <p>
                Trong thực tế, không phải dữ liệu nào cũng giống nhau.
                Mỗi loại dữ liệu có cách lưu trữ, xử lý và hệ quản trị phù hợp riêng.
              </p>

              <div class="data-type-grid">
                <div class="data-type-card">
                  <div class="data-type-header">
                    <div class="data-type-badge">01</div>

                    <div class="data-type-title-wrap">
                      <h3>Structured Data</h3>
                      <div class="data-type-subtitle">Relational / Tabular Data</div>
                    </div>
                  </div>

                  <p class="data-type-desc">
                    Dữ liệu có cấu trúc rõ ràng theo hàng và cột, schema cố định.
                    Đây là loại dữ liệu phổ biến nhất trong hệ thống giao dịch, báo cáo và phân tích truyền thống.
                  </p>

                  <div class="data-example-box">
                    <div class="data-example-title">Ví dụ đặc trưng</div>
                    <p>Core banking / dữ liệu tài khoản khách hàng</p>
                  </div>

                  <table class="mini-data-table">
                    <thead>
                      <tr>
                        <th>customer_id</th>
                        <th>account_no</th>
                        <th>balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>C001</td>
                        <td>001</td>
                        <td>15,000,000</td>
                      </tr>
                      <tr>
                        <td>C002</td>
                        <td>002</td>
                        <td>8,000,000</td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="data-meta">
                    <span>Oracle</span>
                    <span>PostgreSQL</span>
                    <span>SQL Server</span>
                  </div>

                  <pre><code>SELECT customer_id,
       SUM(balance) AS total_balance
FROM accounts
GROUP BY customer_id;</code></pre>
                </div>

                <div class="data-type-card">
                  <div class="data-type-header">
                    <div class="data-type-badge">02</div>

                    <div class="data-type-title-wrap">
                      <h3>Semi-structured Data</h3>
                      <div class="data-type-subtitle">JSON / XML / Event Payload</div>
                    </div>
                  </div>

                  <p class="data-type-desc">
                    Dữ liệu có cấu trúc linh hoạt, thường ở dạng JSON hoặc XML.
                    Kiểu dữ liệu này phổ biến trong API, log ứng dụng và event tracking.
                  </p>

                  <div class="data-example-box">
                    <div class="data-example-title">Ví dụ đặc trưng</div>
                    <p>API response / mobile app event / application log</p>
                  </div>

                  <pre><code>{
  "customer_id": "C001",
  "device": "iphone",
  "login_time": "2026-05-27",
  "actions": ["login", "view_balance"]
}</code></pre>

                  <div class="data-meta">
                    <span>MongoDB</span>
                    <span>PostgreSQL JSONB</span>
                    <span>BigQuery</span>
                  </div>

                  <pre><code>SELECT payload->>'customer_id' AS customer_id
FROM app_logs;</code></pre>
                </div>

                <div class="data-type-card">
                  <div class="data-type-header">
                    <div class="data-type-badge">03</div>

                    <div class="data-type-title-wrap">
                      <h3>Unstructured Data</h3>
                      <div class="data-type-subtitle">Document / Image / Audio / Text</div>
                    </div>
                  </div>

                  <p class="data-type-desc">
                    Dữ liệu không có cấu trúc bảng rõ ràng,
                    thường cần search, OCR, AI hoặc embedding để khai thác.
                  </p>

                  <div class="data-example-box">
                    <div class="data-example-title">Ví dụ đặc trưng</div>
                    <p>PDF hợp đồng, email, hình ảnh, file scan, call recording</p>
                  </div>

                  <div class="document-preview">
                    <div class="doc-line long"></div>
                    <div class="doc-line medium"></div>
                    <div class="doc-line short"></div>
                    <div class="doc-line medium"></div>
                  </div>

                  <div class="data-meta">
                    <span>Object Storage</span>
                    <span>Elasticsearch</span>
                    <span>Vector DB</span>
                  </div>

                  <div class="note">
                    Với unstructured data, cách khai thác thường không phải SQL truyền thống,
                    mà là search, OCR, embedding hoặc AI retrieval.
                  </div>
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: "dbms-types",
        title: "Các hệ quản trị CSDL",
        label: "Phần 2 · DBMS",
        blocks: [
          {
            heading: "Vì sao có nhiều loại database?",
            html: `
              <p>
                Không có một loại database nào tối ưu cho mọi bài toán.
                Mỗi loại database được sinh ra để giải quyết một nhóm nhu cầu riêng.
              </p>

              <div class="callout">
                Chọn database giống như chọn phương tiện:
                xe tải, xe bus, xe đua đều là xe, nhưng phục vụ các mục đích khác nhau.
              </div>
            `
          },
          {
            heading: "So sánh các hệ quản trị CSDL phổ biến",
            html: `
              <table>
                <thead>
                  <tr>
                    <th>DBMS</th>
                    <th>Phục vụ mục đích</th>
                    <th>Ưu điểm</th>
                    <th>SQL đặc trưng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Oracle</b></td>
                    <td>Banking, finance, enterprise workload</td>
                    <td>Transaction mạnh, PL/SQL, partition, security</td>
                    <td>NVL, DECODE, MERGE, CONNECT BY</td>
                  </tr>
                  <tr>
                    <td><b>PostgreSQL</b></td>
                    <td>Modern app, analytics, open-source system</td>
                    <td>JSONB, extension, window function tốt</td>
                    <td>JSONB, ARRAY, FILTER, RETURNING</td>
                  </tr>
                  <tr>
                    <td><b>SQL Server</b></td>
                    <td>Microsoft ecosystem, BI/reporting</td>
                    <td>Tích hợp Power BI, SSIS, SSRS</td>
                    <td>TOP, TRY_CONVERT, T-SQL</td>
                  </tr>
                  <tr>
                    <td><b>MySQL</b></td>
                    <td>Web app, hệ thống vừa và nhỏ</td>
                    <td>Dễ học, phổ biến, vận hành đơn giản</td>
                    <td>LIMIT, IFNULL</td>
                  </tr>
                  <tr>
                    <td><b>IBM DB2</b></td>
                    <td>Mainframe, banking core system, enterprise legacy</td>
                    <td>Ổn định cao, transaction mạnh, tối ưu workload lớn</td>
                    <td>FETCH FIRST, OLAP function, recursive SQL</td>
                  </tr>
                </tbody>
              </table>

              <div class="note">
                Trong banking và enterprise lớn, Oracle và DB2 thường xuất hiện nhiều
                do khả năng xử lý transaction, độ ổn định và compatibility với hệ thống legacy lâu năm.
              </div>
            `
          }
        ]
      },
      {
        id: "oltp-olap",
        title: "OLTP, OLAP, Data Warehouse",
        label: "Phần 2 · Data Architecture",
        blocks: [
          {
            heading: "OLTP vs OLAP",
            html: `
              <table>
                <thead>
                  <tr>
                    <th>Tiêu chí</th>
                    <th>OLTP</th>
                    <th>OLAP / Data Warehouse</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mục tiêu</td>
                    <td>Xử lý giao dịch hằng ngày</td>
                    <td>Phân tích, báo cáo, BI</td>
                  </tr>
                  <tr>
                    <td>Ví dụ</td>
                    <td>Chuyển tiền, mở tài khoản, cập nhật khoản vay</td>
                    <td>Báo cáo dư nợ, xu hướng CASA, NPL trend</td>
                  </tr>
                  <tr>
                    <td>Query</td>
                    <td>Nhiều insert/update nhỏ</td>
                    <td>Nhiều select, join, group by lớn</td>
                  </tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "Data flow thực tế",
            html: `
              <div class="flow">
                <span>Business Activity</span>
                <span>Operational System</span>
                <span>ETL/ELT</span>
                <span>Data Warehouse</span>
                <span>Data Mart</span>
                <span>Dashboard / Report</span>
              </div>
            `
          }
        ]
      }
    ]
  }
  ,
//   {
//     id: "part-3",
//     title: "Phần 3",
//     subtitle: "Tư duy phân tích dữ liệu bằng SQL",
//     sidebarTitle: "SQL Analytics",
//     lessons: [
//       {
//         id: "grain-key",
//         title: "Grain, Key và Relationship",
//         label: "Phần 3 · Data Thinking",
//         blocks: [
//           {
//             heading: "Grain là gì?",
//             html: `
//               <p>
//                 Grain là ý nghĩa của một dòng dữ liệu.
//                 Một dòng có thể đại diện cho một khách hàng, một tài khoản,
//                 một giao dịch hoặc một snapshot theo kỳ.
//               </p>

//               <div class="warning">
//                 Sai grain là một trong những nguyên nhân phổ biến nhất
//                 làm phân tích SQL sai business.
//               </div>
//             `
//           },
//           {
//             heading: "Key và relationship",
//             html: `
//               <ul>
//                 <li><b>Primary key:</b> khóa định danh duy nhất của bảng.</li>
//                 <li><b>Foreign key:</b> khóa dùng để liên kết sang bảng khác.</li>
//                 <li><b>Cardinality:</b> quan hệ 1-1, 1-nhiều hoặc nhiều-nhiều.</li>
//               </ul>
//             `
//           }
//         ]
//       },
//       {
//         id: "snapshot-transaction",
//         title: "Snapshot vs Transaction",
//         label: "Phần 3 · Banking Data",
//         blocks: [
//           {
//             heading: "Snapshot data",
//             html: `
//               <p>
//                 <b>Snapshot data</b> là dữ liệu ghi nhận trạng thái tại một thời điểm cụ thể.
//                 Trong banking, snapshot thường dùng để xem số dư, dư nợ, trạng thái nợ nhóm
//                 hoặc thông tin khách hàng tại ngày báo cáo.
//               </p>

//               <div class="note">
//                 Snapshot trả lời câu hỏi: <b>“Tại thời điểm này, trạng thái là gì?”</b>
//               </div>

//               <table>
//                 <thead>
//                   <tr>
//                     <th>report_date</th>
//                     <th>customer_id</th>
//                     <th>account_no</th>
//                     <th>balance</th>
//                     <th>debt_group</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>2026-05-31</td>
//                     <td>C001</td>
//                     <td>A001</td>
//                     <td>15,000,000</td>
//                     <td>1</td>
//                   </tr>
//                   <tr>
//                     <td>2026-05-31</td>
//                     <td>C002</td>
//                     <td>A002</td>
//                     <td>8,000,000</td>
//                     <td>2</td>
//                   </tr>
//                   <tr>
//                     <td>2026-05-31</td>
//                     <td>C003</td>
//                     <td>A003</td>
//                     <td>22,000,000</td>
//                     <td>1</td>
//                   </tr>
//                 </tbody>
//               </table>

//               <pre><code>SELECT report_date,
//        SUM(balance) AS total_balance
// FROM account_snapshot
// WHERE report_date = DATE '2026-05-31'
// GROUP BY report_date;</code></pre>
//             `
//           },
//           {
//             heading: "Transaction data",
//             html: `
//               <p>
//                 <b>Transaction data</b> là dữ liệu ghi nhận từng phát sinh trong một khoảng thời gian.
//                 Mỗi dòng thường là một giao dịch, một lần thanh toán, một lần giải ngân,
//                 hoặc một sự kiện phát sinh trong hệ thống.
//               </p>

//               <div class="note">
//                 Transaction trả lời câu hỏi: <b>“Trong khoảng thời gian này, đã phát sinh những gì?”</b>
//               </div>

//               <table>
//                 <thead>
//                   <tr>
//                     <th>transaction_time</th>
//                     <th>customer_id</th>
//                     <th>account_no</th>
//                     <th>transaction_type</th>
//                     <th>amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>2026-05-01 09:15</td>
//                     <td>C001</td>
//                     <td>A001</td>
//                     <td>Deposit</td>
//                     <td>3,000,000</td>
//                   </tr>
//                   <tr>
//                     <td>2026-05-03 14:20</td>
//                     <td>C001</td>
//                     <td>A001</td>
//                     <td>Withdraw</td>
//                     <td>-1,000,000</td>
//                   </tr>
//                   <tr>
//                     <td>2026-05-10 10:05</td>
//                     <td>C002</td>
//                     <td>A002</td>
//                     <td>Repayment</td>
//                     <td>2,500,000</td>
//                   </tr>
//                 </tbody>
//               </table>

//               <pre><code>SELECT customer_id,
//        SUM(amount) AS total_movement
// FROM account_transaction
// WHERE transaction_time >= DATE '2026-05-01'
//   AND transaction_time <  DATE '2026-06-01'
// GROUP BY customer_id;</code></pre>
//             `
//           },
//           {
//             heading: "So sánh nhanh",
//             html: `
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Tiêu chí</th>
//                     <th>Snapshot data</th>
//                     <th>Transaction data</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>Câu hỏi chính</td>
//                     <td>Tại thời điểm này trạng thái là gì?</td>
//                     <td>Trong giai đoạn này đã phát sinh gì?</td>
//                   </tr>
//                   <tr>
//                     <td>Ví dụ</td>
//                     <td>Số dư cuối ngày, dư nợ cuối tháng, nợ nhóm tại ngày báo cáo</td>
//                     <td>Giao dịch chuyển tiền, trả nợ, giải ngân, rút tiền</td>
//                   </tr>
//                   <tr>
//                     <td>Trường thời gian</td>
//                     <td>report_date, backup_date, snapshot_date</td>
//                     <td>transaction_time, created_at, posting_date</td>
//                   </tr>
//                   <tr>
//                     <td>Kiểu phân tích thường gặp</td>
//                     <td>So sánh T vs T-1, trend theo kỳ, trạng thái cuối kỳ</td>
//                     <td>Tổng phát sinh, dòng tiền vào/ra, frequency, volume</td>
//                   </tr>
//                 </tbody>
//               </table>

//               <div class="warning">
//                 Không được cộng nhiều ngày snapshot lại với nhau như transaction.
//                 Snapshot là trạng thái tại thời điểm, còn transaction là phát sinh theo dòng thời gian.
//               </div>
//             `
//           }
//         ]
//       },
//       {
//         id: "validation",
//         title: "Query đúng syntax ≠ đúng business",
//         label: "Phần 3 · Validation Mindset",
//         blocks: [
//           {
//             heading: "Lỗi join làm nhân dòng",
//             html: `
//               <pre><code>SELECT a.cif,
//        a.balance,
//        b.segment
// FROM loan_balance a
// LEFT JOIN customer_segment b
//   ON a.cif = b.cif;</code></pre>

//               <div class="warning">
//                 Nếu bảng customer_segment có nhiều dòng cho một CIF,
//                 balance có thể bị nhân lên sau join.
//               </div>
//             `
//           },
//           {
//             heading: "Checklist validate",
//             html: `
//               <ul>
//                 <li>Kiểm tra số dòng trước và sau join.</li>
//                 <li>Kiểm tra duplicate theo key chính.</li>
//                 <li>Kiểm tra tổng trước và sau khi enrich dữ liệu.</li>
//                 <li>Kiểm tra null/missing key.</li>
//                 <li>Đối chiếu với report hoặc nguồn chuẩn.</li>
//               </ul>
//             `
//           }
//         ]
//       }
//     ]
//   }
];

/* =========================================================
   STATE
========================================================= */

let currentPartIndex = 0;
let currentLessonIndex = 0;
let currentSearchKeyword = "";
let isInitialized = false;

let sidebarTitle = null;
let sidebarList = null;
let lessonLabel = null;
let lessonTitle = null;
let lessonContent = null;
let prevBtn = null;
let nextBtn = null;

/* =========================================================
   INIT
========================================================= */

window.addEventListener("common-loaded", initSqlOverview);

window.addEventListener("global-search", event => {
  currentSearchKeyword = event.detail?.keyword || "";
  applySearch(currentSearchKeyword);
});

function initSqlOverview(event) {
  if (isInitialized) return;

  currentPartIndex = normalizePartIndex(
    event?.detail?.currentPartIndex,
    courseParts.length
  );

  currentLessonIndex = 0;

  sidebarTitle = document.getElementById("sidebarTitle");
  sidebarList = document.getElementById("sidebarList");
  lessonLabel = document.getElementById("lessonLabel");
  lessonTitle = document.getElementById("lessonTitle");
  lessonContent = document.getElementById("lessonContent");
  prevBtn = document.getElementById("prevBtn");
  nextBtn = document.getElementById("nextBtn");

  const requiredElements = [
    sidebarTitle,
    sidebarList,
    lessonLabel,
    lessonTitle,
    lessonContent,
    prevBtn,
    nextBtn
  ];

  if (requiredElements.some(element => !element)) {
    console.error("SQL Overview init failed: missing required DOM elements.");
    return;
  }

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  isInitialized = true;

  renderAll();
}

/* =========================================================
   RENDER
========================================================= */

function renderSidebar() {
  const part = courseParts[currentPartIndex];

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
  const part = courseParts[currentPartIndex];
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
    currentPartIndex === courseParts.length - 1 &&
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
    currentLessonIndex = courseParts[currentPartIndex].lessons.length - 1;
    syncUrlPart(currentPartIndex);
  }

  renderAll();
  scrollContentTop();
}

function goNext() {
  const part = courseParts[currentPartIndex];

  if (currentLessonIndex < part.lessons.length - 1) {
    currentLessonIndex++;
  } else if (currentPartIndex < courseParts.length - 1) {
    currentPartIndex++;
    currentLessonIndex = 0;
    syncUrlPart(currentPartIndex);
  }

  renderAll();
  scrollContentTop();
}

/* =========================================================
   SEARCH
========================================================= */

function applySearch(keyword) {
  const normalized = String(keyword || "").trim().toLowerCase();

  document.querySelectorAll(".lesson-block").forEach(block => {
    const raw = block.textContent.toLowerCase();

    block.style.display =
      !normalized || raw.includes(normalized)
        ? ""
        : "none";
  });
}

/* =========================================================
   URL / STATE UTILITIES
========================================================= */

function normalizePartIndex(value, totalParts) {
  const partIndex = Number(value);

  if (!Number.isInteger(partIndex)) return 0;
  if (partIndex < 0) return 0;
  if (partIndex >= totalParts) return 0;

  return partIndex;
}

function syncUrlPart(partIndex) {
  const url = new URL(window.location.href);

  url.searchParams.set("part", String(partIndex));

  window.history.replaceState({}, "", url.toString());
  window.dispatchEvent(new CustomEvent("part-changed"));
}

function scrollContentTop() {
  document.querySelector(".content-body")?.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}