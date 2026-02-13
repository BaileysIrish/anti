"use client";

import { useState } from "react";
import type { RealEstateRegionData } from "@/lib/real-estate-sample";

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
    const [searchResults, setSearchResults] = useState<RealEstateRegionData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!selectedRegion) {
            return;
        }

        setIsLoading(true);
        try {
            const { realEstateSampleData } = await import("@/lib/real-estate-sample");
            setSearchResults(realEstateSampleData[selectedRegion] ?? null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mb-12">
            {/* 검색 폼 */}
            <div className="card p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">🔍 지역별 거래 예시 조회</h2>

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
                            disabled={!selectedRegion || isLoading}
                            className="w-full sm:w-auto btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "불러오는 중..." : "조회하기"}
                        </button>
                    </div>
                </div>

                <p className="text-xs text-text-light mt-3">
                    ※ 본 화면은 서비스 기능 안내를 위한 <strong>샘플 데이터</strong>입니다. 실제 거래 판단은{" "}
                    <a
                        href="https://rt.molit.go.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                    >
                        국토교통부 실거래가 공개시스템
                    </a>
                    의 최신 자료를 확인하세요.
                </p>
            </div>

            {/* 검색 결과 */}
            {searchResults && (
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">
                            📍 {searchResults.region} 거래 예시
                        </h3>
                        <span className="text-sm text-text-muted">
                            예시 {searchResults.apartments.length}건
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
                                    <tr key={`${apt.name}-${index}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
                            <strong>⚠️ 안내:</strong> 위 데이터는 예시이며 실제 거래가 아닐 수 있습니다.
                            최신 가격과 신고 내역은 국토교통부 공식 시스템에서 반드시 재확인하세요.
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
                        서울, 경기, 부산, 대구, 인천 등 주요 지역의
                        <br />거래 예시 정보를 확인할 수 있습니다.
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
