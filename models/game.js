'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Achievement}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'developer'});
      this.hasMany(Achievement, { foreignKey: 'gameId', as: 'achievements', onDelete: 'cascade', hooks: true});
      
    }
  }
  Game.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};