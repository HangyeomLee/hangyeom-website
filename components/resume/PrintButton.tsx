"use client";

import homeStyles from "../home/home.module.css";

export function PrintButton() {
  return (
    <button className={homeStyles.btnPrimary} onClick={() => window.print()}>
      Download PDF
    </button>
  );
}
