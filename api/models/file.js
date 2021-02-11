'use strict';

module.exports = (sequelize, DataTypes) => {

  const File = sequelize.define('File', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'file'
  })

  File.associate = (models) => {
    File.hasOne(models.Event, {
      foreignKey: "id",
      sourceKey: "eventId",
      as: "event",
    })
  }

  return File

}
