import { pteroClient } from "../../../app.js";
import { convertToMb } from "../../../app/utils.js";
import { convertToHms } from "../../../app/utils.js";
import { toStringObject } from "../../../app/utils.js";

export async function runAction(ctx, chatId, message_id, serviceId, status1){
    const data = await pteroClient.getServerDetails(serviceId)
    const status = await pteroClient.getServerStatus(serviceId)
    const serverUsage = await pteroClient.getServerUsages(serviceId)
    console.log(data)
    console.log(serverUsage)
    try{
        await ctx.editMessageText(
            `🖥 ${data.name}, (${serviceId})` +
            `\n🌐 IP-адрес: ${data.relationships.allocations.data[0].attributes.ip}:${data.relationships.allocations.data[0].attributes.port}` +
            `\n` +
            `\n💡 Статус: ${status=="running" ? `Запущен (💚)` : `Выключен (🖤)`}` +
            `\n⏱ UPTime: ${convertToHms(serverUsage.resources.uptime)}` +
            `\n` +
            `\n⚙️CPU: ${serverUsage.resources.cpu_absolute} / ${data.limits.cpu}%` +
            `\n💾RAM: ${convertToMb(serverUsage.resources.memory_bytes)} MB / ${data.limits.memory}MB` +
            `\n📀DISK: ${convertToMb(serverUsage.resources.disk_bytes)} MB / ${data.limits.disk}MB`, {
            chat_id: chatId,
            message_id: message_id,
            reply_markup: {
                inline_keyboard: 
                [                
                    [ { text: "▶️ Запустить", callback_data: toStringObject("btn-service/btn-service-start", serviceId) }, { text: "⏸ Выключить", callback_data: toStringObject("btn-service/btn-service-stop", serviceId) }, { text: "🔄 Перезагрузить", callback_data: toStringObject("btn-service/btn-service-restart", serviceId) } ],
                    [ { text: "🛜 Обновить информацию", callback_data: toStringObject("btn-service/btn-service", serviceId)}],
                    [ { text: "Главное меню", callback_data: toStringObject("btn-main-menu", "") } ]
                ]
            }
        });
    } catch(e){
        console.log(e);
    }
}
