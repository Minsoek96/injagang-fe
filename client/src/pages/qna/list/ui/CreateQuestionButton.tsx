import { MdOutlineModeEditOutline } from 'react-icons/md';

import { MainButton } from '@/src/shared/ui';
import { usePageRouter } from '@/src/shared/hooks';

export default function CreateQuestionButton() {
  const { moveBoardQuestionPage } = usePageRouter();
  return (
    <MainButton
      label={(
        <span>
          <MdOutlineModeEditOutline />
          글쓰기
        </span>
      )}
      onClick={moveBoardQuestionPage}
      sx={{
        fontSize: '1.5rem',
        padding: '1rem 2rem',
        height: '100%',
      }}
      variant="signature"
    />
  );
}
