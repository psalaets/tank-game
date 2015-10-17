var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();

gulp.task('build-js', function() {
  return makeBundle();
});

function makeBundle() {
  var bundler = browserify('app/main.js', {
    // debug: true
  });

  return bundler
    .transform('babelify')
    .bundle()
    // convert regular node stream into gulp compatible stream
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build'));
}

gulp.task('build-html', function() {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('watch', ['build-js', 'build-html'], function(cb) {
  browserSync.init({
    server: {
      baseDir: './',
      directory: true
    },
    open: false,
    ghostMode: false
  }, function() {
    gulp.watch('app/**/*.js', ['build-js']);
    gulp.watch('app/**/*.html', ['build-html']);
    gulp.watch('build/**/*', browserSync.reload);

    cb();
  });
});