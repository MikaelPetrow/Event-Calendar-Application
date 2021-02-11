const db = require('../models')
const User = db.User

/**
 *
 */
module.exports = {

  list: async (req, res) => {
    let users = await User.findAll({
      include : [{
        model: db.Role,
        as: 'role'
      }]
    })
    res.json(users)
  },

  get: async (req, res) => {
    const { id } = req.params
    const user = await User.findOne({
      where: { id: id },
      include : [{
        model: db.Role,
        as: 'role'
      }]
    })
    res.json(user)
  },

  create: async (req, res) => {
    const { username, password, roleId, firstname, lastname, visible, active } = req.body
    // create
    const newUser = await User.create({
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      roleId: roleId || 2,
      visible: visible,
      active: active,
    })
    // get
    const user = await User.findOne({
      where: { id: newUser.id },
      include : [{
        model: db.Role,
        as: 'role'
      }]
    })
    res.json(user)
  },

  update: async (req, res) => {
    const { id } = req.params
    const { username, password, roleId, firstname, lastname, visible, active } = req.body
    // update
    await User.update({
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      roleId: roleId || 2,
      visible: visible,
      active: active,
    }, { where: { id: id } })
    // get
    const user = await User.findOne({
      where: { id: id },
      include: [{
        model: db.Role,
        as: 'role'
      }]
    })
    res.json(user)
  },

  delete: async (req, res) => {
    const { id } = req.params
    await User.destroy({
      where: { id: id }
    })
    res.json({message:'deleted'})
  },

}
