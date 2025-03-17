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
    당신은 기술 면접 피드백을 제공하는 전문가입니다. 다음 답변의 강점과 개선점을 분석하여 간결하게 JSON 형태로만 응답하세요.

    다음은 기술 면접 질문과 답변입니다. 답변의 강점과 개선점을 분석하여 JSON 형태로 제공해주세요.
    강점과 개선점은 각각 2~6개로 구성해주세요. 코드 예시는 포함하지 마세요.

    질문: ${question}
    답변: ${answer}

    다음 JSON 형식으로만 응답해주세요:
    {
      "strengths": ["강점1", "강점2", "..."],
      "improvements": ["개선점1", "개선점2", "..."]
    }
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

    return res.status(200).json({
      rawResponse: response,
      usage: response.usage,
    });
  } catch (error) {
    console.error('피드백 요청 처리 중 오류:', error);
    return res.status(500).json({
      message: '피드백 요청 처리 중 오류가 발생했습니다',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
}
