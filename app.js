const express = require('express');
const { sequelize } = require('./models');
const crud = require('./routes/crud');
const path = require('path');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', crud);

app.use(express.static(path.join(__dirname, 'static')));
app.get('/', (req, res) => {
    res.sendFile('index.html');
});



app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});