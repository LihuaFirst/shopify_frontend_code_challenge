// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const {
	src, dest, watch, series, parallel
} = require('gulp');

// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');

const del = require('del');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');


// File paths
const paths = {
	input: 'src/',
	output: 'dist/',
	scripts: {
		input: 'src/js/*',
		output: 'dist/js'
	},
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: 'dist/css'
	}
}

function clean() {
	return del([paths.output]);
}

// Sass task: compiles the style.scss file into style.css
function cssTask() {
	return src(paths.styles.input)
		.pipe(sourcemaps.init()) // initialize sourcemaps first
		.pipe(sass()) // compile SCSS to CSS
		.pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
		.pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
		.pipe(dest(paths.styles.output)); // put final CSS in dist folder
}


// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
	return src([paths.scripts.input])
		.pipe(concat('main.js'))
		// .pipe(uglify())  // uglify does NOT support ES6
	   .pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(dest(paths.scripts.output));
}

// Copy vendor
function copyVendor() {
	return src([paths.input+'/vendor/'])
			 .pipe(dest(paths.output+'/vendor/'));
	
}

// Watch task: watch SCSS and JS paths for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
	watch([paths.styles.input, paths.scripts.input],
		parallel(cssTask, jsTask));
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
	clean,
	parallel(cssTask, jsTask),
	copyVendor,
	watchTask
);

//exports.clean = clean;
//exports.cssTask = cssTask;
//exports.jsTask = jsTask;
//exports.copyVendor = copyVendor;