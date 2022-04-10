const CracoAlias = require('craco-alias')
const CracoLess = require('craco-less')

module.exports = {
  // antd 按需加载
  // @craco/craco 6.x 需要使用这种方式
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    ],
  },

  plugins: [
    {
      plugin: CracoAlias,
      options: {
        // 从 '/jsconfig.json' 中的获取配置
        source: 'jsconfig',
      },
    },

    {
      plugin: CracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
