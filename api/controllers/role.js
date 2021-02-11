const db = require('../models')
const Role = db.Role

/**
 *
 */
module.exports = {

  list: async (req, res) => {
    let roles = await Role.findAll({})
    res.json(roles)
  },

}
