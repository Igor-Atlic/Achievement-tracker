'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Achievement}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(Achievement, {foreignKey: 'achievementId', as: 'achievement'});
    }
  }
  Comment.init({
    text: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate:{
        min:1
      }
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};