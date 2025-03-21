import { IUser } from "../../../entities/User";
import { ExplorerManager } from "../../../services/explorers/ExplorerManager";
import { UserManager } from "../../UserManager";
import { TgMessage } from "../BotManager";
import { BotHelper, Message } from "./BotHelper";

export class BotStartHelper extends BotHelper {

    constructor() {
        console.log('BotStartHelper', 'constructor');

        const replyMessage: Message = {
            text: ''
        };

        super('start', replyMessage);
    }

    async commandReceived(ctx: any, user: IUser) {
        console.log('Start', 'commandReceived', 'user:', user);

        const wallet = user.wallet;
        ctx.reply(`Hey, it's TipMe!\n\nI can send tokens to anyone on Sonic SVM. Fund your wallet with your treasury tokens and some SOL to cover gas fees.\n\nYou wallet public key:\n<code>${wallet.publicKey}</code> (Tap to copy)`, {
            parse_mode: 'HTML', 
            link_preview_options: {
                is_disabled: true
            },
        });

    }

    async messageReceived(message: TgMessage, ctx: any){
        console.log('BotStartHelper', 'messageReceived', message.text, 'ctx.match:', ctx.match);

        super.messageReceived(message, ctx);
    }

}