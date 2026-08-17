import { ImageResponse } from "next/og";

export const alt = "Hangyeom Christian Lee — Full-stack developer";
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
          padding: "90px",
          background: "#FBFAF7",
          color: "#1C1A16",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: "80px", fontWeight: 600, letterSpacing: "-0.02em" }}>
          Hangyeom Christian Lee
        </div>
        <div style={{ fontSize: "34px", color: "#6D675C", marginTop: "24px" }}>
          Full-stack developer. Systems Design Engineering at Waterloo.
        </div>
        <div
          style={{
            width: "120px",
            height: "3px",
            background: "#9C4221",
            marginTop: "48px",
          }}
        />
        <div style={{ fontSize: "28px", color: "#4A443B", marginTop: "36px", lineHeight: 1.5 }}>
          I built and still maintain mask12.com, a wholesale store in Toronto.
        </div>
      </div>
    ),
    size
  );
}
