import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(145deg, #0a1628 0%, #1b2a4a 50%, #243a66 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#b8860b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            OM
          </div>
          <div style={{ fontSize: 48, fontWeight: 700 }}>{SITE_NAME}</div>
        </div>
        <div style={{ fontSize: 32, color: "#e6c86a", maxWidth: 800, lineHeight: 1.3 }}>{SITE_TAGLINE}</div>
        <div style={{ marginTop: 24, fontSize: 22, color: "#c5cfe0" }}>
          FAQ · AP G.O. calculators · Official portals · Expert guidance
        </div>
      </div>
    ),
    { ...size }
  );
}
