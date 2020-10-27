const path = require('path')
const pxtoview = require('postcss-px-to-viewport')

// 暴露
module.exports = {
  style: {
    postcss: {
      plugins: [
        pxtoview({  // 调用pxtoview函数
          viewportWidth: 375,
        })
      ]
    }
  },
  webpack: {
    // 配置别名
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }
}