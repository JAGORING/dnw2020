const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/single', (req, res) => {
  res.render('single', { title: '싱글페이지 - Danawa' });
});


module.exports = router;