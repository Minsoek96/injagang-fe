import { css } from 'styled-components';

const buttonVariants = {
  ghost: css`
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.colors.text};

    &:hover {
      background-color: ${(props) => props.theme.colors.mainHover}20;
    }
  `,

  outline: css`
    background-color: transparent;
    border: 0.1em solid ${(props) => props.theme.colors.mainLine};
    color: ${(props) => props.theme.colors.text};

    &:hover {
      background-color: ${(props) => props.theme.colors.mainHover}10;
    }
  `,

  default: css<{ $isActive: boolean }>`
    background-color: ${({ $isActive, theme }) =>
    ($isActive ? theme.colors.brandColor : theme.colors.button)};
    color: ${(props) => props.theme.colors.text};
    border: 0.1em solid ${(props) => props.theme.colors.mainLine};

    &:hover {
      background-color: ${(props) => props.theme.colors.mainHover};
    }
  `,
};

type VariantProps = keyof typeof buttonVariants;

export { type VariantProps, buttonVariants };
