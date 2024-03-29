import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isDevelopment = process.env.NODE_ENV !== "production";
const __dirname = path.resolve();

/**
 * @type {import("webpack").Configuration}
 */
export default {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "main.js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".html"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    compress: true,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
