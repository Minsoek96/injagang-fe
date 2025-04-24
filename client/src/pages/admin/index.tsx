import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';

// TODO : 수정필요
import { ExpectedQuestionLayout } from '@/src/pages/interview/ui';

import { useAuthStore, useAuth } from '@/src/entities/auth';

import { Template } from './ui';

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
