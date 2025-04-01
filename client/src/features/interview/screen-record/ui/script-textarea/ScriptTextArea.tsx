import { useEffect, useState } from 'react';

import { ResizeableTextarea } from '@/src/shared/ui';
import { useIntvContentStore } from '@/src/entities/interview_question';
import { useDebounce } from '@/src/shared/hooks';

export default function ScriptTextArea() {
  const { setCurScript } = useIntvContentStore();
  const [text, setText] = useState<string>('');
  const debounceValue = useDebounce(text, 500);

  useEffect(() => {
    if (debounceValue) setCurScript(text);
  }, [debounceValue]);

  return (
    <ResizeableTextarea
      text={text}
      setText={setText}
      placeholder="대본을 작성해주세요."
      maxSize={10}
      sx={{
        width: '100%',
        height: '100px',
        borderRadius: '4px',
        padding: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        fontSize: '1.8rem',
        color: '#000',
      }}
    />
  );
}
