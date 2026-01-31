// 한국은행 경제통계 API 클라이언트
// API 문서: https://ecos.bok.or.kr/api/#/

export interface InterestRate {
    statCode: string;
    statName: string;
    itemCode: string;
    itemName: string;
    time: string;
    value: number;
    unit: string;
}

// 주요 금리 정적 데이터 (API 연동 전 fallback)
export const staticInterestRates: InterestRate[] = [
    {
        statCode: "722Y001",
        statName: "한국은행 기준금리",
        itemCode: "0101000",
        itemName: "한국은행 기준금리",
        time: "2026.01",
        value: 2.75,
        unit: "%",
    },
    {
        statCode: "121Y002",
        statName: "예금은행 수신금리",
        itemCode: "BEABAA",
        itemName: "정기예금 (신규취급액 기준)",
        time: "2026.01",
        value: 3.12,
        unit: "%",
    },
    {
        statCode: "121Y003",
        statName: "예금은행 대출금리",
        itemCode: "BEABAB",
        itemName: "주택담보대출 (신규취급액 기준)",
        time: "2026.01",
        value: 4.85,
        unit: "%",
    },
    {
        statCode: "121Y003",
        statName: "예금은행 대출금리",
        itemCode: "BEABAC",
        itemName: "일반신용대출 (신규취급액 기준)",
        time: "2026.01",
        value: 5.42,
        unit: "%",
    },
];

// 한국은행 API 호출 (Server Component에서 사용)
export async function fetchInterestRates(): Promise<InterestRate[]> {
    const API_KEY = process.env.BOK_API_KEY;

    if (!API_KEY) {
        console.warn("BOK_API_KEY not configured. Using static data.");
        return staticInterestRates;
    }

    try {
        // 기준금리 조회
        const response = await fetch(
            `https://ecos.bok.or.kr/api/StatisticSearch/${API_KEY}/json/kr/1/10/722Y001/M/202501/202601/0101000`,
            { next: { revalidate: 86400 } } // 24시간 캐싱
        );

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        if (data.StatisticSearch?.row) {
            return data.StatisticSearch.row.map((item: Record<string, string>) => ({
                statCode: item.STAT_CODE,
                statName: item.STAT_NAME,
                itemCode: item.ITEM_CODE1,
                itemName: item.ITEM_NAME1,
                time: item.TIME,
                value: parseFloat(item.DATA_VALUE),
                unit: item.UNIT_NAME,
            }));
        }

        return staticInterestRates;
    } catch (error) {
        console.error("BOK API error:", error);
        return staticInterestRates;
    }
}

// 금리 변동 방향 계산
export function getRateDirection(current: number, previous: number): "up" | "down" | "same" {
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "same";
}

// 금리 표시 포맷
export function formatRate(value: number): string {
    return `${value.toFixed(2)}%`;
}
