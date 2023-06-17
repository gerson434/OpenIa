require('dotenv').config()
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const MockAdapter = require('@bot-whatsapp/database/mock')
const BaileysProvider = require('@bot-whatsapp/provider/baileys');



/**
 * ChatGpt
 */
const ChatGPTClass = require('./chatgpt.class')
const ChatGPT = new ChatGPTClass()

/**
 * FLows
 */
const flowPrincipal = require("./flows/flowPrincipal")
const {flowConversacion} = require("./flows/flowConversacion")




/**
 * Funcion Principal
 */
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([
        flowPrincipal, 
        flowConversacion(ChatGPT) ])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
