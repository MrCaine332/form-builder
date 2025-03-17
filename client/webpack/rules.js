const path = require("path")

module.exports = [
  {
    // Start Babel
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    include: path.resolve(__dirname, "..", "./src"),
    use: [{ loader: "babel-loader" }],
  }, // End Babel

  {
    // Start CSS
    test: /\.css$/i,
    // exclude: /node_modules/,
    include: path.resolve(__dirname, ".."),
    use: ["style-loader", "css-loader", "postcss-loader"],
  }, // End CSS

  // {
  //   // Start CSS
  //   test: /\.css$/i,
  //   include: path.resolve(__dirname, ".."),
  //   use: ["style-loader", "css-loader", "postcss-loader"],
  // }, // End CSS

  {
    // Start Images
    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
    type: "asset/resource",
  }, // End Images

  {
    // Start Inline
    test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
    type: "asset/inline",
  }, // End Inline
]
