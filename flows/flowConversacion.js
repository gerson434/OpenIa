const { addKeyword, addAction,} = require('@bot-whatsapp/bot');
const { readFileSync } = require('fs');
const { join } = require('path');
const ChatGPTClass = require('../chatgpt.class');
const delay = (ms) => Promise((res => setTimeout(res, ms)))

/**
 * Recuperamos el promt 
 */
const getPrompt = async () => {
    const pathPromp = join(process.cwd(), "promps");
    const text = readFileSync(join(pathPromp, "prompt.txt"));
    return text;
};

/**
 * Esportamos
 * @param {*} ChatGPTClass
 * @returns
 */

module.exports = {
    flowConversacion: (ChatGPTClass) => {
        return addKeyword("1", {
            sensitive: true,
        })
        .addAction(async (ctx, {endFlow, flowDynamic, provider})=> {
        const data = await getPrompt();
        await ChatGPTClass.handleMsgChatGPT(data);
        const textFromAI = await ChatGPTClass.handleMsgChatGPT(
            'hola'
        );
        await flowDynamic(textFromAI.text);
       
        })
        .addAnswer(
            'Tienes otra duda?' + {capture: true},
            async (ctx, {fallBack}) => {
                const textFromAI = await ChatGPTClass.handleMsgChatGPT(ctx.body);
            }
        )
        
    }
}
