import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import browser from "browser-sync";
import imagemin from "gulp-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminOptipng from "imagemin-optipng";
import sourcemaps from "gulp-sourcemaps";
import htmlmin from "gulp-htmlmin";
import terser from "gulp-terser";
import webp from "gulp-webp";
import svgstore from "gulp-svgstore";
import rename from "gulp-rename";
import del from "gulp-clean";

export const clean = () => {
  return gulp.src("build").pipe(del({ force: true }));
};

const scripts = () => {
  return gulp
    .src("source/js/**/*.js")
    .pipe(terser())
    .pipe(gulp.dest("build/js"))
    .pipe(browser.stream());
};

export const optimizeImg = () => {
  return gulp
    .src("source/img/**/*.*")
    .pipe(
      imagemin([
        imageminMozjpeg({ quality: 75, progressive: true }),
        imageminOptipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest("build/img"));
};

export const flagSprite = () => {
  return gulp
    .src("source/img/flags/*.svg")
    .pipe(svgstore())
    .pipe(rename("flagSprite.svg"))
    .pipe(gulp.dest("build/img"));
};

const copyImg = () => {
  return gulp.src("source/img/**/*.*").pipe(gulp.dest("build/img"));
};

const makeWebp = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
};

export const html = () => {
  return gulp
    .src("source/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

export const styles = () => {
  return gulp
    .src("source/sass/**/*.+(scss|sass)", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/*.html").on("change", gulp.series(html, browser.reload));
  gulp.watch("source/js/**/*.js").on("change", gulp.series(scripts));
  gulp.watch("source/img/**/*").on("all", gulp.series(optimizeImg));
};

export const copy = () => {
  return gulp
    .src(["source/fonts/*", "source/*.ico", "source/img/**/.svg"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
};

export default gulp.series(
  clean,
  copy,
  styles,
  html,
  scripts,
  copyImg,
  makeWebp,
  server,
  watcher
);
