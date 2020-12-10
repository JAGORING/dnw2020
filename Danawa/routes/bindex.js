const express = require('express');
const router = express.Router();
const Board = require('../schemas/board');

// 주소는 섞이면 안됨
 
router.post('/write/writeContents', (req, res) => {
    const board = new Board();
    board.title = req.body.title;
    board.contents = req.body.contents;
    board.author = req.body.author;
    
    board.save(err => {
        if(err){
            console.log(err);
            res.redirect('/bindex');
        }
        res.redirect('/bindex');
    });
}); 

// app.js 라우터 추가 기본경로
// index 하나 추가후 bindex 연결

//글 쓰기 페이지 이동
// bindex에서 넘어가도록 write 가

router.get('/write/writeContents', function (req, res) {
    var board = new Board();
    board.title = req.body.title;
    board.contents = req.body.contents;
    board.author = req.body.author;
    board.numId = req.body.numId;
    board.views = req.body.views;

    board.save(function (err) {
      if(err){
        console.log(err);
        res.redirect('/bindex');
      }
      res.redirect('/bindex');
    });
  });


//메인 페이지
router.get('/', function(req, res, next) {
    Board.find({}, function (err, a) {
        res.render('bindex', {a});
    });
  });


module.exports = router;




