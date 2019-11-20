var express = require('express');
var router = express.Router();
var md5=require("md5")

router.post('/', function(req, res, next) {
  const {
    user,
    pwd
  } = req.body
  const db = dbFn()
  const word = `select * from user where user='${user}' and pwd='${pwd}';`
  db.query(word, function (err, data, fields) {
    if (err || !data.length) {
      return res.send(err)
    }
    console.log(data.length)
    let token = md5(user + pwd)
    global.token[token] = true
    res.send({
      success: true,
      token
    })
  })
});

module.exports = router;
