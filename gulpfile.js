var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer');


// Error Log function
function errorLog(error){
  console.error.bind(error);
  this.emit('end');
}

// Scripts task
// Uglifies
gulp.task('scripts', function(){
    gulp.src('js/*.js')
      .pipe(uglify())
      .on('error', errorLog)
      .pipe(gulp.dest('build/js'));

});

// styles task compiles scss and compresses css
gulp.task('styles', function(){
    sass('./css/scss/**/*.scss', {
        style:'compressed'
    })
    .on('error', errorLog) //sass.logError or console.error.bind(console)
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('css/'))
    .pipe(livereload());
});
//livereloads html pages
gulp.task('pages', function(){
    gulp.src('./*.html')
    .pipe(livereload());
});

// image compression
gulp.task('image', function(){
  gulp.src('img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('build/images'));
})
// watch task
// watches js
gulp.task('watch', function(){
  livereload.listen();
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('./css/scss/**/*.scss', ['styles']);
    gulp.watch('img/*', ['image']);
    gulp.watch('./*.html', ['pages']);
});



gulp.task('default', ['scripts', 'pages','styles','image', 'watch']);
