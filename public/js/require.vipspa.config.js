$(function(){
	vipspa.start({
        view: '#ui-view',
        errorTemplateId: '#error', // 可选
        router: {
            'firstPage': {
                templateUrl: 'views/firstPage.html',
                controller: 'js/firstPage.js'
            },
            'monsterFall': {
                templateUrl: 'views/monsterFall.html',
                controller: 'js/monsterFall.js'
            },
            'rulePage': {
                templateUrl: 'views/rulePage.html',
                controller: 'js/rulePage.js'
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
            'defaults': 'firstPage' //默认路由
        }
    });

});
