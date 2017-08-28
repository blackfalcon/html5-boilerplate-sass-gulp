
'use strict';

// Core references for this to work
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = browserSync.reload,
    clean = require('gulp-clean');

// var listing of files for dist build
var filesToDist = [
    './src/*.html',
    './src/css/**/*.*',
    './src/images/**/*.*',
    './src/js//**/*.js'
];

// Use for stand-alone autoprefixer
var gulpautoprefixer = require('gulp-autoprefixer');

// alternate vars if you want to use Postcss as a setup
var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

// Gulp task when using gulp-autoprefixer as a standalone process
gulp.task('build:css', function() {
    gulp.src('./src/sass/{,*/}*.{scss,sass}')
        .pipe(sourcemaps.init())
        .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded' //alt options: nested, compact, compressed
    }))
        .pipe(gulpautoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/css'))
        .pipe(reload({stream: true}));
});

// Static Server + watching scss/html files
gulp.task('serve', ['build:css'], function() {

    browserSync.init({
        server: "./src/",
        port: 8080
    });

    gulp.watch('./src/sass/{,*/}*.{scss,sass}', ['build:css']);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
});

// Sass watcher
gulp.task('sass:watch', function() {
    gulp.watch('./src/sass/{,*/}*.{scss,sass}', ['build:css'])
});

// resource cleaning task
gulp.task('clean', function(){
  return gulp.src(['dist/*'], {read:false})
  .pipe(clean());
});

// dist build tasks
// see var filesToDist for specific files
gulp.task('build:dist',['clean'], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToDist, { base: './src/' })
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build:css', 'sass:watch', 'serve']);
