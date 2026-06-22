/* =========================================================
   AUTO REPORT PAGE
   Structure:
   Phan 0: Gioi thieu & Boi canh
   Phan 1: Quy trinh & Trien khai
   Phan 2: Ky thuat — HTML & Python
   Phan 3: Van hanh & Rui ro
========================================================= */


/* =========================================================
   DATA
========================================================= */

const autoReportParts = [

  /* -------------------------------------------------------
     PART 0: GIOI THIEU & BOI CANH
  ------------------------------------------------------- */
  {
    id: "intro",
    title: "Phần 1",
    subtitle: "Giới thiệu & Bối cảnh",
    sidebarTitle: "Giới thiệu",
    lessons: [
      {
        id: "overview",
        title: "Tổng quan module",
        label: "Auto Report · Giới thiệu",
        blocks: [
          {
            heading: "Tự động hóa báo cáo từ Excel/CSV",
            html: `
              <div class="ar-hero">
                <div class="ar-hero-eyebrow">Automation Reporting · Python + GPT + HTML</div>
                <h2>Tự động hóa báo cáo từ Excel/CSV bằng GPT, Python và HTML</h2>
                <p>
                  Mục tiêu là xây dựng một quy trình giúp người dùng gửi file dữ liệu bất kỳ cho GPT phân tích,
                  chốt dashboard trực quan, chuyển thành HTML template có tham số, sau đó dùng Python cập nhật số liệu
                  tự động và đặt lịch chạy định kỳ bằng Windows Task Scheduler.
                </p>
                <div class="ar-hero-pills">
                  <span class="ar-hero-pill">Nguồn dữ liệu: Excel / CSV</span>
                  <span class="ar-hero-pill">Thiết kế: GPT hỗ trợ phân tích & dashboard</span>
                  <span class="ar-hero-pill">Tự động hóa: Python render HTML</span>
                  <span class="ar-hero-pill">Vận hành: PyInstaller + Task Scheduler</span>
                </div>
              </div>
            `
          }
        ]
      },

      {
        id: "goals",
        title: "Mục tiêu chính",
        label: "Auto Report · Mục tiêu",
        blocks: [
          {
            heading: "1. Mục tiêu chính",
            html: `
              <div class="ar-grid ar-grid-3">
                <div class="ar-card">
                  <h3>Chuẩn hóa báo cáo</h3>
                  <p>
                    Biến dữ liệu Excel/CSV thành một báo cáo HTML có bố cục cố định,
                    dễ đọc, dễ chia sẻ và không phụ thuộc thao tác copy thủ công.
                  </p>
                </div>
                <div class="ar-card">
                  <h3>Giảm sai sót số liệu</h3>
                  <p>
                    Số liệu được tính trực tiếp từ file đầu vào bằng Python, hạn chế lỗi
                    nhập tay, sai kỳ dữ liệu hoặc quên cập nhật chỉ tiêu.
                  </p>
                </div>
                <div class="ar-card">
                  <h3>Tự động chạy định kỳ</h3>
                  <p>
                    Đóng gói thành file chạy độc lập và đặt lịch bằng Task Scheduler
                    để báo cáo tự cập nhật theo ngày, tuần hoặc tháng.
                  </p>
                </div>
              </div>
            `
          }
        ]
      },

      {
        id: "context",
        title: "Bối cảnh vấn đề",
        label: "Auto Report · Bối cảnh",
        blocks: [
          {
            heading: "2. Bối cảnh và vấn đề hiện tại",
            html: `
              <div class="ar-grid ar-grid-2">
                <div class="ar-card">
                  <h3>Cách làm thủ công</h3>
                  <ul>
                    <li>Người dùng lấy dữ liệu từ Excel/CSV.</li>
                    <li>Tự tính KPI, vẽ biểu đồ, viết nhận định.</li>
                    <li>Copy số liệu sang PowerPoint, Word, email hoặc HTML.</li>
                    <li>Mỗi lần dữ liệu thay đổi phải làm lại nhiều bước.</li>
                  </ul>
                </div>
                <div class="ar-card">
                  <h3>Cách làm đề xuất</h3>
                  <ul>
                    <li>GPT hỗ trợ đọc hiểu dữ liệu và đề xuất dashboard.</li>
                    <li>HTML chỉ đóng vai trò template trình bày.</li>
                    <li>Python đọc dữ liệu mới và thay vào các tham số.</li>
                    <li>Task Scheduler tự chạy script theo lịch cố định.</li>
                  </ul>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },

  /* -------------------------------------------------------
     PART 1: QUY TRINH & TRIEN KHAI
  ------------------------------------------------------- */
  {
    id: "process",
    title: "Phần 2",
    subtitle: "Quy trình & Triển khai",
    sidebarTitle: "Quy trình",
    lessons: [
      {
        id: "flow",
        title: "Quy trình tổng thể",
        label: "Auto Report · Quy trình",
        blocks: [
          {
            heading: "3. Quy trình tổng thể",
            html: `
              <p style="color: var(--muted); margin-bottom: 16px;">
                Quy trình nên đi từ hiểu dữ liệu → chốt thiết kế → tham số hóa template → tự động hóa bằng code.
              </p>
              <div class="ar-flow">
                <div class="ar-flow-node">📊 Excel / CSV</div>
                <div class="ar-flow-arrow">→</div>
                <div class="ar-flow-node">🤖 GPT phân tích</div>
                <div class="ar-flow-arrow">→</div>
                <div class="ar-flow-node">🖼 Dashboard mockup</div>
                <div class="ar-flow-arrow">→</div>
                <div class="ar-flow-node">📄 HTML template</div>
                <div class="ar-flow-arrow">→</div>
                <div class="ar-flow-node">🐍 Python render</div>
                <div class="ar-flow-arrow">→</div>
                <div class="ar-flow-node">📬 Auto report</div>
              </div>
            `
          }
        ]
      },

      {
        id: "steps",
        title: "Các bước triển khai",
        label: "Auto Report · Chi tiết bước",
        blocks: [
          {
            heading: "4. Các bước triển khai chi tiết",
            html: `
              <table>
                <thead>
                  <tr>
                    <th>Bước</th>
                    <th>Nội dung thực hiện</th>
                    <th>Đầu ra mong muốn</th>
                    <th>Lưu ý</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Bước 1</strong><br/>Gửi dữ liệu</td>
                    <td>Người dùng gửi file Excel/CSV bất kỳ cho GPT để đọc hiểu cấu trúc dữ liệu.</td>
                    <td><span class="ar-tag ar-tag--blue">Data Understanding</span><br/>Danh sách cột, kiểu dữ liệu, KPI tiềm năng.</td>
                    <td>Cần kiểm tra sheet, cột ngày, cột số tiền, nhóm phân loại và dữ liệu thiếu.</td>
                  </tr>
                  <tr>
                    <td><strong>Bước 2</strong><br/>Phân tích & đề xuất</td>
                    <td>GPT phân tích dữ liệu, đề xuất KPI, biểu đồ, insight và bố cục báo cáo.</td>
                    <td><span class="ar-tag ar-tag--ok">Dashboard Concept</span><br/>Danh sách KPI, bảng, biểu đồ và nhận định.</td>
                    <td>Không nên viết code ngay khi chưa chốt logic nghiệp vụ.</td>
                  </tr>
                  <tr>
                    <td><strong>Bước 3</strong><br/>Tạo ảnh dashboard</td>
                    <td>GPT tạo ảnh hoặc mockup dashboard để người dùng chốt cách trình bày.</td>
                    <td><span class="ar-tag ar-tag--ok">Approved Layout</span><br/>Bố cục trình bày đã được duyệt.</td>
                    <td>Giúp tránh sửa đi sửa lại HTML nhiều lần.</td>
                  </tr>
                  <tr>
                    <td><strong>Bước 4</strong><br/>Tạo HTML tham số</td>
                    <td>GPT chuyển dashboard sang HTML nhưng để số liệu dưới dạng biến như {{TOTAL_REVENUE}}.</td>
                    <td><span class="ar-tag ar-tag--blue">HTML Template</span><br/>Template trình bày có placeholder.</td>
                    <td>Phải tách số liệu động khỏi phần giao diện tĩnh.</td>
                  </tr>
                  <tr>
                    <td><strong>Bước 5</strong><br/>Viết Python</td>
                    <td>Python đọc Excel/CSV, tính KPI, thay placeholder vào HTML và xuất báo cáo mới.</td>
                    <td><span class="ar-tag ar-tag--ok">Auto Render</span><br/>report.html cập nhật tự động.</td>
                    <td>Nên có file config và log để dễ vận hành.</td>
                  </tr>
                  <tr>
                    <td><strong>Bước 6</strong><br/>Đóng gói & đặt lịch</td>
                    <td>Dùng PyInstaller tạo file .exe và Task Scheduler để chạy định kỳ.</td>
                    <td><span class="ar-tag ar-tag--ok">Scheduled Report</span><br/>Báo cáo tự động theo lịch.</td>
                    <td>Cần kiểm tra quyền đọc/ghi thư mục và đường dẫn network nếu có.</td>
                  </tr>
                </tbody>
              </table>
            `
          }
        ]
      },

      {
        id: "dashboard-demo",
        title: "Minh họa dashboard",
        label: "Auto Report · Dashboard Demo",
        blocks: [
          {
            heading: "5. Minh họa dashboard sau khi chốt bố cục",
            html: `
              <p style="color: var(--muted); font-size: 14px; margin-bottom: 16px;">
                Đây là ví dụ về dashboard HTML với các placeholder chờ Python điền số liệu thực.
              </p>
              <div class="ar-dashboard">
                <div class="ar-kpi">
                  <div class="ar-kpi-label">Tổng doanh thu</div>
                  <div class="ar-kpi-value">{{TOTAL_REVENUE}}</div>
                </div>
                <div class="ar-kpi">
                  <div class="ar-kpi-label">Tăng trưởng kỳ này</div>
                  <div class="ar-kpi-value">{{GROWTH_RATE}}</div>
                </div>
                <div class="ar-kpi">
                  <div class="ar-kpi-label">Số giao dịch</div>
                  <div class="ar-kpi-value">{{TOTAL_TXN}}</div>
                </div>
                <div class="ar-chart">
                  <h4>Xu hướng theo tháng</h4>
                  <div class="ar-bar-wrap">
                    <div class="ar-bar" style="height: 45%;"></div>
                    <div class="ar-bar" style="height: 68%;"></div>
                    <div class="ar-bar" style="height: 54%;"></div>
                    <div class="ar-bar" style="height: 82%;"></div>
                    <div class="ar-bar" style="height: 74%;"></div>
                    <div class="ar-bar" style="height: 92%;"></div>
                  </div>
                </div>
                <div class="ar-card ar-card--highlight">
                  <h3>Insight chính</h3>
                  <p>{{MAIN_INSIGHT}}</p>
                  <p style="margin-top: 8px;">{{RISK_NOTE}}</p>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },

  /* -------------------------------------------------------
     PART 2: KY THUAT — HTML & PYTHON
  ------------------------------------------------------- */
  {
    id: "technical",
    title: "Phần 3",
    subtitle: "Kỹ thuật — HTML & Python",
    sidebarTitle: "Kỹ thuật",
    lessons: [
      {
        id: "html-params",
        title: "Tham số hóa HTML",
        label: "Auto Report · HTML Template",
        blocks: [
          {
            heading: "6. Nguyên tắc tham số hóa HTML",
            html: `
              <div class="ar-grid ar-grid-2">
                <div class="ar-card">
                  <h3>Không hard-code số liệu</h3>
                  <p>
                    HTML chỉ nên chứa placeholder. Mọi số liệu như KPI, tỷ lệ, nhận định,
                    ngày báo cáo nên được truyền từ Python.
                  </p>
                  <ul>
                    <li><strong>{{REPORT_DATE}}</strong> — ngày báo cáo</li>
                    <li><strong>{{TOTAL_REVENUE}}</strong> — tổng doanh thu</li>
                    <li><strong>{{GROWTH_RATE}}</strong> — tốc độ tăng trưởng</li>
                    <li><strong>{{MAIN_INSIGHT}}</strong> — nhận định chính</li>
                  </ul>
                </div>
                <div>
<pre class="ar-code">&lt;div class="kpi"&gt;
  &lt;div class="label"&gt;Tổng doanh thu&lt;/div&gt;
  &lt;div class="value"&gt;<span class="tok-param">{{TOTAL_REVENUE}}</span>&lt;/div&gt;
  &lt;div class="note"&gt;<span class="tok-param">{{REVENUE_COMMENT}}</span>&lt;/div&gt;
&lt;/div&gt;

&lt;section class="insight"&gt;
  &lt;h2&gt;Nhận định chính&lt;/h2&gt;
  &lt;p&gt;<span class="tok-param">{{MAIN_INSIGHT}}</span>&lt;/p&gt;
&lt;/section&gt;</pre>
                </div>
              </div>
            `
          }
        ]
      },

      {
        id: "python-render",
        title: "Python render tự động",
        label: "Auto Report · Python Logic",
        blocks: [
          {
            heading: "7. Python render HTML tự động",
            html: `
              <div class="ar-grid ar-grid-2">
                <div class="ar-card">
                  <h3>Logic chính của Python</h3>
                  <ul>
                    <li>Đọc file Excel/CSV từ thư mục <code>input/</code>.</li>
                    <li>Chuẩn hóa tên cột và kiểu dữ liệu.</li>
                    <li>Tính KPI, top/bottom, tỷ trọng, tăng trưởng.</li>
                    <li>Tạo dictionary tham số.</li>
                    <li>Replace placeholder trong HTML template.</li>
                    <li>Ghi file report HTML vào thư mục <code>output/</code>.</li>
                  </ul>
                </div>
                <div>
<pre class="ar-code"><span class="tok-kw">import</span> pandas <span class="tok-kw">as</span> pd
<span class="tok-kw">from</span> pathlib <span class="tok-kw">import</span> Path

input_file    = Path(<span class="tok-string">"input/data.xlsx"</span>)
template_file = Path(<span class="tok-string">"template/dashboard_template.html"</span>)
output_file   = Path(<span class="tok-string">"output/dashboard_report.html"</span>)

df = pd.read_excel(input_file)

params = {
    <span class="tok-param">"{{TOTAL_REVENUE}}"</span>: <span class="tok-string">f"{df['revenue'].sum():,.0f}"</span>,
    <span class="tok-param">"{{TOTAL_TXN}}"</span>:     <span class="tok-string">f"{len(df):,}"</span>,
    <span class="tok-param">"{{MAIN_INSIGHT}}"</span>: <span class="tok-string">"Doanh thu tăng mạnh ở nhóm khách hàng SME."</span>
}

html = template_file.read_text(encoding=<span class="tok-string">"utf-8"</span>)
<span class="tok-kw">for</span> key, value <span class="tok-kw">in</span> params.items():
    html = html.replace(key, str(value))

output_file.write_text(html, encoding=<span class="tok-string">"utf-8"</span>)</pre>
                </div>
              </div>
            `
          }
        ]
      },

      {
        id: "folder-structure",
        title: "Cấu trúc thư mục",
        label: "Auto Report · Folder Structure",
        blocks: [
          {
            heading: "8. Cấu trúc thư mục đề xuất",
            html: `
              <div class="ar-grid ar-grid-2">
<pre class="ar-code">auto_report_project/
│
├── input/
│   └── data.xlsx
│
├── template/
│   └── dashboard_template.html
│
├── output/
│   └── dashboard_report.html
│
├── logs/
│   └── run_YYYYMMDD.log
│
├── config/
│   └── config.json
│
└── main.py</pre>
                <div class="ar-card">
                  <h3>Lý do nên tách thư mục</h3>
                  <ul>
                    <li><strong>input/</strong> — chỉ chứa dữ liệu đầu vào.</li>
                    <li><strong>template/</strong> — chứa HTML mẫu, ít thay đổi.</li>
                    <li><strong>output/</strong> — chứa báo cáo đã render.</li>
                    <li><strong>logs/</strong> — ghi trạng thái chạy, lỗi và thời gian xử lý.</li>
                    <li><strong>config/</strong> — khai báo đường dẫn, tên cột, rule tính KPI.</li>
                  </ul>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },

  /* -------------------------------------------------------
     PART 3: VAN HANH & RUI RO
  ------------------------------------------------------- */
  {
    id: "operations",
    title: "Phần 4",
    subtitle: "Vận hành & Rủi ro",
    sidebarTitle: "Vận hành",
    lessons: [
      {
        id: "packaging",
        title: "Đóng gói & đặt lịch",
        label: "Auto Report · Vận hành",
        blocks: [
          {
            heading: "9. Đóng gói và đặt lịch chạy",
            html: `
              <table>
                <thead>
                  <tr>
                    <th>Thành phần</th>
                    <th>Vai trò</th>
                    <th>Lệnh / thao tác mẫu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>PyInstaller</strong></td>
                    <td>Đóng gói file Python thành <code>.exe</code> để chạy trên máy người dùng.</td>
                    <td>
                      <span class="ar-tag ar-tag--blue">Build</span><br/>
                      <code>pyinstaller --onefile --name auto_report main.py</code>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Task Scheduler</strong></td>
                    <td>Đặt lịch chạy file <code>.exe</code> theo ngày, tuần hoặc tháng.</td>
                    <td>
                      <span class="ar-tag ar-tag--ok">Schedule</span><br/>
                      Create Basic Task → Trigger → Action: Start a program
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Log file</strong></td>
                    <td>Theo dõi trạng thái thành công/thất bại của từng lần chạy.</td>
                    <td>
                      <span class="ar-tag ar-tag--warn">Operation</span><br/>
                      Ghi log start time, end time, input file, output file, error message.
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="note">
                <strong>Lưu ý vận hành:</strong> nếu input/output nằm trên shared folder hoặc network drive,
                cần kiểm tra quyền truy cập của user chạy Task Scheduler.
              </div>
            `
          }
        ]
      },

      {
        id: "timeline",
        title: "Kế hoạch triển khai",
        label: "Auto Report · Kế hoạch",
        blocks: [
          {
            heading: "10. Kế hoạch triển khai thử nghiệm",
            html: `
              <div class="ar-timeline">
                <div class="ar-phase">
                  <div class="ar-phase-badge">Giai đoạn 1</div>
                  <h3>Chốt dữ liệu mẫu</h3>
                  <ul>
                    <li>Chọn 1 file Excel/CSV thật.</li>
                    <li>Xác định các cột chính.</li>
                    <li>Chốt KPI cần báo cáo.</li>
                  </ul>
                </div>
                <div class="ar-phase">
                  <div class="ar-phase-badge">Giai đoạn 2</div>
                  <h3>Thiết kế dashboard</h3>
                  <ul>
                    <li>GPT đề xuất layout.</li>
                    <li>Tạo mockup ảnh.</li>
                    <li>Chốt màu sắc và bố cục.</li>
                  </ul>
                </div>
                <div class="ar-phase">
                  <div class="ar-phase-badge">Giai đoạn 3</div>
                  <h3>Code tự động hóa</h3>
                  <ul>
                    <li>Tạo HTML template.</li>
                    <li>Viết Python render.</li>
                    <li>Test với nhiều file dữ liệu.</li>
                  </ul>
                </div>
                <div class="ar-phase">
                  <div class="ar-phase-badge">Giai đoạn 4</div>
                  <h3>Vận hành</h3>
                  <ul>
                    <li>Đóng gói <code>.exe</code>.</li>
                    <li>Đặt lịch Task Scheduler.</li>
                    <li>Theo dõi log và cải tiến.</li>
                  </ul>
                </div>
              </div>
            `
          }
        ]
      },

      {
        id: "risks",
        title: "Rủi ro cần lưu ý",
        label: "Auto Report · Rủi ro",
        blocks: [
          {
            heading: "11. Rủi ro cần lưu ý",
            html: `
              <div class="ar-grid ar-grid-3">
                <div class="ar-card">
                  <h3>⚠ Dữ liệu đầu vào thay đổi</h3>
                  <p>
                    Tên cột hoặc cấu trúc sheet thay đổi có thể làm script lỗi.
                    Cần có bước kiểm tra schema trước khi tính toán.
                  </p>
                </div>
                <div class="ar-card">
                  <h3>⚠ Nhận định tự động chưa chuẩn</h3>
                  <p>
                    Các insight dạng text nên có rule rõ ràng hoặc cơ chế review
                    trước khi gửi báo cáo chính thức.
                  </p>
                </div>
                <div class="ar-card">
                  <h3>⚠ Lỗi vận hành định kỳ</h3>
                  <p>
                    Task Scheduler có thể lỗi do quyền thư mục, đường dẫn network,
                    thiếu file input hoặc máy không bật đúng thời điểm.
                  </p>
                </div>
              </div>
            `
          }
        ]
      },

      {
        id: "conclusion",
        title: "Kết luận",
        label: "Auto Report · Kết luận",
        blocks: [
          {
            heading: "12. Kết luận tóm tắt",
            html: `
              <div class="ar-conclusion">
                <div class="ar-conclusion-badge">
                  <span class="badge-main">GPT</span>
                  <span class="badge-sub">+ Python</span>
                </div>
                <div class="ar-conclusion-body">
                  <h3>Mô hình phù hợp để tự động hóa báo cáo lặp lại</h3>
                  <p>
                    GPT phù hợp để hỗ trợ đọc hiểu dữ liệu, đề xuất dashboard, viết HTML template
                    và sinh code Python ban đầu. Python phù hợp để vận hành ổn định, cập nhật số liệu
                    từ Excel/CSV và xuất báo cáo HTML tự động. Khi kết hợp thêm PyInstaller và
                    Task Scheduler, quy trình này có thể biến một báo cáo thủ công thành báo cáo
                    định kỳ tự chạy.
                  </p>
                  <ul>
                    <li><strong>GPT:</strong> phân tích, thiết kế, sinh template và hỗ trợ code.</li>
                    <li><strong>HTML:</strong> trình bày báo cáo đẹp, dễ mở trên trình duyệt.</li>
                    <li><strong>Python:</strong> đọc dữ liệu, tính số liệu, render output.</li>
                    <li><strong>Task Scheduler:</strong> tự động chạy theo lịch.</li>
                  </ul>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  }
];


/* =========================================================
   STATE
========================================================= */

let currentPartIndex    = 0;
let currentLessonIndex  = 0;
let currentSearchKeyword = "";
let isInitialized       = false;

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

window.addEventListener("common-loaded", initAutoReport);

window.addEventListener("global-search", event => {
  currentSearchKeyword = event.detail?.keyword || "";
  applySearch(currentSearchKeyword);
});

function initAutoReport(event) {
  if (isInitialized) return;

  currentPartIndex   = normalizePartIndex(event?.detail?.currentPartIndex, autoReportParts.length);
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
    console.error("Auto Report init failed: missing DOM elements.");
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
  const part = autoReportParts[currentPartIndex];

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
  const part   = autoReportParts[currentPartIndex];
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
    currentPartIndex === autoReportParts.length - 1 &&
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
    currentLessonIndex = autoReportParts[currentPartIndex].lessons.length - 1;
  }

  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll();
  scrollContentTop();
}

function goNext() {
  const part = autoReportParts[currentPartIndex];

  if (currentLessonIndex < part.lessons.length - 1) {
    currentLessonIndex++;
  } else if (currentPartIndex < autoReportParts.length - 1) {
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

  const found = autoReportParts[partIndex].lessons.findIndex(lesson => lesson.id === rawLesson);

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
  const part = autoReportParts[partIndex];

  if (!part) return 0;

  const index = Number(lessonIndex);

  if (!Number.isInteger(index) || index < 0 || index >= part.lessons.length) {
    return 0;
  }

  return index;
}

function syncUrlState(partIndex, lessonIndex) {
  const part   = autoReportParts[partIndex];
  const lesson = part?.lessons?.[lessonIndex];

  if (!part || !lesson) return;

  const url = new URL(window.location.href);

  url.searchParams.set("part", String(partIndex));
  url.searchParams.set("lesson", lesson.id);

  window.history.replaceState({}, "", url.toString());
  window.dispatchEvent(new CustomEvent("part-changed"));
}

function scrollContentTop() {
  document.querySelector(".content-body")?.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector(".content")?.scrollTo({ top: 0, behavior: "smooth" });
  window.scrollTo({ top: 0, behavior: "smooth" });
}