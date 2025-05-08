import styled from 'styled-components';

import {
  interviewType,
  useIntvPlaylistStore,
} from '@/src/entities/interview_question';

import { ComboBox } from '@/src/shared/ui/combobox';
import { V } from '@/src/shared/styles';

const InterViewSelectData = Object.entries(interviewType.QuestionType).map(
  ([key, value], index) => ({
    origin: value,
    id: `question_${index}`,
    korean:
      interviewType.QuestionTypeKr[key as interviewType.QuestionTypeValue],
  }),
);

interface IQuestionSelectorProps {
  onReset: () => void;
}
/** QuestionTypeSelector : 질문 타입 변경
 * 선택된 질문 타입을 변경하기 위한 역할
 *
 * @param onReset : 질문 체크 해제
 */
function QuestionTypeSelector({ onReset }: IQuestionSelectorProps) {
  const selectedType = useIntvPlaylistStore((state) => state.selectedType);
  const setSelectedType = useIntvPlaylistStore(
    (state) => state.setSelectedType,
  );

  const onChangeType = (type: interviewType.QuestionTypeValue | string) => {
    onReset();
    setSelectedType(type);
  };

  return (
    <Container>
      <ComboBox
        label="질문타입선택"
        hideLabel
        items={InterViewSelectData.map((item) => item.korean)}
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
