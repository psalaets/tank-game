var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var Vinyl = require('vinyl');
var filelog = require('gulp-filelog');
var svgmin = require('gulp-svgmin');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var eventStream = require('event-stream');

var xtend = require('xtend');
var through2 = require('through2');
var cheerio = require('cheerio');

var browserSync = require('browser-sync').create();

// for every page name, foo, in here:
//   - build uses foo-entry.js to make foo-bundle.js
//   - foo.html has a <script> that loads foo-bundle.js
var pages = ['main'];

gulp.task('build-js', function() {
  var bundles = pages.map(function(page) {
    return makeBundle('app/' + page + '-entry.js', page + '-bundle.js');
  });

  return eventStream.merge.apply(eventStream, bundles);
});

gulp.task('watch-js', function() {
  var bundles = pages.map(function(page) {
    return makeBundle('app/' + page + '-entry.js', page + '-bundle.js', true);
  });

  return eventStream.merge.apply(eventStream, bundles);
});

function makeBundle(entryFile, outputFile, watch) {
  var browserifyArgs = xtend({debug: true}, watchify.args);
  var bundler = browserify(browserifyArgs);

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  bundler.add(entryFile);
  // see .babelrc for babel config
  bundler.transform(babelify);

  function rebundle() {
    return bundler
      .bundle()
      .on('error', function(event) {
        console.log('browserify error: ' + event);
      })
      // convert regular node stream into gulp compatible stream
      .pipe(source(outputFile))
      .pipe(buffer())
      .pipe(gulp.dest('build'));
  }

  return rebundle();
}

gulp.task('build-html', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('build-sprites', function() {
  var sprites = [];

  return gulp.src(svgSourceFiles())
    .pipe(svgmin({
      // https://github.com/svg/svgo/tree/master/plugins
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
        var innerHtml = $element.html();

        sprites.push({
          id: id,
          markup: innerHtml
        });
      });

      done();
    }, function(done) {
      this.push(new Vinyl({
        path: 'sprites.json',
        contents: new Buffer(JSON.stringify(sprites))
      }));
      done();
    }))
    .pipe(gulp.dest('build/svg'));
});

gulp.task('watch', ['watch-js', 'build-html', 'build-sprites'], function(cb) {
  browserSync.init({
    server: {
      baseDir: './',
      directory: true
    },
    open: false,
    ghostMode: false
  }, function() {
    gulp.watch(svgSourceFiles(), ['build-sprites']);
    gulp.watch('app/**/*.html', ['build-html']);
    gulp.watch('build/**/*', browserSync.reload);

    cb();
  });
});

// returns glob array matching the "clean" svg files
function svgSourceFiles() {
  var svgSourceFileNames = [
    'Tank-Clean-Plain.svg'
  ];
  var globs = svgSourceFileNames.map(function(filename) {
    return 'assets/' + filename;
  });

  return globs;
}
