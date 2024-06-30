import { useCallback } from "react";

import { useRouter } from "next/router";

import { moveCoverLetterMainPage } from "../new/CoverLetterCreator";

import { IGetEssayList, IReadQnaList } from "@/types/essay/EssayType";
import useCoverLetterStore from "@/store/coverLetter/useCoverLetterStore";
import {
  useDeleteCoverLetter,
  useReviseCoverLetter,
} from "@/api/coverLetter/mutations";

const useCoverLetterManager = () => {
  const router = useRouter();

  const { selectedCoverLetter, setCoverLetter } = useCoverLetterStore();

  const { mutate: reviseCoverLetter } = useReviseCoverLetter();
  const { mutate: removeCoverLetter } = useDeleteCoverLetter();

  /** 유저가 선택한 자소서 미리보기 반영 */
  const changeSeleted = (newList: IGetEssayList) => {
    if (newList === selectedCoverLetter) return;
    setCoverLetter(newList);
  };

  /** 자소서 수정 페이지 이동 */
  const moveEditPage = (essayId: number) => {
    router.push({
      pathname: `/coverLetter/${essayId}/edit`,
    });
  };

  /** 자소서 업데이트 반영 */
  const changeCoverLetter = useCallback(
    (essayId: number, title: string, qnaList: IReadQnaList[]) => {
      const resetData = {
        title,
        qnaList: qnaList.map(qna => ({
          question: qna.question,
          answer: qna.answer,
        })),
      };
      reviseCoverLetter({ id: essayId, data: resetData });
      router.push(moveCoverLetterMainPage);
    },
    [],
  );

  /** 자소서 삭제 반영 */
  const deleteCoverLetter = useCallback((targetID: number) => {
    removeCoverLetter(targetID);
    router.push(moveCoverLetterMainPage);
  }, []);

  return {
    changeSeleted,
    moveEditPage,
    changeCoverLetter,
    deleteCoverLetter,
    selectedCoverLetter,
  };
};

export default useCoverLetterManager;
