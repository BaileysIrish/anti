interface AdPlaceholderProps {
    variant?: "header" | "inline" | "sidebar" | "footer";
    className?: string;
}

const sizeMap = {
    header: "h-[90px] max-w-[728px]",
    inline: "h-[280px] max-w-[336px]",
    sidebar: "h-[600px] max-w-[300px]",
    footer: "h-[90px] max-w-[728px]",
};

const labelMap = {
    header: "광고 영역 (728x90)",
    inline: "광고 영역 (336x280)",
    sidebar: "광고 영역 (300x600)",
    footer: "광고 영역 (728x90)",
};

/**
 * 애드센스 광고 플레이스홀더 컴포넌트
 * 실제 애드센스 승인 후 광고 코드로 교체
 */
export default function AdPlaceholder({
    variant = "inline",
    className = "",
}: AdPlaceholderProps) {
    return (
        <div className={`flex justify-center my-6 ${className}`}>
            <div
                className={`ad-placeholder w-full ${sizeMap[variant]}`}
                role="complementary"
                aria-label="광고"
            >
                <div className="flex flex-col items-center justify-center h-full">
                    <svg
                        className="w-8 h-8 text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                    </svg>
                    <span className="text-xs">{labelMap[variant]}</span>
                </div>
            </div>
        </div>
    );
}
