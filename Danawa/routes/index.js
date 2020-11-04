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



module.exports = router;