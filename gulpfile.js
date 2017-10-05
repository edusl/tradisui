/*
Gulpfile.js
Proyecto: Registradores de la propiedad
*/

/* gulp config */
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var merge = require('merge-stream');
var svgSymbols = require('gulp-svg-symbols');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync');
//var styledocco = require('gulp-styledocco');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var inlineCss = require('gulp-inline-css');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');

var reload = browserSync.reload;

/* paths */

var bases = {
 src: 'app/',
 assets: 'static/',
 app: 'app/',
 dist: 'dist/'
};

var paths = {
    css: bases.assets + 'css/common/',
    js: bases.assets + 'js/common/',
    img: bases.assets + 'img/common/',
    font: bases.assets + 'fonts/common/',
    styleguide: 'styleguide/',
    mail: 'templates/mail/'
};

//
// gulp.task('changepath', function() {
//   gulp.src(bases.dist + paths.css + 'main.css')
//     .pipe(replace('../..', '#staticServerUri#'))
//     .pipe(replace('../img/common', '#staticServerUri#'))
//     .pipe(replace('../fonts', '#staticServerUri#'))
//     .pipe(gulp.dest(bases.dist + paths.css + '/prod'))
// })
//
//
// gulp.task('changepath', function(){
//   gulp.src(bases.dist + paths.css + 'main.css')
//     .pipe(replace('{customPath}', '#staticServerUr1111#'));
//   gulp.dest(bases.dist + paths.css + '/prod')
//     .pipe(replace('{customPath}', '#staticServerUr222#'));
//     // .pipe(gulp.dest(bases.dist + paths.css + ''));
// });
//
//

// Browser sync reload
//
gulp.task('bs-reload', function () {
  browserSync.reload();
});


// Pug watch

gulp.task('pug-watch', ['templates', 'sass'], reload);
gulp.task('mail-watch', ['mail-templates'] );


// Browser sync task

gulp.task('browser-sync', function() {
    browserSync.init({
        /* for vhost */
        //proxy: 'your_dev_site.url'

        /* for static server */
        server: {
            baseDir: 'dist/'
        }
    });
});


// Clean directories

gulp.task('clean', function (done) {
    return gulp.src(bases.dist, {read: false})
        .pipe(clean())
        .on('end', function () { done(); });
});



// Rendering scss files into css

//gulp.task('sass', ['changepath'], function () {
gulp.task('sass', function () {
    gulp.src(bases.app + paths.css + '*.scss')
    .pipe(plumber())
    .pipe(sass({
      //  includePaths: ['scss'].concat(neat)
    }))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(bases.dist + paths.css))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleancss({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(bases.dist + paths.css))
    /* Reload the browser CSS after every change */
    //.pipe(reload({stream:true}));
    .on('end', function () { browserSync.reload(); });

});



// Create svg sprite
gulp.task('svg-sprite', function () {

    // Define source files

    return gulp.src(bases.app + paths.img + 'svg/*.svg' )

        // Run the svg-symbols module, whilst prefixing the created classnames
        .pipe(
            svgSymbols({
                className: '.icon--%f',
                svgClassname: 'svg-icon',
                title: false,
                warn: false
            })
        )

        // Define where the respond is distributed to
        .pipe(gulp.dest(bases.dist + paths.img + 'svg/'))
        .on('end', function () { browserSync.reload(); });
});



// Png sprite generator

gulp.task('png-sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src(bases.app + paths.img + 'png/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../img/common/png/sprite.png',
    cssName: '_sprite.css'
  }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    //.pipe(buffer())
    //.pipe(imagemin())
    .pipe(gulp.dest(bases.dist + paths.img + 'png/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    //.pipe(cleancss())
    .pipe(gulp.dest(bases.app + paths.css + 'tradis'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});



// Copy files

gulp.task('files', function() {
  gulp.src(bases.app + paths.font + '**/*')
  .pipe(gulp.dest(bases.dist + paths.font));

  gulp.src(bases.app + paths.img + '**/*')
  .pipe(gulp.dest(bases.dist + paths.img));

  // gulp.src(bases.app + paths.img + 'svg/*')
  // .pipe(gulp.dest(bases.dist + paths.img + 'svg/files/'));
  //
  // gulp.src(bases.app + paths.js + '**/*')
  // .pipe(gulp.dest(bases.dist + paths.js));
});



// Rendering gulp files into html

// gulp.task('templates', function() {
//   return gulp.src(bases.app + '**/!(_)*.pug')
//       .pipe(changed(bases.dist))
//       .pipe(pug({
//           pretty: '\t',
//           compileDebug: true
//       }))
//       .pipe(gulp.dest(bases.dist));
// });


gulp.task('templates', function() {
    gulp.src(bases.app + '**/!(_)*.pug')
        .pipe(changed(bases.dist, {extension: '.html'}))
        // `ngAnnotate` will only get the files that
        // changed since the last time it was run
        .pipe(pug({
            pretty: '\t',
            compileDebug: true
        }))
        .pipe(gulp.dest(bases.dist))
        .on('end', function () { browserSync.reload(); });
});



gulp.task('mail-templates', function() {
  return gulp.src(bases.app + paths.mail + '**/!(_)*.pug')
      .pipe(pug({
          pretty: '\t',
          compileDebug: true
      }))
      .pipe(inlineCss({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: false,
            removeLinkTags: true
      }))
      .pipe(gulp.dest(bases.dist + paths.mail));
});


// Compress and copy js files

gulp.task('scripts', function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    bases.app + paths.js + 'vendors/jquery-3.1.1.js',
    bases.app + paths.js + 'vendors/validator/jquery-form-validator-2.3.76.js',
    bases.app + paths.js + 'vendors/jquery-ui-1.12.1.js',
    bases.app + paths.js + 'vendors/validator/logic.js',
    bases.app + paths.js + 'vendors/validator/security.js',
    bases.app + paths.js + 'vendors/validator/spanish-id.js',
    bases.app + paths.js + 'vendors/validator/validate_spanish_id.js',
    bases.app + paths.js + 'vendors/validator/jquery.pwstrength.js',
    //bases.src + paths.js + 'vendors/validator/aeat-ajax-validation-identify.js',
    bases.app + paths.js + 'vendors/stickyjs/jquery.sticky.js',
    bases.app + paths.js + 'vendors/sha3.js',
    bases.app + paths.js + 'app.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(bases.dist + paths.js))
//    .pipe(rename({suffix: '.min'}))
//    .pipe(uglify())
//    .pipe(gulp.dest(bases.dist + paths.js));
  .on('end', function () { browserSync.reload(); });
});


/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'svg-sprite', 'png-sprite', 'templates', 'scripts', 'files', 'browser-sync'], function () {

    /* Watch scss, run the sass task on change. */
    gulp.watch([bases.app + '**/*.pug'], ['templates']);

    gulp.watch([bases.app + paths.css + '**/*.scss'], ['sass'])

    gulp.watch([bases.app + paths.img + '**/*'], ['svg-sprite', 'png-sprite']);

    gulp.watch([bases.app + paths.font + '**/*'], ['files']);

    gulp.watch([bases.app + paths.js + '**/*'], ['scripts']);

});


/* Watch scss, js and html files, doing different things with each. */
gulp.task('mail', ['files', 'mail-templates', 'browser-sync'], function () {

    gulp.watch([bases.app + '**/*.pug'], ['mail-watch']);

});
