const EventType = require('../models').EventType;

/**
 *
 */
module.exports = {

  list: async (req, res) => {
    let event_types = await EventType.findAll()
    res.json(event_types)
  },

}
