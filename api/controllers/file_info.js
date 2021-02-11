const db = require('../models');
const File = db.File

module.exports = {

  list: async (req, res) => {
    let files = await File.findAll()
    res.json(files)
  },

  get: async (req, res) => {
    const { id } = req.params
    const fileInfo = await File.findAll({
      where: { eventId: id },
    })
    res.json(fileInfo)
  },

  delete: async (req, res, next) => {
    const { id } = req.params
    await File.findAll({
      where: { id: id },
    }).then((files) => {
      const dirs = []
      files.forEach((file, i) => {
        dirs.push(file.dir)
      })
      return req.dirs = dirs
    })
    await File.destroy({
      where: { id: id }
    })
    res.json({message:'deleted'})
    next()
  },

}