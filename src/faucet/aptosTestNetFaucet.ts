import { aptos } from "../config/init";

export const requestAptosFromFaucet = async (aptosAddress: string) => {
  const fund = await aptos.fundAccount({
    accountAddress: aptosAddress,
    amount: 100,
  });

  return fund;
};
