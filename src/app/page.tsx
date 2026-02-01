import Link from "@/components/common/Link";
import AdPlaceholder from "@/components/ads/AdPlaceholder";
import { fetchExchangeRates, currencyFlags, getEffectiveExchangeDate } from "@/lib/api/koreaexim";

export default async function Home() {
  // 실시간 환율 데이터 가져오기 (홈페이지 미리보기용)
  let topRates: { code: string; rate: number; flag: string }[] = [];
  const { displayDate } = getEffectiveExchangeDate();
  try {
    const rates = await fetchExchangeRates();
    topRates = rates.slice(0, 4).map(r => ({
      code: r.currencyCode,
      rate: r.baseRate,
      flag: currencyFlags[r.currencyCode] || "💵"
    }));
  } catch {
    topRates = [
      { code: "USD", rate: 1350.50, flag: "🇺🇸" },
      { code: "EUR", rate: 1480.20, flag: "🇪🇺" },
      { code: "JPY", rate: 9.05, flag: "🇯🇵" },
      { code: "CNH", rate: 185.30, flag: "🇨🇳" },
    ];
  }

  return (
    <>
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-blue-900 text-white py-20 md:py-28">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              2026년 최신 정보 실시간 업데이트
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              나에게 맞는<br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">정부 지원금</span>을 찾아보세요
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
              청년 복지 혜택, 정부 지원금, 미수령 환급금까지
              <br className="hidden md:block" />
              간단한 정보 입력만으로 받을 수 있는 혜택을 확인하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculators/youth-subsidy"
                className="group bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <span className="mr-2">🎯</span>
                지원금 계산하기
                <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
              </Link>
              <Link
                href="/blog"
                className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                📚 혜택 가이드 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 실시간 환율 미니 배너 */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="container-custom">
          <div className="flex items-center justify-between overflow-x-auto gap-6">
            <span className="text-sm font-semibold text-text-muted whitespace-nowrap flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              실시간 환율 <span className="text-xs font-normal text-text-light">({displayDate} 기준)</span>
            </span>
            <div className="flex gap-6">
              {topRates.map((rate) => (
                <Link
                  key={rate.code}
                  href="/calculators/exchange-rate"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors whitespace-nowrap"
                >
                  <span>{rate.flag}</span>
                  <span className="font-medium">{rate.code}</span>
                  <span className="font-bold text-slate-800">{rate.rate.toLocaleString()}원</span>
                </Link>
              ))}
            </div>
            <Link href="/calculators/exchange-rate" className="text-primary font-semibold text-sm whitespace-nowrap hover:underline">
              환율 계산기 →
            </Link>
          </div>
        </div>
      </section>

      {/* 상단 광고 */}
      <AdPlaceholder variant="header" className="bg-slate-50 py-4" />

      {/* 주요 서비스 */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900">
              제공하는 서비스
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              정부 지원금부터 환율 정보까지, 재테크에 필요한 모든 정보를 한 곳에서
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* 청년 지원금 */}
            <Link href="/calculators/youth-subsidy" className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-4 right-4 text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium">
                인기
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">청년 지원금 계산기</h3>
              <p className="text-text-muted leading-relaxed mb-4">
                나이, 소득, 거주지를 입력하면 받을 수 있는
                정부 지원금 목록을 확인할 수 있습니다.
              </p>
              <span className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                계산하기 <span className="ml-1">→</span>
              </span>
            </Link>

            {/* 환율 계산기 */}
            <Link href="/calculators/exchange-rate" className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-3xl">💱</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">환율 계산기</h3>
              <p className="text-text-muted leading-relaxed mb-4">
                실시간 환율 정보로 원화↔외화 변환을
                쉽고 빠르게 계산해보세요.
              </p>
              <span className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                계산하기 <span className="ml-1">→</span>
              </span>
            </Link>

            {/* 부동산 시세 */}
            <Link href="/calculators/real-estate" className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">부동산 실거래가</h3>
              <p className="text-text-muted leading-relaxed mb-4">
                국토부 공식 데이터 기반 아파트, 오피스텔
                실거래가를 조회하세요.
              </p>
              <span className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                조회하기 <span className="ml-1">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 중간 광고 */}
      <AdPlaceholder variant="inline" />

      {/* 인기 콘텐츠 */}
      <section className="section bg-slate-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              📈 인기 가이드
            </h2>
            <Link href="/blog" className="text-primary font-semibold hover:underline">
              전체보기 →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/youth-subsidy-guide-2026" className="group bg-white rounded-2xl p-6 flex gap-5 border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="text-3xl">📋</span>
              </div>
              <div>
                <span className="text-xs text-primary font-bold">지원금 가이드</span>
                <h3 className="font-bold text-lg mt-1 mb-2 text-slate-900 group-hover:text-primary transition-colors">
                  2026년 청년 지원금 총정리 - 놓치면 손해!
                </h3>
                <p className="text-text-muted text-sm line-clamp-2">
                  청년도약계좌, 청년내일저축계좌, 청년월세지원금 등
                  2026년 받을 수 있는 모든 지원금을 정리했습니다.
                </p>
              </div>
            </Link>

            <Link href="/blog/savings-comparison-2026" className="group bg-white rounded-2xl p-6 flex gap-5 border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="text-3xl">💳</span>
              </div>
              <div>
                <span className="text-xs text-green-600 font-bold">금융 팁</span>
                <h3 className="font-bold text-lg mt-1 mb-2 text-slate-900 group-hover:text-primary transition-colors">
                  2026년 고금리 적금 TOP 5 비교
                </h3>
                <p className="text-text-muted text-sm line-clamp-2">
                  지원금을 더 불릴 수 있는 고금리 적금 상품을
                  비교 분석했습니다.
                </p>
              </div>
            </Link>

            <Link href="/blog/unclaimed-money-search" className="group bg-white rounded-2xl p-6 flex gap-5 border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="text-3xl">🔍</span>
              </div>
              <div>
                <span className="text-xs text-yellow-600 font-bold">환급금</span>
                <h3 className="font-bold text-lg mt-1 mb-2 text-slate-900 group-hover:text-primary transition-colors">
                  미수령 환급금 조회 방법 - 내 돈 찾아가세요
                </h3>
                <p className="text-text-muted text-sm line-clamp-2">
                  건강보험료, 국세, 지방세 등 미수령 환급금을
                  한 번에 조회하는 방법을 알려드립니다.
                </p>
              </div>
            </Link>

            <Link href="/blog/first-home-loan-guide" className="group bg-white rounded-2xl p-6 flex gap-5 border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="text-3xl">🏠</span>
              </div>
              <div>
                <span className="text-xs text-purple-600 font-bold">부동산</span>
                <h3 className="font-bold text-lg mt-1 mb-2 text-slate-900 group-hover:text-primary transition-colors">
                  2026년 청년 주거 지원 정책 완벽 가이드
                </h3>
                <p className="text-text-muted text-sm line-clamp-2">
                  청년 전용 임대주택, 주거급여, 전세자금대출 등
                  주거 지원 정책을 총정리했습니다.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 신뢰 배너 */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">50+</div>
              <div className="text-slate-400">지원금 데이터</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">10만+</div>
              <div className="text-slate-400">월간 이용자</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">실시간</div>
              <div className="text-slate-400">데이터 업데이트</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">100%</div>
              <div className="text-slate-400">무료 서비스</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
                지금 바로 나에게 맞는 지원금을 찾아보세요
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                간단한 정보 입력만으로 받을 수 있는 정부 지원금,
                복지 혜택을 한눈에 확인할 수 있습니다.
              </p>
              <Link
                href="/calculators/youth-subsidy"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-1"
              >
                <span>🎯</span>
                지원금 계산 시작하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 광고 */}
      <AdPlaceholder variant="footer" />
    </>
  );
}
