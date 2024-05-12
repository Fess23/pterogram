import { pteroClient } from "../../../app.js";


export async function runAction(ctx, chatId, message_id, serviceId){
    const status = await pteroClient.getServerStatus(serviceId);
    console.log(status)
    if(status != "offline"){
        pteroClient.startServer(serviceId)
        ctx.reply(
            `✅Задача выполнена успешно` +
            `\n` +
            `\n❕Сервер запущен!`
        )
    } else {
        ctx.reply(
            `🛑 Задача выполнена не успешно` +
            `\n` +
            `\n❕Сервер не может быть перезапущен, когда он находится в выключеном состоянии!`
        )
    }
    
} 