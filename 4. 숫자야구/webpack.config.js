/* 모듈 내보내기 - 웹팩킹에 대한 webpack 설정 */
module.exports = {
  /**
   * 모든 script를 하나로 합칠때 대표가되는 파일
   * 키(프로퍼티)로 접근한다.
   */
  entry: {
    app: './main.js'
  },
  /**
   * webpack의 핵심이다.
   * rulse 배열 속성에 어떻게 합칠지, 처리할지를 정한다.
   */
  module: {
    rules: [{

    }]
  },
  plugins: [],
  output: {
    filename: '[name].js', /* [name]: entry.app을 참조한다. (app.js 명시적 할당 가능) */
    path: './dist', /* entry.app으로 등록한 하나의 script 파일이 저장될 디렉토리 경로 (app.js가 저장된다.) */
  },
}