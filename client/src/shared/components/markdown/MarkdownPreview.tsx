import styled from 'styled-components';
import MarkdownIt from 'markdown-it';

import 'github-markdown-css/github-markdown.css';

const mdParser = new MarkdownIt();

type Props = {
  content: string;
};

export default function MarkdownPreview({ content }: Props) {
  const htmlContent = mdParser.render(content);

  return <Container className="markdown-body" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  height: 100%;
  border-radius: 8px;
`;
