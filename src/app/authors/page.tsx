import type { Metadata } from "next";
import Link from "@/components/common/Link";
import { getAllAuthors } from "@/lib/authors";
import { getIndexablePosts } from "@/lib/blog-data";

export const metadata: Metadata = {
    title: "작성자 및 운영 프로필",
    description: "복지혜택 찾기 콘텐츠 작성자와 편집 검토 담당자의 역할, 검수 기준, 문의 채널을 안내합니다.",
    alternates: {
        canonical: "/authors",
    },
};

export default function AuthorsPage() {
    const authors = getAllAuthors();
    const posts = getIndexablePosts();

    return (
        <div className="py-12">
            <div className="container-custom max-w-5xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">작성자 및 운영 프로필</h1>
                <p className="text-text-muted mb-10">
                    본 페이지는 콘텐츠 생산·검수 주체를 공개해 신뢰 기준을 명확히 하기 위한 안내 페이지입니다.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    {authors.map((author) => {
                        const authoredCount = posts.filter((post) => post.authorId === author.id).length;
                        return (
                            <article key={author.id} className="card p-6">
                                <p className="text-xs font-semibold text-primary mb-2">{author.role}</p>
                                <h2 className="text-xl font-bold text-slate-900">{author.name}</h2>
                                <p className="text-sm text-text-muted mt-3">{author.bio}</p>
                                <p className="text-sm text-slate-600 mt-3">검수 주기: {author.reviewCycle}</p>
                                <p className="text-sm text-slate-600 mt-1">게시글 수: {authoredCount}건</p>
                                <Link href={`/authors/${author.id}`} className="inline-block mt-4 text-primary font-semibold hover:underline">
                                    상세 프로필 보기 →
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

