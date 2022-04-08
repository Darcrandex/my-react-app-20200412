const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        // 从 '/jsconfig.json' 中的获取配置
        source: "jsconfig",
      },
    },
  ],
};
