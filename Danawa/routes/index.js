const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
  res.render('index', { title: '메인페이지 - Danawa' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: '로그인 - Danawa' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: '가입페이지 - Danawa' });
  
});
router.get('/search', (req, res) => {
  res.render('search', { title: '검색페이지 - Danawa' });
  
});

// GET /user 라우터
router.get('/single', (req, res) => {
  res.render('single', { title: '싱글페이지 - Danawa' });
});

router.get('/weather', (req, res) => {
  res.render('weather', { title: '날씨추천페이지 - Danawa' });
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


module.exports = router;