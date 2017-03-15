$(function () {
    var subjectPage = $('#subjectPage');
    var subjectPageChildren = subjectPage.find('*');
    var subjectArray = [{
        subjectContainer: '医生说，被小怪兽袭击的村民会出现咳嗽、低烧、夜间出汗、午后发热、胸痛、疲乏无力、体重减轻、呼吸困难等症状，请问这个小怪兽的真名是（）',
        optionA: 'A.流感病毒',
        optionB: 'B.结核杆菌',
        optionC: 'C.HIV',
        optionD: 'D.大肠杆菌',
        correctOption:'b'
    },{
        subjectContainer: '《西游记》第六七回：“﹝老者﹞用藜杖指定道：‘你这厮，骨挝脸，磕额头，塌鼻子，凹颉腮，毛眼毛睛，痨病鬼，不知高低，尖着个嘴，敢来冲撞我老人家！’” 请问“痨病”在现代被称为（）',
        optionA: 'A.结核病',
        optionB: 'B.疟疾',
        optionC: 'C.艾滋病',
        optionD: 'D.禽流感',
        correctOption:'a'
    },{
        subjectContainer: '你的朋友小明不小心感染了肺结核，你应该劝他（）',
        optionA: 'A.规范治疗全程1-3个月',
        optionB: 'B.规范治疗全程6-8个月',
        optionC: 'C.要不要试试江湖祖传秘方？',
        optionD: 'D.你没救了，赶快回家吧',
        correctOption:'b'
    },{
        subjectContainer: '你的朋友小明不小心感染了肺结核，此时治疗难度（）？   他没有坚持治疗，从而出现耐药结核，此时治疗周期（）？',
        optionA: 'A.高，短',
        optionB: 'B.高，长',
        optionC: 'C.低，长',
        optionD: 'D.低，短',
        correctOption:'c'
    },{
        subjectContainer: '你的朋友小明偷偷告诉你他被查出结核病，同一个班的你应该（）',
        optionA: 'A.夏天夏天就要过去守住小秘密',
        optionB: 'B.把这个秘密告诉身边所有人',
        optionC: 'C.劝小明告诉老师并申请休学治疗',
        optionD: 'D.还能说啥，友尽啊',
        correctOption:'c'
    },{
        subjectContainer: '以下哪项对预防结核病有用（）',
        optionA: 'A.勤洗手、多通风',
        optionB: 'B.正确佩戴口罩',
        optionC: 'C.锻炼身体',
        optionD: 'D.以上均是',
        correctOption:'d'
    },{
        subjectContainer: '以下哪项不是结核感染的高危人群（）',
        optionA: 'A.艾滋病病毒感染者',
        optionB: 'B.免疫力低下者',
        optionC: 'C.老年人和儿童 ',
        optionD: 'D.以上均是高危人群',
        correctOption:'d'
    },{
        subjectContainer: '你的朋友小明被查出患有结核病，你觉得他的患病器官一定位于（）',
        optionA: 'A、除了牙齿和头发外都可以',
        optionB: 'B、只有肺',
        optionC: 'C、只有骨',
        optionD: 'D、只有淋巴',
        correctOption:'a'
    },];
    var obj = {};
    for (var i = 0; i < subjectPageChildren.length; i++) {
        subjectPageChildren[i].className += ' bounceIn  animated';
    }


    var subjectItem = getSubject();
    bindSubject(subjectItem);
    bindOptionClick();
    //获取题目，默认为第一题
    function getSubject() {
        var num = Math.floor(Math.random()*8);
        obj = subjectArray[num];
        return obj;
    }

    //绑定题目和选项
    function bindSubject(subject) {
        var subjectContainer = $('#subjectContainer');
        var optionA = $('#optionA');
        var optionB = $('#optionB');
        var optionC = $('#optionC');
        var optionD = $('#optionD');
        subjectContainer.html('<p>'+subject.subjectContainer+'</p>');
        optionA.html('<p>'+subject.optionA+'</p>');
        optionB.html('<p>'+subject.optionB+'</p>');
        optionC.html('<p>'+subject.optionC+'</p>');
        optionD.html('<p>'+subject.optionD+'</p>');
    }

    //判断是否是正确选项
    function isCorrect(correctOption, option) {
        var str = /a/g;
        if (correctOption == 'a') {
            str = /a/g;
        } else if (correctOption == 'b') {
            str = /b/g;
        } else if (correctOption == 'c') {
            str = /c/g;
        } else if (correctOption == 'd') {
            str = /d/g;
        } else {
            str = /a/g;
        }
        if (str.test(option.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    }

    //为每个选项添加点击事件
    function bindOptionClick() {
        var optionArray = $.find('.optionContainer');
        console.log(optionArray);
        for (var i = 0; i < optionArray.length; i++) {
            $(optionArray[i]).click(function () {
                var selectOption = $(this).attr('id');
                var bOk = isCorrect(subjectItem.correctOption, selectOption);
                if (bOk) {
                    //答题正确，进入抽奖界面
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