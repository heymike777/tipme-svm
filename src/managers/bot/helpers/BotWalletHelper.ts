import { IUser } from "../../../entities/User";
import { ExplorerManager } from "../../../services/explorers/ExplorerManager";
import { UserManager } from "../../UserManager";
import { TgMessage } from "../BotManager";
import { BotHelper, Message } from "./BotHelper";

export class BotWalletHelper extends BotHelper {

    constructor() {
        console.log('BotAddWalletHelper', 'constructor');

        const replyMessage: Message = {
            text: '',
        };

        super('wallet', replyMessage);
    }

    async commandReceived(ctx: any, user: IUser) {
        console.log('WALLET', 'commandReceived', 'user:', user);

        const wallet = user.wallet;
        ctx.reply(`You wallet public key:\n<code>${wallet.publicKey}</code> (Tap to copy)\n\nYou wallet private key:\n<code>${wallet.privateKey}</code> (Tap to copy)\n\nYou can import it to Backpack or any other wallet that supports Sonic.`, {
            parse_mode: 'HTML', 
            link_preview_options: {
                is_disabled: true
            },
        });

    }

}