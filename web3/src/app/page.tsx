import { ExchangeAlert, ExchangeForm, MyAccounts } from '@/features/wallet/accounts';
import { WalletService } from '@/services/wallet';

export default async function Home() {
  const returnData = await WalletService.getAccounts();
  const accounts = returnData ? returnData.accounts : [];

  return (
    <>
      <MyAccounts accounts={accounts} />
      <ExchangeForm />
      <ExchangeAlert />
    </>
  );
}
