import { pteroClient } from "../../../app.js";


export async function runAction(ctx, chatId, message_id, serviceId){
    const status = await pteroClient.getServerStatus(serviceId);
    console.log(status)
    if(status != "running"){
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
            `\n❕Сервер не может быть запущен, когда он находится в запущеном состоянии!`
        )
    }
    
} 