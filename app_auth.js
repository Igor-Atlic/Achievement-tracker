const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Joi = require('joi');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});
app.post('/register', (req, res) => {

    /*const schema = Joi.object().keys({
        
        email: Joi.string().email().required(),
        permission: Joi.string().required(),
        password: Joi.string().required().min(4),
        username: Joi.string().min(4).max(24).required().alphanum()
    })*/
    const obj = {
        username: req.body.username,
        email: req.body.email,
        permission: req.body.permission,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    /*let {error} = Joi.validate(req.body,schema);
    console.log("eeeeeeeeeeeee")
    console.log(error)
    if (error){res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data
      });}else{*/
        Users.create(obj).then( rows => {
    
            const usr = {
                userId: rows.id,
                username: rows.username
                
            };
    
            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
    
            console.log(token);
            
            res.json({ token: token });
    
        }).catch( err => res.status(500).json(err) );
      //}
            
        
        
        
    })
    
//});

app.post('/login', (req, res) => {

    Users.findOne({ where: { username: req.body.username } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    username: usr.username,
                    
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});