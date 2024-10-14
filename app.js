//Imports
require('./bot/bot');
const express = require('express');
const fs = require('fs');
const sequelize = require('./data/database');
const models = require('./models/models');
const userRouter = require('./routes/userRouter');

//Variables
const app = express();
const PORT = process.env.PORT || 5000;

//App
app.use(express.json());
app.use('/api/user', userRouter);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    } catch (e){
        console.log(e);
    }
}

start();