import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

const FormStyle = {
  formContainer: styled.div`
    ${styleMixin.Column()};
    padding: 2rem 3rem;
    width: 100%;
    background-color: ${(props) => props.theme.colors.secondary};
    border: 1px solid ${(props) => props.theme.colors.mainLine};
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border-left: 1.5rem solid ${(props) => props.theme.colors.signatureColor};
    box-shadow: ${V.boxShadow3};
  `,

  formHeader: styled.div`
    text-align: start;
    width: 100%;
    margin-bottom: 2.5rem;
  `,

  titleInputWrapper: styled.div`
    width: 100%;

    input {
      border-radius: 8px;
      font-size: 1.6rem;
      height: 5rem;
      padding: 1.5rem;
      margin-bottom: '1.5rem';
      transition: border-color 0.2s, box-shadow 0.2s;

      &:focus {
        border-color: ${(props) => props.theme.colors.signatureColor};
        box-shadow: 0 0 0 3px
          ${(props) => `${props.theme.colors.signatureColor}20`};
      }
    }
  `,

  coverletterTitle: styled.h2`
    font-family: ${V.serif};
    font-weight: 600;
    color: ${(props) => props.theme.colors.signatureColor};
    font-size: 2.8rem;
    margin-bottom: 0.8rem;

    @media screen and (max-width: ${V.mediaMobile}) {
      font-size: 2.4rem;
    }
  `,

  coverletterForm: styled.form`
    ${styleMixin.Column()}
    width: 100%;
    gap: 2.5rem;
  `,

  sectionTitle: styled.h3`
    font-family: ${V.serif};
    font-weight: 500;
    color: ${(props) => props.theme.colors.signatureColor};
    font-size: 2rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.mainLine};
  `,

  controllerWrapper: styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    width: 100%;

    button {
      font-size: 1.8rem;
      padding: 1.2rem 2.5rem;
      border-radius: 8px;

      @media screen and (max-width: ${V.mediaMobile}) {
        font-size: 1.6rem;
        padding: 1rem 1.8rem;
      }
    }
  `,
};

export default FormStyle;
