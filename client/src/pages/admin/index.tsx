import styled from 'styled-components';

import { ExpectedQuestionLayout } from '@/src/features/interview-question';

import { styleMixin } from '@/src/shared/styles';

import { useAuthStore, useAuth } from '@/src/entities/auth';
import Template from './template/Template';

function AdminPage() {
  useAuth();
  const { role } = useAuthStore();
  return role === 'ADMIN' ? (
    <AdminPageStyle>
      <Template />
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
