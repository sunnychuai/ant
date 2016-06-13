var require = {
    waitSeconds: 0,
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery',
        'jquery.validate': 'lib/jquery.validate',
        'jquery.pagination': 'lib/jquery.pagination',
        arttemplate: 'lib/arttemplate',
        moment: 'lib/moment',
        _pikaday: 'lib/pikaday',
        text: 'lib/text',
        url: 'lib/url',
        webuploader: 'lib/webuploader',
        templates: '../templates',
        'jquery.tab': 'lib/jquery.tab',
        slick: 'lib/slick'
    },
    shim: {
        url: {
            exports: 'url'
        },
        '_pikaday': ['moment'],
        'jquery.validate': ['jquery'],
        'jquery.pagination': ['jquery'],
        'jquery.tab': ['jquery']
    }
};