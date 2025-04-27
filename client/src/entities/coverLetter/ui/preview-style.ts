import { styleMixin, V } from '@/src/shared/styles';
import styled from 'styled-components';

const PreviewStyle = {
  baseContainer: styled.div`
    ${styleMixin.Column('flex-start', 'flex-start')}
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.mainLine};
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    box-shadow: ${V.boxShadow1};
  `,

  emptyContainer: styled.div`
    ${styleMixin.Column('center', 'center')}
    width: 100%;
    height: 100%;
    padding: 2rem;
    text-align: center;

    svg {
      ${styleMixin.Flex()}
      font-size: 7rem;
      margin-bottom: 1.6rem;
      color: ${(props) => props.theme.colors.emptyGray};
    }
  `,

  emptyTitle: styled.h2`
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  `,

  emptyText: styled.p`
    font-size: 1.6rem;
  `,
};

export default PreviewStyle;
