import Head from 'next/head';

export default function HeadMeta() {
  return (
    <Head>
      <title>RelayMentor | 함께 나아가는 커리어 동반자</title>
      <meta name="description" content="취준생들을 위한 자소서 피드백 커뮤니티와 모의면접 시뮬레이션 플랫폼" />
      {/* <meta
        name="viewport"
        content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
      /> */}
      <meta
        name="keywords"
        content="면접 연습, 자소서 피드백, 가상면접, 모의면접, 면접 시뮬레이션, 자소서 첨삭, 취준, 취업준비, 입사지원, 면접질문, 면접 팁, 릴레이멘토"
      />
      <meta
        name="Description"
        content="RelayMentor에서 취준생들이 서로의 자소서를 피드백하고, 맞춤형 면접 시뮬레이션으로 실전 경험을 쌓아보세요. 보이지 않는 바통이 이어지는 커리어 여정의 시작."
      />
      <meta httpEquiv="Subject" content="취준생을 위한 자소서 피드백 및 모의면접 플랫폼" />
      <meta name="author" content="RelayMentor Team" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="application-name" content="RelayMentor" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://relaymentor.com/" />
      <meta property="og:title" content="RelayMentor | 유령의 비밀스러운 초대장" />
      <meta property="og:description" content="바통을 든 유령이 당신을 초대합니다. 보이지 않지만 함께 나아가는 커리어 동반자들이 모인 곳, 자소서 피드백과 모의면접의 비밀스러운 세계로 오세요." />
      <meta property="og:image" content="https://relaymentor.com/og-image.webp" />
      <meta property="og:site_name" content="RelayMentor" />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://relaymentor.com/" />
      <meta name="twitter:title" content="RelayMentor | 유령의 비밀스러운 초대장" />
      <meta name="twitter:description" content="바통을 든 유령이 당신을 초대합니다. 보이지 않지만 함께 나아가는 커리어 동반자들이 모인 곳, 자소서 피드백과 모의면접의 비밀스러운 세계로 오세요." />
      <meta name="twitter:image" content="https://relaymentor.com/og-image.webp" />
      <meta name="twitter:creator" content="@RelayMentor" />
    </Head>
  );
}
