//引入gulp及gulp插件
var gulp = require("gulp"),
	runSequence = require('run-sequence'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	convertEncoding = require('gulp-convert-encoding');

//定义js源文件路径
var postUrl = "js/website.js",
	//css文件路径
	websitecss = "css/website.css";

var jsonArr = [postUrl, websitecss];

//生成对应的json文件
//teskName:任务名称
//path:存储路径

function revFile(teskName, jsonArr, path) {
	gulp.task(teskName, function() {
		return gulp.src(jsonArr)
			.pipe(rev())
			.pipe(rev.manifest())
			.pipe(gulp.dest(path));
	});
}

var replacePath = ['rev/rev-manifest.json', './*.html'];

function replaceFile(teskName, replacePathArr, savePath) {
	gulp.task(teskName, function() {
		return gulp.src(replacePathArr)
			.pipe(revCollector())
			.pipe(convertEncoding({
				iconv: {
					decode: {},
					encode: {
						addBOM: true
					}
				},
				to: "utf8"
			}))
			.pipe(gulp.dest(savePath));
	});
}

revFile("revJson", jsonArr, "rev");
replaceFile("replaceJson", replacePath, "./");

//开发构建
gulp.task('dev', function(done) {
	condition = false;
	runSequence(
		['revJson'], ['replaceJson'], done);
});

gulp.task('default', ['dev']);