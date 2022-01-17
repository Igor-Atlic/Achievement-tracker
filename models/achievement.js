'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comment,Users,Game}) {
      // define association here
      this.hasMany(Comment, { foreignKey: 'achievementId', as: 'comments'});
      this.belongsToMany(Users, { through:'User_Achievement', as: "users", foreignKey: "achievementId"});
      this.belongsTo(Game, {foreignKey: 'gameId', as: 'game'});
    }
  }
  Achievement.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        max:24,
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