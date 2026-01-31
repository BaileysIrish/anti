"use client";

import { useState } from "react";
import { currencyFlags, ExchangeRate } from "@/lib/api/koreaexim";
import AdPlaceholder from "@/components/ads/AdPlaceholder";

type ConversionDirection = "krwToForeign" | "foreignToKrw";

interface ExchangeRateClientProps {
    rates: ExchangeRate[];
    lastUpdated: string;
    isLive: boolean;
}

export default function ExchangeRateClient({ rates, lastUpdated, isLive }: ExchangeRateClientProps) {
    const [amount, setAmount] = useState<string>("100000");
    const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
    const [direction, setDirection] = useState<ConversionDirection>("krwToForeign");

    const selectedRate = rates.find(r => r.currencyCode === selectedCurrency);

    const calculateResult = (): string => {
        if (!selectedRate || !amount) return "0";
        const numAmount = parseFloat(amount.replace(/,/g, ""));
        if (isNaN(numAmount)) return "0";

        if (direction === "krwToForeign") {
            const result = numAmount / selectedRate.buyRate;
            return result.toFixed(2);
        } else {
            const result = numAmount * selectedRate.sellRate;
            return result.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
        }
    };

    const formatNumber = (value: string): string => {
        const number = value.replace(/[^\d]/g, "");
        return number ? parseInt(number).toLocaleString("ko-KR") : "";
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
            <div className="container-custom">
                {/* 헤더 */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLive ? 'bg-green-500' : 'bg-yellow-500'} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-green-600' : 'bg-yellow-600'}`}></span>
                        </span>
                        {isLive ? '실시간 환율' : '기준 환율'}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        환율 계산기
                    </h1>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        한국수출입은행 기준 환율로 원화와 외화를 빠르게 변환해보세요.
                    </p>
                    <p className="text-xs text-text-light mt-2">
                        📅 기준일: {lastUpdated}
                    </p>
                </div>

                {/* 상단 광고 */}
                <AdPlaceholder variant="header" />

                {/* 계산기 */}
                <div className="max-w-2xl mx-auto mt-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                        {/* 변환 방향 선택 */}
                        <div className="flex rounded-xl overflow-hidden mb-6 border border-gray-200 shadow-sm">
                            <button
                                onClick={() => setDirection("krwToForeign")}
                                className={`flex-1 py-4 font-semibold transition-all duration-200 ${direction === "krwToForeign"
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-inner"
                                    : "bg-gray-50 text-text-muted hover:bg-gray-100"
                                    }`}
                            >
                                🇰🇷 원화 → 외화
                            </button>
                            <button
                                onClick={() => setDirection("foreignToKrw")}
                                className={`flex-1 py-4 font-semibold transition-all duration-200 ${direction === "foreignToKrw"
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-inner"
                                    : "bg-gray-50 text-text-muted hover:bg-gray-100"
                                    }`}
                            >
                                외화 → 🇰🇷 원화
                            </button>
                        </div>

                        {/* 통화 선택 */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-slate-700 mb-3">통화 선택</label>
                            <div className="grid grid-cols-4 gap-3">
                                {rates.map((rate) => (
                                    <button
                                        key={rate.currencyCode}
                                        onClick={() => setSelectedCurrency(rate.currencyCode)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-center hover:scale-105 ${selectedCurrency === rate.currencyCode
                                            ? "border-green-500 bg-green-50 shadow-md"
                                            : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                                            }`}
                                    >
                                        <span className="text-2xl">{currencyFlags[rate.currencyCode]}</span>
                                        <div className="text-sm font-bold mt-1 text-slate-700">{rate.currencyCode}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 금액 입력 */}
                        <div className="mb-6">
                            <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-3">
                                {direction === "krwToForeign" ? "💵 원화 금액 (KRW)" : `💵 ${selectedCurrency} 금액`}
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(formatNumber(e.target.value))}
                                    className="w-full px-5 py-4 text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all pr-16"
                                    placeholder="0"
                                />
                                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted font-semibold">
                                    {direction === "krwToForeign" ? "원" : selectedCurrency}
                                </span>
                            </div>
                        </div>

                        {/* 결과 */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                            <p className="text-sm text-green-100 mb-2 font-medium">
                                {direction === "krwToForeign" ? "받을 수 있는 외화" : "받을 수 있는 원화"}
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">
                                    {direction === "krwToForeign"
                                        ? currencyFlags[selectedCurrency]
                                        : currencyFlags.KRW}
                                </span>
                                <span className="text-4xl md:text-5xl font-extrabold">
                                    {calculateResult()}
                                </span>
                                <span className="text-xl font-medium text-green-100">
                                    {direction === "krwToForeign" ? selectedCurrency : "원"}
                                </span>
                            </div>
                        </div>

                        {/* 환율 정보 */}
                        {selectedRate && (
                            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                                    <p className="text-red-600 font-medium">살 때 (송금 보낼 때)</p>
                                    <p className="font-bold text-xl text-red-700">{selectedRate.buyRate.toLocaleString()} 원</p>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <p className="text-blue-600 font-medium">팔 때 (송금 받을 때)</p>
                                    <p className="font-bold text-xl text-blue-700">{selectedRate.sellRate.toLocaleString()} 원</p>
                                </div>
                            </div>
                        )}

                        <p className="text-xs text-text-light mt-4 text-center">
                            ※ 환율은 한국수출입은행 기준이며, 실제 은행별 환율과 다를 수 있습니다.
                        </p>
                    </div>
                </div>

                {/* 중간 광고 */}
                <AdPlaceholder variant="inline" className="max-w-2xl mx-auto mt-8" />

                {/* 환율 표 */}
                <div className="max-w-2xl mx-auto mt-10">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        📊 오늘의 환율
                        {isLive && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">LIVE</span>}
                    </h2>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left p-4 font-bold text-slate-700">통화</th>
                                    <th className="text-right p-4 font-bold text-slate-700">매매기준율</th>
                                    <th className="text-right p-4 font-bold text-slate-700 hidden sm:table-cell">살 때</th>
                                    <th className="text-right p-4 font-bold text-slate-700 hidden sm:table-cell">팔 때</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rates.map((rate, index) => (
                                    <tr key={rate.currencyCode} className={`border-b border-gray-100 last:border-0 hover:bg-green-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{currencyFlags[rate.currencyCode]}</span>
                                                <div>
                                                    <span className="font-bold text-slate-800">{rate.currencyCode}</span>
                                                    <span className="text-text-muted text-sm ml-2 hidden sm:inline">
                                                        {rate.currencyName}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-right p-4 font-bold text-lg text-slate-800">
                                            {rate.baseRate.toLocaleString()}
                                        </td>
                                        <td className="text-right p-4 text-red-600 font-medium hidden sm:table-cell">
                                            {rate.buyRate.toLocaleString()}
                                        </td>
                                        <td className="text-right p-4 text-blue-600 font-medium hidden sm:table-cell">
                                            {rate.sellRate.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* SEO 콘텐츠 */}
                <article className="max-w-2xl mx-auto mt-12">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">
                            환율 계산 및 해외 송금 가이드
                        </h2>

                        <p className="text-text-muted leading-relaxed mb-6">
                            해외여행, 유학, 해외직구, 송금 등 다양한 상황에서 환율 계산이 필요합니다.
                            정확한 환율을 알면 더 유리한 조건으로 외화를 환전하거나 송금할 수 있습니다.
                        </p>

                        <h3 className="text-xl font-bold mt-8 mb-4 text-slate-700">💡 환율 용어 알아보기</h3>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                            <ul className="space-y-3 text-slate-600">
                                <li>
                                    <strong className="text-blue-800">매매기준율:</strong> 은행 간 거래 시 기준이 되는 환율입니다.
                                </li>
                                <li>
                                    <strong className="text-blue-800">살 때 환율:</strong> 외화를 살 때(원화→외화) 적용되는 환율로, 매매기준율보다 높습니다.
                                </li>
                                <li>
                                    <strong className="text-blue-800">팔 때 환율:</strong> 외화를 팔 때(외화→원화) 적용되는 환율로, 매매기준율보다 낮습니다.
                                </li>
                                <li>
                                    <strong className="text-blue-800">스프레드:</strong> 살 때와 팔 때 환율의 차이입니다. 은행의 수수료라고 볼 수 있습니다.
                                </li>
                            </ul>
                        </div>

                        <h3 className="text-xl font-bold mt-8 mb-4 text-slate-700">🎯 환전 꿀팁</h3>

                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>우대환율 적용 받기: 인터넷/모바일뱅킹 이용 시 최대 90% 우대율 적용</li>
                            <li>환율 알림 설정: 목표 환율에 도달하면 알림 받고 환전</li>
                            <li>주중 오전 환전: 주말/공휴일보다 평일 오전 환율이 유리한 경우 많음</li>
                            <li>소액 분산 환전: 큰 금액은 나눠서 환전하면 환율 변동 리스크 감소</li>
                        </ul>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8">
                            <h4 className="font-bold text-amber-800 mb-2">💳 해외 결제 팁</h4>
                            <p className="text-amber-700">
                                해외직구나 해외결제 시 원화결제(DCC)를 선택하면 불리한 환율이 적용됩니다.
                                반드시 <strong>현지통화결제</strong>를 선택하세요!
                            </p>
                        </div>

                        {/* 면책 고지 */}
                        <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500">
                            <div className="flex items-start gap-3">
                                <span className="text-lg">⚖️</span>
                                <div>
                                    <p className="font-semibold text-gray-700 mb-1">면책 고지</p>
                                    <p>본 환율 정보는 한국수출입은행 고시 환율을 기준으로 하며, 실제 은행별 적용 환율과 다를 수 있습니다. 정확한 환율은 거래 은행에 직접 확인하시기 바랍니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* 하단 광고 */}
                <AdPlaceholder variant="footer" className="max-w-2xl mx-auto mt-12" />
            </div>
        </div>
    );
}
