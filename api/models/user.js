'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10))
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'user',
  })

  User.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }

  User.associate = (models) => {
    User.hasOne(models.Role, {
      foreignKey: "id",
      sourceKey: "roleId",
      as: "role",
    })
  }

  return User

}
