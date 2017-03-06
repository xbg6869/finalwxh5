var express = require('express');
var path  = require('path');
var ejs=  require('ejs')
var app = express();
var  fs= require('fs');

var  bodyParser =  require('body-parser');


app.use(bodyParser.json());  //把post请求的主体内容解析成 json格式对象
app.use(bodyParser.urlencoded({extended:false}));   //处理查询字符串
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('build')));
app.engine('html',ejs.__express);
app.set('view engine','html');
var  routes = require('./public/router/router');


app.get('/',routes.indexRender);


app.get('/callback',routes.authRender);


app.listen(8080);
