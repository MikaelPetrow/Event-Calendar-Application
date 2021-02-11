'use strict';

module.exports = (sequelize, DataTypes) => {

  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'role'
  })

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      as: "users",
      foreignKey : 'roleId'
    })
  }

  return Role

}
