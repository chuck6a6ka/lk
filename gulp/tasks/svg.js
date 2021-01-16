module.exports = function () {
//Задача на компиляцию svg
    task.gulp.task('svg', function () {
        return task.gulp.src('src/static/image/*.svg')
            .pipe(task.gp.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe(task.gp.cheerio({
                run: function (item) {
                    item('[fill]').removeAttr('fill');
                    item('[stroke]').removeAttr('stroke');
                    item('[style]').removeAttr('style');
                }, parserOptions: {xmlMode: true}
            }))
            .pipe(task.gp.replace('&gt;', '>'))

            .pipe(task.gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg"
                    }
                }
            }))
            .pipe(task.gulp.dest('build/image'))
            .pipe(task.bs.reload({
                stream: true
            }));
    });
};