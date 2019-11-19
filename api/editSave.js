const path = require('path')
const express = require('express');
const router = express.Router();
const fs = require('fs');
const formidable = require("formidable");

/* GET home page. */
router.post('/', function(req, res, next) {
  const token = req.headers.token
  // console.log(token)
  // console.log(global.token)
  if (!global.token[token]) {
    res.send('无权限')
    return
  }
  var form = new formidable.IncomingForm();
  var uploadDir = path.join(__dirname, '../static');
  // console.log(uploadDir)
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  form.uploadDir = uploadDir
  let names = []
  form.parse(req, function(err, fields, files) {
    // console.log(fields)
    for(i in files){
      (function(){
        var oldname = files[i].path
        var newname = files[i].name === 'blob' ? oldname+'.xml' : oldname+"."+files[i].name.split('.')[1]
        names.push(newname)
        fs.rename(oldname,newname,function(err){
          if(err) console.log(err)
          // console.log('newname', newname)
        })
      })(i)
    }
    let {
      str,
      keyword,
      title,
      id,
      delImgs,
    } = fields
    delImgs = JSON.parse(delImgs || '[]')
    let imgs = Object.getOwnPropertyNames(files).filter(v => v !== 'str')
    imgs = imgs.map(v => files[v].path.replace(path.join(__dirname, '../'), '\\'))
    imgs.forEach( (v, i) => {
      str = str.replace(/str.replace,jiangji123/, names[i])
    })
    const currentPath = path.join(__dirname, '../')
    while (str.indexOf(currentPath) !== -1) {
      str = str.replace(currentPath, '.\\')
    }
    const db = dbFn()
    // console.log(str)
    str = str.replace(/\\(?!\\)/g, '\\\\')
    // console.log(str)
    let word = `insert into list (keyword, title, str) values ('${keyword}', '${title}', '${str}');`
    if (id) {
      word = `update list set keyword='${keyword}',title='${title}',str='${str}' where id=${id};`
    }
    db.query(word, function (err, data, fields) {
      if (err) {
        console.log('err', err)
        return res.send(err)
      }
      setTimeout(() => {
        delImgs.forEach(v => {
          const url = path.join(__dirname, '.' + v)
          if (fs.existsSync(url)) {
            // console.log(url)
            fs.unlinkSync(url)
          }
        })
      }, 0);
      res.send({
        success: true,
        str
      })
    })
  })

});

module.exports = router;
