var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  const {
    id,
  } = req.body
  const {
    token
  } = req.headers
  if (global.token[token] !== true) {
    res.send({
      success: false,
      msg: '无权限',
    })
    return
  }
  const db = dbFn()
  const word = `delete from list where id=${id};`
  db.query(word, function (err, data, fields) {
    if (err) {
      return res.send(err)
    }
    res.send({
      success: true,
    })
  })
});

module.exports = router;
