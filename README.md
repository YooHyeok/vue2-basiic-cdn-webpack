# vue2-basic-cdn-zerocho

<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">CDN</summary>
<br>

Webpack Babel이 아닌 순수 HTML로 Vue를 구현한다.

```html
<!DOCTYPE html>
<head>
  <title>구구단</title>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"><!-- 태그 추가 --></script>
</head>
<body>
</body>
</html>
```
</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">Vue 인스턴스 초기화 및 root 영역 할당</summary>
<br>

```html
<body>
  <div id="root">
  </div>
</body>
<script>
  /* CDN Script를 통해 아래 코드만으로 Main div를 Vue의 컴포넌트, 템플릿으로 전환할 수 있다. */
  const app = new Vue({
    el: '#root' /* HTML상의 해당 영역에 Vue 인스턴스가 적용된다. */
  });
</script>
```


</details>


<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">data 속성</summary>
<br>

Vue나 React 같은 싱글페이지 애플리케이션의 경우 브라우저의 주소창이 변경되지 않는다.
즉, 하나의 페이지에서 화면을 바꾸는 원리이므로 기존 코딩된 영역 혹은 데이터가 다른 영역/데이터로 변경된다.
따라서 뷰나 리액트에서는 어떤 영역이 변경 되는지를 파악하는것이 중요하고,
변경되는 대상을 데이터로 관리해야 한다.

예를들어 좋아요 버튼을 눌렀을때 버튼이 사라지면서 "좋아요 버튼 눌림" 이라는 텍스트가 출력되기 위해서는
좋아요 버튼이 데이터로서 관리되어야 한다.

```html
<script>
  const app = new Vue({
    el: '#root',
    data: {
      liked: false
    }
  });
</script>
```
기존 바닐라 자바스크립트나 jQuery의 경우 데이터가 바뀌면 변경된 데이터에 따라서 append remove 등의 작업을 따로 코드를 통해 dom을 수정을 해줘야하지만 
Vue에서는 데이터의 변경을 감지하고 데이터가 사용되는 영역을 자동으로 수정해주기 때문에 작업이 줄어든다.

**`Vue는 데이터만(를) 관리한다`를 핵심 으로 생각, 사고방식을 바꿔야만 퍼블리싱, JQuery를 했던 사람들이 Vue나 React에 적응하기 쉬워진다.**
해당 데이터는 위의 코드와 같이 data 속성을 정의하여 객체로 관리한다.
해당 객체는 this로 접근이 가능하다.
`data.liked` == `this.liked`

</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">methods 속성</summary>
<br>

Vue 에서 methods 속성은 반응형 데이터인 data를 사용해 특정 동작을 수행하는 함수를 정의하는데 사용한다.
methods에 정의된 함수는 UI의 이벤트(클릭, 입력 등)에 반응하여 데이터의 상태를 변경하거나 필요한 작업을 수행한다.

일반적으로 methods 속성을 사용하는 이유는 다음과 같다.
 - 이벤트 기반 동작: 버튼을 클릭하거나 특정 액션이 발생했을 때 동작할 함수를 정의할 수 있다.
 - 데이터 변경, 화면 업데이트: methods 속성 내 함수에서 data 속성의 값을 변경하면, Vue의 반응형 시스템이 해당 데이터와 연결된 화면 영역을 자동으로 업데이트 한다.

 ```html
<script>
  const app = new Vue({
    el: '#root',
    data: {
      liked: false
    },
    methods: {
      onClickButton() {
        this.liked = true; // data.liked = true와 같게 동작된다.
      }
    }
  });
</script>
```
위 코드에서 onClickButton 메소드는 liked의 상태를 true로 변경하여 최초 1회 false를 true로 변경하게 한다.  
이처럼 Vue에서는 이벤트에 따라 동작을 분리하여 정의하고 데이터를 제어하는 방식으로 개발하는 것이 중요하다.
기존 바닐라 자바스크립트나 jQuery의 경우 클릭시 dom을 수동으로 조작하고, 버튼 상태에 따라 새로운 HTML을 추가하거나 CSS를 수정해야 했다.  
반면 Vue는 methods 속성에서 데이터를 변경하는 것만으로 Vue의 반응형 시슽메이 DOM을 자동으로 조작해주기 때문에 코드의 가독성과 유지보수가 크게 향상된다.
**핵심적으로 Vue에서는 데이터와 동작을 분리하여, 필요한 동작은 methods에 정의하고, UI는 데이터에 따라 자동으로 업데이트된다고 이해하면 좋다**

</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">이벤트와 v-on 디렉티브</summary>
<br>

js에서는 이벤트 리스너에 함수 등록을 onclick이라는 속성에 등록한다.  
vue에서는 v-on 디렉티브를 활용한다.  
`v-on:이벤트명="실행코드"` 형태로 특정 이벤트에 통해 실행할 코드를 바인딩한다.  
아래 예제는 click이벤트에 onCLickButton 메소드를 `v-on:click="onClickButton"` 형태로 바인딩하는 예제 코드이다.  

- ### 예제코드

  ```html
  <body>
    <div id="root">
      <button v-on:click="onClickButton">Like</button> <!-- v-on 디렉티브 이벤트 바인딩 -->
    </div>
  </body>
  <script>
    const app = new Vue({
      el: '#root',
      data: {
        liked: false,
      },
      methods: {
        onClickButton() {
          console.log(this.liked)
          this.liked = true;
          console.log(this.liked)
        }
      }
    });
  </script>
  </html>
  ```

## 축약형
`v-on:이벤트명="실행코드"` 디렉티브의 축약형으로 `@이벤트명="실행코드"`와 같이 사용할 수 있다.  

- ### 예제코드
  ```html
  <body>
    <div id="root">
      <button @click="onClickButton">Like</button> <!-- v-on 디렉티브 축약형 @ 적용 -->
    </div>
  </body>
  <script>
    const app = new Vue({
      el: '#root',
      data: {
        liked: false,
      },
      methods: {
        onClickButton() {
          console.log(this.liked)
          this.liked = true;
          console.log(this.liked)
        }
      }
    });
  </script>
  </html>
  ```
## 이벤트 수식어
일반적인 js 방식에서 이벤트 핸들러 함수 내부에 `event.preventDefault();` 또는 `event.stopPropagation();` 을
호출한다.
vue에서는 이러한 DOM 이벤트 세부사항을 핸들러 내에서 처리하지 않고, 핸들러에서는 데이터 로직만 처리할 수 있도록 v-on 디렉티브에 **이벤트 수식어**를 제공한다.  

`v-on.이벤트명.수식어` 형태로 사용한다.  
 - ex) `v-on.click.prevent`
   -  e.preventDefault();
- 수식어 종류
  - .stop
  - .prevent
  - .capture
  - .self
  - .once
  - .passive

### 이벤트 수식어 체이닝
이벤트 수식어는 체이닝이 가능하다.  
`v-on.이벤트명.수식어1.수식어2` 형태로 사용하며, 체이닝 순서로 수식어를 작동시킨다.  
 - ex 1) `v-on.click.prevent.stop`
   1. e.preventDefault();
   2. e.stopPropagation();

 - ex 2) `v-on.click.prevent.stop`
   1. e.stopPropagation();
   2. e.preventDefault();

</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">v-if 디렉티브 (v-else-if/v-else)</summary>
<br>

# `v-if`
js에서는 조건부 렌더링을 dom 객체를 직접 탐색하여 css 속성을 부여하여 제어한다.  
react에서는 3항연산자나 && 혹은 || 조건으로 데이터 혹은 JSX 태그를 직접 제어한다.  
vue 에서는 v-if 디렉티브 속성을 data 변수와 함께 부여하여 조건부 렌더링을 적용한다.

- ### 예제코드

  ```html
  <body>
    <div id="root">
      <div v-if="liked">좋아요 눌렀음</div> <!-- v-if 조건부 랜더링 적용 -->
      <button v-on:click="onClickButton">Like</button>
    </div>
  </body>
  <script>
    const app = new Vue({
      el: '#root',
      data: {
        liked: false,
      },
      methods: {
        onClickButton() {
          console.log(this.liked)
          this.liked = true;
          console.log(this.liked)
        }
      }
    });
  </script>
  </html>
  ```

# `v-else ~ v-else-if`

 - v-else-if : v-if조건에 부합하지 않으면서 새로운 조건을 지정한다.  
 - v-else : 모든 조건에 부합하지 않는 경우에 해당한다.  
- ### 예제코드

  ```html

  <body>
    <div id="root">
      <div v-if="true">if</div>
      <div v-else-if="!true">else-if</div>
      <div v-else>else</div>
    </div>
  </body>

위와같이 v-if를 포함한 조건부 렌더링 디렉티브는 연속된 형제노드로 사용해야만 제대로 작동한다.
만약 조건부 렌더링 디렉티브 사이에 형제 노드로 일반 태그를 선언한다면, v-if와 v-else-if(혹은 v-else)를 연결하지 못해 조건부 렌더링이 적용되지 않고 일반 태그만 출력된다.
- ### 예제코드

  ```html

  <body>
    <div id="root">
      <div v-if="true">if</div>
      <div>NaN</div> <!-- 해당 영역만 출력됨. -->
      <div v-else>else</div>
    </div>
  </body>
  ```

</details>

<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">보간법(Mustache 구분)</summary>
<br>

보간법이란?  
템플릿 영역에서 태그 사이에 텍스트 노드를 data 변수 등으로 할당하는 문법이다.  
react를 예로 들면 일반적인 단일 중괄호 표현식을 사용하며 이를 보간법이라고 한다.

Mustache란?  
vue에서 사용하는 보간법 방식으로 `{{ 변수 혹은 값 }}` 과 같이 이중 중괄호 형태로 데이터를 바인딩시킨다.  

- ### 예제코드

  ```html
  <body>
    <div id="root">
      <div>{{ first }} + {{ second }}</div>
    </div>
    <script>
      const app = new Vue({
        el: '#root',
        data: {
          /* 구구단 예제 템플릿 상 값이 변경되는 부분 4곳 */
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
        },
        
      })
    </script>
  </body>
  ```
  위의 예제에서는 랜덤값이 보간법에 의해 할당되어 실제 렌더링시 브라우저에 값 + 값 형태로 출력된다.


</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">템플릿 참조 (ref / $refs)</summary>
<br>

Vue에서 기본 DOM 요소에 직접 액세스 해야하는 경우 ref 속성을 사용한다.  
- ### 예제코드

  ```html
  <input ref="input">
  ```

위 예제코드와 같이 일반 DOM요소에서 사용되는 경우는 해당 요소가 되지만, 자식 컴포넌트에서 사용하는 경우 참조는 해당 컴포넌트 인스턴스가 된다.
- ### 예제코드

  ```html
  <Child ref="child" />
  ```

위와같이 DOM요소에 ref속성을 적용한 뒤 접근할때에는 `this.$refs.ref명` 문법으로 접근한다.  


- ### 예제코드
  ```js
  onSubmitForm(e) {
    console.log(this.$refs.input)
    console.log(this.$refs.child)
  }
  ```

</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">컴포넌트와 props</summary>
<br>

## Component
뷰 인스턴스에서 선언한 특정 레이아웃 영역을 하나의 템플릿 코드로 묶어, 관리한다.  
전역 컴포넌트 문법으로는 `Vue.component({'컴포넌트명', ...훅, ...속성})` 문법을 통해 관리한다.  
(CLI와 같은 WebPack 방식에서는 .vue 확장자 파일로 지역컴포넌트 형태로 관리한다. ; CDN에서도 지역컴포넌트 가능.)

- ### 예제코드
  ```js
  Vue.component(
    'wordRelay'/* PascalCase (Kebab Case 가능) */,
    {
      template: `
      <div>
        <div>{{ word }}</div>
      </div>
      `,
      data() {
        return {
          word: '유혁스쿨',
        }
      },
    }
  )
  ```
위 코드에서 template 속성에 선언한 영역을 적용하기 위해 등록한 컴포넌트명과 일치하는 이름의 태그를 선언한다.
(파스칼케이스, 케밥케이스 모두 사용 가능하다.)
- ### 예제코드
  ```html
  <div id="root">
    <word-relay></word-relay>
    <word-relay></word-relay>
    <word-relay></word-relay>
  </div>
  ```

- ### 전체코드
  ```html
  <body>
    <div id="root">
      <word-relay></word-relay>
      <word-relay></word-relay>
      <word-relay></word-relay>
    </div>
    <script>
      Vue.component(
        'wordRelay'/* PascalCase */,
        {
          template: `
          <div>
            <div>{{ word }}</div>
          </div>
          `,
          data() {
            return {
              word: '유혁스쿨',
            }
          },
        }
      )
    </script>
    <script>
      const app = new Vue({
        el: '#root',
      })
    </script>
  </body>
  ```

## Props
자식 컴포넌트에 데이터를 전달하는 Property(Attribute)이다.  
Dom 엘리먼트 태그에 속성을 기입하는것과 같이 컴포넌트 태그에 `prop명="값 혹은 변수"` 형태의 문법으로 사용한다.  
Vue에서는 props속성 이름의 형태를 기본적으로 케밥케이스를 사용한다.  

- ### 예제코드
  ```html
  <word-relay init-word="유혁스쿨"><!-- props (kebab case) --></word-relay>
  ```

컴포넌트에서는 props 속성을 통해 받는다.  
기본적으로는 배열 형태로 props명을 작성하는데, 케밥케이스, 파스칼케이스 모두 가능하다.  
(타입과 기본값, 필수여부를 설정하는 객체 형태의 문법도 있으며, 객체 형태 문법은 Document를 참조하자.)
- ### 예제코드
  ```js
  Vue.component(
        'wordRelay',
        {
          template: `<!-- 생략 -->`,
          props: ['inittWord'],
          data() {
            return {
              word: this.initWord,
            }
          },
        }
      )
  ```

- ### 전체 코드
  ```html
  <body>
    <div id="root">
      <word-relay init-word="유혁스쿨"></word-relay>
      <word-relay init-word="초밥"></word-relay>
      <word-relay init-word="바보"></word-relay>
    </div>
    <script>
      Vue.component(
        'wordRelay',
        {
          template: `
          <div>
            <div>{{ word }}</div>
          </div>
          `,
          props: ['inittWord'],
          data() {
            return {
              word: this.initWord,
            }
          },
        }
      )
    </script>
    <script>
      const app = new Vue({
        el: '#root',
      })
    </script>
  </body>
  ```

</details>
<hr>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">WEBPACK</summary>
<br>

## 웹 패킹이란?  
현재 프로젝트에서 사용되는 모든 js를 하나의 파일로 압축하여 합치는 작업이다.  

- 프로젝트 초기화
	package.json가 생성되며, 해당 파일을 통해 라이브러리(디펜던시)와 빌드에 필요한 script 명령등을 정의한다.
	
	```bash
	npm init
	```
	```bash
	package name: {프로젝트명}
	```

- vue 디펜던시 설치
	```bash
	npm install vue
	```
- webpack, webpack-cli 디펜던시 설치(개발 모드)
	```bash
	npm i webpack webpack-cli -D
	```
	
- webpack 환경설정  

  웹 패킹을 위해서는 webpack 설정이 필요하다.  

  - **entry** : 모든 script를 하나로 합칠때 대표가되는 파일을 등록한다.
  - **module** : webpack의 핵심으로, rules 배열에 객체 형태로 어떻게 합칠지, 처리할지를 설정한다.
  - **plugins** : ?
  - **output** : 웹 패킹으로 변환될 파일(entry에 등록된 파일)을 참조하고, 웹패킹이 완료된 파일을 저장할 디렉토리를 설정한다.
    - filename
    - path

  - `webpack.config.js`
      ```js
      /* 절대경로 추가 */
      const path = require('path')
      module.exports = {
        entry: {
          // app: './main.js'
          app: path.join(__dirname, 'main.js') // 절대경로 생성 `/4. 숫자야구/main.js`
        },
        module: {
          rules: [{}]
        },
        plugins: [],
        output: {
          filename: '[name].js', /* [name]: entry.app을 참조한다. (app.js 명시적 할당 가능) */
          // path: './dist', /* entry.app으로 등록한 하나의 script 파일이 저장될 디렉토리 경로 (app.js가 저장된다.)*/
          path: path.join(__dirname, 'dist'), /* 절대경로 => `/4. 숫자야구/dist` [arg1]: 현재 파일의 디렉토리 경로, [arg2]: 합칠 경로 */
        },
      }
      ```
	
## vue-loader
webpack의 패킹 대상은 JS 파일이다.  
JS 파일이 아닌 .vue 확장자에 대해 webpack이 패킹하기 위해서는 vue-loader가 필요하다.  

- `vue-loader 디펜던시 설치 (개발 모드)`  
    ```bash
    npm i vue-loader -D
    ```
	  
디펜던시 설치 후 webpack에서 vue-loader를 설정한다.  
- `webpack.config.js`
    ```js
    module.exports = {
      entry: {/* 생략 */},
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
      plugins: [],
      output: {/* 생략 */},
    }
    ```
디펜던시 설치 후 webpack에서 vue-loader를 설정한다.  

## vue template compiler

웹패킹을 할때 .vue 확장자 파일이 컴파일되는데 이때 전용 컴파일러가 필요하다.  
해당 컴파일러는 vue와 버전이 일치해야한다.  

  ```bash
  npm i vue-template-compiler
  ```

## 전역 Vue컴포넌트 Vue인스턴스 등록
아래 예시코드를 보며 vue2와 vue3 방식이 다르다는걸 유념해서 적용한다.  
- `main.js`
    ```js
    import Vue from 'vue'
    import { createApp } from 'vue';
    import NumberBaseball from './NumberBaseball'

    // new Vue(NumberBaseball).$mount('#root'); // vue2 마운트
    createApp(NumberBaseball).mount('#root'); // vue3 마운트
    ```

## build script 설정
프로젝트 초기화시 생성된 package.json 파일에 script 속성으로 등록한다.  
- `package.json`
    ```json
    {
      /* 생략 */
      "scripts": {
        /* [webpack 빌드 script 명령 등록] - `npm run build` → webpack.config.js에 등록한 path경로에 entry에 등록한 파일이 웹 패킹되어 생성된다 */
        "build": "webpack" 
      },
      /* 생략 */
    }
    ```
## build 진행 (명령어)
  ```bash
  npm run build
  ```
  위 명령어를 통해 webpack.config.js에 설정한 설정내역들을 통해 빌드를 진행하게 된다.  
  필자의 경우 output을 dist 디렉토리로 잡아두었고 entry 프로퍼티를 app으로 했기 때문에  
  dist 디렉토리 하위에 app.js 파일이 생성된다.  
  해당 파일 내의 소스코드는 main.js와 .vue확장자 파일 등을 포함하고 있다.


## build --watch 옵션
실시간으로 webpack에 의해 설정된 파일들의 코드를 모니터링하고 변경이 발생하면 새롭게 build해주는 옵션이 있다.  
- `package.json`
    ```json
    {
      /* 생략 */
      "scripts": {
        "build": "webpack --watch" 
      },
      /* 생략 */
    }
    ```

</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">v-for 1. 리스트 렌더링</summary>
<br>

## v-for 리스트 렌더링
v-for 디렉티브를 사용하여 배을 기반 리스트 렌더링이 가능하다.  
해당 디렉티브는 `item in items` 형태의 특별한 문법을 사용한다.  
js의 for loop 종류의 하나인 for ...in 문법과 유사하다.  
`v-for="요소 in 배열"` 혹은 `v-for="(요소, index) in 배열"` 형태로 사용한다.  

- ### 예제코드
  ```html
  <template>
    <div>
      <ul>
        <li v-for="(el, idx) in array" >{{ el }}</li>
      </ul>
    </div>
  </template>
  <script>
    export default {
      
      data() {
        return {
          array: ["A", "B", "C", "D", "E"],
        }
      },
    }
  </script>
  ```

</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">v-for 2. in-place patch와 key 속성</summary>
<br>

### in-place patch전략과 key속성
Vue는 메모리 절약을 위해 DOM 최적화를 통해 DOM을 재사용한다.  
이 과정에서 in-place patch 전략이라는 것을 사용한다.  
patch는 일종의 "떔빵"을 의미하며, in-place는 현재 지점에서 를 의미한다.  
현재 지점에서 땜빵 즉, 현재 DOM에서 변경될 부분만 땜빵해서 처리하고 DOM을 재사용 한다는 의미이다.  

예를들어 아래와 같은 코드가 있다고 가정해보자.  
- ### 예제코드
  ```html
  <body>
    <div id="app">
      <ul>
        <li v-for="item in list" :key="item">
          {{ item }} : <input type="number">
        </li>
      </ul>
      <button @click="shift">Shift!</button>
    </div>

    <script>
      // 부모 컴포넌트 정의
      new Vue({
        el: '#app',
        data:{
          list: ["apple", "banana", "orange"]
        },
        methods: {
          shift() {
            this.list.push(this.list.shift())
          }
        }
      });
    </script>
  </body>
  ```
   위 코드에서 input의 값을 순차적으로 1 2 3으로 입력한다.
   - apple: [1]
   - banana: [2]
   - orange: [3]
  위와 같은 상태에서 shift 버튼을 클릭할경우 아래와 같이 결과가 변경된다.
  [기대값]
   - banana: [2]
   - orange: [3]
   - apple: [1]
  [실제값]
   - banana: [1]
   - orange: [2]
   - apple: [3]
  이는 앞서 설명한것과 같이 in-place patch로 처리되었기 때문에 변경되는 부분인 {{item}}만 patch된다.  

  위와 같이 반복되는 내용을 하나로 관리해야 할 필요가 있고 이때 사용되는것이 바로 key 속성이다.  
  key 속성에는 요소를 구별할 수 있는 unique한 내용을 사용한다.
  
  ## index 바인딩 이슈
  만약 index를 사용할 경우, 배열 요소 중 하나가 삭제 된다면 첫번째 요소부터 마지막 요소까지 index를 재생성해야 하기 때문에 성능/버그 이슈가 발생한다.  
  단순히 하나의 데이터가 아닌 복잡한 데이터로 얽혀있는 경우가 있을 수 있고 이러한 상황에서 배열에 데이터를 추가할 경우 변경 감지에 대한 렌더링 시점 오류가 발생하여 순서가 꼬이는 경우도 발생한다.  
  예를들어, 배열의 특정 요소 객체 내부의 값이 변경하는데 이때 변경하는 원리가 해당 배열에 직접 접근하여 값을 변경하는 것이 아니라, 해당 배열을 복사하여 값을 변경한 뒤 배열을 통째로 다시 변경하는 경우이다.  

  vue는 배열 순서를 변경하거나 항목을 추가/삭제하는 순간 기존 DOM 요소를 재활용 하려고 한다.  
  이때 index가 변경되기 전 후의 변경시점에서 DOM과 데이터의 매핑이 꼬일 수 있게 된다.  
  즉, 동기화 시점 오류이다.  
  특정 시점에서 배열에 객체를 추가하고 정렬한 뒤, 해당 객체의 값을 변경할때 dom에 대한 연결이 key로 지정한 index로 연결되는데,
  배열의 값이 변경되고 v-for에서 index가 새롭게 생성되고, key에 매핑이 되는데, 매핑되기 전 찰나의 순간에 특정 index의 데이터를 변경할 경우 이전 index에 대한 데이터와 현재 index에 대한 데이터가 동시에 수정이 되는 현상이 발생할 수 있다.  
  예를들어 1, 2, 3, 4, 5 인덱스가 있고 3번과 4번 사이에 데이터를 추가한다면, 4번이 5번으로 밀려나고 새로운 4번 데이터가 추가된다.
  이렇게 데이터를 추가하면서, index가 재생성되며 index가 key에 매핑되게 되는데, `index가 key에 매핑 되기 전 찰나의 순간`에 4번 데이터의 속성값을 변경한다면, 5번으로 밀려날 4번 index 데이터와 새롭게 추가된 new 4번 index 데이터의 속성 값이 함께 변경되는 현상이 발생하게 된다.  
  

  
</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">v-bind 디렉티브</summary>
<br>

## v-bind
vue에서 html 엘리먼트의 특정 속성에 state 변수 혹은 문자, 숫자, 불리언 등의 값을 바인딩(할당) 할때 사용한다.  
`v-bind:class="값 혹은 변수"`

- ### 예제코드
  ```html
  <div id="screen" v-bind:class="'cls'"></div> <!-- class="cls" -->
  <button v-bind:disabled="true">비활성화됨</button> <!-- disabled -->
  ```

</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">vue style 모듈 & WEBPACK 옵션</summary>
<br>

webpack 방식에서 vue 프로젝트를 build할때 .vue확장자에 대한 로드를 하기 위해서는 webpack.config.js의 module 옵션의 rules 배열에 .vue확장자에 대한 로더 모듈을 등록해야했다.  
vue의 style태그를 build할때 또한 css와 style 관련 로더 모듈이 필요하고, webpack.config.js에 등록해줘야 한다.

- 필요한 모듈
  - vue-style-loader
  - css-loader

- npm 모듈 추가 (개발용)
  ```bash
    npm i vue-style-loader css-loader -D
  ```

- `webpack.config.js` 로더 모듈 설정
    ```js
    module.exports = {
      /* 생략 */
      module: {
        rules: [
          /* 생략 */
         {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                esModule: false,
              }
            }
          ]
        },
        ]
      },
      /* 생략 */
    }
    ```

</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">webpack-dev-server</summary>
<br>

웹팩 데브서버는 웹팩의 빌드 대상 파일이 변경되었을 때 매번 웹팩 명령어를 실행하지 않아도 코드만 변경하고 저장하면 웹팩으로 빌드한 후 브라우저를 새로고침 해준다.  
매번 명령어를 치는 시간과 브라우저를 새로고침 하는 시간 뿐만 아니라 웹팩 빌드 시간 또한 줄여주기 때문에 웹팩 기반의 웹 애플리케이션 개발에 필수로 사용된다.

- ### npm 모듈 설치

  ```bash
  npm install webpack-dev-server -D
  ```

- `webpack.config.js` devServer 설정
    ```js
    module.exports = {
      /* 생략 */
      devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true,
        compress: true,
        port: 9000
      }
    }
    ```

- `package.json` 실행 script 설정
    ```json
    {
      /* 생략 */
      "scripts": {
        "dev": "webpack-dev-server --hot" 
      },
      /* 생략 */
    }
    ```

- ### 실행 명령
  ```bash
  npn run dev
  ```
</details>

<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">접은글 템플릿</summary>
<br>

- ### 예제코드

  ```html
  ```

- ### 예제코드
  ```js
  ```

</details>