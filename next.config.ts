import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화 - Cloudflare Edge에서는 unoptimized 사용
  images: {
    unoptimized: true,
  },

  // 압축 활성화
  compress: true,

  // 실험적 기능
  experimental: {
    // CSS 최적화
    optimizeCss: true,
  },
};

export default nextConfig;
