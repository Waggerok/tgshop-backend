const fs = require('fs');
const path = require('path');

const users_file = path.join(__dirname, '../data/users.json');

const readUsers = () => {
    if (!fs.existsSync(users_file)) {
        console.log('Файл не найден')
        return {};
    }
    const rawData = fs.readFileSync(users_file);
    return JSON.parse(rawData);
};

const writeUsers = (users) => {
    const data = JSON.stringify(users,null,2);
    fs.writeFileSync(users_file,data);
    console.log('Данные успешно записаны в файл')
};

const authorizeUser = (telegramId,role) => {
    let users = readUsers();
    role = 'user';
    if(!users[telegramId]) {
        users[telegramId] = {
            telegramId: telegramId,
            authorized_at : new Date().toISOString(),
            role : role,
        };
        writeUsers(users);
        console.log(`Пользователь с telegram_id : ${telegramId} успешно авторизован`)
    } else {
        console.log(`Пользователь с telegram_id: ${telegramId} уже существует в системе`)
    }
}

module.exports = {
    authorizeUser
};