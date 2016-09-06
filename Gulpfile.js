
'use strict';

// Core references for this to work
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = browserSync.reload;

// Use for stand-alone autoprefixer
var gulpautoprefixer = require('gulp-autoprefixer');

// alternate vars if you want to use Postcss as a setup
var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

// Gulp task when using gulp-autoprefixer as a standalone process
gulp.task('build:css', function() {
    gulp.src('./sass/{,*/}*.{scss,sass}')
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
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream: true}));
});

// Static Server + watching scss/html files
gulp.task('serve', ['build:css'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('./sass/{,*/}*.{scss,sass}', ['build:css']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Sass watcher
gulp.task('sass:watch', function() {
    gulp.watch('./sass/{,*/}*.{scss,sass}', ['build:css'])
})

gulp.task('default', ['build:css', 'sass:watch', 'serve']);
