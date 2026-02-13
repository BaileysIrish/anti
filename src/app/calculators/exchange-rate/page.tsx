import {
    fetchExchangeRates,
    getEffectiveExchangeDate,
    staticExchangeRates,
} from "@/lib/api/koreaexim";
import ExchangeRateClient from "@/components/calculator/ExchangeRateClient";

export default async function ExchangeRatePage() {
    const { searchDate } = getEffectiveExchangeDate();
    const asOfDate = `${searchDate.slice(0, 4)}년 ${Number(searchDate.slice(4, 6))}월 ${Number(searchDate.slice(6, 8))}일`;
    let rates = staticExchangeRates;
    let isLive = false;
    let lastUpdated = `${asOfDate} (정적 데이터 기준)`;

    try {
        const liveRates = await fetchExchangeRates();
        if (liveRates && liveRates.length > 0) {
            rates = liveRates;
            isLive = true;
            lastUpdated = asOfDate;
        }
    } catch {
        console.error("Failed to fetch live exchange rates. Using static fallback.");
        // 정적 데이터 사용 (이미 설정됨)
        lastUpdated = `${asOfDate} (정적 데이터 표시 중)`;
    }

    return (
        <ExchangeRateClient
            rates={rates}
            lastUpdated={lastUpdated}
            isLive={isLive}
        />
    );
}
