const express = require('express');
const { sequelize } = require('./models');
const crud = require('./routes/crud');
const path = require('path');
const cors = require('cors');

var corsOptions = {
    origin: 'http://192.168.0.143:8000',
    optionsSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions))
app.use('/api', crud);

app.use(express.static(path.join(__dirname, 'static')));
app.get('/', (req, res) => {
    res.sendFile('index.html');
});



app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});