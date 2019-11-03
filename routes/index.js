var express = require('express');
var router = express.Router();
const dbFn = require('./db')

/* GET home page. */
router.get('/list', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  const db = dbFn()
  const page = +req.query.page || 0
  const size = +req.query.size || 10
  // res.send()git 
  const word = `select title, keyword, str from list limit ${page * size},${size};`
  db.query(word, function (err, data, fields) {
    if (err) {
      return res.send(err)
    }
    console.log(data)
    res.send(data)
  })
});

module.exports = router;
