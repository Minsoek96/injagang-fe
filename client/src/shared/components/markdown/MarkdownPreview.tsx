import styled from 'styled-components';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

import 'github-markdown-css/github-markdown.css';

const mdParser = new MarkdownIt();

type Props = {
  content: string;
};

export default function MarkdownPreview({ content }: Props) {
  const htmlContent = mdParser.render(content);
  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  return <Container className="markdown-body" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.bodyColor};
  color: ${(props) => props.theme.colors.text};
  height: 100%;
  border-radius: 8px;
`;
