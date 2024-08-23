import { styled } from 'styled-components';

import { Container } from '@/src/shared/components/container';

import goodInterView from '@/public/assets/main.webp';
import interViewScreen from '@/public/assets/interview.webp';
import communityScreen from '@/public/assets/commu.webp';

import ManualItems from './ManualItems';

const manualData = [
  {
    id: 'manual-01',
    main: '인터뷰와 자소서를 강하게 어필하자',
    sub: '당신을 서포트 하겠습니다.',
    imageList: [goodInterView],
  },
  {
    id: 'manual-02',
    main: '자소서 피드백에 특화된 커뮤니티',
    sub: '자소서를 강력하게',
    imageList: [communityScreen],
  },
  {
    id: 'manual-03',
    main: '준비된 예상 질문으로 인터뷰 연습',
    sub: '인터뷰를 강력하게',
    imageList: [interViewScreen],
  },
];

function Manual() {
  const lastSection = manualData.length - 1;
  return (
    <ManualContainer>
      {manualData.map((item, index) => (
        <ManualItems
          key={item.id}
          mainTitle={item.main}
          subTitle={item.sub}
          isArrow={!(index >= lastSection)}
          imageList={item.imageList}
        />
      ))}
    </ManualContainer>
  );
}

export default Manual;

const ManualContainer = styled(Container.ItemBase)`
  max-width: 70rem;
  width: 100%;
`;
