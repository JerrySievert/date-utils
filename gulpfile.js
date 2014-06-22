var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsdoc = require('gulp-jsdoc');
var complexity = require('gulp-complexity');



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

gulp.task('complexity', function() {
    return gulp.src(paths.scripts).
        pipe(complexity());
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['build', 'docs', 'complexity']);
});

gulp.task('default', ['build', 'docs', 'complexity', 'watch']);
