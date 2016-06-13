define(function(require) {
    var $ = require('jquery');

    var getEnv = function() {
        var devList = ['dev.f2e.tcredit.com'];
        var isLocal = $.inArray(location.hostname, devList) > -1;
        return isLocal ? 'development' : 'production';
    };

    var devMap = {
        
    };

    var productionMap = {
        
    };

    return getEnv() === 'development' ? devMap : productionMap;
});
