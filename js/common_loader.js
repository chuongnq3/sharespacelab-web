/* =========================================================
   COMMON NAV CONFIG
   Cấu hình trung tâm cho dropdown navigation ở common header.
========================================================= */

const NAV_MODULES = {
  foundations: {
    moduleId: "foundations",
    dropdownId: "foundationsDropdown",
    page: "/index.html",
    parts: [
      {
        title: "Tổng quan SQL",
        subtitle: "Tổng quan SQL và ý nghĩa ra đời",
        partIndex: 0
      },
      {
        title: "Dữ liệu & DBMS",
        subtitle: "Các loại dữ liệu và hệ quản trị cơ sở dữ liệu",
        partIndex: 1
      }
    ]
  },

  database: {
    moduleId: "database",
    dropdownId: "databaseDropdown",
    page: "/page/database_foundation.html",
    parts: [
      {
        title: "Hệ sinh thái dữ liệu",
        subtitle: "Nền tảng về Database và SQL",
        partIndex: 0
      },
      {
        title: "Cấu trúc dữ liệu",
        subtitle: "Bảng, khóa, quan hệ và grain",
        partIndex: 1
      },
      {
        title: "Kiểm tra dữ liệu",
        subtitle: "Validation và tư duy dữ liệu",
        partIndex: 2
      }
    ]
  },

  sqlThinking: {
    moduleId: "sql-thinking",
    dropdownId: "sqlThinkingDropdown",
    page: "/page/sql_thinking.html",
    parts: [
      {
        title: "Tư duy SQL & Grain",
        subtitle: "SQL Mindset và tư duy grain",
        partIndex: 0
      },
      {
        title: "6 bước viết Query",
        subtitle: "Quy trình phân tích trước khi viết SQL",
        partIndex: 1
      },
      {
        title: "Luyện tập theo cấp độ",
        subtitle: "Lọc, Group, Join, CTE, Window Function",
        partIndex: 2
      },
      {
        title: "Lỗi & Phương pháp",
        subtitle: "Lỗi thường gặp và cách luyện tập hiệu quả",
        partIndex: 3
      }
      //,
      // {
      //   title: "Bài tập & Checklist",
      //   subtitle: "Thực hành và khung tư duy chuẩn",
      //   partIndex: 4
      // }
    ]
  },

  funcProc: {
    moduleId: "func-proc",
    dropdownId: "funcProcDropdown",
    page: "/page/func_proc.html",
    parts: [
      {
        title: "Tổng quan",
        subtitle: "Function vs Stored Procedure — khi nào dùng cái nào",
        partIndex: 0
      },
      {
        title: "Hàm Scalar",
        subtitle: "Định dạng, tính toán, phân loại",
        partIndex: 1
      },
      {
        title: "Hàm trả về bảng",
        subtitle: "Inline TVF, CROSS APPLY",
        partIndex: 2
      },
      {
        title: "Stored Procedure — Cơ bản",
        subtitle: "Báo cáo, CRUD, validation",
        partIndex: 3
      },
      {
        title: "Stored Procedure — Nâng cao",
        subtitle: "Transaction, TVP, OUTPUT param",
        partIndex: 4
      },
      {
        title: "Bài tập tổng hợp",
        subtitle: "Kết hợp Function và Stored Procedure",
        partIndex: 5
      }
    ]
  },

  practice: {
    moduleId: "practice",
    dropdownId: "practiceDropdown",
    page: "/page/practice_b1.html",
    parts: [
      {
        title: "Dataset & ERD",
        subtitle: "Schema, grain và mối quan hệ",
        partIndex: 0
      },
      {
        title: "Cơ bản",
        subtitle: "JOIN, GROUP BY, Subquery",
        partIndex: 1
      },
      {
        title: "Trung cấp",
        subtitle: "CTE, Pivot, Window Function",
        partIndex: 2
      },
      {
        title: "Nâng cao",
        subtitle: "Running Total, Ranking, LAG",
        partIndex: 3
      },
      {
        title: "Chuyên sâu",
        subtitle: "RFM, Recursive CTE, Moving Average",
        partIndex: 4
      }
    ]
  },

  autoReport: {
    moduleId: "auto-report",
    dropdownId: "autoReportDropdown",
    page: "/page/auto_report.html",
    parts: [
      {
        title: "Giới thiệu & Bối cảnh",
        subtitle: "Mục tiêu, vấn đề và cách tiếp cận",
        partIndex: 0
      },
      {
        title: "Quy trình & Triển khai",
        subtitle: "Các bước chi tiết và minh họa dashboard",
        partIndex: 1
      },
      {
        title: "Kỹ thuật — HTML & Python",
        subtitle: "Tham số hóa template và code render",
        partIndex: 2
      },
      {
        title: "Vận hành & Rủi ro",
        subtitle: "Đóng gói, lịch chạy và xử lý sự cố",
        partIndex: 3
      }
    ]
  },

/* =========================================================
   PATCH: common_loader.js
   Them module "python-foundation" vao NAV_MODULES.
   Vi tri: sau khoi "autoReport" (cuoi NAV_MODULES).
========================================================= */
 
  pythonFoundation: {
    moduleId: "python-foundation",
    dropdownId: "pythonFoundationDropdown",
    page: "/page/python_foundation.html",
    parts: [
      {
        title: "Python trong thời đại AI",
        subtitle: "Mở đầu, sự thay đổi, mục tiêu khóa học",
        partIndex: 0
      },
      {
        title: "Tư duy & Cách đọc code",
        subtitle: "4 câu hỏi cốt lõi và framework đọc source",
        partIndex: 1
      },
      {
        title: "Debug & Xử lý lỗi",
        subtitle: "Quy trình debug, 4 nhóm bug, dùng AI đúng cách",
        partIndex: 2
      },
      {
        title: "Bài tập tự động hóa",
        subtitle: "Basic → Intermediate → Advanced → Expert",
        partIndex: 3
      }
    ]
  }  

};


/* =========================================================
   COMMON LOADER
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  const holder = document.getElementById("commonHeader");

  if (!holder) return;

  try {
    const response = await fetch("/common/common.html");

    if (!response.ok) {
      throw new Error(`Cannot load common.html: ${response.status}`);
    }

    const html = await response.text();

    holder.innerHTML = html;

    renderCommonDropdowns();
    setActiveModule();
    bindCommonSearch();

    window.dispatchEvent(
      new CustomEvent("common-loaded", {
        detail: {
          activeModule: getActiveModule(),
          currentPartIndex: getCurrentPartIndex()
        }
      })
    );
  } catch (error) {
    console.error("Common loader failed:", error);
  }
});


/* =========================================================
   RENDER DROPDOWNS
========================================================= */

// Re-render active state khi page JS chuyển sang part mới
window.addEventListener("part-changed", () => {
  renderCommonDropdowns();
});

function renderCommonDropdowns() {
  Object.values(NAV_MODULES).forEach(moduleConfig => {
    const dropdown = document.getElementById(moduleConfig.dropdownId);

    if (!dropdown) return;

    dropdown.innerHTML = moduleConfig.parts.map(part => {
      const url    = buildModuleUrl(moduleConfig.page, part.partIndex);
      const active = isCurrentPart(moduleConfig.moduleId, part.partIndex);

      return `
        <a class="dropdown-item ${active ? "active" : ""}" href="${url}">
          ${escapeHtml(part.title)}
          <small>${escapeHtml(part.subtitle)}</small>
        </a>
      `;
    }).join("");
  });
}

function buildModuleUrl(page, partIndex) {
  const url = new URL(page, window.location.href);

  url.searchParams.set("part", String(partIndex));

  return url.pathname.split("/").pop()
    ? `${page}?part=${partIndex}`
    : url.toString();
}

function isCurrentPart(moduleId, partIndex) {
  const activeModule = getActiveModule();

  if (activeModule !== moduleId) return false;

  return getCurrentPartIndex() === partIndex;
}


/* =========================================================
   ACTIVE MODULE
========================================================= */

function setActiveModule() {
  const activeModule = getActiveModule();

  if (!activeModule) return;

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle(
      "active",
      item.dataset.module === activeModule
    );
  });
}

function getActiveModule() {
  return document.body.dataset.activeModule || null;
}


/* =========================================================
   SEARCH
========================================================= */

function bindCommonSearch() {
  const input = document.getElementById("globalSearch");

  if (!input) return;

  input.addEventListener("input", event => {
    window.dispatchEvent(
      new CustomEvent("global-search", {
        detail: {
          keyword: event.target.value
        }
      })
    );
  });
}


/* =========================================================
   URL STATE
========================================================= */

function getCurrentPartIndex() {
  const params    = new URLSearchParams(window.location.search);
  const rawPart   = params.get("part");
  const partIndex = Number(rawPart);

  if (!Number.isInteger(partIndex) || partIndex < 0) {
    return 0;
  }

  return partIndex;
}


/* =========================================================
   SAFETY UTILITIES
========================================================= */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}