import dynamic from 'next/dynamic';

import { memo, useEffect, useState } from 'react';

import styled from 'styled-components';

import DOMPurify from 'dompurify';

import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

import { useDebounce } from '@/src/shared/hooks';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const mdParser = new MarkdownIt();

type Props = {
  onChange: (text: string) => void;
  placeholder?: string;
  initText?: string;
};

function MarkdownEditor({
  onChange,
  placeholder = '값을 입력해주세요.',
  initText = '',
}: Props) {
  const [value, setValue] = useState(initText);
  const debouceValue = useDebounce(value);

  useEffect(() => {
    onChange(value);
  }, [debouceValue]);

  const handleEditorChange = ({ text }: { text: string }) => {
    setValue(text);
  };

  return (
    <Container>
      <MdEditor
        value={value}
        renderHTML={(text) => DOMPurify.sanitize(mdParser.render(text))}
        onChange={handleEditorChange}
        placeholder={placeholder}
        view={{
          menu: true,
          md: true,
          html: false,
        }}
        plugins={[
          'header',
          'font-bold',
          'font-italic',
          'list-ul',
          'block-code-inline',
          'block-code-block',
          'block-quote',
          'mode-toggle',
        ]}
      />
    </Container>
  );
}

export default memo(MarkdownEditor);

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-block: 2rem;

  // 전체 테두리
  .rc-md-editor {
    background-color: ${(props) => props.theme.colors.textArea};
    border: 0.1em solid ${(props) => props.theme.colors.mainLine};
    height: 100%;
  }

  // 툴바
  .rc-md-editor .rc-md-navigation {
    background-color: ${(props) => props.theme.colors.textArea};
    border-bottom: 0.1em solid ${(props) => props.theme.colors.mainLine};
  }

  // md배경 관련
  .rc-md-editor .editor-container .input {
    background-color: ${(props) => props.theme.colors.textArea}!important;
    color: ${(props) => props.theme.colors.text}!important;
  }

  .rc-md-editor .editor-container > .section {
    border-right: 0.1em solid ${(props) => props.theme.colors.mainLine};
  }

  // html 렌더링 스타일 ?
  .custom-html-style {
    color: ${(props) => props.theme.colors.text};
  }
`;
