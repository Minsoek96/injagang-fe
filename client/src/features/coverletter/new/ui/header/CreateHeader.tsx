import { styled } from 'styled-components';
import { MdOutlineArrowBack } from 'react-icons/md';

import { MainButton } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';
import { usePageRouter } from '@/src/shared/hooks';

type Props ={
    title: string;
}

export default function CreateHeader({ title }: Props) {
  const { moveCoverLetterMainPage } = usePageRouter();
  return (
    <HeaderWrapper>
      <MainButton
        onClick={moveCoverLetterMainPage}
        label={<MdOutlineArrowBack />}
        variant="signature"
        sx={{ fontSize: '2rem', padding: '0.5rem' }}
      />
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  ${styleMixin.Flex('flex-start')}
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 1.8rem 0rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 0.8rem 0.5rem;
  }
`;

const HeaderTitle = styled.p`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.signatureColor};
  letter-spacing: 0.04em;
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.08);

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 2.5rem;
  }
`;
