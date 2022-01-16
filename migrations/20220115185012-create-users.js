'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
          isAlphanumeric:{
            msg: "Password dozvoljava samo slova i brojeve"
          },
          max:24,
          min:4
        }
      },
      permission: {
        type:DataTypes.STRING,
        validate:{
          isIn: {
            args: [['admin', 'developer', 'user']],
            msg: "Nije dat dobar permission"
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Users');
  }
};