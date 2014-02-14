var gulp = require('gulp');
var browserify = require('gulp-browserify');
var runSequence = require('run-sequence');

var protractor = require("gulp-protractor").protractor;

//var webdriver = require("gulp-protractor").webdriver;

var testServer1 = require('./test/server/index.js');

//gulp.task('webdriver', webdriver);

gulp.task('build', function() {
  gulp.src('src/services/angular-primus.js')
    .pipe(browserify())
    .pipe(gulp.dest('build/'));
});


gulp.task('test', function() {

  require('./test/server/index.js');

  gulp.src(['./test/*.js'])
    .pipe(protractor({
      configFile: './protractor.conf.js'
    }))
    .on('error', function(e) { throw e; });
});
