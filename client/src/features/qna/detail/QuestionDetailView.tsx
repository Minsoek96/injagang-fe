import { QuestionDetailItem } from '@/src/entities/qnaboard';

import EditMenuBar from './EditMenuBar';

type Props = {
    owner: boolean;
    boardId: number;
    title: string;
    content: string;
    nickname: string;
}

/**
 * QuestionDetailView 유저의 작성된 질문 상세 메인
 * - 상세 아이템 렌더링
 * - 권한 제어 메뉴 렌더링
 *
 * @param owner - 작성자
 * @param title - 제목
 * @param content - 내용
 * @param boardId - 보드 아이디
 * @param nickname - 작성자 별명
 */
export default function QuestionDetailView({
  owner, title, content, boardId, nickname,
}:Props) {
  return (
    <>
      {owner && (
        <EditMenuBar
          boardId={boardId}
          content={content}
          title={title}
        />
      )}
      <QuestionDetailItem
        title={title}
        nickname={nickname}
        content={content}
      />
    </>
  );
}
