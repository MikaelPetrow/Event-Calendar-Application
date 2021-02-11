'use strict';

module.exports = (sequelize, DataTypes) => {

  const EventType = sequelize.define('EventType', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'event_type'
  })

  EventType.associate = (models) => {
  }

  return EventType

}
