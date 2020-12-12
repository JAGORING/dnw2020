const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const User = require('../schemas/user')
const router = express.Router();
require('express-session');

router.get('/', (req, res, next) => {
    res.send('/auth 랜더')
})
router.post('/join', async (req, res, next) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(req.body.password, salt, null, function(err, hash) {
          if (err) return next(err);       
          User.findOne({"email": req.body.useremail}, (err,user)=> {
            if(user) {
              console.log('이미 가입되어 있습니다.');
            }
            else {
                console.log("넘어온 데이터", req.body)

                console.log("username 배열 인덱스 1번", req.body.username[1])
              const user = new User({
                id: req.body.username[1],
                email: req.body.useremail,
                password: hash,
              });  
              user.save()
              console.log('유저 저장 완료', user)
            }
          })
      });
    });
    return res.redirect('/login');
}); //router.post('/join 끝


router.post("/login", (req, res) => {
  User.findOne({ id: req.body.username }, (err, user) => {
    console.log('검색')
    if (!user) {
        console.log('계정X')
      return res.redirect('/login');
    } else { 
        console.log('계정있')
      bcrypt.compare(req.body.password, user.password, (err, isM) => {
        console.log("비밀번호 확인중");
      if (!isM) {
        console.log('비밀번호가 틀렸습니다.');
        return res.redirect('/login');
      } else {
        console.log("비밀번호 맞", req.session);
        req.session.username = req.body.username;
        console.log("데이터 넣는 중", req.session);
        return req.session.save(() => {
        console.log("저장 이후", req.session); 
            res.redirect("/main");
        })  
        
      } 
    });
  }});
});

// router.get('/logout', (req, res) => {
//   console.log('삭제전: ', req.session.email);
//   req.logout();
//   req.session.destroy(); 
//   res.redirect('/');
//   console.log('삭제후: ', req.session);
// });





module.exports = router;