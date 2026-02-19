import type { Metadata } from "next";
import Link from "@/components/common/Link";
import { notFound } from "next/navigation";
import { getAllAuthors, getAuthorById } from "@/lib/authors";
import { getIndexablePosts } from "@/lib/blog-data";

export const dynamic = "force-static";

export async function generateStaticParams() {
    return getAllAuthors().map((author) => ({ id: author.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const author = getAuthorById(id);

    if (!author) {
        return { title: "작성자를 찾을 수 없습니다" };
    }

    return {
        title: `${author.name} - 작성자 프로필`,
        description: `${author.name}의 역할, 검수 기준, 담당 콘텐츠를 확인할 수 있습니다.`,
        alternates: {
            canonical: `/authors/${id}`,
        },
    };
}

export default async function AuthorDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const author = getAuthorById(id);

    if (!author) {
        notFound();
    }

    const posts = getIndexablePosts()
        .filter((post) => post.authorId === author.id)
        .slice(0, 12);

    return (
        <div className="py-12">
            <div className="container-custom max-w-4xl">
                <Link href="/authors" className="text-sm text-text-muted hover:text-primary">
                    ← 작성자 목록
                </Link>

                <section className="card p-8 mt-4">
                    <p className="text-xs font-semibold text-primary mb-2">{author.role}</p>
                    <h1 className="text-3xl font-bold text-slate-900">{author.name}</h1>
                    <p className="text-text-muted mt-4">{author.bio}</p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 text-sm text-slate-700">
                        <div className="bg-slate-50 rounded-xl p-4 border border-gray-100">
                            <p className="font-semibold text-slate-900">검수 주기</p>
                            <p className="mt-1">{author.reviewCycle}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-gray-100">
                            <p className="font-semibold text-slate-900">문의 이메일</p>
                            <a className="mt-1 text-primary hover:underline break-all inline-block" href={`mailto:${author.contactEmail}`}>
                                {author.contactEmail}
                            </a>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="font-semibold text-slate-900 mb-2">전문 영역</p>
                        <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
                            {author.specialties.map((specialty) => (
                                <li key={specialty}>{specialty}</li>
                            ))}
                        </ul>
                    </div>

                    <p className="mt-6 text-xs text-slate-500">프로필 최종 수정일: {author.profileUpdatedAt}</p>
                </section>

                <section className="mt-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">담당 콘텐츠</h2>
                    {posts.length > 0 ? (
                        <ul className="space-y-3">
                            {posts.map((post) => (
                                <li key={post.slug} className="card p-4">
                                    <Link href={`/blog/${post.slug}`} className="font-semibold text-slate-900 hover:text-primary">
                                        {post.title}
                                    </Link>
                                    <p className="text-sm text-text-muted mt-1">{post.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="card p-5 text-sm text-text-muted">현재 공개된 담당 콘텐츠가 없습니다.</div>
                    )}
                </section>
            </div>
        </div>
    );
}

