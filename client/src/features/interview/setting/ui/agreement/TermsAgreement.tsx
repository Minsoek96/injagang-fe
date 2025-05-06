import { CheckBox, ExplanationContent } from '@/src/shared/ui';

type Props = {
    onAccept : (term: boolean) => void;
}

export default function TermsAgreement({ onAccept }:Props) {
  return (
    <>
      <ExplanationContent
        explanationList={[
          '안내사항',
          '1. 녹화하신 데이터는 외부로 전송되지 않으니 안심하세요.',
          '2. 원활한 면접을 위해 카메라와 마이크 권한이 꼭 필요해요.',
          '3. 권한을 허용하지 않으시면 면접을 진행하기 어려워요.',
          '4. 조용한 곳에서 면접을 보시는 것을 추천드려요.',
          '5. 약관 동의 후 디바이스 접근 안내가 진행됩니다.',
        ]}
      />
      <CheckBox label="확인" onChange={() => onAccept(true)} />
    </>
  );
}
