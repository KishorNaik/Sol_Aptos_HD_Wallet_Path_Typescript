import {
  Account,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  Network,
  SigningSchemeInput,
} from "@aptos-labs/ts-sdk";
import { aptos } from "../config/init";

export interface GenerateWalletOptions {
  mnemonic: string;
  path: number;
}

export interface GenerateWalletResult {
  address: string;
  privateKey: string;
  publicKey: string;
}

export interface IAptosWallet {
  generateWalletAsync(
    params: GenerateWalletOptions
  ): Promise<GenerateWalletResult>;
}

export class AptosWallet implements IAptosWallet {
  public async generateWalletAsync(
    params: GenerateWalletOptions
  ): Promise<GenerateWalletResult> {
    try {
      // Get Seed and Path
      const { mnemonic, path } = params;

      // Config HD Wallet
      const hdWalletPath = `m/44'/637'/0'/0'/${path}'`;

      // Generate a new account
      const account = Account.fromDerivationPath({
        path: hdWalletPath,
        mnemonic,
        scheme: SigningSchemeInput.Ed25519,
      });

      // Get Public Key
      const publicKey = account.publicKey.toString();
      // Get Private Key
      const privateKey = account.privateKey.toString();

      // Get the Aptos address from the public key
      const address = account.accountAddress.toStringLong();

      const result: GenerateWalletResult = {
        address: address,
        privateKey,
        publicKey,
      };

      return result;
    } catch (ex) {
      throw ex;
    }
  }
}
