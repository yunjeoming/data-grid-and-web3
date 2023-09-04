import { NextApiRequest, NextApiResponse } from 'next';
import web3Instance from '../../web3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const web3 = web3Instance;

  if (req.method === 'GET') {
    try {
      // 임의 주소
      const fakeTransaction = {
        to: '0xf318EDEe6c856606814C0DC3d971dceA82bF071c',
        from: '0xf318EDEe6c856606814C0DC3d971dceA82bF071c',
        value: web3.utils.toWei('0', 'ether').toString(),
      };
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = await web3.eth.estimateGas(fakeTransaction);

      res.status(200).json({
        status: 200,
        data: {
          fee: web3.utils.fromWei(gasPrice * gasLimit, 'ether'),
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: {
          text: '트랜잭션 수수료 조회 중 오류가 발생했습니다.',
          error,
        },
      });
    }
  }
}
