import { styleMixin, V } from '@/src/shared/styles';
import styled from 'styled-components';

const PreviewStyle = {
  baseContainer: styled.div`
    ${styleMixin.Column('flex-start', 'flex-start')}
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.mainLine};
    box-shadow: ${V.boxShadow1};
  `,

  emptyStateContainer: styled.div`
    ${styleMixin.Column('center', 'center')}
    width: 100%;
    height: 100%;
    padding: 2rem;
    text-align: center;
  `,

  emptyStateIcon: styled.div`
    font-size: 5rem;
    margin-bottom: 1rem;
    opacity: 0.6;
  `,

  emptyStateMessage: styled.h2`
    text-align: center;
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.signatureColor};
  `,

  emptyStateSubMessage: styled.p`
    text-align: center;
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.emptyGray};
  `,
};

export default PreviewStyle;
