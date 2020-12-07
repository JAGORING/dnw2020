const mongoose = require('mongoose');
const { Schema } = mongoose;


//메인 글 모델 정의
const clothSchema = new Schema({
    part: String,
    cate: String,
    color: String, // 색상
    season :[String], // 계절(봄, 여름, 가을, 겨울)
    pattern:String, //solid, stripe, dot, printing
    solid :Boolean,  // 단색인지 아닌지
    texture:String,
    brand :String,
    // photos:{
    //     // data: Buffer,
    //     // contentType: String },
    descript :String,  // 메모
});


module.exports = mongoose.model('cloth', clothSchema);
