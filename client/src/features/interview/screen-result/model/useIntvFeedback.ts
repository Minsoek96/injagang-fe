import { useCallback, useMemo, useState } from 'react';

import {
  interviewMutation,
  interviewType,
} from '@/src/entities/interview_question';

import { validateRules } from '@/src/shared/utils';

type Props = {
  recordContent: interviewType.RecordContent;
  question: string;
  counter: number;
  onClose: () => void;
};

const useIntvFeedback = ({
  recordContent,
  question,
  counter,
  onClose,
}: Props) => {
  const { mutateAsync: requestFeedback, isPending } = interviewMutation.useGetIntvFeedback();

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<'voice' | 'script'>(
    'voice',
  );
  const { voiceScript = '', script = '', rating = '' } = recordContent;

  const getSelectedText = useMemo<string>(
    () => (selectedSource === 'voice' ? voiceScript : script),
    [selectedSource, voiceScript, script],
  );

  const changeSelectedSource = useCallback((value: 'voice' | 'script') => {
    setSelectedSource(value);
  }, []);

  // 검증 룰
  const validRules = useMemo(
    () => [
      {
        check: () => !(question.trim() && getSelectedText.trim()),
        message: '질문와 답변이 비어있는 경우 피드백을 요청할 수 없습니다.',
      },
      {
        check: () => getSelectedText.trim().length < 30,
        message: '30자 이상의 소스만 분석할 수 있습니다.',
      },
      {
        check: () => rating.trim() !== '',
        message: '이미 AI 분석 요청 결과가 존재합니다.',
      },
    ],
    [getSelectedText, question, rating],
  );

  const handleRequestFeedback = useCallback(async () => {
    const validationResult = validateRules(validRules);
    if (!validationResult.isValid) {
      setErrorMsg(validationResult.errorMessage);
      return;
    }

    const qnaPayload = {
      question,
      answer: getSelectedText,
      counter,
    };

    try {
      await requestFeedback(qnaPayload);
      onClose();
    } catch (error) {
      setErrorMsg('피드백 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [
    validRules,
    getSelectedText,
    question,
    counter,
    requestFeedback,
    onClose,
  ]);

  return {
    handleRequestFeedback,
    errorMsg,
    selectedSource,
    changeSelectedSource,
    isPending,
    getSelectedText,
  };
};

export default useIntvFeedback;
