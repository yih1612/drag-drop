const path = require("path");

// NodeJS 익스포트 구문.
module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    // 출력 경로는 tsconfig.json 파일의 경로과 일치해야 함.
    // 절대 경로로 써줘야 함.
    // 특정 경로에 절대 경로 구축.
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  // 웹팩에게 추출해야 하는 소스맵이 생성될 것이라고 알려주고,
  // 웹팩이 제대로 번들을 구현하도록 구성하여 번들링이 완료될 때, 탁월한 개발 경험을 제공.
  devtool: "inline-source-map",
  // 웹팩에게 타입스크립트 파일로 뭘 할지 알려주는 곳.
  // 모듈은 자바스크립트 객체로 구성된다.
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  // 찾아낸 임포트에 어떤 파일 확장자를 추가할지 전달.
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
};
