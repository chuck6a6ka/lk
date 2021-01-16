module.exports = function () {
// Static Server
    task.gulp.task('server', function() {
        task.bs.init({
            server: "./build"
        });
    });
};