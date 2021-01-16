module.exports = function () {
    task.gulp.task('other:img', function () {
        return task.gulp.src('src/static/image/**/*.*')
            .pipe(task.gulp.dest('build/image'))
            .pipe(task.bs.reload({
                stream: true
            }));
    });
    task.gulp.task('other:fonts', function () {
        return task.gulp.src('src/static/fonts/**/*.*')
            .pipe(task.gulp.dest('build/fonts'))
            .pipe(task.bs.reload({
                stream: true
            }));
    });
    task.gulp.task('other:styleLib', function () {
        return task.gulp.src('src/static/style/lib/*.css')
            .pipe(task.gulp.dest('build/css/lib'))
            .pipe(task.bs.reload({
                stream: true
            }));
    });
};