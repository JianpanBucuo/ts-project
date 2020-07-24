const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
module.exports = {
    mode: 'development',
    
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        // 初始值是空对象，dir是数组里的值
        //dir是读取目录后数组里的值   [1,2,3,4]
        
        const fullDir = path.join(__dirname,dir)
        const entry = path.join(fullDir, 'app.ts')
        if(fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)){
            // fullDir 是否是一个 文件夹
            // fullDir下，是否存在 app.ts文件
            entries[dir] = ['webpack-hot-middleware/client', entry]
            console.log(entry)
        }
        return entries 
    },{}),
    output:{
        path:path.join(__dirname, '__build__'),
        filename:'[name].js',
        publicPath:'/__build__/'
    },
    
  module: {
    rules: [
 
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}