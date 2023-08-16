const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Use the 'sass' package for compiling
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Paths for your source and destination folders
const src = './src/sass/**/*.scss'; // Source Sass files
const dest = './dist/css'; // Destination folder for compiled CSS

// Define the 'sass' task
gulp.task('sass', function () {
    return gulp.src(src)
        .pipe(sourcemaps.init()) // Initialize sourcemaps
        .pipe(sass().on('error', sass.logError)) // Compile Sass using 'sass' package
        .pipe(autoprefixer()) // Autoprefix CSS properties
        .pipe(cleanCSS()) // Minify CSS
        .pipe(rename({ suffix: '.min' })) // Rename to .min.css
        .pipe(sourcemaps.write('.')) // Write sourcemaps
        .pipe(gulp.dest(dest)); // Output to destination folder
});

// Watch task to automatically compile Sass when files change
gulp.task('watch', function () {
    gulp.watch(src, gulp.series('sass'));
});

// Default task to run 'sass' and 'watch' tasks
gulp.task('default', gulp.parallel('sass', 'watch'));
