import {
    publicKey,
    Cluster,
    Umi,
    deserializeAccount,
  } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createFungible, DigitalAsset, fetchDigitalAsset, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";
import { getRpc, newConnection } from "./lib/solana";
import { fetchMint } from "@metaplex-foundation/mpl-toolbox";

export class MetaplexManager {

    static async fetchAllDigitalAssets(mints: string[]): Promise<DigitalAsset[]> {
        const umi = createUmi(getRpc(), 'confirmed'); 
        umi.use(mplTokenMetadata());
        const assets: DigitalAsset[] = [];

        for (const mint of mints) {
            const tmpAsset = await this.getDigitalAssetManually(mint);
            if (tmpAsset){
                assets.push(tmpAsset);
            }
        }

        return assets;
    }

    static async getDigitalAssetManually(mint: string): Promise<DigitalAsset | undefined> {
        console.log('getDigitalAssetManually', mint);

        try {
            const umi = createUmi(getRpc(), 'confirmed'); 
    
            const mintAccount = await fetchMint(umi, publicKey(mint));

            const connection = newConnection();
            let accountInfo = await connection.getParsedAccountInfo(new web3.PublicKey(mint));
            const data: any = accountInfo.value?.data;
            const owner = accountInfo.value?.owner; // program owner

            const extensions = data?.parsed?.info?.extensions;
            if (extensions){
                for (const extension of extensions) {
                    if (extension.extension == 'tokenMetadata' && extension.state?.mint == mint){
                        const metadata: any = {
                            name: extension.state?.name || '',
                            symbol: extension.state?.symbol || '',
                            uri: extension.state?.uri || '',
                        };

                        const digitalAsset: DigitalAsset = {
                            publicKey: publicKey(mint),
                            mint: mintAccount,
                            metadata: metadata
                        };
                        return digitalAsset;          
                    }
                }
            }
        }
        catch (error) {
            console.error('MetaplexManager', 'fetchAllDigitalAssets', error);
        }

        return undefined;
    }
  
  
}