import { useEffect } from 'react';

import APIErrorBoundary from '@/components/APIErrorBoundary';
import CoverLetterCreator from '@/src/features/coverletter/new/CoverLetterCreator';
import useTemplateStoreManager from '@/src/features/template/hooks/useTemplateStoreManager';

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
