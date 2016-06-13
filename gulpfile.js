/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 * gulp有五个方法：src、dest、task、run、watch
 src和dest：指定源文件和处理后文件的路径
 watch：用来监听文件的变化
 task：指定任务
 run：执行任务
 *
 */
// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload'),   //livereload
    map = require('map-stream');

// HTML处理(gulp html 成功)
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst))
});

// 样式处理（gulp css 成功）
gulp.task('css', function () {
    var cssSrc = './src/style/*.css',
        cssDst = './dist/style';

    gulp.src(cssSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(cssDst));
});

// 图片处理（gulp images 成功）
gulp.task('images', function(){
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
})

// js处理（gulp js 成功）
gulp.task('js', function () {
    var jsSrc = './src/js/*.js',
        jsDst ='./dist/js';

    gulp.src(jsSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(jsDst))
});

// font_awesome处理（gulp font_awesome 成功）
gulp.task('font', function () {
    var fontSrc = './src/font_awesome/**/*',
        fontDst ='./dist/font_awesome';

    gulp.src(fontSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(fontDst))
});

// inc处理（gulp inc 成功）
gulp.task('inc', function () {
    var incSrc = './src/inc/**/*.html',
        incDst ='./dist/inc';

    gulp.src(incSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(incDst))
});

// templates处理（gulp tmp 成功）
gulp.task('tmp', function () {
    var tmpSrc = './src/templates/**/*.html',
        tmpDst ='./dist/templates';

    gulp.src(tmpSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(tmpDst))
});

// mock处理（gulp mock 成功）
gulp.task('mock', function () {
    var mockSrc = './src/mock/*',
        mockDst ='./dist/mock';

    gulp.src(mockSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(mockDst))
});

// 清空图片、样式、js（gulp clean 成功）
gulp.task('clean', function() {
    gulp.src(['./dist/*.html', './dist/css', './dist/images', './dist/js', './dist/font_awesome', './dist/inc', './dist/templates', './dist/mock'], {read: false})
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','css','images','js','font','font','inc','tmp');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){

    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }

        // 监听html
        gulp.watch('./src/*.html', function(event){
            gulp.run('html');
        })

        // 监听css
        gulp.watch('./src/css/*.css', function(){
            gulp.run('css');
        });

        // 监听images
        gulp.watch('./src/images/**/*', function(){
            gulp.run('images');
        });

        // 监听js
        gulp.watch('./src/js/*.js', function(){
            gulp.run('js');
        });

        // 监听font
        gulp.watch('./src/font_awesome/**/*', function(){
            gulp.run('font');
        });

        // 监听inc
        gulp.watch('./src/inc/**/*.html', function(){
            gulp.run('inc');
        });

        // 监听tmp
        gulp.watch('./src/templates/**/*.html', function(){
            gulp.run('tmp');
        });

        // 监听mock
        gulp.watch('./src/mock/*', function(){
            gulp.run('mock');
        });

    });
});