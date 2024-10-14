//Imports
require('./bot/bot');
const express = require('express');
const fs = require('fs');

//Variables
const app = express();
const PORT = process.env.PORT || 5000;

//App
app.get('/', (req,res) => {
    fs.readFile('./data/users.json', (err,data) => {
        if (err) {
            return console.log(err);
        }
        res.send(`<p>\n${data}</p>`)
    });
})

app.listen(PORT);