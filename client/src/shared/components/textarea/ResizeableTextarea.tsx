/* eslint-disable react/require-default-props */
import React, {
  useRef, useEffect, forwardRef, ForwardedRef,
} from 'react';

import styled, { CSSProperties } from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

type ResizableTextareaProps = {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  maxSize: number;
  sx?:CSSProperties;
  readOnly?: boolean;
};

const ResizableTextarea = forwardRef(
  (
    {
      text,
      setText,
      placeholder,
      maxSize = 30,
      sx = {},
      readOnly = false,
    }: ResizableTextareaProps,
    fwRef?: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = fwRef || internalRef;

    useEffect(() => {
      const adjustHeight = () => {
        const textarea = (combinedRef as React.RefObject<HTMLTextAreaElement>)
          .current!;
        const maxRemSize = maxSize * 10;
        textarea.style.height = '0px';
        const newHeight = Math.min(textarea.scrollHeight, maxRemSize);
        textarea.style.height = `${newHeight}px`;
        textarea.style.overflowY = newHeight >= maxRemSize ? 'auto' : 'hidden';
      };

      adjustHeight();
    }, [text, maxSize, combinedRef]);

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

ResizableTextarea.displayName = 'ResizableTextarea';

export default ResizableTextarea;

const StyledTextarea = styled.textarea`
  ${styleMixin.ScrollBar}
  resize: none;
  font-family: ${V.malgunGothic};
  font-weight: normal;
  line-height: 2;

  width: 100%;
  padding-block: 0.7em;
  padding-inline: 1em;

  border-radius: 5px;

  height: auto;
  background-color: ${(props) => props.theme.colors.textArea};
  color: ${(props) => props.theme.colors.text};
  margin: 0.8rem auto;
`;
