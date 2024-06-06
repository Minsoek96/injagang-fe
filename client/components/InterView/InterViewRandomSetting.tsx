import React, { useState } from "react";

import styled from "styled-components";

import { useDispatch } from "react-redux";
import { getRandomList } from "../redux/InterViewQuestion/action";

import { ColBox } from "@/styles/GlobalStyle";

import useModal from "@/hooks/useModal";

import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";

const InterViewSettingStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 100%;
  margin: 30px auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 4px 8px rgba(14, 13, 13, 0.2);
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #2ecc71;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

const InterViewRandomSetting = () => {
  const [rendomSetting, setRendomSetting] = useState({
    cs: 0,
    situation: 0,
    job: 0,
    personality: 0,
  });
  const dispatch = useDispatch();
  const { setModal, Modal } = useModal();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRendomSetting(cur => ({
      ...cur,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    event?.preventDefault();
    const data = [
      { size: rendomSetting.cs, questionType: QuestionType.CS },
      { size: rendomSetting.situation, questionType: QuestionType.SITUATION },
      { size: rendomSetting.job, questionType: QuestionType.JOB },
      {
        size: rendomSetting.personality,
        questionType: QuestionType.PERSONALITY,
      },
    ];

    dispatch(getRandomList(data));
    const sumAllQuestions = Object.values(rendomSetting).reduce(
      (pre, cur) => pre + Number(cur),
      0,
    );
    setModal({
      contents: {
        title: "Success",
        content: `${sumAllQuestions}개의 랜덤 질문을 셋팅 하였습니다.`,
      },
    });
  };

  return (
    <InterViewSettingStyle>
      <Form onSubmit={handleSubmit}>
        <Label>CS 질문</Label>
        <Input
          type="number"
          name="cs"
          value={rendomSetting.cs}
          onChange={handleChange}
        />
        <Label>상황 질문</Label>
        <Input
          type="number"
          name="situation"
          value={rendomSetting.situation}
          onChange={handleChange}
        />
        <Label>성격 질문</Label>
        <Input
          type="number"
          name="personality"
          value={rendomSetting.personality}
          onChange={handleChange}
        />
        <Label>직업 질문</Label>
        <Input
          type="number"
          name="job"
          value={rendomSetting.job}
          onChange={handleChange}
        />
        <Button type="submit">셋팅완료</Button>
      </Form>
      <Modal />
    </InterViewSettingStyle>
  );
};

export default InterViewRandomSetting;
