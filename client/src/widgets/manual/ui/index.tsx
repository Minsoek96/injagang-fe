import styled from 'styled-components';

import ghostImage from '@/public/assets/ghost.webp';
import interViewScreen from '@/public/assets/interview.webp';
import communityScreen from '@/public/assets/correction.webp';

import { ManualData } from '../model/types';
import Section from './menual-section/MenualSection';

const menual: ManualData[] = [
  {
    id: 'manual-01',
    main: '취업의 첫걸음, 함께하는 네트워크',
    sub: '같이 고민하고 성장하는 취업 메이트',
    imageList: [ghostImage],
  },
  {
    id: 'manual-02',
    main: '다음 주자는 당신, 자소서 릴레이',
    sub: '서로의 경험을 주고받는 취준생들의 비밀 연결고리',
    imageList: [communityScreen],
  },
  {
    id: 'manual-03',
    main: '면접의 주인공이 되는 실전 연습',
    sub: 'AI 피드백와 음성 분석으로 완벽한 답변을 준비하세요.',
    imageList: [interViewScreen],
  },
];

function Manual() {
  return (
    <ManualContainer>
      {menual.map((item) => (
        <Section key={item.id} {...item} />
      ))}
    </ManualContainer>
  );
}

const ManualContainer = styled.div`
  width: 100%;
  max-width: 85rem;
`;

export default Manual;
