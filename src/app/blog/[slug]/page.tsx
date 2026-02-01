import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdPlaceholder from "@/components/ads/AdPlaceholder";
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllPostSlugs, getPostBySlug, getAllPosts } from "@/lib/blog-data";

export const dynamic = "force-static";

// 정적 생성을 위한 경로 생성
export async function generateStaticParams() {
    return getAllPostSlugs().map((slug) => ({
        slug,
    }));
}

// 동적 메타데이터 생성
export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: "게시글을 찾을 수 없습니다" };
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
        },
    };
}

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const allPosts = getAllPosts();

    if (!post) {
        notFound();
    }

    // 관련 글 (현재 글 제외, 최대 2개)
    const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* 프리미엄 헤더 배경 */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10 bg-opacity-90 backdrop-blur-md">
                <div className="container-custom py-4">
                    <Link href="/blog" className="flex items-center text-text-muted hover:text-primary transition-colors font-medium">
                        ← 블로그 목록
                    </Link>
                </div>
            </div>

            <div className="container-custom max-w-4xl py-12">
                {/* 아티클 헤더 */}
                <div className="text-center mb-12">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-sm border ${post.category === "지원금" ? "bg-blue-50 text-blue-700 border-blue-100" :
                        post.category === "가이드" ? "bg-green-50 text-green-700 border-green-100" :
                            post.category === "금융" ? "bg-purple-50 text-purple-700 border-purple-100" :
                                post.category === "환급금" ? "bg-amber-50 text-amber-700 border-amber-100" :
                                    "bg-pink-50 text-pink-700 border-pink-100"
                        }`}>
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-slate-900 tracking-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-text-muted text-sm">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>금융정보팀</span>
                    </div>
                </div>

                {/* 상단 광고 */}
                <div className="mb-12">
                    <AdPlaceholder variant="header" />
                </div>

                {/* 본문 콘텐츠 - MDX 렌더링 */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-slate-600 prose-strong:text-slate-900 prose-img:rounded-xl">
                        <MDXRemote
                            source={post.content}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm],
                                },
                            }}
                        />
                    </article>

                    {/* 면책 고지 (사용자 요청) */}
                    <div className="mt-16 p-6 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500 leading-relaxed">
                        <div className="flex items-start gap-3">
                            <span className="text-xl">⚖️</span>
                            <div>
                                <p className="font-semibold text-gray-700 mb-1">면책 고지</p>
                                <p>본 콘텐츠는 작성일 기준의 일반적인 정보를 바탕으로 작성되었으며, 정부 정책 변경 및 시기에 따라 실제 내용과 다를 수 있습니다. 정확한 최신 정보는 반드시 관련 정부 기관 및 공식 사이트(정부24, 복지로 등)를 통해 다시 한번 확인하시기 바랍니다. 본 웹사이트의 정보 활용에 따른 법적 책임은 사용자 본인에게 있습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 중간 광고 */}
                <div className="my-12">
                    <AdPlaceholder variant="inline" />
                </div>

                {/* 관련 추천 글 */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-slate-900">📚 이 글과 관련된 추천 정보</h3>
                        <Link href="/blog" className="text-sm font-semibold text-primary hover:text-primary-dark" prefetch={false}>
                            전체보기 →
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {relatedPosts.map((relatedPost) => (
                            <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-primary/20 transition-all duration-300" prefetch={false}>
                                <div className="p-6">
                                    <span className="text-xs font-bold text-primary mb-2 block">{relatedPost.category}</span>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                        {relatedPost.title}
                                    </h4>
                                    <p className="text-sm text-text-muted line-clamp-2">
                                        {relatedPost.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 하단 CTA */}
                <div className="mt-16 bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden">
                    {/* SVG 패턴은 파일로 따로 없으므로 CSS나 간단한 요소로 대체 */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">내 지원금, 아직도 모르시나요?</h2>
                        <p className="text-primary-100 mb-8 max-w-xl mx-auto text-lg">
                            간단한 정보 입력만으로 2026년 내가 받을 수 있는 정부 지원금을 한 번에 계산해 드립니다.
                        </p>
                        <Link href="/calculators/youth-subsidy" className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg transform hover:-translate-y-1">
                            💰 내 지원금 조회하기
                        </Link>
                    </div>
                </div>

                {/* 하단 광고 */}
                <div className="mt-12">
                    <AdPlaceholder variant="footer" />
                </div>
            </div>
        </div>
    );
}
