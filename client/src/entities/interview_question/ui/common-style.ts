import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

export const S = {
  /** ExpecedQuestion 관련된 공용스타일 */
  ListItem: styled.li`
    ${styleMixin.Flex('space-between', 'center')}
    font-size: 1.8rem;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.8rem 1rem;
    border-radius: 5px;
    min-height: 5rem;
    line-height: 1.5;

    @media screen and (max-width: ${V.mediaMobile}) {
      font-size: 1.6rem;
    }
  `,

  ItemText: styled.span`
    flex: 1;
    padding-inline: 1rem;
    width: auto;
    max-width: 100%;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  Header: styled.h1`
    font-size: 3rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    height: 100%;
    max-height: 3rem;
    text-overflow: ellipsis;
    max-width: 100%;
    margin-bottom: 2rem;
    border-bottom: 2px solid ${(props) => props.theme.colors.highlightLine};

    @media screen and (max-width: ${V.mediaMobile}) {
      font-size: 2.5rem;
    }
  `,

  EmptyContainer: styled.div`
    ${styleMixin.Column()};
    height: 100%;
    padding: 2rem;
  `,

  EmptyIcon: styled.div`
    font-size: 4rem;
    margin-bottom: 1.5rem;
  `,

  EmptyText: styled.h2`
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.lightText};

    @media screen and (max-width: ${V.mediaMobile}) {
      font-size: 1.6rem;
    }
  `,

  EmptySubText: styled.p`
    font-size: 1.4rem;
    word-break: break-all;
    color: ${(props) => props.theme.colors.lightText};
  `,
};
