import { NextApiRequest, NextApiResponse } from 'next';
import Web3 from 'web3';
import web3Instance from '../../web3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      text: '잘못된 계좌 id입니다.',
    });
  }

  const web3 = web3Instance;

  const hasAccount = (await web3.eth.getAccounts()).includes(id);
  if (!hasAccount) {
    return res.status(404).json({
      text: '존재하지 않는 계좌입니다.',
    });
  }

  if (req.method === 'GET') {
    try {
      const weiBalance = await web3.eth.getBalance(id);
      const ethBalance = Web3.utils.fromWei(weiBalance, 'ether');

      // bigInt일 경우 ethBalance => '0.'
      res.status(200).json({
        name: id.toString(),
        balance: ethBalance === '0.' ? '0' : ethBalance,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        text: '계좌 조회 중에 오류가 발생했습니다.',
        error,
      });
    }
  }
}
