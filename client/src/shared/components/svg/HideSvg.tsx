import styled, { CSSProperties } from 'styled-components';

type Props<T> = {
  Logo: React.ReactNode;
  label: string;
  onClick: (arg: T) => void;
  sx?: CSSProperties;
};

export default function HideSvg<T>({
  Logo,
  label,
  onClick,
  sx = {},
}: Props<T>) {
  return (
    <HideContainer onClick={() => onClick({} as T)} style={sx}>
      {Logo}
      <HideSpan data-testid="hide-span">{label}</HideSpan>
    </HideContainer>
  );
}

const HideContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};

  &:hover span{
      display: block;
  }
`;

const HideSpan = styled.span`
  color: white;
  position: absolute;
  font-size: 1.6rem;
  top: 0;
  margin-top: 5rem;
  display: none;
  padding: 0.5em;
  background-color: rgba(0, 0, 0, 0.55);
  white-space: nowrap;
`;
