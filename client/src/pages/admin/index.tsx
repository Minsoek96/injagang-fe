import styled from 'styled-components';

import { TemplateList } from '@/src/features/template';
import { ExpectedQuestionLayout } from '@/src/features/interview-question';

import { styleMixin } from '@/src/shared/styles';

import { useAuthStore, useAuth } from '@/src/entities/auth';

function AdminPage() {
  useAuth();
  const { role } = useAuthStore();
  return role === 'ADMIN' ? (
    <AdminPageStyle>
      <TemplateList />
      <ExpectedQuestionLayout />
    </AdminPageStyle>
  ) : (
    <div>당신은 관리자가 아닙니다.</div>
  );
}

export default AdminPage;

const AdminPageStyle = styled.div`
  ${styleMixin.Column()}
  width:100%;
`;
