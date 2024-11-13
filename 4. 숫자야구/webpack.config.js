const { VueLoaderPlugin } = require('vue-loader');
/* 절대경로 추가 */
const path = require('path')

/* 모듈 내보내기 - 웹팩킹에 대한 webpack 설정 */
module.exports = {
  mode: 'development', // 개발시 development 배포시 production
  devtool: 'eval', // 개발시 eval(속도가 빠름) 배포시 hidden-source-map
  resolve: {
    extensions: ['.js', '.vue'] // 확장자 처리 : import시  .js, .vue 확장자 생략이 가능
  },
  /**
   * 모든 script를 하나로 합칠때 대표가되는 파일
   * 키(프로퍼티)로 접근한다.
   */
  entry: {
    // app: './main.js'
    app: path.join(__dirname, 'main.js') // 절대경로 생성 `/4. 숫자야구/main.js`
  },
  /**
   * webpack의 핵심이다.
   * rulse 배열 속성에 어떻게 합칠지, 처리할지를 정한다.
   */
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  output: {
    filename: '[name].js', /* [name]: entry.app을 참조한다. (app.js 명시적 할당 가능) */
    // path: './dist', /* entry.app으로 등록한 하나의 script 파일이 저장될 디렉토리 경로 (app.js가 저장된다.) */
    path: path.join(__dirname, 'dist'), /* 절대경로 => `/4. 숫자야구/dist` [arg1]: 현재 파일의 디렉토리 경로, [arg2]: 합칠 경로 */
  },
}