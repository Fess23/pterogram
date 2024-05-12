import { config } from '../../app.js'
import { toStringObject } from '../../app/utils.js';
export async function runCommand(ctx, chatId, message_id){
    await ctx.editMessageText("Hi there!",{
        chat_id: chatId,
        message_id: message_id,
        reply_markup: {
            inline_keyboard: [
                /* Inline buttons. 2 side-by-side */
                [ { text: "Мои услуги", callback_data: `${toStringObject("btn-start-my-services", "")}` }, { text: "Мой кабинет", callback_data: `${toStringObject("btn-start-my-cabinet", "")}` } ],

                /* One button */
                [ { text: "Команды", callback_data: `${toStringObject("btn-start-commands", "")}` }, { text: "На сайт", url: config.pterodactyl.hostingUrl } ]
            ]
        }
    });
}
