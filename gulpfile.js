const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const del = require('del');

function html() {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
}

function css() {
  return gulp
    .src('src/css/**/*.css')
    .pipe(
      purgecss({
        content: ['src/**/*.html'],
        whitelist: ['is-active']
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
}

function js() {
  return gulp
    .src('src/js/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
}

function images() {
  return gulp.src('src/images/*').pipe(gulp.dest('dist/images'));
}

function cleanDist() {
  return del(['dist']);
}

exports.default = gulp.series(cleanDist, gulp.parallel(html, css, js, images));
