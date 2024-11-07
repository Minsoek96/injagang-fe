import styled from 'styled-components';

import { MainButton } from '@/src/shared/ui/button';
import { useAuthStore } from '@/src/entities/auth';

interface ActionBtnProps {
  onRemove: () => void;
  onChecked: () => void;
  isAllChecked: boolean;
  onAdd: () => void;
}

/** ActionButtons :  액션 버튼
 *
 * @param onChecked : 체크 핸들러
 * @param onRemove : 질문 삭제 핸들러
 * @param isAllChecked : 전체 체크 상태 추적
 * @param onAdd : 질문 추가 핸들러
 */
function ActionButtons({
  onChecked,
  onRemove,
  isAllChecked,
  onAdd,
}: ActionBtnProps) {
  const { role } = useAuthStore();
  const isAdmin = role === 'ADMIN' ? 'ADMIN' : 'USER';

  const btnConfig = {
    ADMIN: {
      onClick: () => onRemove(),
      text: '삭제하기',
    },
    USER: {
      onClick: () => onAdd(),
      text: '항목추가',
    },
  };

  return (
    <ActionContainer>
      <MainButton
        label={isAllChecked ? '전체해제' : '전체선택'}
        onClick={onChecked}
        sx={{ width: '100%', height: '4rem', marginRight: '.5rem' }}
      />
      <MainButton
        label={btnConfig[isAdmin].text}
        onClick={btnConfig[isAdmin].onClick}
        sx={{ width: '100%', height: '4rem' }}
      />
    </ActionContainer>
  );
}

export default ActionButtons;

const ActionContainer = styled.div`
  display: flex;
  width: 100%;
`;
