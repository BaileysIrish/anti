// 정부24 공공서비스 API 클라이언트
// API 문서: https://www.data.go.kr/data/15000391/openapi.do

export interface GovernmentService {
    serviceId: string;
    serviceName: string;
    description: string;
    targetAudience: string;
    applicationMethod: string;
    applicationUrl: string;
    category: string;
    department: string;
}

// API 응답 타입
interface Gov24ApiResponse {
    response: {
        header: {
            resultCode: string;
            resultMsg: string;
        };
        body: {
            items: {
                item: Array<{
                    서비스ID: string;
                    서비스명: string;
                    서비스목적요약: string;
                    신청방법: string;
                    소관기관명: string;
                }>;
            };
            totalCount: number;
        };
    };
}

// 정부24 API 호출 (Server Component에서 사용)
export async function fetchGovernmentServices(
    keyword?: string,
    category?: string
): Promise<GovernmentService[]> {
    const API_KEY = process.env.GOV24_API_KEY;

    if (!API_KEY) {
        console.warn("GOV24_API_KEY not configured. Using static data.");
        return staticGovernmentServices;
    }

    try {
        const params = new URLSearchParams({
            serviceKey: API_KEY,
            pageNo: "1",
            numOfRows: "20",
            type: "json",
        });

        if (keyword) params.append("keyword", keyword);

        const response = await fetch(
            `https://api.odcloud.kr/api/gov24/v1/serviceList?${params.toString()}`,
            { next: { revalidate: 3600 } } // 1시간 캐싱
        );

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data: Gov24ApiResponse = await response.json();

        return data.response.body.items.item.map((item) => ({
            serviceId: item.서비스ID,
            serviceName: item.서비스명,
            description: item.서비스목적요약,
            targetAudience: "",
            applicationMethod: item.신청방법,
            applicationUrl: `https://www.gov.kr/portal/service/serviceInfo/${item.서비스ID}`,
            category: category || "",
            department: item.소관기관명,
        }));
    } catch (error) {
        console.error("Gov24 API error:", error);
        return staticGovernmentServices;
    }
}

// 정적 데이터 (API fallback)
export const staticGovernmentServices: GovernmentService[] = [
    {
        serviceId: "PS_1000000000001",
        serviceName: "청년도약계좌",
        description: "청년의 자산 형성을 지원하기 위한 장기 저축 상품",
        targetAudience: "만 19~34세 청년",
        applicationMethod: "은행 방문 또는 온라인",
        applicationUrl: "https://www.kinfa.or.kr",
        category: "금융",
        department: "금융위원회",
    },
    {
        serviceId: "PS_1000000000002",
        serviceName: "청년월세지원",
        description: "독립 거주 청년의 주거비 부담 완화",
        targetAudience: "만 19~34세, 독립 거주 청년",
        applicationMethod: "온라인 신청 (정부24)",
        applicationUrl: "https://www.gov.kr",
        category: "주거",
        department: "국토교통부",
    },
];
