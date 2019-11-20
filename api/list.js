var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const token = req.headers.token
  if (!global.token[token]) {
    res.send('无权限')
    return
  }
  const db = dbFn()
  const page = +req.query.page || 0
  const size = +req.query.size || 10
  const word = `select id, title, keyword from list limit ${page * size},${size};`
  db.query(word, function (err, data, fields) {
    if (err) {
      return res.send(err)
    }
    console.log(data)
    if (global.token[token]) {
      res.send({
        list: data,
        power: 'all'
      })
      return
    }
    res.send({
      list: data
    })
  })
});

module.exports = router;
