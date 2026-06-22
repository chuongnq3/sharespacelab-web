# =============================================================
#  DAP AN TONG HOP — 4 BAI TAP AUTOMATION
#  Python Foundation · Tu dong hoa bao cao
# =============================================================
#
#  File nay chua dap an day du cho ca 4 bai tap.
#  Khuyen nghi: tu lam truoc, chi mo dap an khi can doi chieu.
#
#  Cau truc:
#    BAI 1: doc_va_xuat_csv()      — Basic
#    BAI 2: gom_nhieu_file()       — Intermediate
#    BAI 3: render_html_report()   — Advanced
#    BAI 4: pipeline_hoan_chinh()  — Expert (full modular)
# =============================================================

import io
import json
import logging
import numpy as np
import pandas as pd
from pathlib import Path
from datetime import datetime


# =============================================================
#  BAI 1 — BASIC
#  Doc file Excel, tinh tong BALANCE theo BRANCH, xuat CSV
# =============================================================

def bai1_doc_va_xuat_csv(
    input_file  = Path("input/data.xlsx"),
    output_file = Path("output/summary.csv"),
):
    # --- kiem tra file
    if not input_file.exists():
        raise FileNotFoundError(f"Khong tim thay: {input_file}")

    # --- doc du lieu
    df = pd.read_excel(input_file, sheet_name="Data")

    # --- kiem tra cot
    required_cols = ["BRANCH", "BALANCE"]
    missing = [c for c in required_cols if c not in df.columns]
    if missing:
        raise ValueError(f"Thieu cot: {missing}")

    # --- tinh tong
    summary = (
        df
        .groupby("BRANCH", as_index=False)["BALANCE"]
        .sum()
        .rename(columns={"BALANCE": "TOTAL_BALANCE"})
        .sort_values("TOTAL_BALANCE", ascending=False)
    )

    # --- xuat CSV
    output_file.parent.mkdir(parents=True, exist_ok=True)
    summary.to_csv(output_file, index=False, encoding="utf-8-sig")
    print(f"Bai 1 Done — {len(summary)} chi nhanh, luu tai {output_file}")
    return summary


# =============================================================
#  BAI 2 — INTERMEDIATE
#  Gom nhieu file, loai trung theo CIF, tinh KPI, xuat Excel 2 sheet
# =============================================================

def bai2_gom_nhieu_file(
    input_dir   = Path("input"),
    output_file = Path("output/combined_report.xlsx"),
):
    # --- lay danh sach file
    all_files = list(input_dir.glob("*.xlsx"))
    if not all_files:
        raise FileNotFoundError(f"Khong co file Excel trong {input_dir}")

    # --- doc tung file
    frames = []
    for f in all_files:
        try:
            df_tmp = pd.read_excel(f, sheet_name="Data")
            df_tmp["SOURCE_FILE"] = f.name
            frames.append(df_tmp)
            print(f"  Da doc: {f.name} — {len(df_tmp):,} dong")
        except Exception as e:
            print(f"  [WARN] Loi khi doc {f.name}: {e}")

    if not frames:
        raise ValueError("Khong doc duoc du lieu tu bat ky file nao.")

    # --- gop lai
    df = pd.concat(frames, ignore_index=True)
    print(f"Tong cong: {len(df):,} dong truoc khi loai trung")

    # --- chuan hoa kieu du lieu
    df["BALANCE"] = pd.to_numeric(df["BALANCE"], errors="coerce").fillna(0)
    df["DATE"]    = pd.to_datetime(df["DATE"], errors="coerce")

    # --- loai trung theo CIF, giu ban ghi co DATE moi nhat
    df = (
        df
        .sort_values("DATE", ascending=False)
        .drop_duplicates(subset=["CIF"], keep="first")
    )
    print(f"Sau khi loai trung: {len(df):,} dong")

    # --- KPI theo BRANCH
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
        df.to_excel(writer,  sheet_name="Chi tiet",     index=False)
        kpi.to_excel(writer, sheet_name="KPI tong hop", index=False)

    print(f"Bai 2 Done — luu tai {output_file}")
    return df, kpi


# =============================================================
#  BAI 3 — ADVANCED
#  Doc du lieu, tinh KPI, render HTML tu template co placeholder
# =============================================================

def bai3_render_html_report(
    input_file    = Path("input/data.xlsx"),
    template_file = Path("template/dashboard_template.html"),
    output_file   = Path("output/dashboard_report.html"),
):
    # --- doc va chuan hoa
    df = pd.read_excel(input_file, sheet_name="Data")
    df["BALANCE"] = pd.to_numeric(df["BALANCE"], errors="coerce").fillna(0)
    df["DATE"]    = pd.to_datetime(df["DATE"], errors="coerce")
    df["STATUS"]  = df["STATUS"].astype(str).str.strip()

    # --- tinh KPI
    total_balance  = df["BALANCE"].sum()
    total_customer = df["CIF"].nunique()
    active_count   = df[df["STATUS"] == "Active"]["CIF"].nunique()
    active_pct     = active_count / total_customer * 100 if total_customer else 0

    # --- top 5 branch
    top5 = (
        df.groupby("BRANCH")["BALANCE"]
        .sum()
        .sort_values(ascending=False)
        .head(5)
        .reset_index()
    )
    top5_rows = "".join(
        f"<tr><td>{row['BRANCH']}</td><td>{row['BALANCE']:,.0f}</td></tr>"
        for _, row in top5.iterrows()
    )

    # --- tao params
    params = {
        "{{REPORT_DATE}}":    datetime.today().strftime("%d/%m/%Y"),
        "{{TOTAL_BALANCE}}":  f"{total_balance:,.0f}",
        "{{TOTAL_CUSTOMER}}": f"{total_customer:,}",
        "{{ACTIVE_PCT}}":     f"{active_pct:.1f}%",
        "{{TOP5_ROWS}}":      top5_rows,
    }

    # --- doc template va replace
    html = template_file.read_text(encoding="utf-8")
    for key, value in params.items():
        html = html.replace(key, str(value))

    # --- kiem tra placeholder con sot
    if "{{" in html:
        print("[WARN] Con placeholder chua duoc replace trong HTML")

    # --- ghi output
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(html, encoding="utf-8")
    print(f"Bai 3 Done — luu tai {output_file}")
    return output_file


# =============================================================
#  BAI 4 — EXPERT
#  Pipeline hoan chinh: config + logging + 4 function modular
# =============================================================

# --- setup log (cho bai 4)
def _setup_logging() -> logging.Logger:
    log_dir  = Path("logs")
    log_dir.mkdir(exist_ok=True)
    log_file = log_dir / f"run_{datetime.today().strftime('%Y%m%d_%H%M%S')}.log"

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.FileHandler(log_file, encoding="utf-8"),
            logging.StreamHandler(),
        ]
    )
    return logging.getLogger("pipeline")


def load_config(config_path: Path) -> dict:
    if not config_path.exists():
        raise FileNotFoundError(f"Config khong ton tai: {config_path}")

    cfg = json.loads(config_path.read_text(encoding="utf-8"))

    required_keys = [
        "input_file", "template_file", "output_file",
        "sheet_name", "col_cif", "col_branch",
        "col_balance", "col_date", "col_status"
    ]
    missing = [k for k in required_keys if k not in cfg]
    if missing:
        raise ValueError(f"Config thieu key: {missing}")
    return cfg


def load_data(cfg: dict, log: logging.Logger) -> pd.DataFrame:
    path = Path(cfg["input_file"])
    if not path.exists():
        raise FileNotFoundError(f"Khong tim thay file: {path}")

    df = pd.read_excel(path, sheet_name=cfg["sheet_name"])
    log.info(f"Da doc {len(df):,} dong tu {path.name}")

    required_cols = [
        cfg["col_cif"], cfg["col_branch"],
        cfg["col_balance"], cfg["col_date"], cfg["col_status"]
    ]
    missing = [c for c in required_cols if c not in df.columns]
    if missing:
        raise ValueError(f"Thieu cot: {missing}")

    df[cfg["col_balance"]] = pd.to_numeric(df[cfg["col_balance"]], errors="coerce").fillna(0)
    df[cfg["col_date"]]    = pd.to_datetime(df[cfg["col_date"]], errors="coerce")

    null_counts = df[required_cols].isnull().sum()
    for col, cnt in null_counts[null_counts > 0].items():
        log.warning(f"Cot '{col}' co {cnt:,} gia tri null")

    return df


def compute_kpi(df: pd.DataFrame, cfg: dict, log: logging.Logger) -> dict:
    cif     = cfg["col_cif"]
    branch  = cfg["col_branch"]
    balance = cfg["col_balance"]
    status  = cfg["col_status"]

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

    log.info(
        f"KPI: balance={total_balance:,.0f}, "
        f"customer={total_customer:,}, active={active_pct:.1f}%"
    )

    return {
        "{{REPORT_DATE}}":    datetime.today().strftime("%d/%m/%Y"),
        "{{TOTAL_BALANCE}}":  f"{total_balance:,.0f}",
        "{{TOTAL_CUSTOMER}}": f"{total_customer:,}",
        "{{ACTIVE_PCT}}":     f"{active_pct:.1f}%",
        "{{TOP5_ROWS}}":      top5_rows,
    }


def render_html(params: dict, cfg: dict, log: logging.Logger) -> None:
    template = Path(cfg["template_file"])
    output   = Path(cfg["output_file"])

    html = template.read_text(encoding="utf-8")
    for key, value in params.items():
        html = html.replace(key, str(value))

    if "{{" in html:
        log.warning("Con placeholder chua duoc replace trong HTML")

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html, encoding="utf-8")
    log.info(f"Da xuat bao cao: {output}")


def bai4_pipeline_hoan_chinh():
    log = _setup_logging()
    log.info("=== BAT DAU PIPELINE ===")
    try:
        cfg    = load_config(Path("config/config.json"))
        df     = load_data(cfg, log)
        params = compute_kpi(df, cfg, log)
        render_html(params, cfg, log)
        log.info("=== HOAN THANH ===")
    except Exception as e:
        log.error(f"Pipeline that bai: {e}", exc_info=True)
        raise


# =============================================================
#  CHAY TAT CA BAI TAP (demo voi du lieu mau trong bo nho)
# =============================================================

def _make_sample_df(n: int = 200) -> pd.DataFrame:
    """Tao DataFrame mau de test ma khong can file Excel."""
    rng      = np.random.default_rng(42)
    branches = ["HN001", "HN002", "HCM001", "HCM002", "DN001"]
    return pd.DataFrame({
        "CIF":     [f"KH{i:04d}" for i in range(1, n + 1)],
        "BRANCH":  rng.choice(branches, n),
        "BALANCE": rng.integers(100_000_000, 15_000_000_000, n),
        "DATE":    pd.date_range("2024-01-01", periods=n, freq="D"),
        "STATUS":  rng.choice(["Active", "Inactive"], n, p=[0.85, 0.15]),
    })


def demo_all():
    """Chay demo 3 bai dau voi du lieu mau trong bo nho."""
    print("\n" + "="*60)
    print("  DEMO — Chay voi du lieu mau (khong can file that)")
    print("="*60)

    df = _make_sample_df()

    # --- Bai 1: tinh tong
    print("\n[BAI 1] Tong BALANCE theo BRANCH:")
    summary = (
        df.groupby("BRANCH", as_index=False)["BALANCE"]
        .sum()
        .rename(columns={"BALANCE": "TOTAL_BALANCE"})
        .sort_values("TOTAL_BALANCE", ascending=False)
    )
    print(summary.to_string(index=False))

    # --- Bai 2: loai trung
    print("\n[BAI 2] Sau khi loai trung theo CIF:")
    df_dedup = (
        df.sort_values("DATE", ascending=False)
          .drop_duplicates(subset=["CIF"], keep="first")
    )
    kpi = (
        df_dedup.groupby("BRANCH")
        .agg(SO_KH=("CIF","nunique"), TONG_DU_NO=("BALANCE","sum"))
        .round(0).reset_index()
        .sort_values("TONG_DU_NO", ascending=False)
    )
    print(kpi.to_string(index=False))

    # --- Bai 3: KPI
    print("\n[BAI 3] KPI tong hop:")
    total_balance  = df["BALANCE"].sum()
    total_customer = df["CIF"].nunique()
    active_pct     = df[df["STATUS"]=="Active"]["CIF"].nunique() / total_customer * 100
    print(f"  Tong du no   : {total_balance:,.0f} VND")
    print(f"  Tong KH      : {total_customer:,}")
    print(f"  Ty le Active : {active_pct:.1f}%")

    print("\n" + "="*60)
    print("  De chay day du voi file that, goi tung function:")
    print("    bai1_doc_va_xuat_csv()")
    print("    bai2_gom_nhieu_file()")
    print("    bai3_render_html_report()")
    print("    bai4_pipeline_hoan_chinh()")
    print("="*60)


if __name__ == "__main__":
    demo_all()
