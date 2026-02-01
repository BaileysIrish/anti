"use client";

import NextLink from "next/link";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

/**
 * 커스텀 Link 컴포넌트
 * Cloudflare Pages 호환성을 위해 prefetch를 기본적으로 비활성화
 */
export default function Link({ prefetch = false, ...props }: LinkProps) {
    return <NextLink prefetch={prefetch} {...props} />;
}
