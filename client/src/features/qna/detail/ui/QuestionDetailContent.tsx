import { boardQueries, QuestionDetailItem } from '@/src/entities/qnaboard';

import { MenuBar } from './menubar';

/**
 * QuestionDetailView 유저의 작성된 질문 상세 메인
 * - 상세 아이템 렌더링
 * - 권한 제어 메뉴 렌더링
 */
export default function QuestionDetailContent() {
  const {
    data: boardList,
    boardId,
  } = boardQueries.useFetchCurrentBoardDetail(true);

  const {
    owner, title, nickname, content,
  } = boardList!;

  return (
    <>
      {owner && <MenuBar boardId={boardId} content={content} title={title} />}
      <QuestionDetailItem title={title} nickname={nickname} content={content} />
    </>
  );
}
