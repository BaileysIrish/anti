import { Metadata } from "next";

export const metadata: Metadata = {
    title: "문의하기 - 복지혜택 찾기",
    description: "복지혜택 찾기 서비스 관련 문의나 제안사항을 보내주세요.",
};

export default function ContactPage() {
    return (
        <div className="py-12 bg-gray-50 min-h-[60vh] flex items-center">
            <div className="container-custom max-w-2xl">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">📧</span>
                    </div>

                    <h1 className="text-3xl font-bold mb-4 text-slate-800">
                        문의하기
                    </h1>

                    <p className="text-text-muted text-lg mb-8 leading-relaxed">
                        서비스 이용 중 불편한 점이나 제안하고 싶은 내용이 있으신가요?<br className="hidden md:block" />
                        아래 이메일로 연락 주시면 빠르게 답변 드리겠습니다.
                    </p>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mb-8 inline-block w-full max-w-md">
                        <p className="text-sm text-slate-500 mb-2 font-medium">공식 문의 이메일</p>
                        <p className="text-xl md:text-2xl font-bold text-blue-600 select-all font-mono">
                            official.contact.hq@gmail.com
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 justify-center sm:flex-row">
                        <a
                            href="mailto:official.contact.hq@gmail.com"
                            className="btn-primary flex items-center justify-center gap-2 py-4 px-8 text-lg hover:scale-105 transition-transform shadow-lg shadow-blue-200"
                        >
                            <span>메일 보내기</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </a>
                    </div>

                    <p className="mt-8 text-sm text-slate-400">
                        * 평일 기준 24시간 이내에 답변 드리도록 노력하겠습니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
