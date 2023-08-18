const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

const OUTPUT_PATH = path.resolve(__dirname, "dist");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: OUTPUT_PATH,
    filename: "index.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        context: path.resolve(__dirname, "files"),
        from: "**",
        to: OUTPUT_PATH
      }]
    })
  ]
};
