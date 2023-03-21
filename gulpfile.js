import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh'
import rename from 'gulp-rename';
import svgo from 'gulp-svgmin'
import del from 'del';
import browser from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import rollup from 'gulp-better-rollup';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// Styles

export const styles = () => {
  return gulp.src('src/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTM

const html = () => {
  return gulp.src('src/*html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

//Scripts
const scripts = () => {
  return gulp.src('src/js/*js')
    .pipe(sourcemaps.init())
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

// images

const optimizeImages = () => {
  return gulp.src('src/img/**/*.{png,jpg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('src/img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'))
}

//WebP

const createWebp = () => {
  return gulp.src('src/img/**/*.{png,jpg}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

//SVG

const svg = () =>
  gulp.src(['src/img/**/*.svg', '!src/img/icons/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));

//Copy

const copy = (done) => {
  gulp.src([
    'src/fonts/*{woff2,woff}',
    'src/*.ico',
    // 'src/manifest.webmanifest'
  ], {
    base: 'src'
  })
    .pipe(gulp.dest('build'))
  done();
}

//Clean

const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('src/sass/**/*.scss', gulp.series(styles));
  gulp.watch('src/js/*.js', gulp.series(scripts));
  gulp.watch('src/*.html', gulp.series(html, reload));
}

//Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    createWebp
  ),
);

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
