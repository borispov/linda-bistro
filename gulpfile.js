var gulp = require('gulp');
var sass = require('gulp-sass')
var pug = require('gulp-pug')
var watch = require('gulp-watch')
var browserSync = require('browser-sync').create();

gulp.task('hello', function () {
  console.log('Hello World')
});

gulp.task('sass', function () {
  return gulp.src('./src/styles/sass/*.sass')
    .pipe(sass())
    .on('error', function (err) {
      console.log(err.toString());

      this.emit('end');
    })
    .pipe(gulp.dest('./src/styles/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('watch', ['browserSync', 'sass', 'pug'], function () {
  gulp.watch('src/styles/sass/*.sass', ['sass'])
  gulp.watch('src/pug/*pug', ['pug'])
  gulp.watch('src/*.html').on('change', browserSync.reload)
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload)
})

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false
  })
})

gulp.task('pug', function () {
  return gulp.src('./src/pug/*.pug')
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest('./src'))
})
