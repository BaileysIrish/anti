import { NextResponse } from "next/server";
import { fetchExchangeRates } from "@/lib/api/koreaexim";

export const runtime = "edge"; // Cloudflare Workers에서 실행

export async function GET() {
    try {
        const rates = await fetchExchangeRates();
        return NextResponse.json(rates, {
            headers: {
                // 브라우저 캐시 1시간 (3600초) 설정
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
                "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
                "Vercel-CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch exchange rates", details: (error as Error).message },
            { status: 500 }
        );
    }
}
