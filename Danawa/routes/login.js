const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { title: '로그인 - Danawa' });
  });
// GET / 라우터

module.exports = router;