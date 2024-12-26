import { PreviewStyle as S } from '@/src/entities/coverLetter';
import { styleMixin, V } from '@/src/shared/styles';
import { BiFile, BiPlus, BiEditAlt } from 'react-icons/bi';
import styled from 'styled-components';

// 가이드 데이터
const GUIDE_LIST = [
  {
    id: 'guide01',
    icon: <BiFile />,
    title: '템플릿 선택하기(선택사항)',
    text: '커스텀 가능해요.',
  },
  {
    id: 'guide02',
    icon: <BiPlus />,
    title: '자소서 항목 추가',
    text: '항목을 추가해요.',
  },
  {
    id: 'guide03',
    icon: <BiEditAlt />,
    title: '문항별 작성하기',
    text: '비어두면 안돼요.',
  },
];

export default function CoverLetterGuide() {
  return (
    <Container>
      {GUIDE_LIST.map(({
        id, icon, title, text,
      }) => (
        <ItemContainer key={id}>
          <S.emptyContainer>
            {icon}
            <S.emptyTitle>{title}</S.emptyTitle>
            <S.emptyText>{text}</S.emptyText>
          </S.emptyContainer>
        </ItemContainer>
      ))}
    </Container>
  );
}

const Container = styled.div`
    ${styleMixin.Column('space-between', 'flex-start')}
    max-height: 50rem;
    cursor: not-allowed;
    gap: 1rem;

    @media screen and (max-width: ${V.mediaTablet}) {
      display: none;
    }
   `;

const ItemContainer = styled(S.container)`
    min-height: auto;
    background-color: transparent;
    box-shadow: ${V.boxShadow1};
    border: 1px solid ${(props) => props.theme.colors.mainLine};
   `;
