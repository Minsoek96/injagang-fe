import { memo } from 'react';

import { Card, ScrollBar } from '@/styles/GlobalStyle';
import styled from 'styled-components';
import keys from '@/util/keys';
import QuestionAdder from './QuestionAdder';
import UserQuestionPlayListItems from './UserQuestionPlayListItems';

import useExpetedPlayListLogic from '../hooks/useExpectedPlayListLogic';

function UserQuestionPlayList() {
  const {
    userQuestion, handleRemoveText, handleAddText, roleAction, Modal,
  } = useExpetedPlayListLogic();
  return (
    <AddQuestionListViewStyle>
      <Card size={{ height: '450px', width: '100%', flex: 'Col' }}>
        <Container>
          {userQuestion
            && userQuestion.map((question, idx) => (
              <UserQuestionPlayListItems
                key={keys(question, idx)}
                item={question}
                index={idx}
                handleRemoveText={handleRemoveText}
              />
            ))}
        </Container>
        <QuestionAdder
          handleAddQuestion={handleAddText}
          handleCancelQuestion={roleAction}
        />
      </Card>
      <Modal />
    </AddQuestionListViewStyle>
  );
}

export default memo(UserQuestionPlayList);

const AddQuestionListViewStyle = styled.div`
  width: 45%;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  ${ScrollBar}
`;
