const path = require("path");
const axios = require("axios");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://movie.douban.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    // before(app) {
    //   app.get("/api/movie", function(req, res) {
    //     const url = "https://movie.douban.com/j/subject_suggest?";
    //     axios
    //       .get(url, {
    //         headers: {
    //           referer: "https://movie.douban.com/",
    //           host: "movie.douban.com",
    //           Accept: "*/*",
    //           Connection: "keep-alive",
    //           "Sec-Fetch-Dest": "empty",
    //           "Sec-Fetch-Mode": "cors",
    //           "Sec-Fetch-Site": "same-origin"
    //         },
    //         params: req.query,
    //       })
    //       .then((response) => {
    //         res.json(response.data);
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    //   });
    // },
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
      .set("public", resolve("public"))
      .set("api", resolve("src/api"))
      .set("base", resolve("src/base"));
  },
};
