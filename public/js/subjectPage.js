$(function () {
    var subjectPage = $('#subjectPage');
    var subjectPageChildren = subjectPage.find('*');
    for (var i = 0; i < subjectPageChildren.length; i++) {
        subjectPageChildren[i].className += ' bounceIn  animated';
    }
    bindOptionClick();
    //获取题目，默认为第一题
    function getSubject() {
        var subject=1;
        $.ajax({
            url:'/getSubject',
            type:'get',
            dataType:'json',
            async:false,
            success:function (data) {
                subject = data;
            }
        });
        return subject;
    }
    //绑定题目和选项
    function bindSubject(subject) {
        console.log('绑定成功');
    }
    //判断是否是正确选项
    function isCorrect(correctOption,option) {
        var str=/a/g;
        if(correctOption=='a'){
            str=/a/g;
        }else if(correctOption=='b'){
            str=/b/g;
        }else if(correctOption=='c'){
            str=/c/g;
        }else if(correctOption=='d'){
            str=/d/g;
        }else {
            str=/a/g;
        }
        if(str.test(option.toLowerCase())){
            return true;
        }else {
            return false;
        }
    }
    //为每个选项添加点击事件
    function bindOptionClick() {
        var optionArray = $.find('.optionContainer');
        console.log(optionArray);
        for(var i=0;i<optionArray.length;i++){
            $(optionArray[i]).click(function () {
                var selectOption = $(this).attr('id');
                var bOk = isCorrect('a',selectOption);
                if(bOk){
                    //答题正确，进入抽奖界面
                    console.log('跳转到抽奖页面');
                    urlToSubjectCorrect();
                } else {
                    //答题错误，重玩界面
                    urlToReplay();
                }
            });
        }
    }
    //进入抽奖界面函数
    function urlToSubjectCorrect() {
        location.hash = '#subjectCorrectPage';
    }
    //进入重玩界面函数
    function urlToReplay() {
        location.hash = '#replayPage';
    }
});