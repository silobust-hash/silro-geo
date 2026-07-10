import type { Metadata } from 'next';

const PAGE_URL = 'https://xn--hc0b21et01ao2a.com/privacy';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'SilroGEO 서비스의 개인정보처리방침입니다.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: '개인정보처리방침 | SilroGEO',
    description: 'SilroGEO 서비스의 개인정보처리방침입니다.',
    url: PAGE_URL,
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-sm md:prose-base prose-headings:font-bold prose-headings:text-gray-900">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">개인정보처리방침</h1>
        <p className="text-sm text-gray-500 mb-8">시행일 : 2026년 4월 8일</p>

        <p className="text-gray-700 leading-relaxed mb-6">
          한동노무법인(이하 &ldquo;법인&rdquo;)은 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고
          이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3">제1조 (개인정보의 처리목적)</h2>
        <p className="text-gray-700 leading-relaxed">
          법인은 다음의 목적을 위하여 개인정보를 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는
          이용되지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.
        </p>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2">
          <li>무료 AEO/GEO 진단 결과 제공 및 결과 안내</li>
          <li>상담·자문·컨설팅 문의에 대한 응대 및 서비스 제공</li>
          <li>서비스 품질 개선을 위한 통계·분석</li>
        </ul>

        <h2 className="text-lg font-bold mt-8 mb-3">제2조 (처리하는 개인정보 항목)</h2>
        <p className="text-gray-700 leading-relaxed">법인은 다음의 개인정보 항목을 처리합니다.</p>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2">
          <li><strong>무료 진단 신청</strong> : 진단 대상 URL, 접속 IP, 브라우저 정보</li>
          <li><strong>상담·문의</strong> : 성명, 연락처(전화번호 또는 이메일), 회사명, 문의내용</li>
          <li><strong>자동 수집 항목</strong> : 서비스 이용 기록, 접속 로그, 쿠키</li>
        </ul>

        <h2 className="text-lg font-bold mt-8 mb-3">제3조 (개인정보의 처리 및 보유기간)</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>무료 진단 기록 : 수집일로부터 1년 보관 후 파기</li>
          <li>상담·자문 문의 기록 : 수집일로부터 3년 보관 후 파기 (상거래 관련 법령 준수)</li>
          <li>접속 로그 : 통신비밀보호법에 따라 3개월 보관 후 파기</li>
        </ul>

        <h2 className="text-lg font-bold mt-8 mb-3">제4조 (개인정보의 제3자 제공)</h2>
        <p className="text-gray-700 leading-relaxed">
          법인은 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의
          특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3">제5조 (개인정보처리의 위탁)</h2>
        <p className="text-gray-700 leading-relaxed">
          법인은 원활한 서비스 제공을 위하여 다음과 같이 개인정보 처리업무를 위탁할 수 있으며, 이 경우
          위탁받는 자, 위탁업무 내용을 본 처리방침을 통해 사전 고지합니다. 현재 위탁 사항이 변경될 경우
          본 방침을 통해 즉시 공개합니다.
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3">제6조 (정보주체의 권리·의무 및 행사방법)</h2>
        <p className="text-gray-700 leading-relaxed">
          정보주체는 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있으며,
          행사는 법인에 대해 서면, 전화, 이메일을 통하여 하실 수 있고 법인은 이에 대해 지체 없이 조치합니다.
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3">제7조 (개인정보의 파기절차 및 방법)</h2>
        <p className="text-gray-700 leading-relaxed">
          법인은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이
          해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하며,
          종이 문서는 분쇄하거나 소각하여 파기합니다.
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3">제8조 (개인정보의 안전성 확보조치)</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>개인정보 취급자 지정 및 최소화</li>
          <li>정기적인 자체 감사 실시</li>
          <li>개인정보의 암호화 및 접근통제</li>
          <li>접속기록의 보관 및 위·변조 방지</li>
        </ul>

        <h2 className="text-lg font-bold mt-8 mb-3">제9조 (개인정보 보호책임자)</h2>
        <div className="bg-gray-50 rounded-xl p-5 my-3">
          <p className="text-gray-700 leading-relaxed">
            <strong>개인정보 보호책임자</strong><br />
            성명 : 박실로 (대표 공인노무사)<br />
            연락처 : 062-521-5678<br />
            이메일 : 5215678@naver.com
          </p>
        </div>

        <h2 className="text-lg font-bold mt-8 mb-3">제10조 (권익침해 구제방법)</h2>
        <p className="text-gray-700 leading-relaxed">
          정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원
          개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.
        </p>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2">
          <li>개인정보분쟁조정위원회 : 1833-6972 (www.kopico.go.kr)</li>
          <li>개인정보침해신고센터 : 118 (privacy.kisa.or.kr)</li>
          <li>대검찰청 : 1301 (www.spo.go.kr)</li>
          <li>경찰청 : 182 (ecrm.cyber.go.kr)</li>
        </ul>

        <h2 className="text-lg font-bold mt-8 mb-3">제11조 (개인정보처리방침의 변경)</h2>
        <p className="text-gray-700 leading-relaxed">
          본 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가·삭제 및 정정이
          있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지합니다.
        </p>
      </article>
    </div>
  );
}
