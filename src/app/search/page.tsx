import type { Metadata } from "next";
import Link from "@/components/common/Link";
import { getIndexablePosts } from "@/lib/blog-data";

export const metadata: Metadata = {
    title: "사이트 검색",
    description: "복지혜택 찾기 블로그와 계산기 페이지를 검색합니다.",
    alternates: {
        canonical: "/search",
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const keyword = q?.trim() ?? "";

    const posts = getIndexablePosts();
    const matchedPosts = keyword
        ? posts.filter((post) => {
              const haystack = `${post.title} ${post.description} ${post.category}`.toLowerCase();
              return haystack.includes(keyword.toLowerCase());
          })
        : [];

    return (
        <div className="py-8">
            <div className="container-custom max-w-4xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">사이트 검색</h1>
                <p className="text-text-muted mb-6">
                    주소창에서 <code>?q=검색어</code> 형태로 검색할 수 있습니다.
                </p>

                {keyword ? (
                    <>
                        <p className="text-sm text-text-muted mb-4">
                            &quot;{keyword}&quot; 검색 결과 {matchedPosts.length}건
                        </p>
                        {matchedPosts.length > 0 ? (
                            <ul className="space-y-3">
                                {matchedPosts.map((post) => (
                                    <li key={post.slug} className="card p-4">
                                        <Link href={`/blog/${post.slug}`} className="font-semibold text-slate-900 hover:text-primary">
                                            {post.title}
                                        </Link>
                                        <p className="text-sm text-text-muted mt-1">{post.description}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="card p-6 text-text-muted">
                                검색 결과가 없습니다. 다른 키워드로 시도해 주세요.
                            </div>
                        )}
                    </>
                ) : (
                    <div className="card p-6 text-text-muted">
                        검색어를 입력해 결과를 확인하세요.
                    </div>
                )}
            </div>
        </div>
    );
}
