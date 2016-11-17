var gulp = require("gulp");
var rev = require("gulp-rev");     //文件名添加版本号，哈希码
var revReplace = require("gulp-rev-replace");      //更新引用
var useref = require("gulp-useref");     //合并命名注释
var filter = require("gulp-filter");
var uglify = require("gulp-uglify");
var csso = require("gulp-csso");

gulp.task("default", function() {
    var jsFilter = filter("**/*.js",{restore:true});
    var cssFilter = filter("**/*.css",{restore:true});
    var indexHtmlFilter = filter(["**/*","!**/index.html"],{restore:true});

    return gulp.src("src/index.html")
        .pipe(useref())      // Concatenate with gulp-useref
        .pipe(jsFilter)
        .pipe(uglify())             // Minify any javascript sources
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())               // Minify any CSS sources
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())         // Substitute in new filenames
        .pipe(gulp.dest('dist'));
});
