import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // 압축 활성화
  compress: true,

  // 정적 페이지 생성 (Lighthouse 성능 최적화)
  output: "standalone",

  // 실험적 기능
  experimental: {
    // CSS 최적화
    optimizeCss: true,
  },

  // 보안 헤더
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // 리다이렉트
  async redirects() {
    return [
      {
        source: "/calculator",
        destination: "/calculators/youth-subsidy",
        permanent: true,
      },
      {
        source: "/subsidy",
        destination: "/calculators/youth-subsidy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
