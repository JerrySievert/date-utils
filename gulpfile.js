var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var paths = {
    scripts: ['lib/date-utils.js']
};

gulp.task('build', function() {
    return gulp.src(paths.scripts).
        pipe(uglify()).
        pipe(rename('date-utils.min.js')).
        pipe(gulp.dest('lib'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['build']);
});

gulp.task('default', ['build', 'watch']);
