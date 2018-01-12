const gulp           = require('gulp');
const ts             = require('gulp-typescript');
const changed        = require('gulp-changed');
const nodemon        = require('gulp-nodemon');
const livereload     = require('gulp-livereload');
const sequence       = require('gulp-sequence')
//const gulpHandlebars = require('gulp-handlebars')
//const handlebars     = require('handlebars')
//const defineModule   = require('gulp-define-module')

// pull in the project Typescript config
const tsProject = ts.createProject('tsconfig.json', {
    declaration: false
});
const DEST = 'dist/';

//task to be run when the watcher detects changes
gulp.task('scripts', () => {
    const tsResult = gulp.src('src/**/*.ts')
        .pipe(changed(DEST))
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(DEST));
});

gulp.task('sourceJSON', () => {
    return gulp.src('src/*/**.json')
      .pipe(gulp.dest(DEST))
  })

//set up a watcher to watch over changes
gulp.task('watch', () => {
    livereload.listen({
      port: 35730
    })
    // gulp.watch('src/**/*.ts', ['scripts'])
    gulp.watch('config/*.json', () => {
      livereload()
    })
    nodemon({
      // exec: 'node-inspector & node --inspect',
      nodeArgs: ['--inspect'],
      // script: 'bin/www',
      ext: 'ts json hbs',
      tasks: ['scripts', 'sourceJSON'],
      ignore: ['node_modules/', 'dist/']
    })
  })

gulp.task('dev', sequence('scripts', 'sourceJSON', 'watch'))