const { src, dest, parallel } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;

function html() {
  return src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./dist/'));
}

function css() {
  return src('./css/**/*.css')
    .pipe(
      purgecss({
        content: ['./**/*.html'],
      })
    )
    .pipe(cleanCSS())
    .pipe(dest('./dist/css/'));
}

function js() {
  return src('./js/**/*.js')
    .pipe(uglify())
    .pipe(dest('./dist/js/'));
}

function images() {
  return src('./images/*').pipe(dest('./dist/images/'));
}

exports.default = parallel(css, js, html, images);
