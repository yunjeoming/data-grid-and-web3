import { NextApiRequest, NextApiResponse } from 'next';
import web3Instance from '../../../server/web3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const web3 = web3Instance;
      const accounts = await web3.eth.getAccounts();
      res.status(200).json({ status: 200, data: { accounts } });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: {
          text: '계좌 조회 중에 오류가 발생했습니다.',
          error,
        },
      });
    }
  }
}
