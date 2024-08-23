import styled from 'styled-components';

import { InputField } from '@/src/shared/components';
import { styleMixin } from '@/src/shared/styles';
import useRandomSettingLogic from '@/src/features/random-quetsion/useRandomSettingLogic';

function InterViewRandomSetting() {
  const { handleChange, handleSubmit, randomSetting } = useRandomSettingLogic();

  return (
    <InterViewSettingStyle>
      <Form onSubmit={handleSubmit}>
        <InputField
          label="CS질문"
          name="cs"
          value={randomSetting.cs}
          onChange={handleChange}
          ref={null}
        />
        <InputField
          label="상황 질문"
          type="number"
          name="situation"
          value={randomSetting.situation}
          onChange={handleChange}
          ref={null}
        />
        <InputField
          label="성격 질문"
          name="personality"
          value={randomSetting.personality}
          onChange={handleChange}
          ref={null}
        />
        <InputField
          label="직업 질문"
          type="number"
          name="job"
          value={randomSetting.job}
          onChange={handleChange}
          ref={null}
        />
        <Button type="submit">셋팅완료</Button>
      </Form>
    </InterViewSettingStyle>
  );
}

export default InterViewRandomSetting;

const InterViewSettingStyle = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 100%;
  margin: 30px auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 70rem;
  padding: 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 4px 8px rgba(14, 13, 13, 0.2);
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.signatureColor};
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
