import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OpenNext Cloudflare 호환을 위한 standalone 출력
  output: "standalone",

  // trailing slash 설정 (Cloudflare Pages 호환성)
  trailingSlash: true,

  // 이미지 최적화 - Cloudflare Edge에서는 unoptimized 사용
  images: {
    unoptimized: true,
  },

  // 압축 활성화
  compress: true,
};

export default nextConfig;
