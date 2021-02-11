const db = require('../models');
const Event = db.Event
const File = db.File
const path = require('path');
const urljoin = require('url-join');

/**
 *
 */
module.exports = {

  list: async (req, res) => {
    let events = await Event.findAll({
      include : [{
        model: db.EventType,
        as: 'eventType'
      },
      {
        model: db.User,
        as: 'user'
      }]
    })
    res.json(events)
  },

  get: async (req, res) => {
    const { id } = req.params
    const event = await Event.findOne({
      where: { id: id },
      include : [{
        model: db.EventType,
        as: 'eventType'
      }]
    })
    res.json(event)
  },

  create: async (req, res) => {
    const { title, start, end, eventTypeId, userId } = req.body
    const files = req.files
    // create
    const newEvent = await Event.create({
      title: title,
      start: start,
      end: end,
      eventTypeId: eventTypeId,
      userId: userId
    })
    // get
    const event = await Event.findOne({
      where: { id: newEvent.id },
      include: [{
        model: db.EventType,
        as: 'eventType'
      }]
    })
    // create file info
    await files.forEach((file, i) => {
      File.create({
        name: file.filename,
        url: urljoin(process.env.BASE_URL, 'files', file.filename),
        dir: path.join(require('path').resolve('files'), path.sep, file.filename),
        eventId: newEvent.id
      })
    })
    res.json(event)
  },

  update: async (req, res) => {
    const { title, start, end, eventTypeId, userId } = req.body
    const { id } = req.params
    const files = req.files
    // update
    await Event.update({
      title: title,
      start: start,
      end: end,
      eventTypeId: eventTypeId,
      userId: userId,
    }, { where: { id: id} })
    // get
    const event = await Event.findOne({
      where: { id: id },
      include: [{
        model: db.EventType,
        as: 'eventType'
      }]
    })
    // create file info
    await files.forEach((file, i) => {
      console.log(path.join(process.env.BASE_URL))
      File.create({
        name: file.filename,
        url: urljoin(process.env.BASE_URL, 'files', file.filename),
        dir: path.join(require('path').resolve('files'), path.sep, file.filename),
        eventId: id
      })
    })
    res.json(event)
  },

  delete: async (req, res, next) => {
    const { id } = req.params
    await File.findAll({
      where: { eventId: id },
    }).then((files) => {
      const dirs = []
      files.forEach((file, i) => {
        dirs.push(file.dir)
      })
      return req.dirs = dirs
    })
    await Event.destroy({
      where: { id: id }
    })
    await File.destroy({
      where: { eventId: id }
    })
    res.json({message:'deleted'})
    next();
  },
}
