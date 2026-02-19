import "server-only";

export interface AuthorProfile {
    id: string;
    name: string;
    role: string;
    bio: string;
    specialties: string[];
    reviewCycle: string;
    contactEmail: string;
    profileUpdatedAt: string;
}

const AUTHORS: AuthorProfile[] = [
    {
        id: "content-team",
        name: "복지혜택 찾기 콘텐츠팀",
        role: "정책 가이드 편집",
        bio: "정부지원금, 주거·금융 제도, 신청 절차를 사용자 관점에서 재구성해 실무형 가이드를 작성합니다.",
        specialties: ["청년 지원금", "신청 서류 점검", "수혜 조건 비교", "중복 수혜 리스크"],
        reviewCycle: "월 1회 정기 점검 + 정책 변경 시 수시 업데이트",
        contactEmail: "official.contact.hq@gmail.com",
        profileUpdatedAt: "2026-02-19",
    },
    {
        id: "editorial-review-board",
        name: "편집 검토 보드",
        role: "출처 검증 및 개정 이력 관리",
        bio: "공식 공고문 교차 검토, 용어 통일, 수정 이력 관리를 담당하며 편집 정책 준수 여부를 확인합니다.",
        specialties: ["출처 검증", "정책 변경 추적", "오류 수정 기록", "이해상충 점검"],
        reviewCycle: "발행 전 체크리스트 검수 + 주요 문서 월간 점검",
        contactEmail: "official.contact.hq@gmail.com",
        profileUpdatedAt: "2026-02-19",
    },
];

export function getAllAuthors(): AuthorProfile[] {
    return AUTHORS;
}

export function getAuthorById(id: string): AuthorProfile | null {
    const author = AUTHORS.find((item) => item.id === id);
    return author ?? null;
}

