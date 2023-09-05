import { NextApiRequest, NextApiResponse } from 'next';
import web3Instance from '../web3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const web3 = web3Instance;

  if (req.method === 'POST') {
    const { fromAccount, toAccount, amount } = req.body;

    const hasAccount = (await web3.eth.getAccounts()).includes(fromAccount);
    if (!hasAccount) {
      return res.status(404).json({
        result: '존재하지 않는 계좌입니다.',
      });
    }

    try {
      const transaction = {
        to: toAccount,
        from: fromAccount,
        value: web3.utils.toWei(amount, 'ether').toString(),
      };

      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = await web3.eth.estimateGas(transaction);

      const transactionResult = await web3.eth.sendTransaction({
        ...transaction,
        gasLimit: gasLimit.toString(),
        gasPrice: gasPrice.toString(),
      });

      res.status(200).json({
        ...transaction,
        txId: transactionResult.transactionHash,
        value: amount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        text: '트랜잭션 전송 중 오류가 발생했습니다.',
        error,
      });
    }
  }
}
