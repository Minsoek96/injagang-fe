import { styled } from 'styled-components';

const ItemWrapper = styled.div`
display: flex;
align-items: center;
padding-inline: 1.2rem;
padding-block: 0.8rem;
gap: 1.2rem;
span {
  font-size: 1.8rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.dropBoxColor};
}
`;

export {
  ItemWrapper,
};
