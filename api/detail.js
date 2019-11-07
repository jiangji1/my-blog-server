var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const db = dbFn()
  const id = +req.query.id || 0
  const word = `select id, title, keyword, str from list where id = ${id};`
  db.query(word, function (err, data, fields) {
    if (err) {
      return res.send(err)
    }
    // console.log(data)
    res.send(data)
  })
});

module.exports = router;
