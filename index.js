//Main imports
require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const sequelize = require('./database');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');

//Variables
const webAppUrl = 'https://telegram-store.netlify.app';
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
const PORT = process.env.PORT || 5000;

//App
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

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