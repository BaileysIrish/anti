// 한국은행 경제통계시스템 API 클라이언트
// API 문서: https://ecos.bok.or.kr/api/#/
// 모든 금리 데이터를 실시간으로 조회

export interface InterestRate {
    statCode: string;
    statName: string;
    itemCode: string;
    itemName: string;
    time: string;
    value: number;
    unit: string;
}

// 정적 데이터 (API fallback)
export const staticInterestRates: InterestRate[] = [
    {
        statCode: "722Y001",
        statName: "한국은행 기준금리 및 여수신금리",
        itemCode: "0101000",
        itemName: "한국은행 기준금리",
        time: "2025.12",
        value: 2.5,
        unit: "%",
    },
    {
        statCode: "121Y002",
        statName: "예금은행 수신금리",
        itemCode: "BEABAA",
        itemName: "정기예금 (신규취급액 기준)",
        time: "2025.12",
        value: 3.12,
        unit: "%",
    },
    {
        statCode: "121Y003",
        statName: "예금은행 대출금리",
        itemCode: "BEABAB",
        itemName: "주택담보대출 (신규취급액 기준)",
        time: "2025.12",
        value: 4.85,
        unit: "%",
    },
    {
        statCode: "121Y003",
        statName: "예금은행 대출금리",
        itemCode: "BEABAC",
        itemName: "일반신용대출 (신규취급액 기준)",
        time: "2025.12",
        value: 5.42,
        unit: "%",
    },
];

// 개별 금리 조회 헬퍼 함수
async function fetchSingleRate(
    apiKey: string,
    statCode: string,
    itemCode: string,
    startDate: string,
    endDate: string
): Promise<InterestRate | null> {
    try {
        const response = await fetch(
            `https://ecos.bok.or.kr/api/StatisticSearch/${apiKey}/json/kr/1/12/${statCode}/M/${startDate}/${endDate}/${itemCode}`,
            { next: { revalidate: 86400 } } // 24시간 캐싱
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        if (data.StatisticSearch?.row && data.StatisticSearch.row.length > 0) {
            // 최신 데이터 가져오기
            const rows = data.StatisticSearch.row;
            rows.sort((a: Record<string, string>, b: Record<string, string>) =>
                b.TIME.localeCompare(a.TIME)
            );

            const latest = rows[0];
            return {
                statCode: latest.STAT_CODE,
                statName: latest.STAT_NAME,
                itemCode: latest.ITEM_CODE1,
                itemName: latest.ITEM_NAME1,
                time: latest.TIME,
                value: parseFloat(latest.DATA_VALUE),
                unit: latest.UNIT_NAME,
            };
        }
        return null;
    } catch {
        return null;
    }
}

// 한국은행 API 호출 (Server Component에서 사용)
export async function fetchInterestRates(): Promise<InterestRate[]> {
    const API_KEY = process.env.BOK_API_KEY;

    if (!API_KEY) {
        console.warn("BOK_API_KEY not configured. Using static data.");
        return staticInterestRates;
    }

    try {
        // 동적으로 날짜 범위 계산 (최근 12개월)
        const now = new Date();
        const endDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
        const startYear = now.getMonth() < 11 ? now.getFullYear() - 1 : now.getFullYear();
        const startMonth = ((now.getMonth() + 2) % 12) || 12;
        const startDate = `${startYear}${String(startMonth).padStart(2, '0')}`;

        // 병렬로 모든 금리 조회
        const [baseRate, depositRate, mortgageRate, creditRate] = await Promise.all([
            // 한국은행 기준금리 (722Y001, 0101000)
            fetchSingleRate(API_KEY, "722Y001", "0101000", startDate, endDate),
            // 순수저축성예금 금리 (121Y002, BEABAA21)
            fetchSingleRate(API_KEY, "121Y002", "BEABAA21", startDate, endDate),
            // 주택담보대출 금리 (121Y006, BECBLA0302)
            fetchSingleRate(API_KEY, "121Y006", "BECBLA0302", startDate, endDate),
            // 일반신용대출 금리 (121Y006, BECBLA03051)
            fetchSingleRate(API_KEY, "121Y006", "BECBLA03051", startDate, endDate),
        ]);

        // 결과 조합 (API 실패 시 정적 데이터 사용)
        const results: InterestRate[] = [
            baseRate ?? staticInterestRates[0],
            depositRate ?? staticInterestRates[1],
            mortgageRate ?? staticInterestRates[2],
            creditRate ?? staticInterestRates[3],
        ];

        // 이름 정규화
        results[0] = { ...results[0], itemName: "한국은행 기준금리" };
        results[1] = { ...results[1], itemName: "정기예금 (신규취급액 기준)" };
        results[2] = { ...results[2], itemName: "주택담보대출 (신규취급액 기준)" };
        results[3] = { ...results[3], itemName: "일반신용대출 (신규취급액 기준)" };

        return results;
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
