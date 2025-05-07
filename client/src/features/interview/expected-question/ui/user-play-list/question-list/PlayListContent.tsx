import { styled } from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { keys } from '@/src/shared/utils';

import { PiMusicNotes } from 'react-icons/pi';
import PlayListItem from './PlayListItem';

type Props = {
  userPlayList: string[];
  removeQuestion: (item: string) => void;
};

export default function PlayListContent({
  userPlayList,
  removeQuestion,
}: Props) {
  const hasPlayList = userPlayList && userPlayList.length > 0;
  if (!hasPlayList) {
    return (
      <EmptyList />
    );
  }
  return (
    <Container>
      {userPlayList.map((question, idx) => (
        <PlayListItem
          key={keys(question, idx)}
          item={question}
          handleRemoveText={removeQuestion}
        />
      ))}
    </Container>
  );
}

function EmptyList() {
  return (
    <Container>
      <EmptyPlayList>
        <EmptyIcon><PiMusicNotes /></EmptyIcon>
        <EmptyText>빈 플레이리스트입니다.</EmptyText>
        <EmptySubText>
          추천 질문을 찾아보거나 직접 질문을 작성해 보세요.
        </EmptySubText>
      </EmptyPlayList>
    </Container>
  );
}

const Container = styled.ul`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  margin-block: 1rem;
  ${styleMixin.ScrollBar}
`;

const EmptyPlayList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const EmptyText = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.lightText};
`;

const EmptySubText = styled.p`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.lightText};
`;
