import { ComponentPropsWithoutRef } from 'react';

import { styled } from 'styled-components';

import { UseFormRegisterReturn } from 'react-hook-form';

type Props = ComponentPropsWithoutRef<'input'> & {
  register: UseFormRegisterReturn;
};

function MainInput({ register, ...props }: Props) {
  return <Input {...props} {...register} />;
}

export default MainInput;

const Input = styled.input`
  height: 4rem;
  border-radius: 0.8rem;
  border: 0.1em solid ${(props) => props.theme.colors.mainLine};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  padding: 0.8em 0.16em;
`;
