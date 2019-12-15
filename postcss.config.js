module.exports = {
  plugins: {
    "cssnano":{
      preset: "default",
    },
    "postcss-import": {},
    "postcss-preset-env": {
      browsers: "last 2 versions"
    },
    autoprefixer: {}
  }
}