import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query;

  switch (type) {
  case 'network-error':
    res.socket?.destroy();
    break;
  case 'timeout':
    setTimeout(() => {
      res.status(408).json({
        code: 'ECONNABORTED',
        message: '요청 시간을 초과했습니다.',
      });
    }, 5000);
    break;
  case '400':
    res.status(400).json({
      code: '400',
      message: '잘못된 요청',
    });
    break;
  case '401':
    res.status(401).json({
      code: '401',
      message: '인증 에러',
    });
    break;
  case '403':
    res.status(403).json({
      code: '403',
      message: '권한이 없습니다.',
    });
    break;
  default:
    res.status(500).json({
      code: 'ERROR',
      message: '알 수 없는 오류가 발생했습니다.',
    });
    break;
  }
}
