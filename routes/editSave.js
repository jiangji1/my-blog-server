const path = require('path')
const express = require('express');
const router = express.Router();
const dbFn = require('./db')
const fs = require('fs');
const formidable = require("formidable");

/* GET home page. */
router.post('/', function(req, res, next) {

  var form = new formidable.IncomingForm();
  var uploadDir = path.normalize(__dirname+'/'+"../avatar");
  form.uploadDir = uploadDir
  form.parse(req, function(err, fields, files) {
    for(item in files){
      (function(){
        var oldname = files[item].path
        var newname = files[item].name === 'blob' ? oldname+'.xml' : oldname+"."+files[item].name.split('.')[1]
        fs.rename(oldname,newname,function(err){
          if(err) console.log(err)
          console.log('修改成功')
        })
      })(item)
    }
    console.log({fields: fields, files: files})
    res.send('2')
  })

  // const db = dbFn()
  // const page = 0 || 0
  // const size = -1 || -1
  // const word = `select * from list limit ${page * size},${size};`
  // db.query(word, function (err, data, fields) {
  //   if (err) {
  //     return res.send(err)
  //   }
  //   console.log(data)
  //   res.send(data)
  // })
});

module.exports = router;
