var  request = require('request');
var  appid ='wxe8229870ed0f898a';
var  appSecret = '07a44d0c65dde4dc146cee766febe0d3';
var  access_tokenUrl ='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri=http://www.yuanz.cc/callback&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
var  openId='';
var  realname='';
var  dbController =require('./dbController');

exports.indexRender=function (req,res) {
    //首页跳转微信授权处理
   // dbController.clearAllUser();
  res.redirect(access_tokenUrl);
  //   res.render('index');
}
exports.authRender=function (req,res) {
    var access_code= req.query.code;
    var tokenUrl ='https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appid+'&secret='+appSecret+'&code='+access_code+'&grant_type=authorization_code';

    //开始发送获取token的请求
    request.get(tokenUrl,function (err,response,body) {
        if(err){
            throw  err;
        }
        var  tokenObj=  JSON.parse(body); // 获取到的token对象
        var refreshUrl ='https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='+appid+'&grant_type=refresh_token&refresh_token='+tokenObj.refresh_token +'';

        //开始发送获取刷新的token和appid

        request.get(refreshUrl,function (err,response,refresh) {
            if(err){
                throw  err;
            }
            var refreshToken = JSON.parse(refresh);

            //最后开始获取用户信息
            var  inforUrl= 'https://api.weixin.qq.com/sns/userinfo?access_token='+refreshToken.access_token+'&openid='+refreshToken.openid+'&lang=zh_CN';


            request.get(inforUrl,function (err,response,info) {
                if(err){
                    throw err;
                }
                var userInfo= JSON.parse(info);
                var userName=userInfo.nickname;
                openId= userInfo.openid;
                var headimgurl=userInfo.headimgurl;

                 // if(dbController.exists()){
                 //     console.log('该用户:'+userName+'已经在数据库中不需要重复存入');
                 // }else{
                 //     dbController.saveUser(userName,openId,headimgurl);
                 // }

                console.log('最终获取的当前用户的信息:'+userInfo.nickname+'');

                dbController.exists(openId,function () {
                    dbController.saveUser(userName,openId,headimgurl);
                })
                res.render('index');
            })

        })

    })
}

exports.chanceCheck=function (req,res) {
    dbController.chanceCheck(openId,function (obj) {
        res.send(obj);
    });
}


exports.checkInfoExists=function (req,res) {
    dbController.infoExist(openId,function (result) {
        res.send(result);
    })
}

exports.saveInfo=function (req,res) {
    var  info=req.body;
    realname=info.realname;
    dbController.updateUser(openId,info)
    res.send('get data success!');
}


exports.saveScore=function (req,res) {
    var  score=req.body.score;
    var  obj={
         nochance:false,
         inRank:false
    };
    console.log('前端此次传来的分数为'+score);
    //先查询以前的分数， 存在做比较并存入
    dbController.checkScore(openId,score,function () {
     obj.nochance=true;
    });


    //与当前排行榜分数第20名进行比较，如果比他大返回提示信息，并且要去前端填写页面
    dbController.inRank(openId,function () {
        console.log('我在排行榜是true');
        obj.inRank=true;
        console.log(obj.inRank)
    });

    setTimeout(function () {
     console.log(obj);
     res.send(obj);
     },30)
};


exports.returnRank=function (req,res) {
    dbController.rank(function (result) {
        res.send(result);
    })

}

exports.refreshPlayChance=function () {
    dbController.refreshPlayChance();
}
/**
 * calculateProb函数用于生成中奖信息并控制中奖概率的函数，生成的中奖信息以数字的形式发送至前端
 * @param req
 * @param res
 */
exports.calculateProb=function (req,res) {
    //num为一定范围内的一个随机数，通过划分范围来确定概率
  var  num = Math.round(Math.random()*100);
   console.log(num);
   if(num>0 && num<10){
       console.log('口罩');
       res.send('1');
   }else if( num>10 && num<20){
       console.log('电子卡');
       res.send('2');
   }else{
       res.send('0');
       console.log('没中奖')
   }
}



