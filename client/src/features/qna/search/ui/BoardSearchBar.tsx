import { styled } from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

import { SearchInput } from './search-input';
import { TypeSelector } from './type-selector';

export default function BoardSearchBar() {
  return (
    <Container>
      <TypeSelector />
      <SearchInput />
    </Container>
  );
}

const Container = styled.div`
  ${styleMixin.Flex('flex-end', '')}
  max-width: 50rem;
  gap: 0.4rem;

  /* TypeSelector 스타일 */
  > :first-child {
    min-width: 4rem;
    max-width: 8rem;
    flex-shrink: 0;
  }

  /* SearchInput 스타일 */
  > :last-child {
    flex: 1;
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    width: 100%;
    > :first-child {
      width: 10rem;
      flex-shrink: 0;
    }

    > :last-child {
      max-width: 100%;
      flex: 1;
    }
  }
`;
