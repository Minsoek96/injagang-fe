import styled from 'styled-components';

import TemplateView from '@/components/Admin/Template/TemplateList';
import ExpectedQuestionView from '@/components/InterViewQuestion/ExpectedQuestionLayout';

import { styleMixin } from '@/src/shared/styles';

import { useAuthStore } from '@/src/entities/auth';
import { useAuth } from '@/src/shared/hooks';

// TODO : ErrorBoundary 테스트 하기
function AdminPage() {
  useAuth();
  const { role } = useAuthStore();
  return role === 'ADMIN' ? (
    <AdminPageStyle>
      <TemplateView />
      <ExpectedQuestionView />
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
