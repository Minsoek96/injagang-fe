import type { NextApiRequest, NextApiResponse } from 'next';
import { Anthropic } from '@anthropic-ai/sdk';

type FeedbackRequest = {
  question: string;
  answer: string;
};

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = 'claude-3-5-haiku-20241022';
const MAX_TOKENS = 1024;
const TEMPERATURE = 0.3;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '허용되지 않는 메소드입니다' });
  }

  try {
    const { question, answer } = req.body as FeedbackRequest;

    if (!question || !answer) {
      return res.status(400).json({
        message: '질문과 답변이 모두 필요합니다',
      });
    }

    const prompt = `
      목적/작업 유형: 면접 답변 피드백

      역할 및 과제: 경험 많은 면접관으로서 음성 답변${question}에 대한 평가${answer}를 실시

      평가 기준:
      1. 기술적 정확성
      2. 개념 이해도
      3. 설명의 명확성
      4. 실무 적용성
      5. 구조화된 답변

      응답 형식:
      {
        "overall_rating":  "탁월함|우수함|양호함|기본적|심각함"
        "strengths": ["강점1", "강점2", "..."],
        "improvements": ["개선점1", "개선점2", "..."],
      }

      지침:
      - {overall_rating, strengths, improvements} 필드만 포함한 JSON 형식으로만 응답합니다.
      - 음성 응답 상황을 고려하여 코드 작성 대신 논리적 설명 능력에 중점을 둡니다.
      - 강점은 2-5개, 개선점은 0-5개 제시합니다.
      - 탁월함 답변엔 improvements 첫항목: "훌륭한 답변입니다. 추가 고려사항:"
      - 면접에서 실제로 중요한 요소(예: 문제 해결 접근법, 기술 선택의 이유 등)에 초점을 맞춥니다.
    `;

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textContent = textBlock ? (textBlock as any).text : '';

    let parsedData;
    try {
      parsedData = JSON.parse(textContent);
    } catch (parseError) {
      console.error('응답 데이터 파싱 중 오류:', parseError);
      parsedData = { strengths: [], improvements: [], overall_rating: '' };
    }

    return res.status(200).json({
      strengths: parsedData.strengths || [],
      improvements: parsedData.improvements || [],
      rating: parsedData.overall_rating || '',
    });
  } catch (error) {
    console.error('피드백 요청 처리 중 오류:', error);
    return res.status(500).json({
      message: '피드백 요청 처리 중 오류가 발생했습니다',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
}
