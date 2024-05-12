import { pteroClient } from "../../app.js";
import { toStringObject } from "../../app/utils.js";

export async function runAction(ctx, chatId, message_id){
    const accountDetails = await pteroClient.getAccountDetails();
    console.log(accountDetails)
    await ctx.editMessageText(
        `👤 Введите текущий пароль: `, {
        chat_id: chatId,
        message_id: message_id,
        reply_markup: {
            inline_keyboard: [
                [ { text: "Главное меню", callback_data: "btn-start-main-menu" } ]
            ]
        }
    });
    console.log(waitMessage());
}