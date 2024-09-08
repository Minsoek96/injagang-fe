import { MainButton } from '@/src/shared/components';
import { styleMixin, V } from '@/src/shared/styles';
import { BiArrowBack } from 'react-icons/bi';
import { styled } from 'styled-components';

type Props = {
  moveToPrevPage: () => void;
  moveToNextPage: () => void;
  currentStep: number;
  curPageLabel: string;
  rule: boolean;
};

// TODO : BACK버튼 제어 생각해보기
export default function InterviewSliderButtons({
  moveToNextPage,
  moveToPrevPage,
  currentStep,
  curPageLabel,
  rule,
}: Props) {
  const START_SCREEN = currentStep > 1;
  return (
    <ControlButtons>
      {START_SCREEN && (
        <MainButton
          label={<BiArrowBack />}
          onClick={moveToPrevPage}
          sx={{ width: '5rem', font: '3rem' }}
          disabled={currentStep === 4}
        />
      )}
      <MainButton
        className="Arrow_btn"
        label={curPageLabel}
        onClick={moveToNextPage}
        sx={{
          width: '100%',
          font: '2rem',
          padding: '1em',
        }}
        disabled={!rule}
      />
    </ControlButtons>
  );
}

const ControlButtons = styled.div`
  ${styleMixin.Flex()}
  margin-top: 3rem;
  width: ${V.lgItemWidth};
  gap: 8px;
  @media screen and (max-width: 800px) {
    width: ${V.smItemWidth};
  }

  button {
    height: 4rem;
  }
`;
