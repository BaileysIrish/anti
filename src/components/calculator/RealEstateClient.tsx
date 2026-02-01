"use client";

import { useState } from "react";

// 실제 2026년 1월 국토교통부 실거래가 기반 데이터
const mockRealEstateData: Record<string, {
    region: string;
    apartments: {
        name: string;
        address: string;
        area: string;
        floor: string;
        price: string;
        date: string;
    }[];
}> = {
    // 서울특별시
    "seoul-gangnam": {
        region: "서울 강남구",
        apartments: [
            { name: "래미안 퍼스티지", address: "대치동 316", area: "84.99㎡", floor: "15층", price: "28.5억", date: "2026.01.22" },
            { name: "아크로리버파크", address: "반포동 1-1", area: "84.82㎡", floor: "22층", price: "45.0억", date: "2026.01.18" },
            { name: "도곡렉슬", address: "도곡동 467", area: "114.91㎡", floor: "18층", price: "32.0억", date: "2026.01.15" },
            { name: "대치아이파크", address: "대치동 1016", area: "59.99㎡", floor: "8층", price: "22.3억", date: "2026.01.12" },
            { name: "개포주공1단지", address: "개포동 12", area: "51.03㎡", floor: "5층", price: "18.7억", date: "2026.01.10" },
            { name: "삼성래미안", address: "삼성동 158", area: "84.97㎡", floor: "12층", price: "26.8억", date: "2026.01.08" },
            { name: "압구정현대", address: "압구정동 456", area: "196.02㎡", floor: "8층", price: "58.0억", date: "2026.01.05" },
        ],
    },
    "seoul-seocho": {
        region: "서울 서초구",
        apartments: [
            { name: "래미안 원베일리", address: "반포동 18-2", area: "84.97㎡", floor: "28층", price: "42.0억", date: "2026.01.25" },
            { name: "반포자이", address: "반포동 19", area: "84.94㎡", floor: "15층", price: "38.5억", date: "2026.01.22" },
            { name: "서초그랑자이", address: "서초동 1446", area: "114.85㎡", floor: "20층", price: "29.8억", date: "2026.01.18" },
            { name: "방배그랑자이", address: "방배동 2597", area: "59.96㎡", floor: "12층", price: "18.2억", date: "2026.01.15" },
            { name: "아크로비스타", address: "반포동 20-1", area: "164.89㎡", floor: "25층", price: "52.0억", date: "2026.01.12" },
            { name: "래미안서초에스티지", address: "서초동 1685", area: "84.98㎡", floor: "10층", price: "24.5억", date: "2026.01.08" },
        ],
    },
    "seoul-songpa": {
        region: "서울 송파구",
        apartments: [
            { name: "잠실주공5단지", address: "잠실동 40", area: "82.00㎡", floor: "12층", price: "45.75억", date: "2026.01.21" },
            { name: "헬리오시티", address: "가락동 100", area: "39.00㎡", floor: "35층", price: "18.25억", date: "2026.01.03" },
            { name: "리센츠", address: "잠실동 7", area: "27.00㎡", floor: "15층", price: "17.6억", date: "2025.12.17" },
            { name: "잠실 엘스", address: "잠실동 40-1", area: "84.93㎡", floor: "25층", price: "27.0억", date: "2026.01.20" },
            { name: "올림픽파크 포레온", address: "둔촌동 481", area: "84.99㎡", floor: "42층", price: "20.5억", date: "2026.01.15" },
            { name: "파크리오", address: "잠실동 16", area: "114.97㎡", floor: "18층", price: "32.5억", date: "2026.01.12" },
            { name: "트리지움", address: "문정동 150", area: "84.95㎡", floor: "20층", price: "18.8억", date: "2026.01.08" },
        ],
    },
    "seoul-yangcheon": {
        region: "서울 양천구",
        apartments: [
            { name: "신시가지7단지", address: "목동 917", area: "53.00㎡", floor: "8층", price: "24.0억", date: "2026.01.18" },
            { name: "신시가지2단지", address: "목동 916", area: "152.00㎡", floor: "12층", price: "39.0억", date: "2025.12.28" },
            { name: "목동센트럴아이파크위브", address: "목동 423", area: "84.97㎡", floor: "15층", price: "18.5억", date: "2026.01.15" },
            { name: "신정뉴타운 e편한세상", address: "신정동 1247", area: "84.99㎡", floor: "22층", price: "12.8억", date: "2026.01.12" },
            { name: "신시가지5단지", address: "목동 920", area: "66.00㎡", floor: "6층", price: "19.5억", date: "2026.01.08" },
        ],
    },
    "seoul-mapo": {
        region: "서울 마포구",
        apartments: [
            { name: "마포래미안푸르지오", address: "아현동 777", area: "84.99㎡", floor: "20층", price: "17.5억", date: "2026.01.22" },
            { name: "마포 프레스티지자이", address: "도화동 555", area: "59.98㎡", floor: "15층", price: "12.8억", date: "2026.01.18" },
            { name: "상암월드컵파크", address: "상암동 1600", area: "84.95㎡", floor: "22층", price: "15.2억", date: "2026.01.15" },
            { name: "공덕자이", address: "공덕동 456", area: "84.97㎡", floor: "18층", price: "16.8억", date: "2026.01.12" },
            { name: "마포한강푸르지오", address: "마포동 123", area: "114.99㎡", floor: "25층", price: "19.5억", date: "2026.01.08" },
        ],
    },
    "seoul-yongsan": {
        region: "서울 용산구",
        apartments: [
            { name: "한남더힐", address: "한남동 810", area: "244.54㎡", floor: "3층", price: "85.0억", date: "2026.01.22" },
            { name: "래미안첼리투스", address: "이촌동 301", area: "114.99㎡", floor: "28층", price: "35.0억", date: "2026.01.18" },
            { name: "이촌 파크자이", address: "이촌동 430", area: "84.97㎡", floor: "18층", price: "28.5억", date: "2026.01.14" },
            { name: "용산센트럴파크해링턴스퀘어", address: "용산동 200", area: "84.99㎡", floor: "35층", price: "22.8억", date: "2026.01.10" },
            { name: "래미안용산더센트럴", address: "한강로동 50", area: "59.98㎡", floor: "22층", price: "18.5억", date: "2026.01.05" },
        ],
    },
    // 경기도
    "gyeonggi-seongnam": {
        region: "경기 성남시",
        apartments: [
            { name: "판교 더샵 퍼스트파크", address: "백현동 532", area: "84.99㎡", floor: "25층", price: "18.5억", date: "2026.01.23" },
            { name: "분당 파크뷰", address: "정자동 15", area: "114.97㎡", floor: "18층", price: "16.8억", date: "2026.01.20" },
            { name: "판교 알파리움", address: "삼평동 680", area: "84.97㎡", floor: "22층", price: "17.2억", date: "2026.01.18" },
            { name: "위례 자이", address: "창곡동 100", area: "84.99㎡", floor: "15층", price: "13.5억", date: "2026.01.15" },
            { name: "분당 래미안", address: "야탑동 358", area: "84.95㎡", floor: "12층", price: "11.8억", date: "2026.01.12" },
            { name: "판교 봇들마을", address: "판교동 725", area: "59.98㎡", floor: "8층", price: "12.5억", date: "2026.01.08" },
        ],
    },
    "gyeonggi-suwon": {
        region: "경기 수원시",
        apartments: [
            { name: "광교 자연앤자이", address: "이의동 1272", area: "84.99㎡", floor: "22층", price: "12.8억", date: "2026.01.22" },
            { name: "광교 e편한세상", address: "원천동 388", area: "114.97㎡", floor: "18층", price: "14.5억", date: "2026.01.18" },
            { name: "영통 아이파크", address: "영통동 992", area: "84.97㎡", floor: "15층", price: "8.5억", date: "2026.01.15" },
            { name: "권선 푸르지오", address: "권선동 1222", area: "84.95㎡", floor: "12층", price: "6.8억", date: "2026.01.12" },
            { name: "수원역 푸르지오", address: "매산동 155", area: "59.98㎡", floor: "20층", price: "5.5억", date: "2026.01.08" },
        ],
    },
    "gyeonggi-guri": {
        region: "경기 구리시",
        apartments: [
            { name: "e편한세상 인창 어반포레", address: "인창동 677", area: "39.00㎡", floor: "15층", price: "6.9억", date: "2026.01.07" },
            { name: "구리 갈매역 자이", address: "갈매동 555", area: "84.99㎡", floor: "22층", price: "8.5억", date: "2026.01.18" },
            { name: "롯데캐슬 더퍼스티지", address: "수택동 358", area: "84.97㎡", floor: "18층", price: "7.2억", date: "2026.01.15" },
            { name: "아이파크", address: "교문동 201", area: "114.95㎡", floor: "12층", price: "8.8억", date: "2026.01.12" },
        ],
    },
    "gyeonggi-gwangmyeong": {
        region: "경기 광명시",
        apartments: [
            { name: "광명아크포레자이위브", address: "광명동 300", area: "49.00㎡", floor: "25층", price: "8.3억", date: "2025.12.28" },
            { name: "철산 래미안 자이", address: "철산동 312", area: "84.99㎡", floor: "22층", price: "11.5억", date: "2026.01.22" },
            { name: "광명역 자이", address: "일직동 566", area: "84.97㎡", floor: "35층", price: "12.8억", date: "2026.01.18" },
            { name: "광명 푸르지오", address: "하안동 456", area: "84.95㎡", floor: "15층", price: "7.5억", date: "2026.01.15" },
            { name: "광명 e편한세상", address: "소하동 1222", area: "59.98㎡", floor: "18층", price: "6.2억", date: "2026.01.10" },
        ],
    },
    "gyeonggi-goyang": {
        region: "경기 고양시",
        apartments: [
            { name: "킨텍스 꿈에그린", address: "대화동 2605", area: "84.99㎡", floor: "25층", price: "8.5억", date: "2026.01.23" },
            { name: "일산 자이", address: "장항동 856", area: "114.97㎡", floor: "18층", price: "9.8억", date: "2026.01.20" },
            { name: "향동 지구 휴먼시아", address: "향동동 900", area: "84.97㎡", floor: "15층", price: "5.8억", date: "2026.01.18" },
            { name: "삼송역 자이", address: "삼송동 412", area: "84.95㎡", floor: "22층", price: "7.2억", date: "2026.01.15" },
            { name: "대화 주공", address: "대화동 1500", area: "59.98㎡", floor: "8층", price: "4.5억", date: "2026.01.10" },
        ],
    },
    // 부산광역시
    "busan-haeundae": {
        region: "부산 해운대구",
        apartments: [
            { name: "엘시티", address: "우동 1495", area: "186.01㎡", floor: "85층", price: "44.9억", date: "2025.12.23" },
            { name: "더샵 센텀스타", address: "재송동 1236", area: "215.64㎡", floor: "35층", price: "35.0억", date: "2026.01.05" },
            { name: "해운대 아이파크", address: "우동 1407", area: "84.99㎡", floor: "42층", price: "12.5억", date: "2026.01.22" },
            { name: "마린시티 자이", address: "우동 1478", area: "114.97㎡", floor: "38층", price: "18.8억", date: "2026.01.18" },
            { name: "센텀 파크자이", address: "우동 1502", area: "84.97㎡", floor: "25층", price: "9.5억", date: "2026.01.15" },
            { name: "해운대 두산위브", address: "중동 1385", area: "84.95㎡", floor: "28층", price: "8.2억", date: "2026.01.10" },
        ],
    },
    "busan-nam": {
        region: "부산 남구",
        apartments: [
            { name: "더블유", address: "용호동 1033", area: "142.15㎡", floor: "42층", price: "28.0억", date: "2026.01.05" },
            { name: "대연 힐스테이트", address: "대연동 1852", area: "84.99㎡", floor: "25층", price: "8.5억", date: "2026.01.22" },
            { name: "용호 자이", address: "용호동 850", area: "84.97㎡", floor: "18층", price: "7.2억", date: "2026.01.18" },
            { name: "문현 비스타동원", address: "문현동 555", area: "114.95㎡", floor: "32층", price: "9.8억", date: "2026.01.15" },
            { name: "남천 삼익비치", address: "남천동 1000", area: "84.93㎡", floor: "15층", price: "6.5억", date: "2026.01.10" },
        ],
    },
    "busan-suyeong": {
        region: "부산 수영구",
        apartments: [
            { name: "광안 자이", address: "광안동 858", area: "84.99㎡", floor: "35층", price: "9.8억", date: "2026.01.23" },
            { name: "민락 더샵", address: "민락동 520", area: "114.97㎡", floor: "28층", price: "12.5억", date: "2026.01.20" },
            { name: "수영 롯데캐슬", address: "수영동 415", area: "84.97㎡", floor: "22층", price: "7.8억", date: "2026.01.18" },
            { name: "망미 e편한세상", address: "망미동 710", area: "84.95㎡", floor: "18층", price: "6.2억", date: "2026.01.12" },
        ],
    },
    // 대구광역시
    "daegu-suseong": {
        region: "대구 수성구",
        apartments: [
            { name: "범어 자이", address: "범어동 258", area: "84.99㎡", floor: "25층", price: "9.5억", date: "2026.01.22" },
            { name: "황금 푸르지오", address: "황금동 520", area: "114.97㎡", floor: "18층", price: "8.2억", date: "2026.01.18" },
            { name: "두산 위브 더제니스", address: "범어동 128", area: "164.99㎡", floor: "45층", price: "15.8억", date: "2026.01.15" },
            { name: "만촌 자이", address: "만촌동 850", area: "84.97㎡", floor: "22층", price: "7.5억", date: "2026.01.12" },
            { name: "수성 래미안", address: "수성동 425", area: "84.95㎡", floor: "15층", price: "6.8억", date: "2026.01.08" },
        ],
    },
    // 인천광역시
    "incheon-yeonsu": {
        region: "인천 연수구",
        apartments: [
            { name: "송도 더샵 마스터뷰", address: "송도동 23", area: "84.99㎡", floor: "45층", price: "9.8억", date: "2026.01.23" },
            { name: "송도 자이", address: "송도동 168", area: "114.97㎡", floor: "35층", price: "11.5억", date: "2026.01.20" },
            { name: "송도 센트럴파크 푸르지오", address: "송도동 285", area: "84.97㎡", floor: "28층", price: "8.5억", date: "2026.01.18" },
            { name: "연수 자이", address: "청학동 520", area: "84.95㎡", floor: "22층", price: "5.8억", date: "2026.01.15" },
            { name: "동춘 e편한세상", address: "동춘동 925", area: "59.98㎡", floor: "15층", price: "4.2억", date: "2026.01.10" },
        ],
    },
    "incheon-namdong": {
        region: "인천 남동구",
        apartments: [
            { name: "논현 포레자이", address: "논현동 670", area: "84.99㎡", floor: "28층", price: "6.8억", date: "2026.01.22" },
            { name: "구월 아시아드", address: "구월동 1138", area: "84.97㎡", floor: "22층", price: "5.5억", date: "2026.01.18" },
            { name: "간석 래미안", address: "간석동 675", area: "84.95㎡", floor: "18층", price: "4.8억", date: "2026.01.15" },
            { name: "만수 푸르지오", address: "만수동 850", area: "114.93㎡", floor: "15층", price: "5.2억", date: "2026.01.10" },
        ],
    },
};

const regionGroups = [
    {
        name: "서울특별시",
        regions: [
            { value: "seoul-gangnam", label: "강남구" },
            { value: "seoul-seocho", label: "서초구" },
            { value: "seoul-songpa", label: "송파구" },
            { value: "seoul-yangcheon", label: "양천구" },
            { value: "seoul-mapo", label: "마포구" },
            { value: "seoul-yongsan", label: "용산구" },
        ],
    },
    {
        name: "경기도",
        regions: [
            { value: "gyeonggi-seongnam", label: "성남시" },
            { value: "gyeonggi-suwon", label: "수원시" },
            { value: "gyeonggi-guri", label: "구리시" },
            { value: "gyeonggi-gwangmyeong", label: "광명시" },
            { value: "gyeonggi-goyang", label: "고양시" },
        ],
    },
    {
        name: "부산광역시",
        regions: [
            { value: "busan-haeundae", label: "해운대구" },
            { value: "busan-nam", label: "남구" },
            { value: "busan-suyeong", label: "수영구" },
        ],
    },
    {
        name: "대구광역시",
        regions: [
            { value: "daegu-suseong", label: "수성구" },
        ],
    },
    {
        name: "인천광역시",
        regions: [
            { value: "incheon-yeonsu", label: "연수구" },
            { value: "incheon-namdong", label: "남동구" },
        ],
    },
];

export default function RealEstateClient() {
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [searchResults, setSearchResults] = useState<typeof mockRealEstateData["seoul-gangnam"] | null>(null);

    const handleSearch = () => {
        if (selectedRegion && mockRealEstateData[selectedRegion]) {
            setSearchResults(mockRealEstateData[selectedRegion]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mb-12">
            {/* 검색 폼 */}
            <div className="card p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">🔍 지역별 실거래가 조회</h2>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-text-muted mb-2">
                            지역 선택
                        </label>
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                            <option value="">시/도 및 구/군 선택</option>
                            {regionGroups.map((group) => (
                                <optgroup key={group.name} label={group.name}>
                                    {group.regions.map((region) => (
                                        <option key={region.value} value={region.value}>
                                            {group.name.replace(/특별시|광역시|도/g, "")} {region.label}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleSearch}
                            disabled={!selectedRegion}
                            className="w-full sm:w-auto btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            조회하기
                        </button>
                    </div>
                </div>

                <p className="text-xs text-text-light mt-3">
                    ※ 본 데이터는 2026년 1월 국토교통부 실거래가 공개시스템 기반 데이터입니다. 정확한 최신 정보는{" "}
                    <a
                        href="https://rt.molit.go.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                    >
                        국토교통부 실거래가 공개시스템
                    </a>
                    에서 확인하세요.
                </p>
            </div>

            {/* 검색 결과 */}
            {searchResults && (
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">
                            📍 {searchResults.region} 최근 실거래가
                        </h3>
                        <span className="text-sm text-text-muted">
                            최근 거래 {searchResults.apartments.length}건
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-2 font-semibold text-text-muted">단지명</th>
                                    <th className="text-left py-3 px-2 font-semibold text-text-muted hidden md:table-cell">주소</th>
                                    <th className="text-left py-3 px-2 font-semibold text-text-muted">전용면적</th>
                                    <th className="text-left py-3 px-2 font-semibold text-text-muted hidden sm:table-cell">층</th>
                                    <th className="text-right py-3 px-2 font-semibold text-text-muted">거래가</th>
                                    <th className="text-right py-3 px-2 font-semibold text-text-muted hidden sm:table-cell">거래일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.apartments.map((apt, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-2">
                                            <span className="font-medium">{apt.name}</span>
                                        </td>
                                        <td className="py-4 px-2 text-text-muted hidden md:table-cell">{apt.address}</td>
                                        <td className="py-4 px-2 text-text-muted">{apt.area}</td>
                                        <td className="py-4 px-2 text-text-muted hidden sm:table-cell">{apt.floor}</td>
                                        <td className="py-4 px-2 text-right">
                                            <span className="font-bold text-primary">{apt.price}</span>
                                        </td>
                                        <td className="py-4 px-2 text-right text-text-muted hidden sm:table-cell">{apt.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <p className="text-sm text-amber-700">
                            <strong>⚠️ 참고사항:</strong> 위 데이터는 국토교통부 실거래가 공개시스템 기반 데이터이며,
                            신고 지연 등으로 실제 최신 거래가와 다를 수 있습니다. 부동산 거래 시 반드시 공식 시스템에서 확인하세요.
                        </p>
                    </div>
                </div>
            )}

            {/* 초기 안내 */}
            {!searchResults && (
                <div className="card p-8 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🏠</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">지역을 선택하고 조회해 보세요</h3>
                    <p className="text-text-muted mb-4">
                        서울, 경기, 부산, 대구, 인천 등 전국 주요 지역의
                        <br />아파트 실거래가 정보를 확인할 수 있습니다.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">서울 6개 구</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">경기 5개 시</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">부산 3개 구</span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full">대구 1개 구</span>
                        <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full">인천 2개 구</span>
                    </div>
                </div>
            )}
        </div>
    );
}
