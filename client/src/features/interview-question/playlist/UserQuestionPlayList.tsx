import { memo } from 'react';

import { Container } from '@/src/shared/components';
import { styleMixin } from '@/src/shared/styles';
import styled from 'styled-components';
import { keys } from '@/src/shared/utils';
import QuestionAdder from './QuestionAdder';
import UserQuestionPlayListItems from './UserQuestionPlayListItems';

import useExpetedPlayListLogic from '../hooks/useExpectedPlayListLogic';

function UserQuestionPlayList() {
  const {
    userPlayList, handleRemoveText, handleAddText, roleAction,
  } = useExpetedPlayListLogic();
  return (
    <Container.ArticleCard
      $size={{ height: '60rem', width: '100%', flex: 'Col' }}
    >
      <Header>Play List</Header>
      <ItemContainer>
        {userPlayList?.map((question, idx) => (
          <UserQuestionPlayListItems
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

export default memo(UserQuestionPlayList);

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
