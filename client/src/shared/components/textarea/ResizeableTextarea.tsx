import React, {
  useRef, useEffect, forwardRef, ForwardedRef,
} from 'react';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';

type ResizableTextareaProps = {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  maxSize: number;
};

const ResizableTextarea = forwardRef(
  (
    {
      text, setText, placeholder, maxSize = 30,
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
        textarea.style.height = 'inherit';
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
      />
    );
  },
);

ResizableTextarea.displayName = 'ResizableTextarea';

export default ResizableTextarea;

const StyledTextarea = styled.textarea`
  ${styleMixin.ScrollBar}
  width: 100%;
  padding: 0.8em;
  border: none;
  border-radius: 5px;
  resize: none;
  height: auto;
  font-weight: normal;
  font-family: "Malgun Gothic", sans-serif;
  background-color: ${(props) => props.theme.colors.textArea};
  color: ${(props) => props.theme.colors.text};

  &:focus-visible {
    outline: none;
  }
`;
