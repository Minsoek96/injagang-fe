import styled from 'styled-components';
import { ComboBox } from '@/src/shared/ui/combobox';

import { interviewType, useQuestionStore } from '@/src/entities/interview_question';
import { V } from '@/src/shared/styles';

const InterViewSelectData = [
  { title: interviewType.QuestionType.CS, id: 'qeustion_1' },
  { title: interviewType.QuestionType.SITUATION, id: 'qeustion_2' },
  { title: interviewType.QuestionType.JOB, id: 'qeustion_3' },
  { title: interviewType.QuestionType.PERSONALITY, id: 'qeustion_4' },
  { title: 'ALL', id: 'qeustion_5' },
];

interface IQuestionSelectorProps {
  onReset: () => void;
}
/** QuestionTypeSelector : 질문 타입 변경
 * 선택된 질문 타입을 변경하기 위한 역할
 *
 * @param onReset : 질문 체크 해제
 */
function QuestionTypeSelector({ onReset }: IQuestionSelectorProps) {
  const { selectedType, setSelectedType } = useQuestionStore();
  const onChangeType = (type: interviewType.QuestionType | string) => {
    setSelectedType(type);
    onReset();
  };
  return (
    <Container>
      <ComboBox
        label="질문타입선택"
        hideLabel
        items={InterViewSelectData.map((item) => item.title)}
        selectedItem={selectedType}
        itemToId={(item) => item || ''}
        itemToText={(item) => item || ''}
        onChange={(value) => value && onChangeType(value)}
        Size={{ width: '100%', height: '3rem' }}
      />
    </Container>
  );
}

export default QuestionTypeSelector;

const Container = styled.div`
  width: 100%;
  max-width: ${V.lgItemWidth};
  margin-bottom: 15px;
`;
