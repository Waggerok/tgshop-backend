//Imports
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const handlers = require('./handlers');
const userController = require('../controllers/userController');

//Varivables
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling : true});

//Functionality
bot.on('message',(msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const userName = msg.from.username;
    userController.authorizeUser(userName);
    if (text === '/start') {
        handlers.startCommand(bot,msg);
    } else {
        bot.sendMessage(chatId, 'Привет, пропиши /start и появиться дальнейшая инструкция по входу в наш магазин!')
    }
})

module.exports = bot;