//Imports
require('./bot/bot');
const express = require('express');
const fs = require('fs');
const sequelize = require('./data/database');
const models = require('./models/models');

//Variables
const app = express();
const PORT = process.env.PORT || 5000;

//App

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    } catch (e){
        console.log(e);
    }
}


app.get('/', (req,res) => {
    fs.readFile('./data/users.json', (err,data) => {
        if (err) {
            return console.log(err);
        }
        res.send(`<p>\n${data}</p>`)
    });
});


start();