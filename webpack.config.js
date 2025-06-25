const path = require("path");

// NodeJS 익스포트 구문.
module.export = {
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    // 출력 경로는 tsconfig.json 파일의 경로과 일치해야 함.
    // 절대 경로로 써줘야 함.
    // 특정 경로에 절대 경로 구축.
    path: path.resolve(__dirname, "dist"),
  },
};
