/* eslint-disable react/require-default-props */
import {
  useRef, forwardRef, ForwardedRef,
} from 'react';

import styled, { CSSProperties } from 'styled-components';

import { BaseTextareaStyle } from './BaseStyle';

  type MainTextAreaProps = {
    text: string;
    setText: (text: string) => void;
    placeholder: string;
    sx?:CSSProperties;
    readOnly?: boolean;
  };

const MainTextarea = forwardRef(
  (
    {
      text,
      setText,
      placeholder,
      sx = {},
      readOnly = false,
    }: MainTextAreaProps,
    fwRef?: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = fwRef || internalRef;

    return (
      <StyledTextarea
        ref={combinedRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        style={sx}
        readOnly={readOnly}
      />
    );
  },
);

MainTextarea.displayName = 'MainTextarea';

export default MainTextarea;

const StyledTextarea = styled(BaseTextareaStyle)`
    height: 100%;
`;
