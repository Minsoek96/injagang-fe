import { styled } from 'styled-components';

import { styleMixin } from '@/src/shared/styles';

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
  ${styleMixin.Flex()}
`;
