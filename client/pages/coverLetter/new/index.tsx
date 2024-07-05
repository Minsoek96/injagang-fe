import { useEffect } from 'react';

import APIErrorBoundary from '@/components/APIErrorBoundary';
import CoverLetterCreator from '@/components/CoverLetter/new/CoverLetterCreator';
import useTemplateStoreManager from '@/components/Admin/hooks/useTemplateStoreManager';

function CoverLetterEditorPage() {
  const { clearCurTemplate } = useTemplateStoreManager();

  useEffect(
    () => () => {
      clearCurTemplate();
    },
    [],
  );
  return (
    <APIErrorBoundary>
      <CoverLetterCreator />
    </APIErrorBoundary>
  );
}

export default CoverLetterEditorPage;
