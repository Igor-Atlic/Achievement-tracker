const { sequelize, Users, Comment,Game, Achievement,User_Achievement } = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const sema = Joi.object().keys({
    username: Joi.string().trim().min(3).max(24).required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    permission: Joi.string().required()
});

const sema1 = Joi.object().keys({
    name: Joi.string().trim().min(3).max(52).required(),
    text: Joi.string().required().max(2048),
    gameId:Joi.number().required()

});

const sema2 = Joi.object().keys({
    name: Joi.string().trim().min(3).max(52).required(),
    userId:Joi.number().required()

});


function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/currentUser', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
    Users.findOne({ where: { id: req.user.userId } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
    
});

route.get('/users', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
    
});

route.get('/user/:id', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );

});

route.post('/user', (req, res) => {
    
    let {error} = sema.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    else {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
                
    Users.create({ username: req.body.username, email: req.body.email, password: bcrypt.hashSync(req.body.password, 10), permission: req.body.permission })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );

}});

route.put('/user/:id', (req, res) => {
    let {error} = sema.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    else {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
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
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );}

});

route.delete('/user/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
});

route.get('/achievements', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Achievement.findAll({include: ['game'],})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
    
});

route.get('/achievement/:id', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Achievement.findOne({ where: { id: req.params.id } , include: ['game']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );

});

route.post('/achievement', (req, res) => {
    let {error} = sema1.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    else {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
    Achievement.create({ name: req.body.name, text: req.body.text,gameId:req.body.gameId })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );}

});

route.put('/achievement/:id', (req, res) => {
    let {error} = sema1.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    else {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
    Achievement.findOne({ where: { id: req.params.id }, include: ['game'] })
        .then( ach => {
            ach.name = req.body.name;
            ach.text = req.body.text;
            ach.gameId = req.body.gameId
            ach.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );}

});

route.delete('/achievement/:id', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Achievement.findOne({ where: { id: req.params.id }, include: ['game'] })
        .then( ach => {
            ach.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
});

route.get('/games', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Game.findAll({include:['developer']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
    
});

route.get('/game/:id', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Game.findOne({ where: { id: req.params.id } , include:['developer']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );

});

route.post('/game', (req, res) => {
    let {error} = sema2.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    else {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
    Game.create({ name: req.body.name, userId: req.body.userId})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );}

});

route.put('/game/:id', (req, res) => {
    let {error} = sema2.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    else {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
    Game.findOne({ where: { id: req.params.id } ,include:['developer']})
        .then( game => {
            game.userId = req.body.userId;
            game.name = req.body.name;
            game.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );}

});

route.delete('/game/:id', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Game.findOne({ where: { id: req.params.id }, include:['developer'] })
        .then( game => {
            game.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
});

route.get('/comments', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Comment.findAll({include:['user', 'achievement']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
    
});

route.get('/comment/:id', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Comment.findOne({ where: { id: req.params.id }, include:['user', 'achievement'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );

});

route.post('/comment', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
    Comment.create({ text: req.body.text, category: req.body.category, userId: req.body.userId, achievementId: req.body.achievementId })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );

});

route.put('/comment/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
    Comment.findOne({ where: { id: req.params.id } ,include:['user', 'achievement']})
        .then( com => {
            com.text = req.body.text;
            com.category = req.body.category;
            com.userId = req.body.userId;
            com.achievementId = req.body.achievementId;
            com.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );

});

route.delete('/comment/:id', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    Comment.findOne({ where: { id: req.params.id } ,include:[ 'users', 'achievement']})
        .then( com => {
            com.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
});

route.get('/users_achievements', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    User_Achievement.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
    
});

route.get('/user_achievement/:userId/:achievementId', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
    User_Achievement.findOne({ where: { userId: req.params.userId, achievementId: req.params.achievementId } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );

});

route.post('/user_achievement', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
    User_Achievement.create({ userId: req.body.userId, achievementId: req.body.achievementId, finished: req.body.finished })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );

});

route.put('/user_achievement/:userId/:achievementId', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.permission === "admin") {
    User_Achievement.findOne({ where: { userId: req.params.userId, achievementId: req.params.achievementId  } })
        .then( usr => {
            usr.userId = req.body.userId;
            usr.achievementId = req.body.achievementId;
            usr.finished= req.body.finished
            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );

});

route.delete('/user_achievement/:userId/:achievementId', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.permission === "admin") {
            
    User_Achievement.findOne({ where: {  userId: req.params.userId, achievementId: req.params.achievementId } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );} else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
});

module.exports = route;