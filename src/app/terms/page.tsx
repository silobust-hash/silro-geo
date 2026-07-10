import type { Metadata } from 'next';

const PAGE_URL = 'https://xn--hc0b21et01ao2a.com/terms';

export const metadata: Metadata = {
  title: '이용약관',
  description: 'SilroGEO 서비스 이용약관입니다.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: '이용약관 | SilroGEO',
    description: 'SilroGEO 서비스 이용약관입니다.',
    url: PAGE_URL,
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">서비스 이용약관</h1>
        <p className="text-sm text-gray-500 mb-8">시행일 : 2026년 4월 8일</p>

        <h2 className="text-lg font-bold mt-8 mb-3">제1조 (목적)</h2>
        <p className="text-gray-700 leading-relaxed">
          본 약관은 한동노무법인(이하 &ldquo;법인&rdquo;)이 제공하는 SilroGEO 웹사이트 및 관련 서비스(이하
          &ldquo;서비스&rdquo;)의 이용과 관련하여 법인과 이용자의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을
          목적으로 합니다.
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3">제2조 (정의)</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>&ldquo;서비스&rdquo;란 법인이 운영하는 SilroGEO 웹사이트에서 제공하는 무료 AEO/GEO 진단,
            컨설팅 안내, 상담 접수 등 일체의 서비스를 의미합니다.</li>
          <li>&ldquo;이용자&rdquo;란 본 약관에 따라 서비스를 이용하는 회원 및 비회원을 의미합니다.</li>
          <li>&ldquo;무료 진단&rdquo;이란 이용자가 입력한 URL을 분석하여 AI 검색 노출 관련 점수를 안내하는
            기능을 의미합니다.</li>
        </ul>

        <h2 className="text-lg font-bold mt-8 mb-3">제3조 (약관의 효력 및 변경)</h2>
        <p className="text-gray-700 leading-relaxed">
          본 약관은 서비스 화면에 게시함으로써 효력이 발생합니다. 법인은 관련 법령에 위배되지 않는 범위에서
          본 약관을 개정할 수 있으며, 개정 시 적용일자 7일 전부터 공지합니다.
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3">제4조 (서비스의 제공 및 변경)</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>법인은 다음과 같은 서비스를 제공합니다.
            <ul className="list-disc pl-5 mt-1">
              <li>무료 AEO/GEO 진단 (URL 분석 및 점수 리포트)</li>
              <li>AI경영진단 컨설팅 안내 및 상담 접수</li>
              <li>AEO/GEO 최적화 패키지 안내 및 상담 접수</li>
              <li>기타 법인이 정하는 서비스</li>
            </ul>
          </li>
          <li>법인은 운영상·기술상 필요에 따라 서비스의 전부 또는 일부를 변경할 수 있습니다.</li>
        </ul>

        <h2 className="text-lg font-bold mt-8 mb-3">제5조 (서비스의 중단)</h2>
        <p className="text-gray-700 leading-relaxed">
          법인은 천재지변, 전시, 시스템 점검·보수, 통신 두절 등 부득이한 사유가 있는 경우 서비스의 제공을
          일시적으로 중단할 수 있습니다.
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3">제6조 (이용자의 의무)</h2>
        <p className="text-gray-700 leading-relaxed">이용자는 다음 행위를 하여서는 안 됩니다.</p>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2">
          <li>타인의 정보 도용</li>
          <li>서비스에 게시된 정보의 무단 변경, 도용, 상업적 이용</li>
          <li>법인의 사전 승낙 없이 서비스를 이용하여 영업활동을 하는 행위</li>
          <li>자동화된 수단(크롤러, 봇 등)을 이용한 비정상적 접근</li>
          <li>기타 관계 법령에 위배되는 행위</li>
        </ul>

        <h2 className="text-lg font-bold mt-8 mb-3">제7조 (무료 진단 결과의 한계)</h2>
        <p className="text-gray-700 leading-relaxed">
          무료 진단 결과는 입력된 URL의 공개 정보를 자동 분석한 참고 자료이며, 이용자의 사업적 판단에 대한
          결과를 보장하지 않습니다. 진단 결과는 분석 시점의 데이터를 기준으로 하며, 이후 변경될 수 있습니다.
          상세한 진단·전략 수립은 별도의 유료 컨설팅을 통해 제공됩니다.
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3">제8조 (지적재산권)</h2>
        <p className="text-gray-700 leading-relaxed">
          서비스에 게시된 모든 콘텐츠(텍스트, 이미지, 디자인, 분석 알고리즘 등)에 대한 저작권 및 기타
          지적재산권은 법인 또는 정당한 권리자에게 귀속됩니다. 이용자는 법인의 사전 동의 없이 이를 복제,
          전송, 출판, 배포, 방송, 기타 방법으로 이용할 수 없습니다.
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3">제9조 (책임의 제한)</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>법인은 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
          <li>법인은 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</li>
          <li>법인은 무료 진단 결과의 정확성·완전성을 보장하지 않으며, 이용자의 의사결정에 대한 책임은 이용자 본인에게 있습니다.</li>
        </ul>

        <h2 className="text-lg font-bold mt-8 mb-3">제10조 (분쟁 해결 및 관할법원)</h2>
        <p className="text-gray-700 leading-relaxed">
          본 약관과 관련된 분쟁은 대한민국 법령에 따르며, 분쟁이 발생할 경우 민사소송법상의 관할 법원을
          전속 관할로 합니다.
        </p>

        <div className="mt-10 pt-6 border-t text-sm text-gray-500">
          <p>한동노무법인 | 대표 공인노무사 박실로</p>
          <p>광주광역시 | 062-521-5678 | 5215678@naver.com</p>
        </div>
      </article>
    </div>
  );
}
