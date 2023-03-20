import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import { questionList } from "@/pages/edit";
import { BiPlus, BiEdit, BiCheck, BiTrash } from "react-icons/bi";
import TemplateQuestionAdd from "./TemplateQuestionAdd";
import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import Cookies from "js-cookie";
import { getTemplateList } from "../test/api";
import { title } from "process";

const TemplateStlyed = styled.div`
  ${ColBox}
  width: 100%;
`;

const Card = styled.div`
  ${FlexBox};
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: 70%;
  height: 350px;
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: 15px 15px;
`;

const TitleView = styled.div`
  ${ColBox}
  justify-content: center;
  width: 50%;
  height: 100%;
  border-right: 1px solid white;
  svg {
    margin-top: 10px;
    font-size: 35px;
    cursor: pointer;
  }
  svg:hover {
    color: red;
  }
`;

const QuestionView = styled.div`
  ${ColBox}
  justify-content: space-between;
  width: 50%;
  height: 100%;
  .endTitle {
    ${ColBox}
    justify-content: center;
    height: 100%;
  }
  svg {
    margin-top: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  svg:hover {
    color: red;
  }
`;

interface QuestionListItem {
  templateId: number;
  title: string;
  qnaList: string[];
}

interface dataItem {
  templateId: number;
  title: string;
  questions: string[];
}

const TemplateView = () => {
  const [templateList, setTemplateList] = useState<QuestionListItem[]>([]);
  const [curTemplateList, setCurTemplateList] = useState<string[]>([]);
  const [isAddContent, setIsAddContent] = useState<boolean>(false);
  const [curIndex, setCurIndex] = useState(0);

  const handleList = (qnaList: string[] = [], index: number) => {
    setCurTemplateList([...qnaList]);
    setCurIndex(index)
    console.log(curIndex);
  };

  const templateData = async () => {
    const data = await getTemplateList();
    return data;
  };

  useEffect(() => {
    templateData().then(data => {
      setTemplateList(
        data.map((it: dataItem) => ({
          templateId: it.templateId,
          title: it.title,
          qnaList: it.questions,
        })),
      );
    });
  }, []);

  const handleRemoveList = async () => {
    const headers = {
      Authorization: Cookies.get("jwtToken"),
    };

    try {
      const response = await fetcher(
        METHOD.DELETE,
        `/template/${curIndex}`,
        {
          headers,
        },
      );
      if (response) {
        console.log("성공");
      }
    } catch (error) {
      console.error(error);
    }

    setTemplateList(cur => {
      const filterItem = templateList.filter(a => a.templateId !== curIndex);
      return filterItem;
    });
    setCurTemplateList([]);
  };

  return (
    <TemplateStlyed>
      <Card>
        <TitleView>
          {templateList &&
            templateList.map((list, index) => (
              <div key={index}>
                <div onClick={() => handleList(list.qnaList, list.templateId)}>
                  {list.title}
                </div>
              </div>
            ))}
          {isAddContent ? (
            <></>
          ) : (
            <BiPlus onClick={() => setIsAddContent(true)}></BiPlus>
          )}
        </TitleView>
        <QuestionView>
          {isAddContent ? (
            <TemplateQuestionAdd
              setIsAddContent={setIsAddContent}
              setTemplateList={setTemplateList}
              templateList={templateList}
            />
          ) : (
            <div className="endTitle">
              {curTemplateList.length < 1 ? (
                <div style={{ color: "red" }}>현재의 리스트가 없습니다.</div>
              ) : (
                <>
                  {curTemplateList.map((question, index) => (
                    <div key={index}> {question}</div>
                  ))}
                  <BiTrash onClick={handleRemoveList} />
                </>
              )}
            </div>
          )}
        </QuestionView>
      </Card>
    </TemplateStlyed>
  );
};

export default TemplateView;
