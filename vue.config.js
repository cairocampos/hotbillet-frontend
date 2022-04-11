module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://apihomolog.hotbillet.com.br/",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
