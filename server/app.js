//Imports
require('./bot/bot');
const express = require('express');
const fs = require('fs');
const sequelize = require('./data/database');
const models = require('./models/models');
const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const deviceRouter = require('./routes/deviceRouter');
const basketRouter = require('./routes/basketRouter');
const path = require('path');

//Variables
const app = express();
const PORT = process.env.PORT || 5000;

//App
app.use(express.json());
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use('/uploads/models', express.static(path.join(__dirname, 'uploads/models')));

app.use('/api/user', userRouter);
app.use('/api', orderRouter);
app.use('/api/devices', deviceRouter);
app.use('/api/basket', basketRouter);

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