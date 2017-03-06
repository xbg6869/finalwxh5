var  request = require('request');
var  appid ='wxe8229870ed0f898a';
var  appSecret = '07a44d0c65dde4dc146cee766febe0d3';

var  access_tokenUrl ='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri=http://xbg6869.tunnel.2bdata.com/callback&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';


exports.indexRender=function (req,res) {
    //首页跳转微信授权处理
    res.redirect(access_tokenUrl);
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
        var refreshUrl ='https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='+appid+'&grant_type=refresh_token&refresh_token='+tokenObj.refresh_token +' ';

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

                console.log('最终获取的当前用户的信息:'+userInfo.nickname+'');
                console.log('最终获取的当前用户的地理位置:'+userInfo.city+'');
                res.render('index');

            })

        })

    })
}



/**
 * calculateProb函数用于生成中奖信息并控制中奖概率的函数，生成的中奖信息以数字的形式发送至前端
 * @param req
 * @param res
 */
exports.calculateProb=function (req,res) {
    //num为一定范围内的一个随机数，通过划分范围来确定概率
  var  num = Math.round(Math.random()*10);
   console.log(num);
   if(num>0 && num<5){
       console.log('一等奖');
       res.send(JSON.stringify(1));
   }else if( num>5 && num<8){
       console.log('二等奖');
       res.send(JSON.stringify(2));
   }else if( num>8 && num<10){
       console.log('三等奖');
       res.send(JSON.stringify(3));
   }else{
       res.send(JSON.stringify(0));
       console.log('没中奖')
   }
}



