import Nodeactyl from "nodeactyl"
import toml from 'toml';
import fs from 'fs';
import path from 'path';
import { Telegraf, session, Context, Telegram, Markup } from 'telegraf';
import { callbackQuery } from "telegraf/filters";
import { getFiles, toStringObject } from "./app/utils.js";
export var config
try {
    console.log("Configuration parsing started");
    config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'))
    console.log("Parsing of configuration is successfully")
} catch(err) {
    if(err.code === 'ENOENT'){
        console.log("Error while parsing config.toml, file not found");
    } else {
        throw err;
    } 
}
const bot = new Telegraf(config.telegram.token, {handlerTimeout: 9_000_000});
export const pteroClient = new Nodeactyl.NodeactylClient(config.pterodactyl.hostingUrl, config.pterodactyl.clientAPIKey)
bot.use(session()).launch();
var temp = [];
await getFiles("./triggers", temp)
let triggers = await temp.map((f) => {
    return {
        name: f.replace(".js", "").replace(/\\/g, "/"),
        module: import(`./${f}`)
    }
})
bot.on("callback_query", async (ctx)=>{
    const chatId = ctx.chat.id;
    const message_id = ctx.msgId;
    var serviceId = null;
    console.log("Action: " + ctx.callbackQuery.data)
    if(ctx.callbackQuery.data) {
        const obj = JSON.parse(ctx.callbackQuery.data)
        console.log(obj.name, obj.id)
        serviceId = obj.id
        let action = triggers.find((s) => s.name === `triggers/actions/${obj.name}`)
        if (action) {return (await action.module).runAction(ctx, chatId, message_id, serviceId ?? null, {
        })} else {
            await ctx.editMessageText("Callback query not found 🤔", {
                chat_id: chatId,
                message_id: message_id
            })
        }
    }
    
})
bot.on('message', async (ctx) => {
    const chatId = ctx.chat.id;
    const chatText = ctx.msg.text;
    console.log(chatId)
    await ctx.setChatMenuButton(JSON.stringify({
        type: 'web_app',
        text: '🕹️ Open pterodactyl',
        web_app: { url: config.pterodactyl.hostingUrl }
    }))
    var message_id = (await ctx.reply('🤔')).message_id;
    if(config.telegram.access){
        if(config.telegram.access.indexOf(ctx.chat.id) != -1){
            if (chatText.startsWith("/")) {
                let splitText = chatText.split(" ", 1)
                let cmd = triggers.find((c) => c.name === `triggers/commands/${splitText[0].replace("/", "")}`)
                if (cmd) {return (await cmd.module).runCommand(ctx, chatId, message_id, splitText[1] ?? null, {
                })} else {
                    await ctx.editMessageText("Command not found 🤔", {
                        chat_id: chatId,
                        message_id: message_id
                    })
                }
            } else {
                await ctx.editMessageText("Command not found 🤔", {
                    chat_id: chatId,
                    message_id: message_id
                })
            }
        } else {
            await ctx.editMessageText("Access denied 😢", {
                chat_id: chatId,
                message_id: message_id
            }) 
        }
    }    
});

    
//console.log(await pteroClient.getAllServers());