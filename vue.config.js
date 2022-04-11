module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "http://apihomolog.hotbillet.com.br/",
        changeOrigin: true,
      },
    },
  }
};
