const express = require('express');
const router = express.Router();
const Board = require('../schemas/board');
require('express-session');
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


// 누가봐도 게시판
router.get('/', async function(req, res) {
  let page = Math.max(1, parseInt(req.query.page));
  let limit = Math.max(1, parseInt(req.query.limit));
  page = !isNaN(page)?page:1;                        
  limit = !isNaN(limit)?limit:5;                    

  let skip = (page-1)*limit;
  let count = await Board.countDocuments({}); 
  let maxPage = Math.ceil(count/limit); 
  let boards = await Board.find({}) 
    .skip(skip)   
    .limit(limit) 
    .exec();

  res.render('bindex', {
    
    a:boards,
    currentPage:page, 
    maxPage:maxPage,  
    limit:limit       
  });
  console.log("뭐 들어오는거 있느?" , session)
});




module.exports = router;




