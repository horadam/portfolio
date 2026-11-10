import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

// Link preview for LinkedIn, Slack and similar; case studies reuse it.
export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0c1611",
        color: "#86a092",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#8fe3b0" }}>
        {profile.title.toLowerCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 104, color: "#e2ede6", lineHeight: 1 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 36, maxWidth: 900, lineHeight: 1.3 }}>
          {profile.pitch}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: 4,
          width: 120,
          background: "#8fe3b0",
        }}
      />
    </div>,
    size,
  );
}
