var  mongoose= require('mongoose');

mongoose.connect("mongodb://localhost:27017/wxH5");


var wxUserSchema = new  mongoose.Schema({
    wxName: String,
    lotteryNum:Number,
    highestScore:{type: Number, default: 0},
    rank:Number,
    openid:String,
    email:String,
    phoneNumber:Number,
    address:String,
    playChance:{type:Number,default:2},
    headimgurl:String,
    realname:String

},{collection:'wxUser'});

exports.wxUser= mongoose.model('WxUser',wxUserSchema);