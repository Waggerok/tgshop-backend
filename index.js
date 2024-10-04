//Main imports
require('dotenv').config();
const express = require('express');

//Variables
const TelegramBot = require('node-telegram-bot-api');
const sequelize = require('./database');
const webAppUrl = 'https://telegram-store.netlify.app';
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

//App

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
    } catch(e) {
        console.log(e);
    }
}

start();

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