import { Container } from '@/src/shared/ui';

import { S } from '@/src/entities/interview_question';

import { CustomQuestionControls } from './custom-controls';
import { PlayListContent } from './question-list';
import useExpetedPlayList from '../../model/useExpectedPlayList';

function UserQuestionPlayList() {
  const {
    userPlayList, removeQuestion, addQuestion, roleAction,
  } = useExpetedPlayList();

  return (
    <Container.ArticleCard
      $size={{ height: '60rem', width: '100%', flex: 'Col' }}
    >
      <S.Header>Play List</S.Header>
      <PlayListContent
        userPlayList={userPlayList}
        removeQuestion={removeQuestion}
      />
      <CustomQuestionControls
        playListLen={userPlayList ? userPlayList.length : 0}
        handleAddQuestion={addQuestion}
        handleConfirmQuestion={roleAction}
      />
    </Container.ArticleCard>
  );
}

export default UserQuestionPlayList;
