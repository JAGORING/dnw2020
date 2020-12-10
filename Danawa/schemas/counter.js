const mongoose = require('mongoose');
const { Schema } = mongoose;

// 조회수 모델 정의
const counterSchema = new Schema({
    name:{type:String, required:true},
    count:{type:Number, default:0},
});

module.exports = mongoose.model('counter', counterSchema);