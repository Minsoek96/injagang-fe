import { styleMixin, V } from '@/src/shared/styles';

import { styled } from 'styled-components';

export const BaseTextareaStyle = styled.textarea`
    ${styleMixin.ScrollBar}
    resize: none;
    font-family: ${V.malgunGothic};
    font-weight: normal;
    line-height: 2;

    width: 100%;
    padding-block: 0.7em;
    padding-inline: 1em;

    border-radius: 5px;

    background-color: ${(props) => props.theme.colors.textArea};
    color: ${(props) => props.theme.colors.text};
    margin: 0.8rem auto;
`;
