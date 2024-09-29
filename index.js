//Main imports
require('dotenv').config();


//Variables
const TelegramBot = require('node-telegram-bot-api');
const sequelize = require('./database');
const webAppUrl = 'https://google.com';
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

//Bot controlling
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId,'Ниже появиться кнопка для входа в наш магазин', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Открыть магазин', web_app: {url: webAppUrl}}]
                ]
            }
        });
    };
});