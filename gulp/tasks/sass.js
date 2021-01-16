module.exports = function () {
//Задача на компиляцию sass/scss в css
    task.gulp.task('sass', function () {
        return task.gulp.src(['src/static/style/**/*.scss', 'src/pug/**/**/*.scss'])
            .pipe(task.gp.sourcemaps.init())
            .pipe(task.gp.sass({outputStyle: 'compressed'}).on('error', task.gp.sass.logError))
            .pipe(task.gp.autoprefixer({
                cascade: false,
                overrideBrowserslist: ['last 10 version']
            }))
            .pipe(task.gp.concat('main.min.css'))
            .pipe(task.gp.sourcemaps.write())
            .pipe(task.gulp.dest('build/css'))
            .pipe(task.bs.reload({
                stream: true
            }));
    });
};