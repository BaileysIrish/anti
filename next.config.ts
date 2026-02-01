import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OpenNext Cloudflare 호환을 위한 standalone 출력
  output: "standalone",
  
  trailingSlash: true,

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
