const express = require('express');

const router = express.Router();


router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/', (req, res) => {
  res.render('index', { title: '메인페이지 - Danawa' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: '로그인 - Danawa' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: '회원가입 - Danawa' });
});

// GET /user 라우터
router.get('/single', (req, res) => {
  res.render('single', { title: '싱글페이지 - Danawa' });
});

router.get('/clothes', (req, res) => {
  res.render('clothes', { title: '옷장 - Danawa' });
});

module.exports = router;