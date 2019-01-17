'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
	'last 3 versions',
	'ie 8',
	'ie 9'
];

// Gulp task to minify CSS files
gulp.task('styles', function () {
	return gulp.src('css/style.css')
	// Auto-prefix css styles for cross browser compatibility
	.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
	// Bundle css files
	.pipe(concatCss("bundle-css.css"))
    // Minify + rename the file
    .pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
    // Output
    .pipe(gulp.dest('tools'));
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
	return gulp.src([
        'js/chart.js',
        'js/entry.js',
        'js/resize.js'
    ])
	// Bundle js files
	.pipe(concat('bundle-js.js'))
	.pipe(babel({
		presets: ['env']
    }))
	// Minify + rename the file
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	// Output
	.pipe(gulp.dest('tools'))
	//Live reload
	.pipe(browserSync.stream());
});

gulp.task('serve', ['scripts'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("js/*.js", ['scripts']);
	gulp.watch("./*.html").on('change', browserSync.reload);
});

// Gulp task to optimize images
/*gulp.task('images', function() {
    gulp.src('src/images/new/*')
        .pipe(imagemin())
        .pipe(gulp.dest('wp-content/uploads/2018/08'));
	}
);*/

// Clean output directory
gulp.task('clean', () => del(['tools/**/*.css', 'tools/bundle-js.min.js']));

// Main gulp task to run styles, scripts, images
gulp.task('default', ['clean'], function() {
	runSequence(
		'styles',
		'scripts'
	);
});