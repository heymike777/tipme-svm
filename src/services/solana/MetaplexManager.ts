import {
    publicKey,
    Cluster,
    Umi,
    deserializeAccount,
  } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createFungible, fetchDigitalAsset, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";

export class MetaplexManager {
  
    static async getTokenMetadata(mint: string) {
        try {
            console.log("getTokenMetadata", mint);
            let umi = createUmi(process.env.SOLANA_RPC!).use(mplTokenMetadata());

            const account = await umi.rpc.getAccount(publicKey(mint));
            console.log("getTokenMetadata", "account", account);

            if (account.exists){
                // deserializeAccount(account, mplTokenMetadata().account);
            }

            // const asset = await umi.rpc.getAsset(publicKey(mint));
            // console.log("getTokenMetadata", "account", account);

            const asset = await fetchDigitalAsset(umi, publicKey(mint));
            console.log("getTokenMetadata", "asset", asset);
        }
        catch (error) {
            console.error("getTokenMetadata", error);
        }
    } 
  
  
}