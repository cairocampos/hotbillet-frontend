module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "https://apihomolog.hotbillet.com.br/",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
};
