var express = require('express');
var router = express.Router();
const dbFn = require('./db')

/* GET home page. */
router.get('/list', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  const db = dbFn()
  const page = 0 || 0
  const size = -1 || -1
  const word = `select * from list limit ${page * size},${size};`
  db.query(word, function (err, data, fields) {
    if (err) {
      return res.send(err)
    }
    console.log(data)
    res.send(data)
  })
});

module.exports = router;
