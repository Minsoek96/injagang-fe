import styled from "styled-components";

import TemplateView from "@/components/Admin/Template/TemplateList";
import ExpectedQuestionView from "@/components/InterViewQuestion/ExpectedQuestionLayout";

import { ColBox } from "@/styles/GlobalStyle";

import useAuthStore from "@/store/auth/useAuthStore";

//TODO : ErrorBoundary 테스트 하기
const AdminPage = () => {
  const { role } = useAuthStore();
  return role === "ADMIN" ? (
    <AdminPageStyle>
      <TemplateView />
      <ExpectedQuestionView />
    </AdminPageStyle>
  ) : (
    <div>당신은 관리자가 아닙니다.</div>
  );
};

export default AdminPage;

const AdminPageStyle = styled.div`
  ${ColBox}
  width:100%;
`;
