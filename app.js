var express = require('express');
var path  = require('path');
var ejs=  require('ejs')
var app = express();
var  fs= require('fs');
var  bodyParser =  require('body-parser');
var  schedule = require('node-schedule');
var session = require('express-session');
var signature = require('wx_jsapi_sign');
var config = require('./config')();





app.use(bodyParser.json());  //把post请求的主体内容解析成 json格式对象
app.use(bodyParser.urlencoded({extended:false}));   //处理查询字符串
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('build')));
app.use(express.static(path.resolve('node_modules')));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx'
}));
app.engine('html',ejs.__express);
app.set('view engine','ejs');

var  routes = require('./public/router/router');


//每天12点刷新游戏次数

var schedule = require('node-schedule');



function scheduleRecurrenceRule(){

    schedule.scheduleJob('0 01 0 * * *', function(){
        console.log('12点过了，用户游戏次数和转盘次数全部刷新');
        routes.refreshPlayChance();
    });
}
scheduleRecurrenceRule();




// routes.getJsApi(function (signature) {
//     console.log(signature);
// });


// 处理微信授权和返回首页
app.get('/',routes.indexRender);
app.get('/callback',routes.authRender);


//首页检查游戏次数
app.get('/chanceCheck',routes.chanceCheck);

//检查个人信息是否已经再数据库
app.get('/checkInfoExists',routes.checkInfoExists)

//保存用户个人信息到数据库(email etc..)
// app.post('/userInfo',routes.saveInfo);

//存入分数
// app.post('/saveScore',routes.saveScore);

//返回排行榜
app.get('/returnRank',routes.returnRank);


//返回转盘中奖信息
// app.get('/lottery',routes.calculateProb);


app.get('/backEndLogin',routes.renderLogin);
app.post('/data',routes.renderBackEndData);
app.get('/showData',routes.renderData)

app.get('/showCardResult',routes.renderCard);



//微信jsapi
app.post('/getsignature', function(req, res){
    var url = req.body.url;
    // console.log(url);
    signature.getSignature(config)(url, function(error, result) {
        if (error) {
            res.json({
                'error': error
            });
        } else {
            res.json(result);
        }
    });
});



app.listen(8080);