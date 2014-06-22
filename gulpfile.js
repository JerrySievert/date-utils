var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsdoc = require("gulp-jsdoc");



var paths = {
    scripts: ['lib/date-utils.js']
};

gulp.task('build', function() {
    return gulp.src(paths.scripts).
        pipe(uglify()).
        pipe(rename('date-utils.min.js')).
        pipe(gulp.dest('lib'));
});

gulp.task('docs', function() {
    return gulp.src(paths.scripts).
        pipe(jsdoc('./doc'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['build', 'docs']);
});

gulp.task('default', ['build', 'docs', 'watch']);
