var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const db = dbFn()
  const page = +req.query.page || 0
  const size = +req.query.size || 10
  const word = `select id, title, keyword from list limit ${page * size},${size};`
  db.query(word, function (err, data, fields) {
    if (err) {
      return res.send(err)
    }
    res.send({
      list: data,
      power: global.token[token] && 'all',
    })
  })
});

module.exports = router;
