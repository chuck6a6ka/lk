'use strict';
//Вызов gulp и Gulp plugins load
global.task = {
    gulp: require('gulp'),
    bs: require('browser-sync').create(),
    gp: require('gulp-load-plugins')(),
    source: require('vinyl-source-stream'),
    path: {
        pathTasks: require('./gulp/config')
    }
};

task.path.pathTasks.forEach(function (pathTasks) {
    require(pathTasks)();
});

task.gp.sass.compiler = require('node-sass');

//Задача скоплилировать все и потом начать отслеживание за файлами
task.gulp.task('start', task.gulp.series(
    task.gulp.parallel('pug', 'sass', 'scripts', 'libs', 'other:fonts', 'other:img', 'other:styleLib', 'svg'),
    task.gulp.parallel('watch', 'server'),
));