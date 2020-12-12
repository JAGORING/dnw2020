const express = require('express');

const router = express.Router();
const Board = require('../schemas/board');
require('express-session');
//기본 라우터들

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

router.get('/write', (req, res) => {
  console.log("뭐 들어오는거 있느?" , session);
  res.render('write', { title: '글 등록 - Danawa' });
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



// 메인 페이지 라우터 



router.get('/main', (req, res) => {
  session = req.session;
  console.log("뭐 들어오는거 있느?" , session)
  res.render('main', { title: '메인 - Danawa' });
});





module.exports = router;