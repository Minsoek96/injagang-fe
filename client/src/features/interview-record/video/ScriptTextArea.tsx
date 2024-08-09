import { useState } from 'react';

import { ResizeableTextarea } from '@/src/shared/components';

export default function ScriptTextArea() {
  const [text, setText] = useState<string>('');
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
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fontSize: '1.8rem',
        color: '#13df0cb3',
      }}
    />
  );
}
