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

  // 실험적 기능
  experimental: {
    // CSS 최적화
    optimizeCss: true,
  },

  // Cloudflare Pages 배포를 위한 설정 (Adapter 사용 시 export 제거)
  trailingSlash: true,
};

export default nextConfig;
