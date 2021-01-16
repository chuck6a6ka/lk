module.exports = function () {
//Задача на отслеживания изменений
    task.gulp.task('watch', function () {
        task.gulp.watch('src/pug/**/**/*.pug', task.gulp.series('pug'));
        task.gulp.watch(['src/static/style/**/*.scss', 'src/pug/**/**/*.scss'], task.gulp.series('sass'));
        task.gulp.watch(['src/static/js/**/*.js', 'src/pug/**/**/*.js'], task.gulp.series('scripts'));
        task.gulp.watch(['src/static/js/lib/*.js'], task.gulp.series('libs'));
        task.gulp.watch('src/static/fonts/**/*.*', task.gulp.series('other:fonts'));
        task.gulp.watch('src/static/image/**/*.*', task.gulp.series('other:img'));
        task.gulp.watch('src/static/style/lib/*.css', task.gulp.series('other:styleLib'));
        task.gulp.watch('src/static/image/**/*.svg', task.gulp.series('svg'));
    });
};