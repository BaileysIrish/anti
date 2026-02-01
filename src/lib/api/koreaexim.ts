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
        baseRate: 1443.20,
        buyRate: 1468.45,
        sellRate: 1417.95,
        dealBasR: 1443.20,
        ttBuyingRate: 1429.30,
        ttSellingRate: 1457.10,
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
        throw new Error("API Key is missing in environment variables (KOREAEXIM_API_KEY)");
    }

    try {
        const { searchDate } = getEffectiveExchangeDate();
        console.log(`Fetching exchange rates for date: ${searchDate}`);

        // 사용자가 제공한 URL (oapi 서브도메인 사용)
        const response = await fetch(
            `https://oapi.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${API_KEY}&searchdate=${searchDate}&data=AP01`,
            {
                next: { revalidate: 3600 },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        // API가 배열이 아닌 경우 (에러 응답 등)
        if (!Array.isArray(data)) {
            // 혹시라도 배열이 아니고 객체로 에러가 올 수도 있음
            throw new Error(`API returned invalid data type: ${typeof data}`);
        }

        // 결과 코드가 있는 경우 체크 (1: 성공, 2: DATA코드 오류, 3: 인증코드 오류, 4: 일일제한횟수 마감)
        // 응답이 배열의 첫번째 요소에만 result가 있을 수도 있고, 각 요소에 있을 수도 있음. 보통 배열의 요소 객체에 있음.
        if (data.length > 0) {
            const firstItem = data[0] as any;
            const resultCode = firstItem.result ?? firstItem.RESULT;

            if (resultCode === 3) {
                throw new Error("API Authentication Failed (Result Code 3): Check your API Key");
            }
            if (resultCode === 4) {
                throw new Error("API Daily Limit Exceeded (Result Code 4)");
            }
            if (resultCode !== 1 && resultCode !== undefined) {
                // 성공(1)이 아니면서 다른 코드가 있는 경우
                console.warn(`API returned non-success result code: ${resultCode}`);
            }

            return data
                .filter((item: any) => {
                    const unit = item.cur_unit ?? item.CUR_UNIT;
                    return ["USD", "EUR", "JPY", "CNH", "GBP", "CHF", "CAD", "AUD"].includes(unit?.replace("(100)", ""));
                })
                .map((item: any) => {
                    // 대소문자 모두 대응
                    const getVal = (keyLower: string, keyUpper: string) => item[keyLower] ?? item[keyUpper] ?? "0";

                    return {
                        currencyCode: (item.cur_unit ?? item.CUR_UNIT)?.replace("(100)", "") || "",
                        currencyName: item.cur_nm ?? item.CUR_NM ?? "",
                        baseRate: parseFloat(getVal("deal_bas_r", "DEAL_BAS_R").replace(/,/g, "")),
                        buyRate: parseFloat(getVal("ttb", "TTB").replace(/,/g, "")),
                        sellRate: parseFloat(getVal("tts", "TTS").replace(/,/g, "")),
                        dealBasR: parseFloat(getVal("deal_bas_r", "DEAL_BAS_R").replace(/,/g, "")),
                        ttBuyingRate: parseFloat(getVal("ttb", "TTB").replace(/,/g, "")),
                        ttSellingRate: parseFloat(getVal("tts", "TTS").replace(/,/g, "")),
                    };
                });
        } else {
            throw new Error(`No exchange rate data found for date: ${searchDate}`);
        }

    } catch (error) {
        throw error;
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
