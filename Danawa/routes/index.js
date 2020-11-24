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
    res.render('signup', { title: '싱글페이지 - Danawa' });
    
});

// GET /user 라우터
router.get('/single', (req, res) => {
  res.render('single', { title: '싱글페이지 - Danawa' });
});

router.get('/bindex', (req, res) => {
  res.render('bindex', { title: '코디북 - Danawa' });
});
router.get('/board', (req, res) => {
  res.render('board', { title: '코디북 - Danawa' });
});

router.get('/update', (req, res) => {
  res.render('update', { title: '글 수정 - Danawa' });
});

router.get('/write', (req, res) => {
  res.render('write', { title: '글 등록 - Danawa' });
});

router.get('/clothes', (req, res) => {
  res.render('clothes', { title: '옷장 - Danawa' });
});

module.exports = router;