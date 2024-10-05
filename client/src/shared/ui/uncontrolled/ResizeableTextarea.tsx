import { ComponentPropsWithRef, FormEventHandler } from 'react';

import { styled } from 'styled-components';

import { UseFormRegisterReturn } from 'react-hook-form';

import { styleMixin, V } from '@/src/shared/styles';

type Props = ComponentPropsWithRef<'textarea'> & {
  maxSize: number;
  register: UseFormRegisterReturn;
};
export default function ResizeableTextarea({
  maxSize, register, ...props
}: Props) {
  const handleInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = e.target as HTMLTextAreaElement;
    const maxRemSize = maxSize * 10;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, maxRemSize);
    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY = newHeight >= maxRemSize ? 'auto' : 'hidden';
  };

  return (
    <StyledTextarea
      onInput={handleInput}
      {...register}
      {...props}
    />
  );
}

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
