var  UserCtrl=require('../../db/index').wxUser;



exports.saveUser=function (userName,openId,headimgurl) {
    UserCtrl.create({wxName:userName,openid:openId,headimgurl:headimgurl},function (err,doc) {
        if(err){
            console.log(err)
        }else{
            console.log('用户 '+userName+'已经成功录入数据库')
        }
    })

};


exports.infoExist=function (openid,cb) {
    UserCtrl.find({openid:openid},function (err,doc) {
        if(err){
            console.log(err)
        }else{
           if(doc[0].realname !==undefined){
               console.log('该用户信息已经存在，返回前端true并直接开始游戏');
               cb(true);
           }else{
               console.log('该用户信息不存在需要重新录入，返回前端false');
               cb(false);
           }
        }
    })
}


exports.exists=function (openId,cb) {
    UserCtrl.find({openid:openId},function (err,doc) {
        if(err){
            console.log(err)
        }else{
            if(doc){
                //用户存在不需要存入数据库
                if(doc.length==0){
                    console.log('用户openid不存在开始存入')
                    cb();
                }else{
                    console.log('用户openid已经存在不需要重复存入')
                }
            }
        }
    })
};

exports.getUser=function (openid) {
    //获得单个用户
    UserCtrl

};


exports.checkScore=function (openid,newScore,cb) {
    UserCtrl.find({openid:openid},function (err,doc) {
        if(err){
            console.log(err)
        }else{
            if(doc){
                //用户存在不需要存入数据库
                if(doc[0].highestScore !==undefined){ //如果分数存在
                    var oldScore=doc[0].highestScore;
                    console.log('分数已经存在准备比较')
                    if(newScore >= oldScore){
                       //这一次分比较大，更新最新分数
                        UserCtrl.update({openid:openid},{highestScore:newScore},function(err,doc){
                            if(err){
                                console.log(err);
                            }else{
                                console.log('用户的新纪录已经更新')
                            }
                        })
                    }else{
                        console.log('此次用户并没有突破以往纪录，不需要更新最高分')
                    }

                }else{ //分数不存在
                    console.log('分数不存在，准备存入');
                    console.log('第一次的游戏分数为'+newScore);
                    UserCtrl.update({openid:openid},{highestScore:newScore},function(err,doc){
                        if(err){
                            console.log(err);
                        }else{
                            console.log('用户第一次游戏最高分已经存入')
                        }
                    })
                }
                //检查每个用户可玩次数每次-1， 每天12点刷新
                if(doc[0].playChance>=1){  //还能玩最后一次
                
                UserCtrl.update({openid:openid},{"$inc":{"playChance":-1}},function (err,doc) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log('该玩家游戏次数-1');
                    }
                });
                }else{
                    //该玩家今天次数已经耗尽
                    console.log('该玩家次数已经耗尽');
                    cb();
                }


            }
        }
    })
};

exports.rank=function (cb) {
    UserCtrl.find({},{"wxName":1,"headimgurl":1,"highestScore":1,_id:0},{limit:20},function (err,doc) {
        if(err){
            console.log(err);
        }else{
            console.log('已经将排好序的前20名玩家准备好并返回给前端')
            cb(doc);
        }
    }).sort({"highestScore":-1});
}


exports.getUsers=function () {
    //获取多个用户 主要用于排行榜逻辑
    UserCtrl.collection.find({"rank": {$lt: 21}},function (err,doc) {
        if(err){
            console.log(err)
        }else{
            console.log(doc)
        }
    });

}

exports.inRank=function (openid,cb) {
    UserCtrl.find({},{"openid":1,_id:0},{limit:20},function (err,doc) {
        if(err){
            console.log(err);
        }else{
            for(var i=0; i<doc.length;i++){
                if(openid==doc[i].openid){
                    console.log('当前用户处于前20名')
                    cb();
                }
            }
        }
    }).sort({"highestScore":-1});



}


exports.updateUser=function (openid,infoObj) {
    //用于更新用户资料， 比如当填写完信息， 玩完打怪兽游戏，或者大转盘游戏
    //obj需要做一层默认处理
    var  condition = {openid:openid};


    UserCtrl.update(condition,infoObj,function (err,doc) {
        if(err){
            console.log(err);
        }else{
            console.log('该用户信息更新成功');
        }
    })
}
exports.removeUser=function (openid) {
    UserCtrl.remove({openid:openid},function (err,doc) {
        if(err){
            console.log(err);
        }else{
            console.log('该用户成功更新至数据库');
        }
    })
}

exports.clearAllUser=function () {
    UserCtrl.remove({}, function (err, doc) {
        if (err) {

        } else {
            console.log('清除数据库所有完毕')
        }
    })
};


//  暗箱操作  根据openid，更新某一个用户的积分
    exports.updateOneUser=function (openid,score) {
        UserCtrl.update({openid:openid},{$set:{'highestScore':score}},function () {

        })
    }
    
exports.refreshPlayChance=function () {
    UserCtrl.update({wxName:'有梦就别怕痛'},{ $set : { playChance : 10} },false,true);
    }

exports.chanceCheck=function (openid,cb) {
        var  obj={
            hasChance:false
        }
    UserCtrl.find({openid:openid},function (err,doc) {
        if(err){
            console.log(err);
        }else{
            if(doc[0].playChance>=1){
                console.log('用户还有剩余次数可继续游戏');
                obj.hasChance=true;
                cb(obj);
            }else{
                console.log('用户没有剩余次数现在重定向到首页');
                obj.hasChance=false;
                cb(obj);
            }
        }
    })
}
    

