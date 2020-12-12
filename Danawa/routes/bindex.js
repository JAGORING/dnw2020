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
});



//  게시판 기능
// 게시판 자세히 보기
router.get('/board/:id', function (req, res) {
  Board.findOne({_id: req.params.id}, function (err, board) {
      res.render('board', { title: 'Board', board: board });
  })
});
// 게시판 댓글 달기
router.post('/board/comment/write/:id', (req, res) => {   
  const board = Board.findOne({_id : req.body.id});
          board.updateOne({_id : req.body.id},  { $push: { comments:  {contents : req.body.contents, author : req.body.author } } }, {upsert : true}, (err) =>{
              if(err){
                  console.log(err);
                  res.redirect('/bindex');
              }
              res.redirect('/bindex');
          });
  });
  // 게시판 내용 수정
  router.get('/update/:id', (req, res, next) => {
      Board.findOne({_id : req.params.id}).exec((err, board) => {
          res.render('update', {title : '글 수정', board :board});
          console.log(board);
      });
  })
  // 게시판 수정 내용 저장
  router.post('/update/updateContents/:id', (req, res) => {
    const board = Board.findOne({_id : req.body.id});
    board.updateOne({_id : req.body.id},  { $set: { title : req.body.title, contents : req.body.contents, author : req.body.author  } }, (err) =>{
        if(err){
            console.log(err);
            res.redirect('/bindex');
        }          
        res.redirect('/bindex');
    });
}) 
  
router.get('/', function (req, res) {
  Board.findOne({_id: req.params.id}, function (err, board) {
      res.render('board', { title: 'Board', board: board });
  })
});
module.exports = router;




