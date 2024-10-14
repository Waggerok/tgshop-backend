const webAppUrl = 'https://telegram-store.netlify.app';

module.exports = {
    startCommand : (bot,msg) => {
        const chatId = msg.chat.id;
    
        bot.sendMessage(chatId,'Ниже появится кнопка для входа в наш магазин', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Открыть магазин', web_app: {url : webAppUrl}}]
                ]
            }
        });
    }
}