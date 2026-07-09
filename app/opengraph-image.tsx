import { ImageResponse } from "next/og";

export const alt = "Hangyeom Lee — Full-Stack Engineer who ships live products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0d0d1a 0%, #1a1032 55%, #0f2040 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            color: "#c4b5fd",
            letterSpacing: "4px",
          }}
        >
          FULL-STACK ENGINEER · SHIPS LIVE PRODUCTS
        </div>
        <div style={{ fontSize: "88px", fontWeight: 700, marginTop: "24px" }}>Hangyeom Lee</div>
        <div style={{ fontSize: "34px", color: "#a5b4fc", marginTop: "20px" }}>
          University of Waterloo · Systems Design Engineering
        </div>
        <div style={{ display: "flex", gap: "48px", marginTop: "56px", fontSize: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "44px", fontWeight: 700, color: "#c4b5fd" }}>718</span>
            <span style={{ color: "#94a3b8" }}>weekly visitors</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "44px", fontWeight: 700, color: "#c4b5fd" }}>175+</span>
            <span style={{ color: "#94a3b8" }}>live products</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "44px", fontWeight: 700, color: "#c4b5fd" }}>+89%</span>
            <span style={{ color: "#94a3b8" }}>traffic growth</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
