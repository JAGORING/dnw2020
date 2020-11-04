const express = require('express');

const router = express.Router();




router.get('/clothes', (req, res) => {
    res.render('clothes', { title: '옷장 - Danawa' });
  });