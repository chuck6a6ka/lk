module.exports = function () {
//Задача на компиляцию js
    task.gulp.task('scripts', function () {
        return task.gulp.src(['src/static/js/*.js', 'src/pug/**/**/*.js'])
            .pipe(task.gp.concat('lib.min.js'))
            .pipe(task.gulp.dest('build/js'))
    });

    task.gulp.task('libs', function () {
        return task.gulp.src(['src/static/js/lib/*.js'])
            .pipe(task.gulp.dest('build/js/lib'))
    });


};