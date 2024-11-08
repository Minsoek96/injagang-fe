import styled from 'styled-components';

import { Container } from '@/src/shared/ui';
import { styleMixin } from '@/src/shared/styles';
import { keys } from '@/src/shared/utils';

import QuestionAdder from './QuestionAdder';
import UserQuestionPlayListItem from './UserQuestionPlayListItem';
import useExpetedPlayList from '../../model/useExpectedPlayList';

function UserQuestionPlayList() {
  const {
    userPlayList, handleRemoveText, handleAddText, roleAction,
  } = useExpetedPlayList();
  return (
    <Container.ArticleCard
      $size={{ height: '60rem', width: '100%', flex: 'Col' }}
    >
      <Header>Play List</Header>
      <ItemContainer>
        {userPlayList?.map((question, idx) => (
          <UserQuestionPlayListItem
            key={keys(question, idx)}
            item={question}
            handleRemoveText={handleRemoveText}
          />
        ))}
      </ItemContainer>
      <QuestionAdder
        playListLen={userPlayList.length}
        handleAddQuestion={handleAddText}
        handleConfirmQuestion={roleAction}
      />
    </Container.ArticleCard>
  );
}

export default UserQuestionPlayList;

const ItemContainer = styled.ul`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  margin-block: 1rem;
  ${styleMixin.ScrollBar}
`;

const Header = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;
