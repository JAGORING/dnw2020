const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/signup', (req, res) => {
  res.render('signup', { title: '회원가입 - Danawa' });
});


module.exports = router;