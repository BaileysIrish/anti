// 정부24 공공서비스 API 클라이언트 (v3)
// API 문서: https://www.data.go.kr/data/15000391/openapi.do

export interface GovernmentService {
    serviceId: string;
    serviceName: string;
    description: string;
    targetAudience: string;
    supportContent: string;
    applicationMethod: string;
    applicationUrl: string;
    category: string;
    department: string;
    contactInfo: string;
}

// v3 API 응답 타입
interface Gov24V3ApiResponse {
    currentCount: number;
    data: Array<{
        서비스ID: string;
        서비스명: string;
        서비스목적요약: string;
        서비스분야: string;
        지원대상: string;
        지원내용: string;
        신청방법: string;
        상세조회URL: string;
        소관기관명: string;
        전화문의: string;
    }>;
    matchCount: number;
    page: number;
    perPage: number;
    totalCount: number;
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
        // v3 API 파라미터 구성 (serviceKey는 이미 인코딩되어 있으므로 별도 처리)
        const baseParams = new URLSearchParams({
            page: "1",
            perPage: "20",
        });

        // 키워드 검색 (서비스명 LIKE 검색)
        if (keyword) {
            baseParams.append("cond[서비스명::LIKE]", keyword);
        }

        // 카테고리 필터 (서비스분야 LIKE 검색)
        if (category) {
            baseParams.append("cond[서비스분야::LIKE]", category);
        }

        // serviceKey는 이미 URL 인코딩되어 있으므로 직접 붙임
        const url = `https://api.odcloud.kr/api/gov24/v3/serviceList?${baseParams.toString()}&serviceKey=${API_KEY}`;

        const response = await fetch(
            url,
            { next: { revalidate: 86400 } } // 24시간 캐싱
        );

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data: Gov24V3ApiResponse = await response.json();

        if (!data.data || data.data.length === 0) {
            console.warn("Gov24 API returned no data. Using static data.");
            return staticGovernmentServices;
        }

        return data.data.map((item) => ({
            serviceId: item.서비스ID,
            serviceName: item.서비스명,
            description: item.서비스목적요약 || "",
            targetAudience: item.지원대상 || "",
            supportContent: item.지원내용 || "",
            applicationMethod: item.신청방법 || "",
            applicationUrl: item.상세조회URL || `https://www.gov.kr/portal/rcvfvrSvc/dtlEx/${item.서비스ID}`,
            category: item.서비스분야 || category || "",
            department: item.소관기관명 || "",
            contactInfo: item.전화문의 || "",
        }));
    } catch (error) {
        console.error("Gov24 API error:", error);
        return staticGovernmentServices;
    }
}

// 정적 데이터 (API fallback)
export const staticGovernmentServices: GovernmentService[] = [
    {
        serviceId: "000000465790",
        serviceName: "유아학비 (누리과정) 지원",
        description: "유치원에 다니는 3~5세 아동에게 유아학비, 방과후과정비 등 지원",
        targetAudience: "국공립 및 사립유치원에 다니는 3~5세 유아",
        supportContent: "국공립 100,000원, 사립 280,000원 교육비 지급",
        applicationMethod: "온라인신청, 방문신청",
        applicationUrl: "https://www.gov.kr/portal/rcvfvrSvc/dtlEx/000000465790",
        category: "보육·교육",
        department: "교육부",
        contactInfo: "교육부/02-6222-6060",
    },
    {
        serviceId: "105100000001",
        serviceName: "근로·자녀장려금",
        description: "소득과 재산이 적은 근로소득자에게 근로장려금을, 자녀가 있을 경우 자녀장려금 지급",
        targetAudience: "소득·재산 요건 충족 근로소득자",
        supportContent: "단독가구 최대 165만원, 홑벌이 285만원, 맞벌이 330만원",
        applicationMethod: "온라인신청",
        applicationUrl: "https://www.gov.kr/portal/rcvfvrSvc/dtlEx/105100000001",
        category: "주거·자립",
        department: "국세청",
        contactInfo: "관할 세무서",
    },
    {
        serviceId: "116010000001",
        serviceName: "주택금융공사 월세자금보증",
        description: "일정요건의 월세대출 대상자에게 월세자금보증을 지원",
        targetAudience: "보증금 1억원 이하, 월세 60만원 이하 월세 계약자",
        supportContent: "최대 1,152만원 이내 월세자금 보증",
        applicationMethod: "방문신청",
        applicationUrl: "https://www.gov.kr/portal/rcvfvrSvc/dtlEx/116010000001",
        category: "주거·자립",
        department: "한국주택금융공사",
        contactInfo: "1688-8114",
    },
];
