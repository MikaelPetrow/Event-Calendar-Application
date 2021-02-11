'use strict';

module.exports = (sequelize, DataTypes) => {

  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    end: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    eventTypeId: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'event'
  })

  Event.associate = (models) => {
    Event.hasOne(models.EventType, {
      foreignKey: "id",
      sourceKey: "eventTypeId",
      as: "eventType",
    })
    Event.hasOne(models.User, {
      foreignKey: "id",
      sourceKey: "userId",
      as: "user",
    })
    Event.hasMany(models.File, {
      as: "files",
      foreignKey : 'eventId'
    })
  }

  return Event

}
