const { sequelize, Users, Comment,Game, Achievement,User_Achievement } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/users', (req, res) => {

    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/user/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/user', (req, res) => {
    
    Users.create({ username: req.body.username, email: req.body.email, password: req.body.password, permission: req.body.permission })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/user/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.username = req.body.username;
            usr.email = req.body.email;
            usr.password = req.body.password;
            usr.permission = req.body.permission;
            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/user/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/achievements', (req, res) => {

    Achievement.findAll({include: ['game'],})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/achievement/:id', (req, res) => {

    Achievement.findOne({ where: { id: req.params.id } , include: ['game']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/achievement', (req, res) => {
    
    Achievement.create({ name: req.body.name, text: req.body.text, finished: req.body.finished, gameId:req.body.gameId })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/achievement/:id', (req, res) => {
    
    Achievement.findOne({ where: { id: req.params.id }, include: ['game'] })
        .then( ach => {
            ach.name = req.body.name;
            ach.text = req.body.text;
            ach.finished = req.body.finished;
            ach.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/achievement/:id', (req, res) => {

    Achievement.findOne({ where: { id: req.params.id }, include: ['game'] })
        .then( ach => {
            ach.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/games', (req, res) => {

    Game.findAll({include:['developer']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/game/:id', (req, res) => {

    Game.findOne({ where: { id: req.params.id } , include:['developer']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/game', (req, res) => {
    
    Game.create({ name: req.body.name, userId: req.body.userId})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/game/:id', (req, res) => {
    
    Game.findOne({ where: { id: req.params.id } ,include:['developer']})
        .then( game => {
            game.name = req.body.name;
            game.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/game/:id', (req, res) => {

    Game.findOne({ where: { id: req.params.id }, include:['developer'] })
        .then( game => {
            game.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/comments', (req, res) => {

    Comment.findAll({include:['user', 'achievement']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/comment/:id', (req, res) => {

    Comment.findOne({ where: { id: req.params.id }, include:['user', 'achievement'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/comment', (req, res) => {
    
    Comment.create({ text: req.body.text, category: req.body.category, userId: req.body.userId, achievementId: req.body.achievementId })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/comment/:id', (req, res) => {
    
    Comment.findOne({ where: { id: req.params.id } ,include:['user', 'achievement']})
        .then( com => {
            com.text = req.body.text;
            com.category = req.body.category;
            
            com.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/comment/:id', (req, res) => {

    Comment.findOne({ where: { id: req.params.id } ,include:[ 'users', 'achievement']})
        .then( com => {
            com.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/users_achievements', (req, res) => {

    User_Achievement.findAll({include:[ Users, Achievement]})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/user_achievement/:id', (req, res) => {

    User_Achievement.findOne({ where: { id: req.params.id }, include:[ Users, Achievement] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/user_achievement', (req, res) => {
    
    User_Achievement.create({ userId: req.body.userId, achievementId: req.body.achievementId })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/user_achievement/:id', (req, res) => {
    
    User_Achievement.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.userId = req.body.userId;
            usr.achievementId = req.body.achievementId;
            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/user_achievement/:id', (req, res) => {

    User_Achievement.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;