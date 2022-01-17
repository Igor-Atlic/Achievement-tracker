'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
   
    static associate({Comment,Users,Game}) {
      // define association here
      this.hasMany(Comment, { foreignKey: 'achievementId', as: 'comments'});
      this.belongsToMany(Users, { through:"User_Achievement", as: "users", foreignKey: "achievementId",onDelete: 'cascade', hooks: true });
      this.belongsTo(Game, {foreignKey: 'gameId', as: 'game'});
    }
  }
  Achievement.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        min:4
      }
      },
    text:{
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate:{
        min:1
      }
    },
    
  }, {
    sequelize,
    modelName: 'Achievement',
  });
  return Achievement;
};