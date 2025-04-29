import { css } from 'styled-components';

const buttonVariants = {
  // 배경과 테두리가 없는 투명한 버튼, 호버시 연한 배경색 적용
  ghost: css`
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.colors.text};

    &:hover {
      background-color: ${(props) => props.theme.colors.mainHover}20;
    }
  `,

  // 테두리만 있는 투명한 버튼, 호버시 연한 배경색 적용
  outline: css`
    background-color: transparent;
    border: 0.1em solid ${(props) => props.theme.colors.mainLine};
    color: ${(props) => props.theme.colors.text};

    &:hover {
      background-color: ${(props) => props.theme.colors.mainHover}10;
    }
  `,

  // 실선 테두리 버튼, 호버시 연한 시그니처 색상 적용
  dashed: css`
    background-color: transparent;
    border: 0.1em dashed ${(props) => props.theme.colors.signatureColor};
    color: ${(props) => props.theme.colors.signatureColor};

    &:hover {
      background-color: ${(props) => `${props.theme.colors.signatureColor}20`};
      transform: translateY(-2px);
    }

    &:active {
    transform: translateY(0);
  }
  `,

  // isActive 상태에 따라 배경색이 변경되는 기본 버튼
  default: css<{ $isActive: boolean }>`
    background-color: ${({ $isActive, theme }) =>
    ($isActive ? theme.colors.signatureColor : theme.colors.defaultButton)};
    color: ${(props) => props.theme.colors.text};
    border: 0.1em solid ${(props) => props.theme.colors.mainLine};

    &:hover {
      background-color: ${(props) => props.theme.colors.mainHover};
    }
  `,

  // 브랜드 시그니처 색상을 사용하는 버튼, 호버시 반짝이는 효과 적용
  signature: css<{ $isActive: boolean }>`
    background-color: ${(props) => props.theme.colors.signatureColor};
    color: ${(props) => props.theme.colors.signatureText};
    border: 0.1em solid ${(props) => props.theme.colors.mainLine};
    font-weight: 500;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      transition: 0.5s;
    }

    &:not(:disabled) {
      &:hover::before {
        left: 100%;
      }

      &:hover {
        background-color: ${(props) => props.theme.colors.signatureHover};
      }
    }

    &:disabled {
      opacity: 0.6;
    }
  `,
};

type VariantProps = keyof typeof buttonVariants;

export { type VariantProps, buttonVariants };
