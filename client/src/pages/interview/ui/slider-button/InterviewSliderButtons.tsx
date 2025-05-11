import { keyframes, styled } from 'styled-components';

import { BiArrowBack } from 'react-icons/bi';

import { MainButton } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

type Props = {
  moveToPrevPage: () => void;
  moveToNextPage: () => void;
  currentStep: number;
  curPageLabel: string;
  rule: boolean;
};

export default function InterviewSliderButtons({
  moveToNextPage,
  moveToPrevPage,
  currentStep,
  curPageLabel,
  rule,
}: Props) {
  // 마지막 스텝은 렌더링하지 않음
  const LAST_STEP = 4;
  const START_SCREEN = currentStep > 1;

  if (currentStep === LAST_STEP) return null;
  return (
    <ControlButtons>
      {START_SCREEN && (
        <MainButton
          label={<BiArrowBack />}
          onClick={moveToPrevPage}
          sx={{ width: '5rem', font: '3rem' }}
          disabled={currentStep === LAST_STEP}
        />
      )}
      <MainButton
        className="stage-button"
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
  margin-top: 2rem;
  width: ${V.lgItemWidth};
  gap: 8px;

  button {
    height: 4rem;
  }

  .stage-button {
    border: 2px solid;
    animation: ${(props) => keyframes`
      0% { border-color: ${props.theme.colors.mainLine} }
      50% { border-color: ${props.theme.colors.highlightLine}; }
      100% { border-color: ${props.theme.colors.signatureColor}; }
    `} 2s ease infinite;
  }

  @media screen and (max-width: 800px) {
    width: calc(100% - 3rem);
  }
`;
