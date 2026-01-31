// 한국수출입은행 환율 API 클라이언트
// API 문서: https://www.koreaexim.go.kr/ir/HPHKIR019M01

export interface ExchangeRate {
    currencyCode: string;  // 통화코드 (USD, EUR, JPY 등)
    currencyName: string;  // 통화명
    baseRate: number;      // 매매기준율
    buyRate: number;       // 살 때
    sellRate: number;      // 팔 때
    dealBasR: number;      // 장부가격
    ttBuyingRate: number;  // 전신환 사실 때
    ttSellingRate: number; // 전신환 파실 때
}

// 주요 통화 정적 데이터 (API 연동 전 fallback)
export const staticExchangeRates: ExchangeRate[] = [
    {
        currencyCode: "USD",
        currencyName: "미국 달러",
        baseRate: 1350.50,
        buyRate: 1364.00,
        sellRate: 1337.00,
        dealBasR: 1350.50,
        ttBuyingRate: 1360.50,
        ttSellingRate: 1340.50,
    },
    {
        currencyCode: "EUR",
        currencyName: "유로",
        baseRate: 1465.20,
        buyRate: 1480.00,
        sellRate: 1450.40,
        dealBasR: 1465.20,
        ttBuyingRate: 1476.00,
        ttSellingRate: 1454.40,
    },
    {
        currencyCode: "JPY",
        currencyName: "일본 엔 (100엔)",
        baseRate: 890.50,
        buyRate: 899.00,
        sellRate: 882.00,
        dealBasR: 890.50,
        ttBuyingRate: 896.00,
        ttSellingRate: 885.00,
    },
    {
        currencyCode: "CNY",
        currencyName: "중국 위안",
        baseRate: 185.30,
        buyRate: 190.00,
        sellRate: 180.60,
        dealBasR: 185.30,
        ttBuyingRate: 188.00,
        ttSellingRate: 182.60,
    },
    {
        currencyCode: "GBP",
        currencyName: "영국 파운드",
        baseRate: 1710.80,
        buyRate: 1728.00,
        sellRate: 1693.60,
        dealBasR: 1710.80,
        ttBuyingRate: 1722.00,
        ttSellingRate: 1699.60,
    },
    {
        currencyCode: "CHF",
        currencyName: "스위스 프랑",
        baseRate: 1512.40,
        buyRate: 1527.50,
        sellRate: 1497.30,
        dealBasR: 1512.40,
        ttBuyingRate: 1522.00,
        ttSellingRate: 1502.80,
    },
    {
        currencyCode: "CAD",
        currencyName: "캐나다 달러",
        baseRate: 945.60,
        buyRate: 955.00,
        sellRate: 936.20,
        dealBasR: 945.60,
        ttBuyingRate: 951.00,
        ttSellingRate: 940.20,
    },
    {
        currencyCode: "AUD",
        currencyName: "호주 달러",
        baseRate: 865.40,
        buyRate: 874.00,
        sellRate: 856.80,
        dealBasR: 865.40,
        ttBuyingRate: 870.80,
        ttSellingRate: 860.00,
    },
];

// 유효한 조회 날짜(영업일) 계산 함수
export function getEffectiveExchangeDate(): { searchDate: string, displayDate: string } {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const kstGap = 9 * 60 * 60 * 1000;
    const todayKst = new Date(utc + kstGap);

    let targetDate = new Date(todayKst);
    const day = targetDate.getDay(); // 0: 일, 6: 토

    // 토요일이면 1일 전(금), 일요일이면 2일 전(금)으로 설정
    if (day === 6) {
        targetDate.setDate(targetDate.getDate() - 1);
    } else if (day === 0) {
        targetDate.setDate(targetDate.getDate() - 2);
    } else {
        // 평일이라도 오전 11시 이전이면 전날 데이터 사용 (아직 고시 안됨)
        if (targetDate.getHours() < 11) {
            targetDate.setDate(targetDate.getDate() - 1);
            // 전날이 일요일이면(즉 오늘이 월요일 오전), 금요일로 이동
            if (targetDate.getDay() === 0) {
                targetDate.setDate(targetDate.getDate() - 2);
            }
        }
    }

    const searchDate = targetDate.toISOString().slice(0, 10).replace(/-/g, "");
    const displayDate = `${targetDate.getMonth() + 1}.${targetDate.getDate()}`;

    return { searchDate, displayDate };
}

// 환율 조회 함수 (실제 API 연동)
export async function fetchExchangeRates(): Promise<ExchangeRate[]> {
    const API_KEY = process.env.KOREAEXIM_API_KEY;

    if (!API_KEY) {
        console.warn("KOREAEXIM_API_KEY not configured. Using static data.");
        return staticExchangeRates;
    }

    try {
        const { searchDate } = getEffectiveExchangeDate();
        console.log(`Fetching exchange rates for date: ${searchDate}`);

        const response = await fetch(
            `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${API_KEY}&searchdate=${searchDate}&data=AP01`,
            {
                next: { revalidate: 3600 },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                }
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            return data
                .filter((item: Record<string, string>) =>
                    ["USD", "EUR", "JPY", "CNH", "GBP", "CHF", "CAD", "AUD"].includes(item.cur_unit?.replace("(100)", ""))
                )
                .map((item: Record<string, string>) => ({
                    currencyCode: item.cur_unit?.replace("(100)", "") || "",
                    currencyName: item.cur_nm || "",
                    baseRate: parseFloat(item.deal_bas_r?.replace(",", "") || "0"),
                    buyRate: parseFloat(item.ttb?.replace(",", "") || "0"),
                    sellRate: parseFloat(item.tts?.replace(",", "") || "0"),
                    dealBasR: parseFloat(item.deal_bas_r?.replace(",", "") || "0"),
                    ttBuyingRate: parseFloat(item.ttb?.replace(",", "") || "0"),
                    ttSellingRate: parseFloat(item.tts?.replace(",", "") || "0"),
                }));
        } else {
            console.warn(`No exchange rate data found for ${searchDate}. Returning static data.`);
            return staticExchangeRates;
        }

        return staticExchangeRates;
    } catch (error) {
        console.error("Korea Exim API error:", error);
        // Fallback to static data on error
        return staticExchangeRates;
    }
}

// 환율 계산 함수
export function calculateExchange(
    amount: number,
    rate: ExchangeRate,
    direction: "buy" | "sell"
): number {
    if (direction === "buy") {
        // 외화 살 때: 원화 → 외화
        return amount / rate.buyRate;
    } else {
        // 외화 팔 때: 외화 → 원화
        return amount * rate.sellRate;
    }
}

// 통화 국기 이모지
export const currencyFlags: Record<string, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    JPY: "🇯🇵",
    CNY: "🇨🇳",
    GBP: "🇬🇧",
    CHF: "🇨🇭",
    CAD: "🇨🇦",
    AUD: "🇦🇺",
    KRW: "🇰🇷",
};
