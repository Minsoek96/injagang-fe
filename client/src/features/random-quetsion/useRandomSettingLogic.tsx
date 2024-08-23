import { useCallback, useState } from 'react';

import { interviewMutation, interviewType } from '@/src/entities/interview_question';

export default function useRandomSettingLogic() {
  const [randomSetting, setRandomSetting] = useState({
    cs: 0,
    situation: 0,
    job: 0,
    personality: 0,
  });
  const { mutate: getRandomQustions } = interviewMutation.useFetchRandomQuestion();

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRandomSetting((cur) => ({
      ...cur,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const data = [
      { size: randomSetting.cs, questionType: interviewType.QuestionType.CS },
      {
        size: randomSetting.situation,
        questionType: interviewType.QuestionType.SITUATION,
      },
      { size: randomSetting.job, questionType: interviewType.QuestionType.JOB },
      {
        size: randomSetting.personality,
        questionType: interviewType.QuestionType.PERSONALITY,
      },
    ];

    getRandomQustions(data);
  }, [randomSetting, getRandomQustions]);

  return {
    handleSubmit,
    handleChange,
    randomSetting,
  };
}
