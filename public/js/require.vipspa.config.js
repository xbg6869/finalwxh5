$(function(){
    vipspa.start({
        view: '#ui-view',
        errorTemplateId: '#error', // 可选
        router: {
            'firstPage': {
                templateUrl: 'views/firstPage.html',
                controller: 'js/firstPage.js'
            },
            'infoPage': {
                templateUrl: 'views/infoPage.html',
                controller: 'js/infoPage.js'
            },
            'infoPage1': {
                templateUrl: 'views/infoPage1.html',
                controller: 'js/infoPage1.js'
            },
            'monsterFall': {
                templateUrl: 'views/monsterFall.html',
                controller: 'js/monsterFall.js'
            },
            'rankPage': {
                templateUrl: 'views/rankPage.html',
                controller: 'js/rankPage.js'
            },
            'rulePage': {
                templateUrl: 'views/rulePage.html',
                controller: 'js/rulePage.js'
            },
            'awardPage': {
                templateUrl: 'views/awardPage.html',
                controller: 'js/awardPage.js'
            },
            'startSubjectPage': {
                templateUrl: 'views/startSubjectPage.html',
                controller: 'js/startSubjectPage.js'
            },
            'subjectPage': {
                templateUrl: 'views/subjectPage.html',
                controller: 'js/subjectPage.js'
            },
            'subjectCorrectPage': {
                templateUrl: 'views/subjectCorrectPage.html',
                controller: 'js/subjectCorrectPage.js'
            },
            'replayPage': {
                templateUrl: 'views/replayPage.html',
                controller: 'js/replayPage.js'
            },
            'lotteryPage': {
                templateUrl: 'views/lotteryPage.html',
                controller: 'js/lotteryPage.js'
            },
            'winPage': {
                templateUrl: 'views/winPage.html',
                controller: 'js/winPage.js'
            },
            'failPage': {
                templateUrl: 'views/failPage.html',
                controller: 'js/failPage.js'
            },
            'defaults': 'views/firstPage.html' //默认路由
        }
    });

});
