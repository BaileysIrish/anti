// 한국수출입은행 환율 API 클라이언트
// API 문서: https://www.koreaexim.go.kr/ir/HPHKIR019M01

export interface ExchangeRate {
    currencyCode: string;  // 통화코드 (USD, EUR, JPY, CNY, CNH 등)
    currencyName: string;  // 통화명
    baseRate: number;      // 매매기준율
    buyRate: number;       // 살 때
    sellRate: number;      // 팔 때
    dealBasR: number;      // 장부가격
    ttBuyingRate: number;  // 전신환 사실 때
    ttSellingRate: number; // 전신환 파실 때
    unitBase: number;      // 단위 기준 (기본 1, JPY는 100)
}

// 주요 통화 정적 데이터 (API 실패 시 fallback)
export const staticExchangeRates: ExchangeRate[] = [
    {
        currencyCode: "USD",
        currencyName: "미국 달러",
        baseRate: 1443.20,
        buyRate: 1468.45,
        sellRate: 1417.95,
        dealBasR: 1443.20,
        ttBuyingRate: 1429.30,
        ttSellingRate: 1457.10,
        unitBase: 1,
    },
    {
        currencyCode: "EUR",
        currencyName: "유로",
        baseRate: 1715.53,
        buyRate: 1749.49,
        sellRate: 1681.57,
        dealBasR: 1715.53,
        ttBuyingRate: 1698.38,
        ttSellingRate: 1732.68,
        unitBase: 1,
    },
    {
        currencyCode: "JPY",
        currencyName: "일본 엔 (100엔)",
        baseRate: 938.42,
        buyRate: 954.84,
        sellRate: 922.00,
        dealBasR: 938.42,
        ttBuyingRate: 929.32,
        ttSellingRate: 947.52,
        unitBase: 100,
    },
    {
        currencyCode: "CNY",
        currencyName: "중국 위안",
        baseRate: 207.63,
        buyRate: 220.08,
        sellRate: 197.25,
        dealBasR: 207.63,
        ttBuyingRate: 205.56,
        ttSellingRate: 209.70,
        unitBase: 1,
    },
    {
        currencyCode: "GBP",
        currencyName: "영국 파운드",
        baseRate: 1977.04,
        buyRate: 2016.38,
        sellRate: 1937.70,
        dealBasR: 1977.04,
        ttBuyingRate: 1957.27,
        ttSellingRate: 1996.81,
        unitBase: 1,
    },
    {
        currencyCode: "CHF",
        currencyName: "스위스 프랑",
        baseRate: 1860.99,
        buyRate: 1898.02,
        sellRate: 1823.96,
        dealBasR: 1860.99,
        ttBuyingRate: 1842.39,
        ttSellingRate: 1879.59,
        unitBase: 1,
    },
    {
        currencyCode: "CAD",
        currencyName: "캐나다 달러",
        baseRate: 1052.74,
        buyRate: 1073.68,
        sellRate: 1031.80,
        dealBasR: 1052.74,
        ttBuyingRate: 1042.22,
        ttSellingRate: 1063.26,
        unitBase: 1,
    },
    {
        currencyCode: "AUD",
        currencyName: "호주 달러",
        baseRate: 999.99,
        buyRate: 1019.88,
        sellRate: 980.10,
        dealBasR: 999.99,
        ttBuyingRate: 990.00,
        ttSellingRate: 1009.98,
        unitBase: 1,
    },
];

const SUPPORTED_CURRENCIES = ["USD", "EUR", "JPY", "CNY", "CNH", "GBP", "CHF", "CAD", "AUD"] as const;
const MAX_LOOKBACK_DAYS = 7;

function formatDateAsYmd(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
}

function parseYmdToDate(ymd: string): Date {
    const year = Number(ymd.slice(0, 4));
    const month = Number(ymd.slice(4, 6));
    const day = Number(ymd.slice(6, 8));
    // noon으로 고정해 DST/자정 경계 문제를 줄인다.
    return new Date(year, month - 1, day, 12, 0, 0, 0);
}

function moveToPreviousBusinessDay(date: Date): void {
    do {
        date.setDate(date.getDate() - 1);
    } while (date.getDay() === 0 || date.getDay() === 6);
}

// 유효한 조회 날짜(영업일) 계산 함수
export function getEffectiveExchangeDate(): { searchDate: string, displayDate: string } {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const kstGap = 9 * 60 * 60 * 1000;
    const todayKst = new Date(utc + kstGap);

    const targetDate = new Date(todayKst);
    const day = targetDate.getDay(); // 0: 일, 6: 토

    // 토요일이면 1일 전(금), 일요일이면 2일 전(금)으로 설정
    if (day === 6) {
        targetDate.setDate(targetDate.getDate() - 1);
    } else if (day === 0) {
        targetDate.setDate(targetDate.getDate() - 2);
    } else if (targetDate.getHours() < 11) {
        // 평일 오전 11시 전이면 전날 데이터 사용 (고시 전)
        targetDate.setDate(targetDate.getDate() - 1);
        // 월요일 오전이면 금요일로 이동
        if (targetDate.getDay() === 0) {
            targetDate.setDate(targetDate.getDate() - 2);
        }
    }

    const searchDate = formatDateAsYmd(targetDate);
    const displayDate = `${targetDate.getMonth() + 1}.${targetDate.getDate()}`;

    return { searchDate, displayDate };
}

// 환율 조회 함수 (실제 API 연동)
export async function fetchExchangeRates(): Promise<ExchangeRate[]> {
    const apiKey = process.env.KOREAEXIM_API_KEY;

    if (!apiKey) {
        throw new Error("API Key is missing in environment variables (KOREAEXIM_API_KEY)");
    }

    const { searchDate: initialSearchDate } = getEffectiveExchangeDate();
    const candidateDate = parseYmdToDate(initialSearchDate);
    let lastDataError: Error | null = null;

    for (let attempt = 0; attempt < MAX_LOOKBACK_DAYS; attempt += 1) {
        const searchDate = formatDateAsYmd(candidateDate);
        console.log(`Fetching exchange rates for date: ${searchDate}`);

        const response = await fetch(
            `https://oapi.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${apiKey}&searchdate=${searchDate}&data=AP01`,
            {
                next: { revalidate: 3600 },
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Accept": "application/json, text/plain, */*",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error(`API returned invalid data type: ${typeof data}`);
        }

        if (data.length > 0) {
            const firstItem = data[0] as Record<string, unknown>;
            const resultCode = (firstItem.result ?? firstItem.RESULT) as number | undefined;

            if (resultCode === 3) {
                throw new Error("API Authentication Failed (Result Code 3): Check your API Key");
            }
            if (resultCode === 4) {
                throw new Error("API Daily Limit Exceeded (Result Code 4)");
            }
        }

        const parsedRates = data
            .filter((item: Record<string, string>) => {
                const rawUnit = item.cur_unit ?? item.CUR_UNIT ?? "";
                const normalizedUnit = rawUnit.replace("(100)", "");
                return SUPPORTED_CURRENCIES.includes(normalizedUnit as typeof SUPPORTED_CURRENCIES[number]);
            })
            .map((item: Record<string, string>) => {
                const rawUnit = item.cur_unit ?? item.CUR_UNIT ?? "";
                const unitBase = rawUnit.includes("(100)") ? 100 : 1;
                const currencyCode = rawUnit.replace("(100)", "");
                const getVal = (lower: string, upper: string) => item[lower] ?? item[upper] ?? "0";
                const parseRate = (value: string): number => {
                    const parsed = parseFloat(value.replace(/,/g, ""));
                    return Number.isFinite(parsed) ? parsed : NaN;
                };

                return {
                    currencyCode,
                    currencyName: item.cur_nm ?? item.CUR_NM ?? "",
                    baseRate: parseRate(getVal("deal_bas_r", "DEAL_BAS_R")),
                    buyRate: parseRate(getVal("ttb", "TTB")),
                    sellRate: parseRate(getVal("tts", "TTS")),
                    dealBasR: parseRate(getVal("deal_bas_r", "DEAL_BAS_R")),
                    ttBuyingRate: parseRate(getVal("ttb", "TTB")),
                    ttSellingRate: parseRate(getVal("tts", "TTS")),
                    unitBase,
                };
            })
            .filter((rate) => {
                return Number.isFinite(rate.baseRate)
                    && Number.isFinite(rate.buyRate)
                    && Number.isFinite(rate.sellRate);
            });

        if (parsedRates.length > 0) {
            return parsedRates;
        }

        lastDataError = new Error(`No exchange rate data found for date: ${searchDate}`);
        moveToPreviousBusinessDay(candidateDate);
    }

    throw lastDataError ?? new Error("No exchange rate data found in lookback window.");
}

// 환율 계산 함수
export function calculateExchange(
    amount: number,
    rate: ExchangeRate,
    direction: "buy" | "sell"
): number {
    if (direction === "buy") {
        // 원화 -> 외화 (JPY 100단위 보정 포함)
        return (amount / rate.buyRate) * rate.unitBase;
    }

    // 외화 -> 원화 (JPY 100단위 보정 포함)
    return (amount / rate.unitBase) * rate.sellRate;
}

// 통화 국기 이모지
export const currencyFlags: Record<string, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    JPY: "🇯🇵",
    CNY: "🇨🇳",
    CNH: "🇨🇳",
    GBP: "🇬🇧",
    CHF: "🇨🇭",
    CAD: "🇨🇦",
    AUD: "🇦🇺",
    KRW: "🇰🇷",
};
