let babel = require('gulp-babel')
var autoprefixer = require('gulp-autoprefixer')
var csso = require('gulp-csso')
var del = require('del')
var gulp = require('gulp')
var htmlmin = require('gulp-htmlmin')
var runSequence = require('run-sequence')
var uglify = require('gulp-uglify-es').default
var sass = require('gulp-sass')
var pug = require('gulp-pug')
var watch = require('gulp-watch')
var browserSync = require('browser-sync').create()
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var inject = require('gulp-inject')
var $ = require('gulp-load-plugins')

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]

// minify sass/css styles
gulp.task('styles', function() {
  return (
    gulp
      .src('./src/styles/sass/*.sass')
      .pipe(
        sass({
          precision: 10,
          outputStyle: 'nested',
          includePaths: ['.'],
          onError: console.error.bind(console, 'Sass error:')
        })
      )
      .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest('./dist/styles/css'))
  )
})

paths = {
  jsFiles: './src/js/*.js',
  jsDest: './dist/js',
  cssDest: './dist/styles',
  cssDev: './src/styles/css/*.css'
}

gulp.task('inject', function() {
  return gulp
    .src('./src/*.html')
    .pipe(inject(gulp.src(paths.cssDev), { relative: true }))
    .pipe(inject(gulp.src('./src/js/*.js'), { relative: true }))
    .pipe(gulp.dest('./src'))
})

gulp.task('injectBuild', function() {
  return gulp
    .src('./dist/*.html')
    .pipe(inject(gulp.src(paths.cssDest + '/**/*.css'), { relative: true }))
    .pipe(inject(gulp.src(paths.jsDest + '/*.js'), { relative: true }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('scripts', function() {
  return (
    gulp
      .src(paths.jsFiles)
      .pipe(concat('app.js'))
      .pipe(rename('app.min.js'))
      // .pipe(
      //   babel({
      //     presets: ['es2015']
      //   })
      // )
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'))
      .on('error', function(err) {
        console.log(err.toString())
      })
  )
})

// Gulp task to minify HTML files
gulp.task('pages', function() {
  return gulp
    .src(['./src/*.html'])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: false
      })
    )
    .pipe(gulp.dest('./dist'))
})

// Clean output directory
gulp.task('clean', function() {
  del(['dist'])
})

// Gulp task to minify all files
gulp.task('build', ['clean'], function() {
  runSequence('styles', 'scripts', 'pages', 'injectBuild')
})

gulp.task('sass', function() {
  return gulp
    .src('./src/styles/sass/*.sass')
    .pipe(sass())
    .on('error', function(err) {
      console.log(err.toString())

      this.emit('end')
    })
    .pipe(gulp.dest('./src/styles/css/'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
})

gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
  gulp.watch('src/styles/sass/*.sass', ['sass'])
  gulp.watch('src/pug/*pug', ['pug'])
  gulp.watch('src/*.html').on('change', browserSync.reload)
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload)
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false
  })
})

gulp.task('pug', function() {
  return gulp
    .src('./src/pug/*.pug')
    .pipe(
      pug({
        doctype: 'html',
        pretty: true
      })
    )
    .pipe(gulp.dest('./src'))
})
