const path = require('path')

module.exports = {
  entry: {
    board: "./src/board",
    client: "./src/client"
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "[name].js"
  }
}
