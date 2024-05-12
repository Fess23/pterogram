import { pteroClient } from "../../app.js";
import { toStringObject } from "../../app/utils.js";
export async function runAction(ctx, chatId, message_id){
    const accountDetails = await pteroClient.getAccountDetails();
    const servicesData = await pteroClient.getAllServers();

    console.log(accountDetails)
    await ctx.editMessageText(
        `👤 #${accountDetails.id} ${accountDetails.username}` +
        `\n🌐 Администратор: ${accountDetails.admin == true ? `Да` : `Нет`}` +
        `\n` +
        `\n📪 Почта: ${accountDetails.email}` +
        `\n🪪 Имя Фамилия: ${accountDetails.first_name} ${accountDetails.last_name}`+
        `\n` +
        `\n 🖥 Услуг: ${servicesData.data.length}`, {
        chat_id: chatId,
        message_id: message_id,
        reply_markup: {
            inline_keyboard: [
                [ { text: "Изменить пароль", callback_data: toStringObject("btn-my-cabinet-change-password", "") }, { text: "Изменить почту", callback_data: toStringObject("btn-my-cabinet-change-email","") } ],
                [ { text: "Главное меню", callback_data: toStringObject("btn-main-menu","") } ]
            ]
            
        }
    });
}