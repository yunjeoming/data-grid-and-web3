import { NextApiRequest, NextApiResponse } from 'next';
import web3Instance from '../../web3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      text: '잘못된 트랜잭션 id입니다.',
    });
  }

  const web3 = web3Instance;

  if (req.method === 'GET') {
    try {
      const transaction = await web3.eth.getTransaction(id);

      if (!transaction) {
        return res.status(404).json({
          text: '존재하지 않는 트랜잭션입니다.',
        });
      }

      const transactionResult = {
        to: transaction.to,
        from: transaction.from,
        value: web3.utils.fromWei(transaction.value, 'ether').toString(),
      };

      res.status(200).json({
        ...transactionResult,
        txId: id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        text: '트랜잭션 조회 중 오류가 발생했습니다.',
        error,
      });
    }
  }
}
