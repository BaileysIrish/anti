// 정부 지원금 데이터 및 필터링 로직

export interface Subsidy {
    id: string;
    name: string;
    description: string;
    amount: string;
    category: "청년" | "주거" | "금융" | "취업" | "교육" | "복지";
    eligibility: {
        minAge?: number;
        maxAge?: number;
        maxIncome?: number; // 월 소득 기준 (만원)
        employmentStatus?: string[];
        regions?: string[]; // 특정 지역 한정
    };
    applicationUrl: string;
    deadline?: string;
    tips: string;
}

// 2026년 주요 정부 지원금 데이터 (정부24, 복지로 기준)
export const subsidiesData: Subsidy[] = [
    {
        id: "youth-savings-2026",
        name: "청년도약계좌",
        description: "월 최대 70만원 납입 시 정부가 매칭 지원하는 장기 저축 상품. 5년 만기 시 최대 5,000만원 이상 목돈 마련 가능.",
        amount: "월 최대 24,000원 정부기여금",
        category: "금융",
        eligibility: {
            minAge: 19,
            maxAge: 34,
            maxIncome: 600,
            employmentStatus: ["재직자", "자영업자", "프리랜서"],
        },
        applicationUrl: "https://www.kinfa.or.kr",
        deadline: "2026년 12월 31일",
        tips: "가입 후 중도해지 시 정부기여금을 받을 수 없으니 장기 저축 여력이 있는지 확인하세요.",
    },
    {
        id: "youth-tomorrow-savings",
        name: "청년내일저축계좌",
        description: "근로·사업소득이 있는 저소득 청년을 위한 자산형성 지원. 3년간 저축 시 정부 매칭금 및 추가 지원금 제공.",
        amount: "최대 1,440만원 지원",
        category: "금융",
        eligibility: {
            minAge: 19,
            maxAge: 34,
            maxIncome: 250,
            employmentStatus: ["재직자", "자영업자"],
        },
        applicationUrl: "https://www.bokjiro.go.kr",
        tips: "기초생활수급자, 차상위계층은 더 높은 매칭 비율을 받을 수 있습니다.",
    },
    {
        id: "youth-rent-support",
        name: "청년월세지원",
        description: "독립 거주 청년의 주거비 부담 완화를 위한 월세 지원 사업. 최대 12개월간 월 20만원 지원.",
        amount: "월 최대 20만원 (최대 240만원)",
        category: "주거",
        eligibility: {
            minAge: 19,
            maxAge: 34,
            maxIncome: 400,
        },
        applicationUrl: "https://www.gov.kr",
        tips: "부모와 별도 거주, 임대차계약서 필수. 보증금 5천만원, 월세 60만원 이하 조건 확인하세요.",
    },
    {
        id: "first-home-loan",
        name: "청년 전용 버팀목 전세자금대출",
        description: "만 34세 이하 무주택 청년을 위한 저금리 전세자금 대출. 연 1.8~2.4% 금리로 최대 2억원까지 지원.",
        amount: "최대 2억원 (연 1.8%~)",
        category: "주거",
        eligibility: {
            minAge: 19,
            maxAge: 34,
            maxIncome: 500,
        },
        applicationUrl: "https://nhuf.molit.go.kr",
        tips: "소득이 낮을수록 금리 우대. 다자녀, 신혼부부 추가 우대 가능.",
    },
    {
        id: "job-seeker-allowance",
        name: "청년구직활동지원금",
        description: "졸업 후 미취업 청년에게 구직활동 기간 동안 생활비를 지원하는 제도.",
        amount: "월 50만원 (최대 6개월)",
        category: "취업",
        eligibility: {
            minAge: 18,
            maxAge: 34,
            maxIncome: 350,
            employmentStatus: ["미취업", "구직자"],
        },
        applicationUrl: "https://www.work.go.kr",
        tips: "고용센터 구직등록 필수. 취업성공패키지 연계 시 가점.",
    },
    {
        id: "national-job-training",
        name: "국민내일배움카드",
        description: "직업훈련을 희망하는 국민에게 훈련비를 지원하는 제도. 5년간 최대 500만원 지원.",
        amount: "최대 500만원 (5년간)",
        category: "교육",
        eligibility: {
            minAge: 15,
            maxAge: 64,
        },
        applicationUrl: "https://www.hrd.go.kr",
        tips: "IT, 디자인, 요리 등 다양한 분야 훈련 가능. 취업연계 훈련 시 자부담 낮음.",
    },
    {
        id: "seoul-youth-allowance",
        name: "서울시 청년수당",
        description: "서울 거주 미취업 청년에게 구직활동 지원을 위한 수당 지급.",
        amount: "월 50만원 (최대 6개월)",
        category: "청년",
        eligibility: {
            minAge: 19,
            maxAge: 34,
            maxIncome: 350,
            employmentStatus: ["미취업"],
            regions: ["서울"],
        },
        applicationUrl: "https://youth.seoul.go.kr",
        tips: "서울시 거주 3개월 이상 필수. 국가 구직활동지원금과 중복 불가.",
    },
    {
        id: "gyeonggi-youth-work",
        name: "경기도 청년 노동자 지원금",
        description: "경기도 중소기업 재직 청년에게 근로장려금 지급.",
        amount: "연 120만원",
        category: "청년",
        eligibility: {
            minAge: 18,
            maxAge: 34,
            maxIncome: 500,
            employmentStatus: ["재직자"],
            regions: ["경기"],
        },
        applicationUrl: "https://www.jobaba.net",
        tips: "경기도 소재 중소기업 재직 1년 이상 조건.",
    },
    {
        id: "health-insurance-refund",
        name: "건강보험료 미환급금",
        description: "과납된 건강보험료 환급. 많은 분들이 미수령 상태로 방치 중.",
        amount: "평균 5~10만원",
        category: "복지",
        eligibility: {},
        applicationUrl: "https://www.nhis.or.kr",
        tips: "국민건강보험공단 사이트에서 간편 조회 가능.",
    },
    {
        id: "tax-refund",
        name: "근로·자녀장려금",
        description: "저소득 근로자 및 자녀 양육 가정에 지급하는 장려금. 매년 5월 신청.",
        amount: "최대 330만원",
        category: "복지",
        eligibility: {
            maxIncome: 400,
        },
        applicationUrl: "https://www.hometax.go.kr",
        tips: "5월 정기신청 기간 내 신청 필수. 기한 후 신청 시 10% 감액.",
    },
];

// 지역 목록
export const regions = [
    "서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종",
    "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
];

// 취업 상태 목록
export const employmentStatuses = [
    { value: "재직자", label: "재직자 (직장인)" },
    { value: "자영업자", label: "자영업자" },
    { value: "프리랜서", label: "프리랜서" },
    { value: "미취업", label: "미취업 (구직 중)" },
    { value: "구직자", label: "구직자" },
    { value: "학생", label: "학생" },
];

export interface UserProfile {
    age: number;
    monthlyIncome: number;
    region: string;
    employmentStatus: string;
}

// 사용자 조건에 맞는 지원금 필터링
export function filterSubsidies(profile: UserProfile): Subsidy[] {
    return subsidiesData.filter((subsidy) => {
        const { eligibility } = subsidy;

        // 나이 조건
        if (eligibility.minAge && profile.age < eligibility.minAge) return false;
        if (eligibility.maxAge && profile.age > eligibility.maxAge) return false;

        // 소득 조건
        if (eligibility.maxIncome && profile.monthlyIncome > eligibility.maxIncome) return false;

        // 취업 상태 조건
        if (eligibility.employmentStatus &&
            !eligibility.employmentStatus.includes(profile.employmentStatus)) {
            return false;
        }

        // 지역 조건
        if (eligibility.regions &&
            !eligibility.regions.includes(profile.region)) {
            return false;
        }

        return true;
    });
}

// 카테고리별 색상
export const categoryColors: Record<Subsidy["category"], string> = {
    청년: "bg-blue-100 text-blue-800",
    주거: "bg-purple-100 text-purple-800",
    금융: "bg-green-100 text-green-800",
    취업: "bg-orange-100 text-orange-800",
    교육: "bg-yellow-100 text-yellow-800",
    복지: "bg-pink-100 text-pink-800",
};
