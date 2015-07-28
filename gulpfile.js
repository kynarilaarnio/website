var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var tinyLr = require('tiny-lr')();
var wiredep = require('wiredep').stream;

var config = require('./build.conf.js');
var lrPort = 35728;

gulp.task('install:client:css', function () {
  return gulp.src(config.frontendSource.scss)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe($.concatCss('style.css'))
    .pipe(gulp.dest(config.frontendTarget.css));
});

gulp.task('install:client:partials', function () {
  return gulp.src(config.frontendSource.partials)
    .pipe($.plumber())
    .pipe($.ngHtml2js({
      moduleName: 'app.partials'
    }))
    .pipe($.concat('partials.js'))
    .pipe(gulp.dest(config.frontendTarget.js));
});

gulp.task('install:client:code', function () {
  return gulp.src(config.frontendSource.code)
    .pipe($.plumber())
    .pipe($.wrap('(function (angular) {\n<%= contents %>\n}(angular));'))
    .pipe($.sourcemaps.init())
    .pipe($.concat('scripts.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.frontendTarget.js));
});

gulp.task('install:client:assets', function () {
  return gulp.src(config.frontendSource.assets)
    .pipe($.plumber())
    .pipe(gulp.dest(config.frontendTarget.assets));
});

gulp.task('install:client:html', function () {
  return gulp.src(config.frontendSource.html)
    .pipe($.plumber())
    .pipe(wiredep({
      ignorePath: '.' + config.frontendTarget.html
    }))
    .pipe(gulp.dest(config.frontendTarget.html));
});

gulp.task('client:test', [ 'install' ], function () {
  return gulp.src(config.frontendSource.test)
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function (err) {
      throw err;
    });
});

gulp.task('client:test:watch', function () {
  return gulp.src(config.frontendSource.test)
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('jshint', function () {
  return gulp.src(config.backendSource.code.concat(config.frontendSource.code))
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
});

gulp.task('jsonlint', function () {
  return gulp.src(config.frontendSource.i18n)
    .pipe($.plumber())
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter());
});

gulp.task('server:test', function () {
  return gulp.src(config.backendSource.test, { read: false })
    .pipe($.plumber())
    .pipe($.mocha({ reporter: 'spec' }));
});

gulp.task('serve', function () {
  $.nodemon({script: 'server/server.js', ignore: ['node_modules/**/*.js']})
    .on('restart', function () {
      $.livereload(tinyLr);
    });
});

gulp.task('live', function () {
  tinyLr.listen(lrPort, function (err) {
    if (err) {
      return console.error(err);
    }
  });
});

gulp.task('watch', function () {
  gulp.watch(config.frontendSource.code, [ 'jshint', 'install:client:code' ]);
  gulp.watch(config.frontendSource.scss, [ 'install:client:css' ]);
  gulp.watch(config.frontendSource.partials, [ 'install:client:partials' ]);
  gulp.watch(config.frontendSource.assets, [ 'install:client:assets' ]);
  gulp.watch(config.frontendSource.html, [ 'install:client:html' ]);
  gulp.watch(config.frontendSource.i18n, [ 'jsonlint' ]);
});

gulp.task('install:client', [ 'install:client:css', 'install:client:partials', 'install:client:code',
  'install:client:assets', 'install:client:html' ]);
gulp.task('install', [ 'install:client' ]);

gulp.task('default', [ 'install', 'watch', 'live', 'serve' ]);
