var  mongoose= require('mongoose');

mongoose.connect("mongodb://www.yuanz.cc/wxH5");


var wxUserSchema = new  mongoose.Schema({
    wxName: String,
    lotteryNum:Number,
    highestScore:{type: Number, default: 0},
    openid:String,
    email:{type:String,default:'用户未填写'},
    phoneNumber:{type:Number,default:0},
    address:{type:String,default:'用户未填写'},
    playChance:{type:Number,default:50},
    headimgurl:{type:String,default:'http://wx.qlogo.cn/mmopen/oYwP0cFmRU0LNYn7kegxreUiakQHPof3sLFh9rnzzBvAwCR60YMfRcZ8NaxicwZKSMVUaPVdTT8BLfmYjPNXDUug/0'},
    realname:{type:String,default:'用户未填写'},
    isWin:{type:Boolean,default:false},
    lotteryChance:{type:Number,default:10}


},{collection:'wxUser'});

exports.wxUser= mongoose.model('WxUser',wxUserSchema);


var rewardSchema = new  mongoose.Schema({
   MMM:{type:Number,default:100},
   card:{type:Number,default:100}

},{collection:'reward'});

exports.reward= mongoose.model('Reward',rewardSchema);