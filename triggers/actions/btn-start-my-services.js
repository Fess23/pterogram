import { pteroClient } from "../../app.js";
import { slicePerChunkArray } from "../../app/utils.js";
import { toStringObject } from "../../app/utils.js";
export async function runAction(ctx, chatId, message_id){
    const serversResponceData = await pteroClient.getAllServers();
    
    let servers = [];


    for (let x in serversResponceData.data){
        let object = {
            text: `${serversResponceData.data[x].attributes.name}`,
            callback_data: toStringObject("btn-service/btn-service", serversResponceData.data[x].attributes.identifier)
        }
        servers.push(object)
    }

    var slicedArray = slicePerChunkArray(servers, 3);

    console.log(chatId + " " + message_id)
    
    await ctx.editMessageText("Server2", {
        chat_id: chatId,
        message_id: message_id,
        reply_markup: {
            inline_keyboard: slicedArray
        }
    });
}