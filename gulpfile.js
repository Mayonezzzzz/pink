const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const csso = require("postcss-csso");
const del = require("del");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

//Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
      ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
}

exports.html = html;

//Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(terser())
    .pipe(rename(function(path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

  exports.scripts = scripts;

//Images

const optimizeImages = () => {
  return gulp.src(["source/img/**/*.{png,jpg,svg}","!source/img/sprite.svg"])
    .pipe(imagemin([
      imagemin.mozjpeg({progressive:true}),
      imagemin.optipng({optimizationLevel:3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = optimizeImages;

const copySprite = () => {
  return gulp.src("source/img/sprite.svg")
    .pipe(gulp.dest("build/img/"))
}

exports.copySprite = copySprite;

const copyImages = (done) => {
  gulp.src(["source/img/**/*.{png,jpg,svg}","!source/img/sprite.svg"])
  .pipe(gulp.dest("build/img"))
  done();
}

exports.copyImages = copyImages;

//Webp

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

//Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports. copy = copy;

//Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;


// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html)).on("change", sync.reload);
}

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    copySprite,
    createWebp
  ),
);

exports.build = build;

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    copySprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
