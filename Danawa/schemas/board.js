const mongoose = require('mongoose');
const { Schema } = mongoose;
const Counter = require('./counter');

//메인 글 모델 정의
const boardSchema = new Schema({
    title: String,
    contents: String,
    author: String,
    views:{type:Number, default:0},
    numId:{type:Number},
    board_date: {type: Date, default: Date.now},
    comments : [{contents : String, author : String, comment_date : {type : Date, default : Date.now()}}]
});

boardSchema.pre('save', async function (next){
    const board = this;
    if(board.isNew){
        counter = await Counter.findOne({name:'boards'}).exec();
        if(!counter) counter = await Counter.create({name:'boards'});
        counter.count++;
        counter.save();
        board.numId = counter.count;
    }
    return next();
});

module.exports = mongoose.model('board', boardSchema);
