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

export default function InterviewSliderButtons({
  moveToNextPage,
  moveToPrevPage,
  currentStep,
  curPageLabel,
  rule,
}: Props) {
  return (
    <ControlButtons>
      {currentStep > 1 && (
        <MainButton
          label={<BiArrowBack />}
          onAction={moveToPrevPage}
          sx={{ width: '50px', font: '3rem' }}
        />
      )}
      <MainButton
        className="Arrow_btn"
        label={curPageLabel}
        onAction={moveToNextPage}
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
