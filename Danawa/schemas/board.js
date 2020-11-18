const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//메인 글 모델 정의
const boardSchema = new Schema({
    title: String,
    contents: String,
    author: String,
    board_date: {type: Date, default: Date.now()},
    comments : [{contents : String, author : String, comment_date : {type : Date, default : Date.now()}}]
});


module.exports = mongoose.model('board', boardSchema);
