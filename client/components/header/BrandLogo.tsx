import { styled } from 'styled-components';

import Link from 'next/link';

type Props = {
  title: string;
  path: string;
};
export default function BrandLogo({ title, path }: Props) {
  return (
    <StyledLink href={path} aria-label={`${title}-label`}>
      <h4 className="navLogo_title">{title}</h4>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: RGB(255,0,0);
  font-size: 3.2rem;
`;
