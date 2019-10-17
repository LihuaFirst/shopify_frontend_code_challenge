// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const {src, dest, watch, series, parallel } = require('gulp');

// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const del = require('del');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify-es').default;

// Configuration File paths
const paths = {
	input: 'src',
	output: 'dist',
	scripts: {
		input: 'src/js/*',
		output: 'dist/js'
	},
	styles: {
		input: 'src/scss/**/*.{scss,sass}',
		output: 'dist/css'
	}
};

const config = {
	localhostPort: 8080
}

// Delete dist directory
function cleanDist() {
	return del([paths.output]);
};

// CSS Transpile: compiles the style.scss file into style.css
function cssTranspile() {
	return src(paths.styles.input)
		.pipe(sourcemaps.init()) // initialize sourcemaps first
		.pipe(sass()) // compile SCSS to CSS
		.pipe(sourcemaps.init()) // start sourcemaps 
		.pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
		.pipe(dest(paths.styles.output)) // put final CSS in dist folder
		.pipe(connect.reload());
};

// CSS Minify: minify css and add suffix
function cssMinify(){
	return src(paths.styles.output+'/style.css')
		 .pipe(cleanCSS({
				debug: true
			}, (details) => { // minify css
				console.log(`${details.name}: ${details.stats.originalSize}`);
				console.log(`${details.name}: ${details.stats.minifiedSize}`);
			}))		
		 .pipe(rename({suffix: ".min"}))  // rename to *.min.css
		 .pipe(dest(paths.styles.output)); // put final CSS in dist folder
}

// JS Transpile: concatenates and uglifies JS files to script.js
function jsTranspile() {
	return src([paths.scripts.input])
		.pipe(concat('main.js'))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(dest(paths.scripts.output))
		.pipe(connect.reload());
};

// JS Minify: minify js and add suffix
function jsMinify(){
	return src(paths.scripts.output+'/main.js')	
		 .pipe(uglify())
		 .pipe(rename({suffix: ".min"}))  // rename to *.min.css
		 .pipe(dest(paths.scripts.output)); // put final CSS in dist folder
}

// Copy vendor files
function copyVendor() {
	return src([paths.input + '/vendor/'])
		.pipe(dest(paths.output + '/vendor'));
};

// Copy index.html file

function htmlTask() {
	return src([paths.input + '/*.html'])
		.pipe(dest(paths.output))
		.pipe(connect.reload());
};

// run a webserver (with Livereload)
function connectServer(done) {
	var options = {
		root: paths.output,
		port: config.localhostPort,
		livereload: true		
	}
	connect.server(options);
	done()
};

// Watch task: watch SCSS and JS paths for changes
// If any change, run scss and js tasks simultaneously
function watchTask(done) {
	watch(paths.input+'/*.html', htmlTask);
	watch(paths.styles.input, series(cssTranspile, cssMinify));
	watch(paths.scripts.input, series(jsTranspile, jsMinify));
	done();
};

// Export the default Gulp task so it can be run
// delete dist, copy vendor files
// Runs the scss and js tasks simultaneously
// then runs connectServer, then watch task
exports.default = series(
	cleanDist,
	copyVendor,
	parallel(htmlTask, cssTranspile, jsTranspile),	
	parallel(cssMinify, jsMinify),
	connectServer,
	watchTask
);

/* Export for testing purpose
   TODO: comment out / remove after testing
exports.cleanDist = cleanDist;
exports.copyVendor = copyVendor;
exports.connectServer = connectServer;
exports.cssTranspile = cssTranspile;
exports.jsTranspile = jsTranspile;
exports.cssMinify = cssMinify;
exports.jsMinify = jsMinify;
*/