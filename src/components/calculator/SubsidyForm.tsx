"use client";

import { useState } from "react";
import { UserProfile, regions, employmentStatuses } from "@/lib/subsidies";

interface SubsidyFormProps {
    onSubmit: (profile: UserProfile) => void;
}

export default function SubsidyForm({ onSubmit }: SubsidyFormProps) {
    const [formData, setFormData] = useState<UserProfile>({
        age: 25,
        monthlyIncome: 300,
        region: "서울",
        employmentStatus: "재직자",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mb-4 shadow-lg">
                    <span className="text-3xl">📝</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">내 정보 입력</h2>
                <p className="text-text-muted mt-2">간단한 정보만 입력하면 맞춤 지원금을 찾아드려요</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* 나이 */}
                <div className="relative">
                    <label htmlFor="age" className="block text-sm font-semibold text-slate-700 mb-2">
                        <span className="mr-2">🎂</span>나이 (만)
                    </label>
                    <input
                        type="number"
                        id="age"
                        min={15}
                        max={80}
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                        className="w-full px-4 py-3 text-lg font-medium border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                        required
                    />
                    <p className="text-xs text-text-muted mt-2">만 나이로 입력해주세요</p>
                </div>

                {/* 월 소득 */}
                <div className="relative">
                    <label htmlFor="income" className="block text-sm font-semibold text-slate-700 mb-2">
                        <span className="mr-2">💵</span>월 소득 (만원)
                    </label>
                    <input
                        type="number"
                        id="income"
                        min={0}
                        max={10000}
                        step={10}
                        value={formData.monthlyIncome}
                        onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
                        className="w-full px-4 py-3 text-lg font-medium border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                        required
                    />
                    <p className="text-xs text-text-muted mt-2">세전 기준, 무소득이면 0 입력</p>
                </div>

                {/* 거주 지역 */}
                <div className="relative">
                    <label htmlFor="region" className="block text-sm font-semibold text-slate-700 mb-2">
                        <span className="mr-2">📍</span>거주 지역
                    </label>
                    <select
                        id="region"
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full px-4 py-3 text-lg font-medium border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-white appearance-none cursor-pointer"
                        required
                    >
                        {regions.map((region) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-[42px] pointer-events-none text-text-muted">
                        ▼
                    </div>
                </div>

                {/* 취업 상태 */}
                <div className="relative">
                    <label htmlFor="employment" className="block text-sm font-semibold text-slate-700 mb-2">
                        <span className="mr-2">💼</span>취업 상태
                    </label>
                    <select
                        id="employment"
                        value={formData.employmentStatus}
                        onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                        className="w-full px-4 py-3 text-lg font-medium border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-white appearance-none cursor-pointer"
                        required
                    >
                        {employmentStatuses.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-[42px] pointer-events-none text-text-muted">
                        ▼
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="w-full mt-10 bg-gradient-to-r from-primary to-primary-dark text-white py-4 px-8 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
                <span>🎯</span>
                나에게 맞는 지원금 찾기
                <span className="ml-1">→</span>
            </button>

            <p className="text-center text-xs text-text-muted mt-4">
                입력하신 정보는 계산 목적으로만 사용되며 저장되지 않습니다.
            </p>
        </form>
    );
}
