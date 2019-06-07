var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var cssnano = require('cssnano');
var header = require('gulp-header');
var postcss = require('gulp-postcss');
var pkg = require('./package.json');
var pug = require('gulp-pug');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

//
// Set the banner content
// remove this if you do not want banners automatically added to your compiled files
//
var banner = ['/*!\n',
  ' * Prototype Template - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2018-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' */\n',
  ''
].join('');

gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(header(banner, { pkg: pkg }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// @ts-ignore
gulp.task('css', ['sass'], function() {
  var plugins = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano()
  ];
  return gulp.src(['./css/site.css', './css/base.css'])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css'));
});

// compile custom javascript file
gulp.task('js', function() {
  return gulp.src("dev/js/*.js")
  .pipe(header(banner, { pkg: pkg }))
  .pipe(gulp.dest('js'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// compile pug templates
gulp.task('views', function () {
  return gulp.src('./src/*.pug')
  .pipe(pug({
    doctype: 'html',
    pretty: true
  }))
  .pipe(gulp.dest('./'));
});

// Configure the browserSync task
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: ''
    },
    ui: {
      port: 8001 // customize port for browserSync UI
    },
    port: 8080, // use 8080 to prevent other localhost conflicts
    reloadOnRestart: true,
    notify: false // prevent the browserSync notification from appear. Set to 'true' to show notification
  });
});

// ensure scss finishes, reload browser
// @ts-ignore
gulp.task('sass-watch', ['css'], function (done) {
  browserSync.reload();
  done();
});

// @ts-ignore
gulp.task('copy-source', ['clean-dist'], function () {
  gulp.src('./README.md').pipe(gulp.dest('./dist'));
  gulp.src('./package.json').pipe(gulp.dest('./dist'));
  gulp.src('./manifest.json').pipe(gulp.dest('./dist'));
  gulp.src('./favicon.*').pipe(gulp.dest('./dist'));
  gulp.src('./css/*.min.css').pipe(gulp.dest('./dist/css'));
  gulp.src('./js/*.*').pipe(gulp.dest('./dist/js'));
  gulp.src('./assets/**/*.*').pipe(gulp.dest('./dist/assets/'));
  gulp.src('./*.html').pipe(gulp.dest('./dist'));
});

gulp.task('clean-dist', function () {
  return gulp.src("dist/", {read: false})
    .pipe(clean());
});

// @ts-ignore
gulp.task('build', ['copy-source']);

// Dev task with browserSync
// @ts-ignore
gulp.task('serve', ['css', 'js'], function () {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    ui: {
      port: 8001 // customize port for browserSync UI
    },
    port: 8080, // use 8080 to prevent conflicts with other localhosts
    reloadOnRestart: true,
    notify: false // prevent the browserSync notification from appearing
  });
  gulp.watch('sass/*.scss', ['sass-watch']);
  gulp.watch('src/**/*.pug', ['views']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Run everything
// @ts-ignore
gulp.task('default', ['css', 'js', 'views']);
