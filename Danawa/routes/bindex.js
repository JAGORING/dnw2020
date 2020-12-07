const express = require('express');
const router = express.Router();
const Board = require('../schemas/board');

// 주소는 섞이면 안됨
// 
 
 
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
        console.log("볼드짱 일로 왔어염", a);
        res.render('bindex', {a});
        
    });
  });



  
//글 상세보기
 router.get('/board/:id', function (req, res) {
    Board.findOne({_id : req.params.id} , function (err, board) {
        console.log("볼드짱 일로 근본은 볼드죠", board);
        res.render('board', {board}, {title:'상세보ㅓ기 ~~~'} );
       
    })
});


/*
댓글 쓰기
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




글 수정 페이지 이동
router.get('/update/:id', (req, res, next) => {

    Board.findOne({_id : req.params.id}).exec((err, board) => {
        res.render('update', {title : '글 수정', board : board});
        console.log(board);
    });
})

update
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

*/
module.exports = router;




// const express = require('express');
// const router = express.Router();
// require('express-session');

// const Board = require('../schemas/board');

// //메인 페이지
// router.get('/bindex', (req, res, next) => {
//     Board.find({},(err, board) =>{
//         res.render('bindex', {title : 'Main 화면', board : board});
//     });
// });
// //글 상세보기
//  router.get('/board/:id', (req, res) => {
//     Board.findOne({_id : req.params.id}).exec((err, board) => {
//         res.render('board', {title : '상세보기 및 댓글쓰기', board : board});
//         console.log(board);
//     });
// }) 
// //댓글 쓰기
// router.post('/board/comment/write/:id', (req, res) => {   
    
// const board = Board.findOne({_id : req.body.id});

//         board.updateOne({_id : req.body.id},  { $push: { comments:  {contents : req.body.contents, author : req.body.author } } }, {upsert : true}, (err) =>{
//             if(err){
//                 console.log(err);
//                 res.redirect('/bindex');
//             }
                       
//             res.redirect('/bindex');
//         });
        

// });

// //글 쓰기 페이지 이동
// router.get('/write', (req, res, next) => {
//     res.render('write', {title : '글쓰기'});
// });

// //글 수정 페이지 이동
// router.get('/update/:id', (req, res, next) => {

//     Board.findOne({_id : req.params.id}).exec((err, board) => {
//         res.render('update', {title : '글 수정', board : board});
//         console.log(board);
//     });
// })

// //insert 
// router.post('/write/writeContents', (req, res) => {
//     const board = new Board();
//     board.title = req.body.title;
//     board.contents = req.body.contents;
//     board.author = req.body.author;
    
//     board.save(err => {
//         if(err){
//             console.log(err);
//             res.redirect('/bindex');
//         }
//         res.redirect('/bindex');
//     });
// }); 

// //update
// router.post('/update/updateContents/:id', (req, res) => {

//     const board = Board.findOne({_id : req.body.id});

//     board.updateOne({_id : req.body.id},  { $set: { title : req.body.title, contents : req.body.contents, author : req.body.author  } }, (err) =>{

//         if(err){
//             console.log(err);
//             res.redirect('/bindex');
//         }
                   
//         res.redirect('/bindex');
//     });

    
    
// }) 


// module.exports = router;


