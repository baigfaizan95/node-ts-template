var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var clean = require("gulp-clean");
const path = require('path');
gulp.task("compile", () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return gulp
    .src("build", { allowEmpty: true }, {read: false})
    .pipe(clean());
});

gulp.task("copy-template", () => {
  return gulp.src([path.join(__dirname, 'src/templates') + '**/**/*']).pipe(gulp.dest(path.join(__dirname, 'build')));
});

gulp.task("watch", () => {
  gulp.watch("./src/**/*", gulp.series("compile"));
});

gulp.task("default", gulp.series("clean", "copy-template"));
