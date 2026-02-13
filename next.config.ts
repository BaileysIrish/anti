import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OpenNext Cloudflare 호환을 위한 standalone 출력
  output: "standalone",

  // Search Console 리디렉션 이슈 완화를 위해 표준 URL을 non-trailing-slash로 통일
  trailingSlash: false,

  // 이미지 최적화 - Cloudflare Edge에서는 unoptimized 사용
  images: {
    unoptimized: true,
  },

  // 압축 활성화
  compress: true,
};

export default nextConfig;
