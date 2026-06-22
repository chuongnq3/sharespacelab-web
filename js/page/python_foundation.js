/* =========================================================
   PYTHON FOUNDATION PAGE
   Structure:
   Phan 0: Python trong thoi dai AI   (ly thuyet Bai 1)
   Phan 1: Tu duy & Doc code          (ly thuyet Bai 1 tiep theo)
   Phan 2: Debug & Xu ly loi          (ly thuyet Bai 1 tiep theo)
   Phan 3: Bai tap tu dong hoa        (4 bai Basic → Expert)
========================================================= */


/* =========================================================
   HELPER: build exercise block
   Tuong tu buildExercise() trong practice_b1.js
   nhung dung "PYTHON" label thay vi "SQL"
========================================================= */

let exerciseCounter = 0;

function buildExercise({ level, task, thinking, code, result }) {
  const id = `ex-${++exerciseCounter}`;

  const thinkingHtml = thinking
    ? `<div class="ex-thinking">
        <div class="ex-thinking-label">Tư duy trước khi viết</div>
        ${thinking.map(t => `<div class="ex-think-item">→ ${t}</div>`).join("")}
       </div>`
    : "";

  const levelClass = {
    Basic:        "badge--basic",
    Intermediate: "badge--inter",
    Advanced:     "badge--adv",
    Expert:       "badge--expert"
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
          <span class="ex-sql-label">PYTHON</span>
          <button class="copy-btn" onclick="copyCode(this)" title="Copy">⎘ Copy</button>
        </div>
        <pre><code>${escapeHtmlStatic(code)}</code></pre>
      </div>

      <div class="ex-result-area" id="result-${id}">
        <div class="ex-result-inner">${result || ""}</div>
      </div>
      <button class="show-result-btn" onclick="toggleResult('result-${id}', this)">
        ▶ Hiện đáp án
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

function toggleResult(id, btn) {
  const area = document.getElementById(id);
  if (!area) return;

  const isOpen = area.classList.toggle("open");
  btn.textContent = isOpen ? "▼ Ẩn đáp án" : "▶ Hiện đáp án";
}

function copyCode(btn) {
  const pre = btn.closest(".ex-sql-block")?.querySelector("pre");
  if (!pre) return;

  navigator.clipboard.writeText(pre.textContent).then(() => {
    btn.textContent = "✓ Copied";
    setTimeout(() => { btn.textContent = "⎘ Copy"; }, 1800);
  });
}


/* =========================================================
   DATA
========================================================= */

const pythonParts = [

  /* -------------------------------------------------------
     PART 0: PYTHON TRONG THOI DAI AI
  ------------------------------------------------------- */
  {
    id:            "intro",
    title:         "Phần 0",
    subtitle:      "Python trong thời đại AI",
    sidebarTitle:  "Python & AI",
    lessons: [
      {
        id:    "mo-dau",
        title: "Mở đầu",
        label: "Python Foundation · Bài 1",
        blocks: [
          {
            heading: "Mở đầu — Học Python để làm gì?",
            html: `
              <p>
                Khi nhắc đến học Python, rất nhiều khóa học bắt đầu bằng Variable, List, Tuple,
                Set, Dictionary, Class, OOP, Decorator — đây đều là kiến thức cần thiết.
              </p>
              <p>Tuy nhiên có một câu hỏi quan trọng hơn:</p>
              <blockquote>
                Sau khi học thuộc hàng trăm cú pháp, chúng ta dùng chúng để làm gì?
              </blockquote>
              <p>Trong doanh nghiệp, giá trị không đến từ việc nhớ được nhiều cú pháp nhất.
              Giá trị đến từ:</p>
              <ul>
                <li>Giải quyết được vấn đề.</li>
                <li>Tự động hóa được công việc.</li>
                <li>Phân tích được dữ liệu.</li>
                <li>Tìm được nguyên nhân lỗi.</li>
                <li>Xây dựng được công cụ hỗ trợ vận hành.</li>
              </ul>
              <div class="note"><strong>Python chỉ là công cụ.</strong> Mục tiêu cuối cùng luôn là giải quyết bài toán nghiệp vụ.</div>
            `
          }
        ]
      },

      {
        id:    "thay-doi-ai",
        title: "Sự thay đổi trong thời đại AI",
        label: "Python Foundation · Bài 1",
        blocks: [
          {
            heading: "Sự thay đổi trong thời đại AI",
            html: `
              <div class="compare-wrap">
                <div class="compare-col">
                  <div class="compare-label compare-label--before">Trước đây</div>
                  <div class="flow-chain">
                    <div class="flow-node">Học Syntax</div>
                    <div class="flow-arrow">↓</div>
                    <div class="flow-node">Học Thư viện</div>
                    <div class="flow-arrow">↓</div>
                    <div class="flow-node">Viết Code</div>
                    <div class="flow-arrow">↓</div>
                    <div class="flow-node flow-node--end">Tạo Giải pháp</div>
                  </div>
                </div>

                <div class="compare-col">
                  <div class="compare-label compare-label--now">Ngày nay</div>
                  <div class="flow-chain">
                    <div class="flow-node">Hiểu Bài Toán</div>
                    <div class="flow-arrow">↓</div>
                    <div class="flow-node">Thiết kế Luồng xử lý</div>
                    <div class="flow-arrow">↓</div>
                    <div class="flow-node flow-node--ai">Sử dụng AI sinh Source Code</div>
                    <div class="flow-arrow">↓</div>
                    <div class="flow-node">Đọc hiểu Source</div>
                    <div class="flow-arrow">↓</div>
                    <div class="flow-node">Kiểm thử &amp; Debug</div>
                    <div class="flow-arrow">↓</div>
                    <div class="flow-node flow-node--end">Hoàn thiện Giải pháp</div>
                  </div>
                </div>
              </div>
              <p style="margin-top:20px;">
                Điều này không có nghĩa là Python không còn quan trọng — ngược lại.
                Python vẫn là công cụ phổ biến nhất cho Data Analysis, ETL, Dashboard,
                Machine Learning, AI và Automation. Nhưng <strong>cách học đã thay đổi</strong>.
              </p>
            `
          }
        ]
      },

      {
        id:    "muc-tieu",
        title: "Mục tiêu khóa học",
        label: "Python Foundation · Bài 1",
        blocks: [
          {
            heading: "Mục tiêu của khóa học",
            html: `
              <div class="goal-compare">
                <div class="goal-item goal-item--bad">
                  <div class="goal-label">Không phải</div>
                  <p>"Trở thành chuyên gia Python"</p>
                </div>
                <div class="goal-item goal-item--good">
                  <div class="goal-label">Mục tiêu thực sự</div>
                  <p>"Có khả năng biến một bài toán nghiệp vụ thành một giải pháp vận hành được."</p>
                </div>
              </div>
              <h3>Sau khóa học, học viên có thể:</h3>
              <ul>
                <li>Đọc hiểu source code Python.</li>
                <li>Tự xây dựng công cụ hỗ trợ công việc.</li>
                <li>Sử dụng AI để tạo source code.</li>
                <li>Debug và xử lý lỗi.</li>
                <li>Làm việc hiệu quả với đội ngũ IT.</li>
                <li>Hiểu luồng xử lý của hệ thống.</li>
              </ul>
            `
          }
        ]
      }
    ]
  },

  /* -------------------------------------------------------
     PART 1: TU DUY & DOC CODE
  ------------------------------------------------------- */
  {
    id:            "tu-duy",
    title:         "Phần 1",
    subtitle:      "Tư duy & Cách đọc code",
    sidebarTitle:  "Tư duy & Đọc code",
    lessons: [
      {
        id:    "4-cau-hoi",
        title: "Tư duy 4 câu hỏi",
        label: "Python Foundation · Tư duy",
        blocks: [
          {
            heading: "Tư duy quan trọng nhất — 4 câu hỏi trước khi viết code",
            html: `
              <p>Trước khi viết bất kỳ dòng code nào, hãy trả lời đủ 4 câu hỏi sau:</p>
              <div class="four-q-grid">
                <div class="four-q-card">
                  <div class="four-q-num">1</div>
                  <div class="four-q-title">Input là gì?</div>
                  <div class="four-q-examples">Excel · CSV · Oracle · API</div>
                </div>
                <div class="four-q-card">
                  <div class="four-q-num">2</div>
                  <div class="four-q-title">Business Logic là gì?</div>
                  <div class="four-q-examples">Tính LGD · Tính CAR · Tính KPI · Check Data Quality</div>
                </div>
                <div class="four-q-card">
                  <div class="four-q-num">3</div>
                  <div class="four-q-title">Output là gì?</div>
                  <div class="four-q-examples">Excel · Dashboard · Database · Email</div>
                </div>
                <div class="four-q-card">
                  <div class="four-q-num">4</div>
                  <div class="four-q-title">Điều gì có thể sai?</div>
                  <div class="four-q-examples">Thiếu dữ liệu · Dữ liệu trùng · Sai công thức · Sai khóa join</div>
                </div>
              </div>
              <div class="note">
                Nếu trả lời được 4 câu hỏi này thì đã hoàn thành phần khó nhất của bài toán.
                Python chỉ là bản dịch của luồng xử lý đó.
              </div>
            `
          },
          {
            heading: "Ví dụ thực tế — 4 câu hỏi cho bài toán hàng ngày",
            html: `
              <table>
                <thead>
                  <tr>
                    <th>Câu hỏi</th>
                    <th>Trả lời cụ thể</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Input là gì?</strong></td>
                    <td>5 file Excel từ các chi nhánh, mỗi file một sheet "Data".</td>
                  </tr>
                  <tr>
                    <td><strong>Business Logic?</strong></td>
                    <td>Ghép dữ liệu, loại trùng theo mã KH, tính tổng dư nợ và KPI theo chi nhánh.</td>
                  </tr>
                  <tr>
                    <td><strong>Output là gì?</strong></td>
                    <td>File Excel tổng hợp + dashboard HTML có filter theo chi nhánh và ngày.</td>
                  </tr>
                  <tr>
                    <td><strong>Điều gì có thể sai?</strong></td>
                    <td>Tên cột khác nhau giữa các chi nhánh, ngày sai format, thiếu file.</td>
                  </tr>
                </tbody>
              </table>
            `
          }
        ]
      },

      {
        id:    "doc-code",
        title: "Cách đọc source code",
        label: "Python Foundation · Đọc code",
        blocks: [
          {
            heading: "Cách đọc một chương trình Python — 4 bước",
            html: `
              <div class="note" style="margin-bottom:20px;">
                <strong>Sai lầm phổ biến:</strong> mở file lên và đọc từ dòng đầu tiên.
              </div>
              <div class="steps-list">
                <div class="step-item">
                  <div class="step-num">1</div>
                  <div class="step-body">
                    <strong>Tìm điểm bắt đầu chương trình</strong>
                    <p>Tìm <code>if __name__ == "__main__":</code> — đây là entry point thực sự.</p>
                  </div>
                </div>
                <div class="step-item">
                  <div class="step-num">2</div>
                  <div class="step-body">
                    <strong>Xác định function được gọi đầu tiên</strong>
                    <p>Thường là <code>main()</code> hoặc một hàm setup tổng. Đây là bộ khung của chương trình.</p>
                  </div>
                </div>
                <div class="step-item">
                  <div class="step-num">3</div>
                  <div class="step-body">
                    <strong>Vẽ luồng xử lý chính</strong>
                    <p>Ví dụ: Read File → Validate → Calculate → Save → Export. Chỉ cần vẽ được luồng này là đã hiểu 70% chương trình.</p>
                  </div>
                </div>
                <div class="step-item">
                  <div class="step-num">4</div>
                  <div class="step-body">
                    <strong>Xác định Input và Output của từng bước</strong>
                    <p>Đừng hỏi "syntax này là gì?" — hãy hỏi "function này nhận gì và trả về gì?"</p>
                  </div>
                </div>
              </div>
            `
          },
          {
            heading: "Cách đọc function theo góc nhìn nghiệp vụ",
            html: `
              <p>Khi gặp một function mới, hãy đặt 3 câu hỏi:</p>
              <table>
                <thead>
                  <tr><th>Câu hỏi</th><th>Ví dụ với <code>calculate_lgd()</code></th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Input là gì?</strong></td>
                    <td>Danh sách khoản vay (DataFrame).</td>
                  </tr>
                  <tr>
                    <td><strong>Output là gì?</strong></td>
                    <td>Danh sách khoản vay có thêm cột LGD.</td>
                  </tr>
                  <tr>
                    <td><strong>Business Logic?</strong></td>
                    <td><code>LGD = EAD × 45%</code></td>
                  </tr>
                </tbody>
              </table>
              <div class="note" style="margin-top:16px;">
                Đây là khác biệt giữa người <em>biết Python</em> và người
                <strong>sử dụng Python để tạo ra giá trị</strong>.
              </div>
            `
          }
        ]
      }
    ]
  },

  /* -------------------------------------------------------
     PART 2: DEBUG & XU LY LOI
  ------------------------------------------------------- */
  {
    id:            "debug",
    title:         "Phần 2",
    subtitle:      "Debug & Xử lý lỗi",
    sidebarTitle:  "Debug",
    lessons: [
      {
        id:    "quy-trinh-debug",
        title: "Quy trình debug",
        label: "Python Foundation · Debug",
        blocks: [
          {
            heading: "Cách debug một hệ thống — đừng sửa ngay",
            html: `
              <p>Khi gặp lỗi, hãy trả lời 4 câu hỏi trước khi sửa:</p>
              <ol>
                <li>Lỗi xuất hiện ở đâu trong luồng xử lý?</li>
                <li>Input có đúng format và đủ dữ liệu không?</li>
                <li>Output mong muốn là gì?</li>
                <li>Sai ở dữ liệu hay sai ở logic?</li>
              </ol>
              <h3>Quy trình debug chuẩn</h3>
              <div class="flow-chain flow-chain--horizontal">
                <div class="flow-node">Đọc Log</div>
                <div class="flow-arrow flow-arrow--right">→</div>
                <div class="flow-node">Đọc Traceback</div>
                <div class="flow-arrow flow-arrow--right">→</div>
                <div class="flow-node">Xác định Function</div>
                <div class="flow-arrow flow-arrow--right">→</div>
                <div class="flow-node">Kiểm tra Input</div>
                <div class="flow-arrow flow-arrow--right">→</div>
                <div class="flow-node">Kiểm tra Logic</div>
                <div class="flow-arrow flow-arrow--right">→</div>
                <div class="flow-node">Xác định Root Cause</div>
                <div class="flow-arrow flow-arrow--right">→</div>
                <div class="flow-node">Fix → Test</div>
              </div>
            `
          }
        ]
      },

      {
        id:    "nhom-bug",
        title: "Các nhóm bug thường gặp",
        label: "Python Foundation · Debug",
        blocks: [
          {
            heading: "4 nhóm bug thường gặp trong Python",
            html: `
              <div class="bug-grid">
                <div class="bug-card bug-card--data">
                  <div class="bug-icon">🗃</div>
                  <div class="bug-title">Data Bug</div>
                  <ul>
                    <li>Duplicate data</li>
                    <li>Missing data</li>
                    <li>Sai mapping mã/tên</li>
                    <li>Sai kiểu dữ liệu (string thay vì số)</li>
                  </ul>
                </div>
                <div class="bug-card bug-card--logic">
                  <div class="bug-icon">⚙</div>
                  <div class="bug-title">Logic Bug</div>
                  <ul>
                    <li>Tính sai công thức</li>
                    <li>Sai điều kiện lọc</li>
                    <li>Sai thứ tự xử lý</li>
                    <li>Sai khóa join</li>
                  </ul>
                </div>
                <div class="bug-card bug-card--runtime">
                  <div class="bug-icon">⏱</div>
                  <div class="bug-title">Runtime Bug</div>
                  <ul>
                    <li>Không tìm thấy file</li>
                    <li>Database timeout</li>
                    <li>API timeout</li>
                    <li>Hết bộ nhớ</li>
                  </ul>
                </div>
                <div class="bug-card bug-card--config">
                  <div class="bug-icon">🔧</div>
                  <div class="bug-title">Configuration Bug</div>
                  <ul>
                    <li>Sai host / port</li>
                    <li>Sai schema / database</li>
                    <li>Sai tham số đầu vào</li>
                    <li>Sai đường dẫn file</li>
                  </ul>
                </div>
              </div>
            `
          }
        ]
      },

      {
        id:    "su-dung-ai",
        title: "Sử dụng AI hiệu quả",
        label: "Python Foundation · AI",
        blocks: [
          {
            heading: "Sử dụng AI để sinh code — cách đúng và sai",
            html: `
              <div class="goal-compare" style="margin-bottom:24px;">
                <div class="goal-item goal-item--bad">
                  <div class="goal-label">Sai cách</div>
                  <p>"Viết code Python đọc file Excel và tính KPI"</p>
                  <p style="font-size:13px;color:var(--muted);">Quá chung chung → AI sinh code không đúng nghiệp vụ.</p>
                </div>
                <div class="goal-item goal-item--good">
                  <div class="goal-label">Đúng cách</div>
                  <p>
                    "Input: file Excel có sheet 'Data', cột CIF, BRANCH, BALANCE, DATE.<br/>
                    Business Logic: tính tổng BALANCE theo BRANCH, loại bỏ trùng theo CIF.<br/>
                    Output: dashboard.html có filter theo BRANCH và DATE.<br/>
                    Yêu cầu: có log lỗi và kiểm tra thiếu cột."
                  </p>
                </div>
              </div>
              <div class="note">
                <strong>Framework 5 câu hỏi</strong> khi tiếp cận bất kỳ hệ thống nào:<br/>
                1. Chương trình bắt đầu từ đâu? &nbsp;
                2. Input là gì? &nbsp;
                3. Output là gì? &nbsp;
                4. Luồng xử lý chính là gì? &nbsp;
                5. Lỗi đang nằm ở bước nào?
              </div>
            `
          }
        ]
      }
    ]
  },

  /* -------------------------------------------------------
     PART 3: BAI TAP TU DONG HOA
  ------------------------------------------------------- */
  {
    id:            "exercises",
    title:         "Phần 3",
    subtitle:      "Bài tập tự động hóa",
    sidebarTitle:  "Bài tập",
    lessons: [
      {
        id:    "basic",
        title: "Basic — Đọc & xuất file",
        label: "Python Foundation · Basic",
        blocks: [
          {
            heading: "Bài tập 1 — Basic",
            html: buildExercise({
              level: "Basic",
              task:  "Đọc file Excel, tính tổng và xuất kết quả ra CSV",
              thinking: [
                "Input: file data.xlsx, sheet 'Data', cột BRANCH, BALANCE.",
                "Business Logic: group by BRANCH, tính sum(BALANCE).",
                "Output: file output/summary.csv với 2 cột BRANCH, TOTAL_BALANCE.",
                "Điều gì có thể sai: file không tồn tại, tên cột sai, cột BALANCE có giá trị null."
              ],
              code: `# BAI TAP 1 — BASIC
# Yeu cau: doc file Excel, tinh tong BALANCE theo BRANCH, xuat CSV

import pandas as pd
from pathlib import Path

# --- cau hoi 1: Input la gi?
input_file  = Path("input/data.xlsx")
output_file = Path("output/summary.csv")

# kiem tra file ton tai
if not input_file.exists():
    raise FileNotFoundError(f"Khong tim thay: {input_file}")

# --- doc du lieu
df = pd.read_excel(input_file, sheet_name="Data")

# kiem tra cot can thiet
required_cols = ["BRANCH", "BALANCE"]
missing = [c for c in required_cols if c not in df.columns]
if missing:
    raise ValueError(f"Thieu cot: {missing}")

# --- cau hoi 2: Business Logic la gi?
summary = (
    df
    .groupby("BRANCH", as_index=False)["BALANCE"]
    .sum()
    .rename(columns={"BALANCE": "TOTAL_BALANCE"})
    .sort_values("TOTAL_BALANCE", ascending=False)
)

# --- cau hoi 3: Output la gi?
output_file.parent.mkdir(parents=True, exist_ok=True)
summary.to_csv(output_file, index=False, encoding="utf-8-sig")

print(f"Done — {len(summary)} chi nhanh, luu tai {output_file}")`,
              result: `<div class="result-note">
                <strong>Kết quả mẫu (output/summary.csv):</strong><br/>
                <pre>BRANCH,TOTAL_BALANCE
HN001,8500000000
HCM002,7200000000
DN003,3100000000</pre>
                <strong>Điểm cần chú ý:</strong>
                <ul>
                  <li><code>utf-8-sig</code> để Excel mở CSV đúng tiếng Việt.</li>
                  <li>Kiểm tra <code>exists()</code> và tên cột trước khi xử lý — đây là thói quen quan trọng trong production.</li>
                  <li><code>mkdir(parents=True, exist_ok=True)</code> tự tạo thư mục nếu chưa có.</li>
                </ul>
              </div>`
            })
          }
        ]
      },

      {
        id:    "intermediate",
        title: "Intermediate — Ghép nhiều file",
        label: "Python Foundation · Intermediate",
        blocks: [
          {
            heading: "Bài tập 2 — Intermediate",
            html: buildExercise({
              level: "Intermediate",
              task:  "Ghép nhiều file Excel từ các chi nhánh, loại trùng và tính KPI",
              thinking: [
                "Input: thư mục input/ chứa nhiều file Excel, mỗi file một chi nhánh.",
                "Business Logic: đọc tất cả file, ghép lại, loại trùng theo CIF, tính count và sum theo BRANCH.",
                "Output: file Excel tổng hợp với 2 sheet — 'Chi tiết' và 'KPI tổng hợp'.",
                "Điều gì có thể sai: tên cột khác nhau giữa các file, file rỗng, CIF null."
              ],
              code: `# BAI TAP 2 — INTERMEDIATE
# Yeu cau: gom nhieu file Excel, loai trung theo CIF, tinh KPI

import pandas as pd
from pathlib import Path

input_dir   = Path("input")
output_file = Path("output/combined_report.xlsx")

# --- doc tat ca file Excel trong thu muc
all_files = list(input_dir.glob("*.xlsx"))
if not all_files:
    raise FileNotFoundError(f"Khong co file Excel trong {input_dir}")

frames = []
for f in all_files:
    try:
        df_tmp = pd.read_excel(f, sheet_name="Data")
        df_tmp["SOURCE_FILE"] = f.name    # ghi lai nguon file
        frames.append(df_tmp)
        print(f"  Da doc: {f.name} — {len(df_tmp):,} dong")
    except Exception as e:
        print(f"  [WARN] Loi khi doc {f.name}: {e}")

# --- gop lai
df = pd.concat(frames, ignore_index=True)
print(f"Tong cong: {len(df):,} dong truoc khi loai trung")

# --- loai trung theo CIF (giu ban ghi moi nhat)
df = df.sort_values("DATE", ascending=False)
df = df.drop_duplicates(subset=["CIF"], keep="first")
print(f"Sau khi loai trung: {len(df):,} dong")

# --- KPI
kpi = (
    df.groupby("BRANCH")
    .agg(
        SO_KH      = ("CIF",     "nunique"),
        TONG_DU_NO = ("BALANCE", "sum"),
        DU_NO_TB   = ("BALANCE", "mean"),
    )
    .round(0)
    .reset_index()
    .sort_values("TONG_DU_NO", ascending=False)
)

# --- xuat Excel 2 sheet
output_file.parent.mkdir(parents=True, exist_ok=True)
with pd.ExcelWriter(output_file, engine="openpyxl") as writer:
    df.to_excel(writer,  sheet_name="Chi tiet",    index=False)
    kpi.to_excel(writer, sheet_name="KPI tong hop", index=False)

print(f"Done — luu tai {output_file}")`,
              result: `<div class="result-note">
                <strong>Sheet KPI tổng hợp mẫu:</strong><br/>
                <pre>BRANCH   SO_KH  TONG_DU_NO   DU_NO_TB
HN001     1240  8500000000    6854839
HCM002    1080  7200000000    6666667
DN003      620  3100000000    5000000</pre>
                <strong>Điểm cần chú ý:</strong>
                <ul>
                  <li>Bọc mỗi file trong <code>try/except</code> riêng — một file lỗi không nên dừng toàn bộ pipeline.</li>
                  <li><code>drop_duplicates(keep="first")</code> sau khi sort theo DATE → giữ bản ghi mới nhất.</li>
                  <li><code>nunique()</code> đếm số khách hàng duy nhất, không phải số dòng.</li>
                </ul>
              </div>`
            })
          }
        ]
      },

      {
        id:    "advanced",
        title: "Advanced — Render HTML report",
        label: "Python Foundation · Advanced",
        blocks: [
          {
            heading: "Bài tập 3 — Advanced",
            html: buildExercise({
              level: "Advanced",
              task:  "Tính KPI từ dữ liệu và render ra báo cáo HTML tự động",
              thinking: [
                "Input: file data.xlsx, cột CIF, BRANCH, BALANCE, DATE, STATUS.",
                "Business Logic: tính KPI tổng, top 5 chi nhánh, tỷ lệ active/inactive.",
                "Output: file HTML với các placeholder được thay bằng số liệu thực.",
                "Điều gì có thể sai: template thiếu placeholder, dữ liệu rỗng sau filter, encoding."
              ],
              code: `# BAI TAP 3 — ADVANCED
# Yeu cau: doc du lieu, tinh KPI, render vao HTML template

import pandas as pd
from pathlib import Path
from datetime import datetime

input_file    = Path("input/data.xlsx")
template_file = Path("template/dashboard_template.html")
output_file   = Path("output/dashboard_report.html")

# --- doc va chuan bi du lieu
df = pd.read_excel(input_file, sheet_name="Data")
df["DATE"]    = pd.to_datetime(df["DATE"], errors="coerce")
df["BALANCE"] = pd.to_numeric(df["BALANCE"], errors="coerce").fillna(0)

# --- tinh KPI
total_balance  = df["BALANCE"].sum()
total_customer = df["CIF"].nunique()
active_pct     = df[df["STATUS"] == "Active"]["CIF"].nunique() / total_customer * 100

top5 = (
    df.groupby("BRANCH")["BALANCE"]
    .sum()
    .sort_values(ascending=False)
    .head(5)
    .reset_index()
)

# tao HTML rows cho bang top5
top5_rows = "".join(
    f"<tr><td>{row.BRANCH}</td><td>{row.BALANCE:,.0f}</td></tr>"
    for _, row in top5.iterrows()
)

# --- tao params de replace vao template
params = {
    "{{REPORT_DATE}}":     datetime.today().strftime("%d/%m/%Y"),
    "{{TOTAL_BALANCE}}":   f"{total_balance:,.0f}",
    "{{TOTAL_CUSTOMER}}":  f"{total_customer:,}",
    "{{ACTIVE_PCT}}":      f"{active_pct:.1f}%",
    "{{TOP5_ROWS}}":       top5_rows,
}

# --- doc template va replace
html = template_file.read_text(encoding="utf-8")
for key, value in params.items():
    html = html.replace(key, str(value))

# --- kiem tra placeholder con sot
remaining = [k for k in ["{{", "}}"] if k in html]
if remaining:
    print("[WARN] Con placeholder chua duoc replace trong HTML")

output_file.parent.mkdir(parents=True, exist_ok=True)
output_file.write_text(html, encoding="utf-8")
print(f"Done — luu tai {output_file}")`,
              result: `<div class="result-note">
                <strong>File dashboard_report.html sẽ chứa:</strong>
                <ul>
                  <li>Ngày báo cáo: 22/06/2025</li>
                  <li>Tổng dư nợ: 18,800,000,000</li>
                  <li>Tổng khách hàng: 2,940</li>
                  <li>Tỷ lệ active: 87.3%</li>
                  <li>Bảng top 5 chi nhánh với số dư nợ</li>
                </ul>
                <strong>Điểm cần chú ý:</strong>
                <ul>
                  <li>Luôn dùng <code>errors="coerce"</code> khi convert kiểu — tránh crash khi có giá trị lạ.</li>
                  <li>Kiểm tra placeholder còn sót sau khi replace để phát hiện lỗi template sớm.</li>
                  <li>Tách <code>params</code> thành dict riêng để dễ thêm/bớt tham số sau này.</li>
                </ul>
              </div>`
            })
          }
        ]
      },

      {
        id:    "expert",
        title: "Expert — Pipeline hoàn chỉnh",
        label: "Python Foundation · Expert",
        blocks: [
          {
            heading: "Bài tập 4 — Expert",
            html: buildExercise({
              level: "Expert",
              task:  "Xây dựng pipeline hoàn chỉnh: đọc config, xử lý dữ liệu, render HTML, ghi log",
              thinking: [
                "Input: config.json khai báo đường dẫn và tên cột; file Excel dữ liệu.",
                "Business Logic: đọc config → đọc dữ liệu → validate → tính KPI → render HTML.",
                "Output: file HTML báo cáo + file log ghi trạng thái từng bước.",
                "Điều gì có thể sai: config sai key, file thiếu, dữ liệu rỗng sau clean — cần log đầy đủ."
              ],
              code: `# BAI TAP 4 — EXPERT
# Pipeline hoan chinh: config → validate → KPI → HTML → log

import json
import logging
import pandas as pd
from pathlib import Path
from datetime import datetime

# -------------------------------------------------------
# SETUP LOG
# -------------------------------------------------------
log_dir  = Path("logs")
log_dir.mkdir(exist_ok=True)
log_file = log_dir / f"run_{datetime.today().strftime('%Y%m%d_%H%M%S')}.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(log_file, encoding="utf-8"),
        logging.StreamHandler()
    ]
)
log = logging.getLogger(__name__)

# -------------------------------------------------------
# DOC CONFIG
# -------------------------------------------------------
def load_config(config_path: Path) -> dict:
    if not config_path.exists():
        raise FileNotFoundError(f"Config khong ton tai: {config_path}")
    cfg = json.loads(config_path.read_text(encoding="utf-8"))
    required_keys = ["input_file", "template_file", "output_file",
                     "sheet_name", "col_cif", "col_branch",
                     "col_balance", "col_date", "col_status"]
    missing = [k for k in required_keys if k not in cfg]
    if missing:
        raise ValueError(f"Config thieu key: {missing}")
    return cfg

# -------------------------------------------------------
# DOC VA VALIDATE DU LIEU
# -------------------------------------------------------
def load_data(cfg: dict) -> pd.DataFrame:
    path = Path(cfg["input_file"])
    if not path.exists():
        raise FileNotFoundError(f"Khong tim thay file: {path}")

    df = pd.read_excel(path, sheet_name=cfg["sheet_name"])
    log.info(f"Da doc {len(df):,} dong tu {path.name}")

    # kiem tra cot
    required_cols = [cfg["col_cif"], cfg["col_branch"],
                     cfg["col_balance"], cfg["col_date"], cfg["col_status"]]
    missing = [c for c in required_cols if c not in df.columns]
    if missing:
        raise ValueError(f"Thieu cot: {missing}")

    # chuan hoa kieu du lieu
    df[cfg["col_balance"]] = pd.to_numeric(df[cfg["col_balance"]], errors="coerce").fillna(0)
    df[cfg["col_date"]]    = pd.to_datetime(df[cfg["col_date"]], errors="coerce")

    # bao cao null
    null_counts = df[required_cols].isnull().sum()
    for col, cnt in null_counts[null_counts > 0].items():
        log.warning(f"Cot '{col}' co {cnt:,} gia tri null")

    return df

# -------------------------------------------------------
# TINH KPI
# -------------------------------------------------------
def compute_kpi(df: pd.DataFrame, cfg: dict) -> dict:
    cif, branch, balance, status = (
        cfg["col_cif"], cfg["col_branch"],
        cfg["col_balance"], cfg["col_status"]
    )
    total_balance  = df[balance].sum()
    total_customer = df[cif].nunique()
    active_count   = df[df[status] == "Active"][cif].nunique()
    active_pct     = active_count / total_customer * 100 if total_customer else 0

    top5 = (
        df.groupby(branch)[balance]
        .sum()
        .sort_values(ascending=False)
        .head(5)
        .reset_index()
    )
    top5_rows = "".join(
        f"<tr><td>{r[branch]}</td><td>{r[balance]:,.0f}</td></tr>"
        for _, r in top5.iterrows()
    )
    log.info(f"KPI: total_balance={total_balance:,.0f}, customer={total_customer:,}, active={active_pct:.1f}%")

    return {
        "{{REPORT_DATE}}":    datetime.today().strftime("%d/%m/%Y"),
        "{{TOTAL_BALANCE}}":  f"{total_balance:,.0f}",
        "{{TOTAL_CUSTOMER}}": f"{total_customer:,}",
        "{{ACTIVE_PCT}}":     f"{active_pct:.1f}%",
        "{{TOP5_ROWS}}":      top5_rows,
    }

# -------------------------------------------------------
# RENDER HTML
# -------------------------------------------------------
def render_html(params: dict, cfg: dict) -> None:
    template = Path(cfg["template_file"])
    output   = Path(cfg["output_file"])

    html = template.read_text(encoding="utf-8")
    for key, value in params.items():
        html = html.replace(key, str(value))

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html, encoding="utf-8")
    log.info(f"Da xuat bao cao: {output}")

# -------------------------------------------------------
# MAIN
# -------------------------------------------------------
def main():
    log.info("=== BAT DAU PIPELINE ===")
    try:
        cfg    = load_config(Path("config/config.json"))
        df     = load_data(cfg)
        params = compute_kpi(df, cfg)
        render_html(params, cfg)
        log.info("=== HOAN THANH ===")
    except Exception as e:
        log.error(f"Pipeline that bai: {e}", exc_info=True)
        raise

if __name__ == "__main__":
    main()`,
              result: `<div class="result-note">
                <strong>File log mẫu (logs/run_20250622_090000.log):</strong>
                <pre>2025-06-22 09:00:01 [INFO] === BAT DAU PIPELINE ===
2025-06-22 09:00:01 [INFO] Da doc 5,840 dong tu data.xlsx
2025-06-22 09:00:02 [WARNING] Cot 'BALANCE' co 12 gia tri null
2025-06-22 09:00:02 [INFO] KPI: total_balance=18,800,000,000, customer=2,940, active=87.1%
2025-06-22 09:00:02 [INFO] Da xuat bao cao: output/dashboard_report.html
2025-06-22 09:00:02 [INFO] === HOAN THANH ===</pre>
                <strong>Điểm nâng cấp so với bài 3:</strong>
                <ul>
                  <li>Config tách riêng vào JSON — thay đổi đường dẫn không cần sửa code.</li>
                  <li>Mỗi bước là một function riêng — dễ test, dễ thay thế từng phần.</li>
                  <li>Log đầy đủ cả file lẫn console — khi chạy qua Task Scheduler vẫn theo dõi được.</li>
                  <li><code>exc_info=True</code> trong log.error → ghi cả traceback vào log.</li>
                  <li>Pipeline này có thể đóng gói bằng PyInstaller và đặt lịch Task Scheduler ngay.</li>
                </ul>
              </div>`
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

let currentPartIndex     = 0;
let currentLessonIndex   = 0;
let currentSearchKeyword = "";
let isInitialized        = false;

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

window.addEventListener("common-loaded", initPythonFoundation);

window.addEventListener("global-search", event => {
  currentSearchKeyword = event.detail?.keyword || "";
  applySearch(currentSearchKeyword);
});

function initPythonFoundation(event) {
  if (isInitialized) return;

  currentPartIndex   = normalizePartIndex(event?.detail?.currentPartIndex, pythonParts.length);
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
    console.error("Python Foundation init failed: missing DOM elements.");
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
  const part = pythonParts[currentPartIndex];

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

  const part   = pythonParts[currentPartIndex];
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
    currentPartIndex === pythonParts.length - 1 &&
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
    currentLessonIndex = pythonParts[currentPartIndex].lessons.length - 1;
  }

  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll();
  scrollContentTop();
}

function goNext() {
  const part = pythonParts[currentPartIndex];

  if (currentLessonIndex < part.lessons.length - 1) {
    currentLessonIndex++;
  } else if (currentPartIndex < pythonParts.length - 1) {
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

  const found = pythonParts[partIndex].lessons.findIndex(lesson => lesson.id === rawLesson);
  return found < 0 ? 0 : found;
}

function normalizePartIndex(value, total) {
  const index = Number(value);
  if (!Number.isInteger(index) || index < 0 || index >= total) return 0;
  return index;
}

function normalizeLessonIndex(partIndex, lessonIndex) {
  const part  = pythonParts[partIndex];
  if (!part) return 0;
  const index = Number(lessonIndex);
  if (!Number.isInteger(index) || index < 0 || index >= part.lessons.length) return 0;
  return index;
}

function syncUrlState(partIndex, lessonIndex) {
  const part   = pythonParts[partIndex];
  const lesson = part?.lessons?.[lessonIndex];
  if (!part || !lesson) return;

  const url = new URL(window.location.href);
  url.searchParams.set("part",   String(partIndex));
  url.searchParams.set("lesson", lesson.id);

  window.history.replaceState({}, "", url.toString());
  window.dispatchEvent(new CustomEvent("part-changed"));
}

function scrollContentTop() {
  document.querySelector(".content-body")?.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector(".content")?.scrollTo({ top: 0, behavior: "smooth" });
  window.scrollTo({ top: 0, behavior: "smooth" });
}