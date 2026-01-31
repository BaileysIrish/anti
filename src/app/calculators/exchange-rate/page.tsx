import { fetchExchangeRates, staticExchangeRates } from "@/lib/api/koreaexim";
import ExchangeRateClient from "@/components/calculator/ExchangeRateClient";

export default async function ExchangeRatePage() {
    let rates = staticExchangeRates;
    let isLive = false;
    let lastUpdated = "2026년 1월 31일 (정적 데이터)";

    try {
        const liveRates = await fetchExchangeRates();
        if (liveRates && liveRates.length > 0) {
            rates = liveRates;
            isLive = true;
            const today = new Date();
            lastUpdated = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
        }
    } catch (error) {
        console.error("Failed to fetch live exchange rates:", error);
        // 정적 데이터 사용 (이미 설정됨)
    }

    return (
        <ExchangeRateClient
            rates={rates}
            lastUpdated={lastUpdated}
            isLive={isLive}
        />
    );
}
