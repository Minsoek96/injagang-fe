import { memo } from 'react';

import { Control, Controller } from 'react-hook-form';

import { interviewType } from '@/src/entities/interview_question';
import { InputField } from '@/src/shared/ui';

import { RandomQuestionType } from '../model/type';

type Props = {
  name: interviewType.QuestionType;
  label: string;
  type: string;
  control: Control<RandomQuestionType, unknown>;
};
function ControllerInputField({
  name, label, type, control,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputField
          label={label}
          type={type}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
        />
      )}
    />
  );
}

export default memo(ControllerInputField);
