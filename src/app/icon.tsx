import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#111827",
          borderRadius: 8,
          color: "#f9fafb",
          display: "flex",
          fontSize: 18,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        N
      </div>
    ),
    { ...size },
  );
}
