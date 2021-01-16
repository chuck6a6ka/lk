module.exports = function () {
//Задача на компиляцию pug в html
    task.gulp.task('pug', function () {
        return task.gulp.src('src/pug/pages/**/*.pug')
            .pipe(task.gp.pug({
                pretty: true
            }))
            .pipe(task.gulp.dest('build/'))
            .on('end', task.bs.reload);
    });
};