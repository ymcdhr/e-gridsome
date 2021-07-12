// src 为gulp中方法：创建一个流，用于从文件系统读取 Vinyl 对象。
// dest为gulp中方法：创建一个用于将 Vinyl 对象写入到文件系统的流。
const gulp = require('gulp')
const { src, dest, watch } = gulp // npm install gulp --save-dev
const less = require('gulp-less') // npm install gulp-less --save-dev



// less件的转换
// style目录中_开头的less文件默认不会处理
// 依赖的插件有：
// 1、gulp-less
const lessTocss = () => {
    return src('src/style/*.less',{ base: 'src'}) // base指定基础目录，转换后release目录才会和src保持一样的结构
        .pipe(less({ outputStyle: 'expanded'})) // { outputStyle: 'expanded'} 参数可以指定结束括号格式化    
        .pipe(dest('src/'))
}

gulp.task("less",()=>{
    watch('src/style/*.less', lessTocss)
})