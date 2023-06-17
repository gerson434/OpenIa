const {addKeyword } = require("@bot-whatsapp/bot")


const flowPrincipal = addKeyword('oe')
    .addAnswer('🙌 hola buenos dias bienvenido a tu tienda de garabatos *')
    .addAnswer(
        [
            'elije las opciones',
            '*1.* Quiero contactarme con la la profe *',

            
        ]
    )
    .addAnswer('Responde Con el numero de la opcion!')

    module.exports = flowPrincipal