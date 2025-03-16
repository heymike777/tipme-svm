export class ExplorerManager {

    static getUrlToAccount(address: string): string {
        return `https://solscan.io/account/${address}?cluster=custom&customUrl=${process.env.SOLANA_RPC}`;
    }

    static getUrlToToken(address: string): string {
        return `https://solscan.io/token/${address}?cluster=custom&customUrl=${process.env.SOLANA_RPC}`;
    }

    static getUrlToAddress(address: string): string {
        return `https://solscan.io/address/${address}?cluster=custom&customUrl=${process.env.SOLANA_RPC}`;
    }

    static getUrlToTransaction(signature: string): string {
        return `https://solscan.io/tx/${signature}?cluster=custom&customUrl=${process.env.SOLANA_RPC}`;
    }
    
}