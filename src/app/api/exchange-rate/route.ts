import { NextResponse } from "next/server";
import {
    fetchExchangeRates,
    getEffectiveExchangeDate,
    staticExchangeRates,
} from "@/lib/api/koreaexim";

const CACHE_CONTROL = "public, s-maxage=3600, stale-while-revalidate=60";

export async function GET() {
    const { searchDate } = getEffectiveExchangeDate();

    try {
        const rates = await fetchExchangeRates();
        if (!Array.isArray(rates) || rates.length === 0) {
            throw new Error("Live exchange rate response is empty.");
        }

        return NextResponse.json(rates, {
            headers: {
                "Cache-Control": CACHE_CONTROL,
                "CDN-Cache-Control": CACHE_CONTROL,
                "Vercel-CDN-Cache-Control": CACHE_CONTROL,
                "X-Data-Source": "live",
                "X-Data-As-Of": searchDate,
            },
        });
    } catch (error) {
        console.error("Exchange rate API failed. Serving fallback data.", error);
        return NextResponse.json(staticExchangeRates, {
            headers: {
                "Cache-Control": CACHE_CONTROL,
                "CDN-Cache-Control": CACHE_CONTROL,
                "Vercel-CDN-Cache-Control": CACHE_CONTROL,
                "X-Data-Source": "fallback",
                "X-Data-As-Of": searchDate,
            },
        });
    }
}
