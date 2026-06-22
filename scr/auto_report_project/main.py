import json
import hashlib
import logging
import re
from pathlib import Path
from datetime import datetime

import pandas as pd


# =========================================================
# BASE CONFIG
# =========================================================
BASE_DIR = Path(r"C:\Users\chuongnq1\Desktop\Instruction\Project")

CONFIG_PATH = BASE_DIR / "config" / "config.json"
STATE_PATH = BASE_DIR / "logs" / "state.json"


# =========================================================
# LOGGING
# =========================================================
def setup_logger():
    log_dir = BASE_DIR / "logs"
    log_dir.mkdir(exist_ok=True)

    log_file = log_dir / f"run_{datetime.now():%Y%m%d}.log"

    root_logger = logging.getLogger()
    root_logger.handlers.clear()

    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        encoding="utf-8"
    )


# =========================================================
# CONFIG / STATE
# =========================================================
def load_config():
    if not CONFIG_PATH.exists():
        raise FileNotFoundError(f"Không tìm thấy config.json: {CONFIG_PATH}")

    text = CONFIG_PATH.read_text(encoding="utf-8").strip()

    if not text:
        raise ValueError(f"File config.json đang rỗng: {CONFIG_PATH}")

    return json.loads(text)


def load_state():
    if not STATE_PATH.exists():
        return {}

    text = STATE_PATH.read_text(encoding="utf-8").strip()

    if not text:
        return {}

    return json.loads(text)


def save_state(state: dict):
    STATE_PATH.parent.mkdir(exist_ok=True)

    STATE_PATH.write_text(
        json.dumps(state, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )


# =========================================================
# CHECK UPDATE
# =========================================================
def file_hash(path: Path):
    h = hashlib.md5()

    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)

    return h.hexdigest()


def need_update(data_path: Path, template_path: Path, output_path: Path):
    state = load_state()

    current_state = {
        "data_mtime": data_path.stat().st_mtime,
        "data_hash": file_hash(data_path),
        "template_mtime": template_path.stat().st_mtime,
        "template_hash": file_hash(template_path),
    }

    old_state = state.get("last_run", {})

    if not output_path.exists():
        return True, current_state

    if current_state != old_state:
        return True, current_state

    return False, current_state


# =========================================================
# READ DATA
# =========================================================
def read_data(data_path: Path):
    if data_path.suffix.lower() in [".xlsx", ".xls"]:
        return pd.read_excel(data_path)

    if data_path.suffix.lower() == ".csv":
        return pd.read_csv(data_path)

    raise ValueError("Chỉ hỗ trợ file Excel hoặc CSV.")


# =========================================================
# DATA PREPARE
# =========================================================
def normalize_columns(df: pd.DataFrame):
    """
    Chuẩn hóa tên cột để tránh lỗi:
    Report Date -> REPORT_DATE
    report date -> REPORT_DATE
    REPORT_DATE -> REPORT_DATE
    """
    df = df.copy()

    df.columns = (
        df.columns
        .astype(str)
        .str.strip()
        .str.upper()
        .str.replace(" ", "_", regex=False)
    )

    return df


def validate_input_columns(df: pd.DataFrame):
    required_cols = [
        "REPORT_DATE",
        "REGION",
        "BRANCH",
        "PRODUCT",
        "CUSTOMER_SEGMENT",
        "TRANSACTIONS",
        "REVENUE",
        "COST",
        "PROFIT",
    ]

    missing = [col for col in required_cols if col not in df.columns]

    if missing:
        raise ValueError(
            "File dữ liệu thiếu các cột bắt buộc: "
            + ", ".join(missing)
            + "\nCác cột hiện có: "
            + ", ".join(df.columns.tolist())
        )


def prepare_data_json(df: pd.DataFrame):
    df = normalize_columns(df)
    validate_input_columns(df)

    df = df.copy()

    # Convert ngày
    df["REPORT_DATE"] = pd.to_datetime(
        df["REPORT_DATE"],
        errors="coerce"
    )

    if df["REPORT_DATE"].isna().any():
        bad_rows = df[df["REPORT_DATE"].isna()].index.tolist()
        raise ValueError(
            "Có dòng REPORT_DATE không parse được ngày. "
            f"Index lỗi: {bad_rows[:10]}"
        )

    # Convert số
    numeric_cols = ["TRANSACTIONS", "REVENUE", "COST", "PROFIT"]

    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

    # Convert text
    text_cols = ["REGION", "BRANCH", "PRODUCT", "CUSTOMER_SEGMENT"]

    for col in text_cols:
        df[col] = df[col].astype(str).str.strip()

    # Format ngày thành yyyy-mm-dd để JavaScript đọc ổn định
    df["REPORT_DATE"] = df["REPORT_DATE"].dt.strftime("%Y-%m-%d")

    # Chỉ lấy các cột cần dùng cho dashboard
    output_cols = [
        "REPORT_DATE",
        "REGION",
        "BRANCH",
        "PRODUCT",
        "CUSTOMER_SEGMENT",
        "TRANSACTIONS",
        "REVENUE",
        "COST",
        "PROFIT",
    ]

    records = df[output_cols].to_dict(orient="records")

    return json.dumps(records, ensure_ascii=False)


# =========================================================
# BUILD PARAMS
# =========================================================
def build_params(df: pd.DataFrame, source_file_name: str):
    data_json = prepare_data_json(df)

    return {
        "{{REPORT_TITLE}}": "EXECUTIVE DASHBOARD",
        "{{REPORT_SUBTITLE}}": "Interactive Business Performance Overview",
        "{{LAST_UPDATED}}": datetime.now().strftime("%d/%m/%Y %H:%M"),
        "{{SIDEBAR_DESCRIPTION}}": (
            "This dashboard provides an interactive overview of business performance "
            "across date range, regions, branches and products."
        ),
        "{{SOURCE_FILE_NAME}}": source_file_name,
        "{{DATA_JSON}}": data_json,
    }


# =========================================================
# RENDER HTML
# =========================================================
def render_html(template_path: Path, output_path: Path, params: dict):
    html = template_path.read_text(encoding="utf-8")

    for key, value in params.items():
        html = html.replace(key, str(value))

    remaining = sorted(set(re.findall(r"\{\{.*?\}\}", html)))

    if remaining:
        raise ValueError(
            "Vẫn còn placeholder chưa được replace trong template: "
            + ", ".join(remaining)
        )

    output_path.parent.mkdir(exist_ok=True)
    output_path.write_text(html, encoding="utf-8")


# =========================================================
# MAIN
# =========================================================
def main():
    setup_logger()
    logging.info("START AUTO INTERACTIVE DASHBOARD REPORT")

    config = load_config()

    data_path = BASE_DIR / config["data_file"]
    template_path = BASE_DIR / config["template_file"]
    output_path = BASE_DIR / config["output_file"]

    if not data_path.exists():
        raise FileNotFoundError(f"Không tìm thấy file data: {data_path}")

    if not template_path.exists():
        raise FileNotFoundError(f"Không tìm thấy file template: {template_path}")

    update_required, current_state = need_update(
        data_path=data_path,
        template_path=template_path,
        output_path=output_path
    )

    if not update_required:
        logging.info("Data/template không thay đổi. Không cần update dashboard.")
        print("Không có thay đổi. Bỏ qua update dashboard.")
        return

    logging.info("Phát hiện data/template thay đổi. Bắt đầu update dashboard.")

    df = read_data(data_path)

    params = build_params(
        df=df,
        source_file_name=data_path.name
    )

    render_html(
        template_path=template_path,
        output_path=output_path,
        params=params
    )

    state = load_state()
    state["last_run"] = current_state
    state["last_output"] = str(output_path)
    state["last_updated"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    save_state(state)

    logging.info(f"Dashboard updated successfully: {output_path}")
    print(f"Đã cập nhật dashboard: {output_path}")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        setup_logger()
        logging.exception(f"ERROR: {e}")
        print(f"Lỗi: {e}")