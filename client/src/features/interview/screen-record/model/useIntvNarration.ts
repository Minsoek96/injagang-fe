import { useIntvPlaylistStore } from '@/src/entities/interview_question';

import { useWebSpeech } from '@/src/shared/hooks';

/**
 * 인터뷰 질문을 음성 나레이션으로 제공하는 훅
 *
 * @returns startNarration - 질문 나레이션 시작 함수
 * @returns narrationState - 나레이션 관련 상세 상태 정보
 */
const useIntvNarration = () => {
  const NARRATION_START_DELAY = 3000;

  const userPlayList = useIntvPlaylistStore((state) => state.userPlayList);
  const {
    readingTheScript: startNarration,
    speechData: narrationState,
  } = useWebSpeech(userPlayList, NARRATION_START_DELAY);

  return {
    narrationState,
    startNarration,
  };
};

export default useIntvNarration;
