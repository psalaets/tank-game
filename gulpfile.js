var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var Vinyl = require('vinyl');
var filelog = require('gulp-filelog');
var svgmin = require('gulp-svgmin');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var xtend = require('xtend');
var through2 = require('through2');
var cheerio = require('cheerio');

var browserSync = require('browser-sync').create();


gulp.task('build-js', function() {
  return makeBundle();
});

gulp.task('watch-js', function() {
  return makeBundle(true);
});

function makeBundle(watch) {
  var browserifyArgs = xtend({debug: true}, watchify.args);
  var bundler = browserify(browserifyArgs);

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  bundler.add('app/main.js');
  bundler.transform(babelify)

  function rebundle() {
    return bundler
      .bundle()
      // convert regular node stream into gulp compatible stream
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulp.dest('build'));
  }

  return rebundle();
}

gulp.task('build-html', function() {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('build-svg', function() {
  var svgSourceFileNames = ['Tank-Clean-Plain.svg'];
  var globs = svgSourceFileNames.map(function(filename) {
    return 'assets/' + filename;
  });

  return gulp.src(globs)
    .pipe(svgmin({
      plugins: [{
        collapseGroups: false
      }, {
        cleanupIDs: false
      }]
    }))
    .pipe(through2.obj(function(file, encoding, done) {
      var fileContents = file.contents.toString();
      var $ = cheerio.load(fileContents);

      $('svg > g[id]').each(function(index, element) {
        var $element = $(element);
        var id = $element.attr('id');
        var markup = $element.toString();

        this.push(new Vinyl({
          path: id + '.svg',
          contents: new Buffer(markup)
        }))
      }.bind(this));

      done();
    }))
    .pipe(gulp.dest('build/svg'))
});

gulp.task('watch', ['watch-js', 'build-html'], function(cb) {
  browserSync.init({
    server: {
      baseDir: './',
      directory: true
    },
    open: false,
    ghostMode: false
  }, function() {
    gulp.watch('app/**/*.html', ['build-html']);
    gulp.watch('build/**/*', browserSync.reload);

    cb();
  });
});