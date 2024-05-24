import { requestAptosFromFaucet } from "./faucet/aptosTestNetFaucet";
import { Mnomonic } from "./lib/mnomonic";
import { AptosWallet } from "./lib/wallet";

const main = async () => {
  // Generate Mnemonic
  const mnemonic = await new Mnomonic().generateMnemonicAsync();
  console.log("Mnemonic: " + mnemonic);

  // Generate Wallet
  const wallet = await new AptosWallet().generateWalletAsync({
    mnemonic,
    path: 0,
  });

  console.log("Address: " + wallet.address);
  console.log("Private Key: " + wallet.privateKey);
  console.log("Public Key: " + wallet.publicKey);

  // Faucet
  const faucetResponse = await requestAptosFromFaucet(
    "0xaa9b1e6eb4ccaf80eccafe98fee870b579821580f47964b1b1812cf033e40ab2"
  );
  console.log(`Response : ${JSON.stringify(faucetResponse)}`);
};

main()
  .then()
  .catch((ex) => console.log(ex.message));
