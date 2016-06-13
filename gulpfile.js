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

// copy
gulp.task('copy', function() {
    var copySrc = './src/**/*.*',
        copyDst = './dist/';

    gulp.src(copySrc,{dot: true})
        .pipe(livereload(server))
        .pipe(gulp.dest(copyDst))
});

// 清空
gulp.task('clean', function() {
    gulp.src(['./dist/**/*.*'], {read: false})
        .pipe(clean());
});

// 默认任务 清空并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('copy');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){

    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }

        // 监听html
        gulp.watch('./src/**/*.*', function(event){
            gulp.run('copy');
        })

    });
});