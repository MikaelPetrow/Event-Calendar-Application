const rimraf = require('rimraf');
const fs = require('fs')

module.exports = {

  get: async (req, res) => {

    var fileName = req.params.fileName

    var options = {
      root: require('path').resolve('files'),
    }

    res.sendFile(fileName, options, function (err) {
      if(err){
        next(err)
      } else {
        console.log('Sent:', fileName)
      }
    })

  },

  delete: async (req, res) => {
    req.dirs.forEach((dir, i) => {
      fs.unlink(dir, function(err) {
        if (err) throw err;
        else console.log('file deleted');  
      });
    });
  }
}