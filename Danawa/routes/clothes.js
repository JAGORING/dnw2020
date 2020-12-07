const express = require('express');
const router = express.Router();
require('express-session');
const cloth = require('../schemas/cloth');



router.get('/', function(req, res, next) {
  cloth.find({}, function (err, a) {
      console.log("옷 불러올 수 있나?", a);
      res.render('clothes');
      
  });
});


router.post('/addItem', (req, res) => {

  const post = new cloth({
    part : req.body.part,
    cate : req.body.cate,
    color : req.body.color,
    season : req.body.season,
    pattern : req.body.pattern,
    solid : req.body.solid,
    texture : req.body.texture,
    brand : req.body.brand,
    descript : req.body.descript
  });
  post
      .save()
      .then(result => {
          console.log(result);
          res.redirect('/clothes');
      })
      .catch(err => {
          console.log(err);
          res.redirect('/clothes');
      });
});


module.exports = router;
