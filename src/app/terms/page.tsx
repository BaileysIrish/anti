import { Metadata } from "next";

export const metadata: Metadata = {
    title: "이용약관",
    description: "복지혜택 찾기 서비스의 이용약관입니다.",
};

export default function TermsPage() {
    return (
        <div className="py-12">
            <div className="container-custom max-w-3xl">
                <h1 className="text-3xl font-bold mb-8">이용약관</h1>

                <div className="prose prose-lg text-text-muted">
                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">제1조 (목적)</h2>
                    <p>
                        본 약관은 <strong>복지혜택 찾기</strong>(이하 "서비스")의 이용과 관련하여
                        서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">제2조 (서비스의 내용)</h2>
                    <p>서비스는 다음과 같은 기능을 제공합니다:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>정부 지원금 자격 조건 계산</li>
                        <li>맞춤형 복지 혜택 정보 제공</li>
                        <li>금융 정보 및 가이드 콘텐츠</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">제3조 (면책조항)</h2>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
                        <p className="text-amber-800">
                            <strong>⚠️ 중요:</strong> 본 서비스에서 제공하는 정보는 참고용으로만 활용해 주세요.
                            정확한 지원금 자격 여부 및 신청 방법은 반드시 해당 기관(정부24, 복지로 등)에서
                            직접 확인하시기 바랍니다.
                        </p>
                    </div>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            서비스는 정보 제공 목적으로 운영되며, 제공된 정보의 정확성을 보장하지 않습니다.
                        </li>
                        <li>
                            지원금 정책은 정부 방침에 따라 변경될 수 있으며,
                            서비스는 실시간 반영이 어려울 수 있습니다.
                        </li>
                        <li>
                            이용자가 본 서비스의 정보를 활용하여 발생한 손해에 대해
                            서비스는 책임을 지지 않습니다.
                        </li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">제4조 (지적재산권)</h2>
                    <p>
                        서비스가 제작한 콘텐츠(텍스트, 이미지, 디자인 등)의 저작권은 서비스에 귀속됩니다.
                        무단 복제, 배포, 수정을 금지합니다.
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">제5조 (광고 게재)</h2>
                    <p>
                        서비스는 운영을 위해 광고를 게재할 수 있습니다.
                        광고 내용에 대한 책임은 해당 광고주에게 있으며,
                        서비스는 광고로 인한 손해에 대해 책임을 지지 않습니다.
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">제6조 (서비스 이용 제한)</h2>
                    <p>다음 행위를 하는 경우 서비스 이용이 제한될 수 있습니다:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>서비스를 불법적인 목적으로 이용하는 경우</li>
                        <li>서비스의 정상적인 운영을 방해하는 경우</li>
                        <li>타인의 정보를 도용하는 경우</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4 text-text">제7조 (약관의 변경)</h2>
                    <p>
                        본 약관이 변경되는 경우 시행일로부터 7일 전 공지사항을 통해 고지합니다.
                    </p>

                    <p className="mt-8 text-sm">
                        <strong>시행일:</strong> 2026년 1월 1일
                    </p>
                </div>
            </div>
        </div>
    );
}
