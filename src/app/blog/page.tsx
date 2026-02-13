import { Metadata } from "next";
import Link from "@/components/common/Link";
import { getAllPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
    title: "블로그 - 금융 정보 및 복지 가이드",
    description: "정부 지원금, 금융 상품, 부동산 정보 등 유용한 가이드를 제공합니다.",
    alternates: {
        canonical: "/blog",
    },
};

const categoryColors: Record<string, string> = {
    지원금: "bg-blue-100 text-blue-800",
    가이드: "bg-green-100 text-green-800",
    금융: "bg-purple-100 text-purple-800",
    환급금: "bg-yellow-100 text-yellow-800",
    부동산: "bg-pink-100 text-pink-800",
};

export default function BlogPage() {
    const blogPosts = getAllPosts();

    return (
        <div className="py-8">
            <div className="container-custom">
                {/* 헤더 */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        📚 유용한 가이드
                    </h1>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        정부 지원금, 금융 상품, 부동산 정보 등
                        실생활에 도움이 되는 정보를 제공합니다.
                    </p>
                </div>

                {/* 블로그 목록 */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-6">
                        {blogPosts.map((post) => (
                            <article key={post.slug} className="card p-6 hover:shadow-lg transition-shadow">
                                <Link href={`/blog/${post.slug}`} className="flex gap-4" prefetch={false}>
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-3xl">{post.emoji}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[post.category] || "bg-gray-100 text-gray-800"}`}>
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-text-light">{post.date}</span>
                                        </div>
                                        <h2 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-text-muted text-sm line-clamp-2">
                                            {post.description}
                                        </p>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-text-muted mb-4">
                        지금 바로 나에게 맞는 지원금을 찾아보세요
                    </p>
                    <Link href="/calculators/youth-subsidy" className="btn-primary">
                        🎯 지원금 계산기 이용하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
