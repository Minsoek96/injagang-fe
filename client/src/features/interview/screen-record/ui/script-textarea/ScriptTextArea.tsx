import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { useIntvContentStore } from '@/src/entities/interview_question';

import { ResizeableTextarea } from '@/src/shared/ui';
import { useDebounce } from '@/src/shared/hooks';

export default function ScriptTextArea() {
  const setCurScript = useIntvContentStore((state) => state.setCurScript);
  const [text, setText] = useState<string>('');
  const debounceValue = useDebounce(text, 500);

  useEffect(() => {
    if (debounceValue) setCurScript(text);
  }, [debounceValue]);

  return (
    <ScriptView>
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
    </ScriptView>
  );
}

const ScriptView = styled.div`
  z-index: 100;
  position: absolute;
  transform: translate(-50%);
  left: 50%;
  width: 80%;
  max-width: 70rem;
  bottom: 10%;
`;
