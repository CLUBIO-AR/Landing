import { ImageResponse } from "next/og";

export const alt = "CLUBIO — Sistema de gestión para gimnasios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#111827",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "12px",
            height: "100%",
            background: "#22C55E",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "#16A34A",
            opacity: 0.2,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#22C55E",
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            ⚡
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            CLUB<span style={{ color: "#22C55E" }}>IO</span>
          </span>
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            lineHeight: 1.1,
            marginBottom: "24px",
            maxWidth: "800px",
            display: "flex",
          }}
        >
          Tus cuotas <span style={{ color: "#22C55E" }}>&nbsp;se cobran solas.</span>
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#9CA3AF",
            maxWidth: "700px",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Sistema de cobros automáticos para gimnasios en Argentina. MercadoPago ·
          WhatsApp · Sin setup fee.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "20px",
            color: "#22C55E",
            fontWeight: "bold",
          }}
        >
          clubio.com.ar
        </div>
      </div>
    ),
    { ...size }
  );
}
