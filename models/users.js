'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    
    static associate({Achievement,Comment,Game}) {
      // define association here
      this.belongsToMany(Achievement, { through:"User_Achievement",as: "achievements",foreignKey: "userId",onDelete: 'cascade', hooks: true });
      this.hasMany(Comment, { foreignKey: 'userId', as: 'comments'});
      this.hasMany(Game, { foreignKey: 'userId', as: 'games', onDelete: 'cascade', hooks: true});
    }
  }
  Users.init({
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isAlphanumeric:{
          msg: "username dozvoljava samo slova i brojeve"
        },
        max:24,
        min:4
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Nije email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        min:4
      }
    },
    permission: {
      type:DataTypes.STRING,
      validate:{
        isIn: {
          args: [['admin', 'dev', 'user']],
          msg: "Nije dat dobar permission"
        }
      }
    }
  }, {
    sequelize,
    defaultScope: {
      attributes: { exlude: ['password'] }
    },
    modelName: 'Users',
  });
  return Users;
};