import { styled } from 'styled-components';

import Link from 'next/link';

type Props = {
  title: string;
  path: string;
};
export default function BrandLogo({ title, path }: Props) {
  return (
    <StyledLink href={path} aria-label={`${title}-label`}>
      <h4 lang="en" className="navLogo_title">{title}</h4>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme.colors.signatureColor};
  font-size: 3rem;
  font-weight: 600;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  .navLogo_title {
    margin-left: 1rem;
  }
`;
