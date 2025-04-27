import { BiPlus } from 'react-icons/bi';
import { styled } from 'styled-components';

import { usePageRouter } from '@/src/shared/hooks';
import { styleMixin, V } from '@/src/shared/styles';
import { MainButton } from '@/src/shared/ui';

function Label() {
  return (
    <>
      <BiPlus />
      <span>새로 작성하기</span>
    </>
  );
}

type Props = {
    title: string
}

export default function Header({ title }:Props) {
  const { moveCoverLetterCreatePage } = usePageRouter();
  return (
    <ListHeader>
      <HeaderTitle>{title}</HeaderTitle>
      <MainButton
        onClick={moveCoverLetterCreatePage}
        label={<Label />}
        variant="signature"
        sx={{ fontSize: '1.8rem', padding: '1rem 1.5rem', gap: '0.5rem' }}
      />
    </ListHeader>
  );
}

const ListHeader = styled.div`
  ${styleMixin.Flex('space-between')}
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 1.8rem 1.25rem;

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
