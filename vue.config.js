module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://homolog.hotbillet.com.br:8090/",
        changeOrigin: true,
      },
    },
  }
};
