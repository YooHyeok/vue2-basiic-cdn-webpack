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
- ### 메인 html  
```html
<div id="root"></div>
<script src="./dist/app.js"></script>
```
`npm run build` 명령어를 통한 `webpack --watch` script와는 다르게 webpack-dev-server의 경우 dist/app.js 폴더가 생성되지 않는다.  
그럼에도 불구하고 네트워크 탭을 확인해보면 localhost:포트/dist/app.js를 가져오게 된다.  
output을 로컬에 직접적으로 저장하지 않고 서버 프로세스가 실행 중인 Node.js의 메모리 공간에 저장이 된다.  
이때 중요한점은 메인 html 파일에서 /dist/app.js 경로의 script 파일을 참조해야만 한다.  
(참조하지 않는다면 애초에 실행할 script가 없어지기 때문...)
</details>
<details>
  <summary style="font-size:30px; font-weight:bold; font-style:italic;">
    computed 속성
  </summary>

  ```html
  <div>
    {{ number+1 }}
  </div>
  ```
  템플릿 내에 표현식을 넣으면 편리하다.  
  ```html
  <div>
    {{ message.split("").reverse().join('') }}
  </div>
  ```
  그러나 위와 같이 너무 많은 연산을 템플릿 내에서 하게 된다면 코드가 비대해지고 유지보수 하기 어려움이 있다.
  이때 computed 속성을 사용한다.  

  - computed 예제  
    computed 속성에 함수를 선언하고, state에 접근하여 데이터를 가공한 뒤 가공한 데이터를 반환한다.  
    이때, 함수명은 template에서 변수명으로 사용할 수 있게 된다.
    **주의할 점은 computed속성에 선언한 함수는 함수로서 호출할 수 없고 변수로써 사용한다.**
    ```html
    <body>
      <div id="app">
        {{ convertMsg }}
      </div>
      <script>
        new Vue({
          el: '#app',
          data: {
            computedMsg: 'Hello',
          },
          computed: {
            convertMsg() {
              return this.computedMsg.split("").reverse().join('')
            },
          },
        })
      </script>
    </body>
    ```
    Vue 인스턴스가 처음 생성될 때, mount 전 data속성이 정의된 computed속성이 정의된다. 또한, state의 변경을 감지한다. (state값이 변경되면 작동됨.)

    커스텀으로 getter와 setter를 제공하지만, 예제에서는 이를 하나의 메소드로 적용하였다.
    ```js
    export default {
      computed: {
        convertMsg: {
          get() {
            console.log("get")
            return this.computedMsg
          },
          set(value) {
            console.log("set : ", value)
            this.computedMsg = value.split("").reverse().join('')
          },
        }
      },
      methods: {
        convertMsgF(newValue) {
          return this.convertMsg = newValue
        },
      }
    }
    ```
    computed의 convertMsg의 변경이 감지되면 convertMsg의 convertMsg를 value로 받아온 뒤 state에 초기화 한다.
    즉, 특정 블록 내에서 computed속성에 정의한 변수(property)를 초기화 하는 로직이 작동 해야만 커스텀 set get 방식을 적용할 수 있게 된다.

    또한 computed를 통해 한번 계산된 데이터는 캐싱이라는 기능으로 가져다가 사용할 수 있으며,
    이로 인해 반복적인 함수 호출과 계산을 줄여준다

    ```html
    <body>
      <div id="app">
        {{ convertMsg() }}
        {{ convertMsg() }}
        {{ convertMsg() }}
        {{ convertMsg() }}
      </div>
      <script>
        new Vue({
          el: '#app',
          data: {
            computedMsg: 'Hello',
          },
          methods: {
            convertMsg() {
              return this.computedMsg.split("").reverse().join('')
            },
          },
        })
      </script>
    </body>
    ```
    위와 같이 메소드를 여러번 호출한다면, 호출할 때 마다 반환한다.

    ```html
    <body>
      <div id="app">
        {{ convertMsg }}
        {{ convertMsg }}
        {{ convertMsg }}
        {{ convertMsg }}
      </div>
      <script>
        new Vue({
          el: '#app',
          data: {
            computedMsg: 'Hello',
          },
          computed: {
            convertMsg() {
              return this.computedMsg.split("").reverse().join('')
            },
          },
        })
      </script>
    </body>
    ```
    그러나 computed는 접근한 data 변수가 변경되지 않는 이상 한번 연산된 결과값이 캐싱되어 출력된다.

</details>
<details>
  <summary style="font-size:30px; font-weight:bold; font-style:italic;">
    watch 속성
  </summary>

  관찰할 state를 등록한 뒤, 등록 된 state 상태가 변경되면 동작한다.  
  ```html
  <body>
    <div id="app">
      {{ convertMsg }} <br> <!-- 우로헬 -->
      oldVal : {{ oldVal}} <br> <!-- Hello -->
      newVal : {{ newVal}} <!-- 헬로우 -->
    </div>
    <script>
    new Vue({
      el: '#app',
      data: {
        newVal: '',
        oldVal: '',
        computedMsg: 'Hello'
      },
      watch: {
        computedMsg(newVal, oldVal) { // computed의 converMsg을 통해 수정함.
          this.newVal = newVal
          this.oldVal = oldVal
        }
      },
      computed: {
        convertMsg(e) {
          this.computedMsg = "헬로우" // 여기서 watch 대상을 수정함.
          return this.computedMsg.split("").reverse().join('')
        },
      },
    })
    </script>
  </body>
  ```
</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">$root , $parent, $data</summary>
<br>

하위 컴포넌트인 현재 컴포넌트 기준 부모 컴포넌트와, 루트 컴포넌트 인스턴스에 접근할때 사용한다.

# $root

루트 Vue 인스턴스에 접근이 가능하다.  
`this.$root` 형태 문법으로 접근하며 data변수의 경우 직접 수정이 가능하다.  
모든 하위 컴포넌트에서 접근이 가능하며, **전역 저장소**처럼 활용할 수 있다.  

---
이러한 패턴은 아주 작은 크기의 어플리케이션이나, 적은 수의 컴포넌트에 대해서 유용하게 사용될 수 있으나,  
어플리케이션의 크기가 커지게 될 때 해당 패턴을 확장하기란 쉬운 일이 아니다.  
대부분의 경우 상태 관리를 위해 Vuex를 사용하는 것을 강력히 권장한다.  

# $parent
$root와 비슷하게 부모 Vue 인스턴스에 접근이 가능하다.  
`this.$parent` 형태 문법으로 접근하며 data변수의 경우 직접 수정이 가능하다.  
이는 prop을 이용해 데이터를 넘겨주는것 형태의 대안으로써 사용할 수 있다.  

---
대부분의 경우, 특히 부모 요소의 데이터를 자식 요소에서 변경하는 경우에 부모 요소에 접근하는 것은 디버깅의 편의성과 코드 가독성을 크게 해친다.  
나중에 해당 컴포넌트를 다시 보았을 때, 어디서 변경이 발생하였는지를 추적하는 것이 굉장히 어려워 질 수 있다.  

## 대안

- `vue 2`
  - **EventBus**
- `vue3`
  - **provider, inject**
- `vue2/3 호환`
  - **$emit**
  - **props (function)** 


# data 변수, methods 접근
하위 컴포넌트에서 부모 혹은 루트 컴포넌트의 data변수 혹은 메소드에 직접 접근이 가능하다.

## $data
현재 참조중인 인스턴스의 data 객체이다.  
`this.$인스턴스.$data` 형태 문법으로 참조한다.  
`this.$인스턴스.$data.변수명` 형태로 data 객체 참조 후 변수에 접근한다.  
(이때 인스턴스는 $root 혹은 $parent만 가능하다. )

## data 직접 접근
`this.$인스턴스.변수명` 형태로 변수에 직접 접근한다.

## methods 호출
`this.$인스턴스.메소드명` 형태로 메소드를 직접 호출한다.


- ### Root.vue
  ```html
  <template>
      <Parent/>
  </template>
  <script>
  import Parent from './Parent.vue';
  export default {
    components: {Parent},
    data() {
      return {
        root: 'root' // 턴전환: O팀 ↔ X팀 
      }
    },
    methods: {
      parentEx(){
        console.log("내가 니 증조 할애비다 : ", this.root)
      }
    },
  }
  </script>
  ```
- ### Parent.vue
  ```html
  <template>
      <Child/>
  </template>
  <script>
  import Child from './Child.vue';
  export default {
    components: {Child},
    data() {
      return {
        parent: 'parent' // 턴전환: O팀 ↔ X팀 
      }
    },
    methods: {
      parentEx(){
        console.log("내가 니 애비다 : ", this.parent)
      }
    },
  }
  </script>
  ```
- ### Parent.vue
  ```html
  <script>
  export default {
    mounted() {
      console.log(this.$root.$data) // 가장 최상위 부모의 data변수 접근
      this.$root.example() // 가장 최상위 부모 메소드 접근
      console.log(this.$parent.$data) // 직계 부모의 data변수 접근
      this.$parent.example() // 직계 부모 메소드 접근
    }
  }
  </script>
  ```

</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">$set()</summary>
<br>

Vue 인스턴스에 javascript 객체를 data 옵션으로 전달하면 Vue는 모든 속성에 Object.defineProperty를 사용하여 getter/setter로 변환한다.  
getter/setter는 사용자에게는 보이지 않으나 속성에 액세스 하거나 수정할 때 vue가 종속성 추적 및 변경 알림을 수행할 수 있다.

그러나 vue에서 지원하는 최신 javscirpt에서는 변경을 감지하는 Object.observe가 deprecated 되었기 때문에 Vue는 속성의 추가/제거 는 감지할 수 없다.  
Vue는 인스턴스 초기화 중 getter / setter 변환 프로세스를 수행하므로, data 객체에 속성이 있어야 vue가 이를 변환하고 응답할 수 있다.  
vue는 이미 만들어진 인스턴스에 새로운 루트 수준의 반응 속성을 동적으로 추가하는 것을 허용하지 않는다.  
그러나 `Vue.set(Object, key, value)` 매소드를 사용하여 중첩된 객체에 반응성 속성을 추가할 수 있다.  
배열도 마찬가지이다. `Vue.set(Array, index, value)` 형태로 배열의 index를 변경/추가 하였을 경우 변경을 감지를 한다.  

Vue인스턴스에서는 `this.$set()` 문법으로 해당 함수를 호출할 수 있다.

- 반응성 객체 동적 추가 대안
  - $set()
  - 전개식(Spread Operator)
  - Object.assign


</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">EventBus</summary>
<br>

- ## EventBus
  - ### `EventBus.js`
      전역으로 eventBus라는 상수값 내보낸다.
      여기서 new Vue()란 새로운 vue인스턴스를 생성하는것.
    ```javascript
    /* 생략 */
    export const eventBus = new Vue()
    /* 생략 */
    ```
   - 발행 $emit   
    eventBus에 $emit을 통해 신호를 송신  
    즉, eventBus라는 새로운 vue인스턴스가 부모 역할을 한다는 것으로 추론 가능하다.
    해당 인스턴스를 참조하는 모든 컴포넌트에서는 해당 신호를 수신할 수 있게 된다.
    첫번째 매개변수로 발행할 event명을, 두번째 매개변수로 매개변수 전달이 가능하다.  
      ```vue
      <script>
      import { eventBus } from './EventBus';
      export default {
        methods: {
          changeUser () {
            eventBus.$emit('userWasEdited', new Date())
          }
        }
      }
      </script>
      ```
    - 구독/취소 $on/$off  
      eventBus에 $on을 통해 신호를 수신  
      eventBus로 부터 발행된 이벤트명을 등록함으로써 구독(수신) 하게 된다.
      컴포넌트의 mounted 혹은 created 훅에서 수신하도록 처리하고,  
      컴포넌트가 해제될때 구독을 취소하여 리소스를 관리한다.  
      ```vue
      <script>
      import { eventBus } from './EventBus';
      export default {
        created () {
          eventBus.$on('userWasEdited', (date) => {
            this.editedDate = date
          })
        },
        beforeDestroyed() {
          eventBus.$off('userWasEdited')
        }
      }
      </script>
      ```
</details>
<details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">Vuex</summary>
<br>

  <details>
  <summary style="font-size:30px; font-weight:bold; font-style:italic;">install & setting</summary>
  <br>

  - ### vue2(2.6.10) 호환 `vuex3.1.1` 설치

    ```bash
    npm install vuex@3.1.1
    ```

  - ### Vuex store 모듈  생성  

    1. Vue 전역 인스턴스에 플러그인으로 등록  
      `Vue.use(Vuex)`
    2. Vuex 인스턴스 생성 및 기본 틀 구현  
      `new Vuex.store({/* 생략 */})`

    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex) // 플러그인 등록
    export const store = new Vuex.store({
      state: {
        todos: [
          { id: 1, text: 'buy a car', checked: false},
          { id: 2, text: 'play a game', checked: false},
        ]
      },
      mutations: {},
      actions: {},
      getters: {}
    })

    ```

  - ### 루트 Vue 인스턴스 store 모듈 주입

    1. Vue 전역 인스턴스에 플러그인으로 등록  
      `Vue.use(Vuex)`
    2. Vuex 인스턴스 생성 및 기본 틀 구현  
      `new Vuex.store({/* 생략 */})`

    ```js
    import Vue from 'vue'
    import Component from './Component'
    import { store } from './store'

    console.log(store)

    new Vue({
      store, /* 모듈 등록 */
      render: Component => createElement(Component)
    }).$mount('#root'); // vue2 마운트
    ```

    **주의할점**은 Vuex 플러그인 등록시 Vuex 인스턴스로부터 store() 함수가 호출되기 전에 등록되어야만 한다.  
    만약 main.js에서 `Vue.use(Vuex)` 코드를 적용하여 Vuex를 플로그인으로 등록한다고 가정해보자.
    import가 먼저 실행되므로 Vuex의 store함수가 호출된 후 Vuex가 플러그인으로 등록되어 시점 문제가 발생하게 된다.

  </details>
  <details>
  <summary style="font-size:30px; font-weight:bold; font-style:italic;">State</summary>
  <br>

  # 호출
  state 변수는 vue 확장자 파일의 computed 속성에 호출하여 사용한다.  

  computed는 함수 형태를 정의하고, template에 해당 함수를 할당 함으로 초기 렌더링시 computed에 정의 한 함수가 호출된다.  
  또한, 내부적으로 data나 state의 변경을 감지하면 이를 의존하고 있는 computed에 정의한 함수가 다시 호출 된다.  
  여기서 말하는 의존이란, 계산된 값이 어떤 다른값에 따라 달라진다는 의미로,  
  computed 속성의 결과가 특정한 data 속성이나 vuex state값을 기준으로 결정될 때,  
  그 값을 "의존성" 이라고 한다.  

  이때 state 혹은 data 그 자체를 하나로 의존하는 것이 아니라 computed에서 참조하는 특정(세부) 대상을 지칭한다.  
  data라면 data에 나열된 변수중 computed에서 정확히 참조하는 변수,  
  vuex state라면 state에 나열된 변수중 computed에서 정확히 참조하는 변수를 말한다.  
  데이터 변수의 경우 `return this.todo` 면 `todo`, `return this.user` 면 `user`가 computed의 의존성이고  
  vuex state 변수의 경우 `return this.$store.state.todo` 면 `todo`, `return this.$store.state.user` 면 `user`가 computed의 의존성이 된다.  


  - ### ___.vue
    ```html
    <template>
      {{ todos }}
    </template>
    <script>
      export default {
        computed: {
          todos() {
            return this.$store.state.todoss
          }
        }
      }
    </script>
    ```


  </details>
  <details>
  <summary style="font-size:30px; font-weight:bold; font-style:italic;">Mutations</summary>
  <br>

  # 정의
  vuex에서 state에 있는 변수를 변경할때는 mutations 안에서 변경하는것이 규칙이다.
  - ### Store
    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)

    export default new Vuex.Store({
      state: {
        todos: [
          { id: 1, text: 'buy a car', checked: false},
          { id: 2, text: 'play a game', checked: false},
        ]
      },
      mutations: {
        ADD_TODO(state, payload) {
          state.todos.push({
            id: Math.random(),
            text: payload,
            checked: false
          })
        },
      },
      actions: {

      },
      getters: {

      }
    })
    ```
  mutations 속성에 함수를 정의하고 해당 함수 블록에서 state에 접근하여 state를 변경한다.
  이때 함수의 첫번째 매개변수로 state를, 두번째 매개변수로 payload를 받는다.
  payload는 mutations의 함수가 호출될때 전달하는 값이다.

  # 호출


  - ### commit
    mutations를 vue 확장자 파일에서 호출할때는 methods 속성에서 함수를 정의하고, commit을 통해 호출한다.

    - #### ___.vue
      ```html
      <template>
        <button 
          @keyup.enter="addTodo"
        >
      </template>

      <script>
      export default {
        name: 'AddTodo',
        methods: {
          addTodo(e) {
            this.$store.commit('ADD_TODO', e.target.value) // mutation 호출
          },
        },
      };
      </script>
      ```
      첫번째 매개변수로는 mutations에 정의한 함수 이름, 두번째 매개변수로는 해당 함수의 두번째 매개변수인 payload 전달값을 할당할 수 있다.

  </details>
  <details>
  <summary style="font-size:30px; font-weight:bold; font-style:italic;">Vuex Actions</summary>
  <br>

  # 정의
  Vuex에서 actions는 비즈니스로직 즉, 여러개의 mutations를 조합하여 호출하거나 비동기적인 로직을 처리할 때 사용한다.
  여기서 말하는 비동기적인 로직은 fetch나 axios, jQuert의 ajax 뿐만 아니라 Promise객체, Async~Await 그 자체를 말한다.  

  mutations에서 비동기 로직을 처리할 경우 mutations가 호출되고난 뒤, 비동기 로직이 종료되기 전 mutations의 함수 블록이 종료된다.  
  state 변경을 보장받을 수 없고, getters같은 state 변경 감지에 대한 작업 처리에 영향을 주게 된다.

  따라서 state의 직접적인 변경은 mutations에서 관리하고, 비동기적 작업은 actions에서 관리한다.  
  (actions에서 비동기적인 작업 후 mutations를 commit-호출하는 flow로 설계할 수 있다.)


  - ### Store
    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)

    export default new Vuex.Store({
      state: {
        todos: [
          { id: 1, text: 'buy a car', checked: false},
          { id: 2, text: 'play a game', checked: false},
        ]
      },
      mutations: {
        ADD_TODO(state, payload) {
          state.todos.push({
            id: Math.random(),
            text: payload,
            checked: false
          })
        },
      },
      actions: {
        addTodo(context, payload) {
        const {commit, dispatch} = context;
        /* 비동기 작업 ex) axios(2초 소요) 후 commit 호출 */
        setTimeout(function() {
          commit('ADD_TODO', payload);
        }, 2000) //2초 후 실행
      },
      },
      getters: {

      }
    })
    ```
    
    actions함수는 매개변수로 context와 payload를 받는다.
    context에는 commit과 dispatch 함수가 존재한다.
    commit을 통해 mutations을 호출하고 dispatch를 통해 다른 actions 함수를 호출한다.

  # 호출


  - ### dispatch
    actions를 vue 확장자 파일에서 호출할때는 methods 속성에서 함수를 정의하고, dispatch를 통해 호출한다.

    - #### ___.vue
      ```html
      <template>
        <button 
          @keyup.enter="addTodo"
        >
      </template>

      <script>
      export default {
        name: 'AddTodo',
        methods: {
          addTodo(e) {
            this.$store.dispatch('addTodo', e.target.value) // action 호출
          },
        },
      };
      </script>
      ```
      첫번째 매개변수로는 actions에 정의한 함수 이름, 두번째 매개변수로는 해당 함수의 두번째 매개변수인 payload 전달값을 할당할 수 있다.

  </details>
  <details>
  <summary style="font-size:30px; font-weight:bold; font-style:italic;">Vuex Getters</summary>
  <br>

  # 정의
  Vuex에서 getters는 vue 인스턴스에서 computed와 비슷한 역할을 한다.  
  연산된 state값을 접근하는 속성으로 여러 뷰 컴포넌트에서 재사용이 가능하다.   
  computed와 같이 캐싱 기능이 있다.


  - ### Store
    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)

    export default new Vuex.Store({
      state: {
        todos: [
          { id: 1, text: 'buy a car', checked: false},
          { id: 2, text: 'play a game', checked: false},
        ]
      },
      mutations: {
      },
      actions: {
      },
      getters: {
        numberOfCompletedTodo(state) {
        return state.todos.filter(todo => todo.checked).length
      }
      }
    })
    ```
    getters에 정의한 함수는 첫번째 매개변수로 store의 state를 접근할 수 있다.  
    (호출부에서 전달하는것이 아님.)

  # 호출

  getters는 vue 인스턴스의 computed속성에 정의된 함수의 반환값에 호출하여 사용한다.
  - ### ___.vue
    ```html
    <template>
      <div>
        Completed Todo: {{ numberOfCompletedTodo }}
      </div>
    </template>

    <script>
    export default {
      name: 'CompletedTodo',
      computed: {
        /* numberOfCompletedTodo() { // getters 적용 전 (state 직접 접근 후 연산)
            return this.$store.state.todos.filter(todo => todo.checked).length
        }, */
        numberOfCompletedTodo() {
          return this.$store.getters.numberOfCompletedTodo // getters 적용
        }
      },
    };
    </script>
    ```

  </details>
  <details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">Vuex Map helper</summary>
<br>
  this.$store 객체를 통한 store의 접근 코드는 컴포넌트가 많아질수록 추적이 어려워진다.  
  Vuex store에는 state, mutations, actions, getters 각 속성을 빠르게 접근할 수 있는 기능을 제공한다.  
  computed에서 this.$store객체를 재정의 하는것을 `...map____(특정문법)` 형태로 축약하여 사용한다.  
  
  ## Map Helper 종류
  - mapState
  - mapMutations
  - mapActions
  - mapState

  - ### Arrow 참조 & Object Mapping

    ```html
    <template>
      <div>
        <button @click="ADD_TODO">{{todos.text}}</button>
        <button @click="addTodo">{{schedule}}</button>
      </div>
    </template>
    <script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
      computed: {
        ...mapState(state => state.todos) // template나 script영역에서 data 변수처럼 접근할 수 있게된다.
        ...mapState({
          schedule: state => state.todos
        })
        ...mapGetters(['numberOfCompletedTodo']) // getters는 화살표 함수 참조가 불가능하다.
      },
      methods: {
        ...mapMutations({
          ADD_TODO: (context, payload) => context.commit('ADD_TODO', payload),
        })
        ...mapActions({
          addTodo: (context, payload) => context.dispatch('addTodo', payload)
        })

      }
    };
    </script>
    ```
  - ### String 참조 - Array

    ```html

    <script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
      computed: {
        ...mapState(['aS', 'bS', 'cS'])
        ...mapGetters(['aG', 'bG', 'cG']) 
      },
      methods: {
        ...mapMutations(['aM', 'bM', 'cM'])
        ...mapActions(['aA', 'bA', 'cA'])
      }
    };
    </script>
    ```

  - ### String 참조 - Object Mapping

    ```html

    <script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
      computed: {
        ...mapState(['todos'])
        ...mapState({schedule: 'todos'}) // 다른 이름으로 맵핑
        ...mapGetters(['numberOfCompletedTodo']) 
        ...mapGetters({count: 'numberOfCompletedTodo'}) // getters는 화살표 함수 참조가 불가능하다.
      },
      methods: {
        ...mapMutations(['ADD_TODO'])
        ...mapMutations({ADD_TODO: 'ADD_TODO'})
        ...mapActions(['addTodo'])
        ...mapActions({addTodo: 'addTodo'})
      }
    };
    </script>
    ```


  </details>
  <details>
<summary style="font-size:30px; font-weight:bold; font-style:italic;">Vuex Modules 01 (Usage)</summary>
<br>

  - ### store/modules/todo.js
    ```js
    export default {
      namespaced: true,
      state: {
        todos: [
          { id: 1, text: 'buy a car', checked: false},
          { id: 2, text: 'play a game', checked: false},
        ],
      },
      mutations: { // state 접근 및 변경 함수 정의
        ADD_TODO(state, payload) {
          console.log("payload: ", payload)
          state.todos.push({
            id: Math.random(),
            text: payload,
            checked: false
          })
        },
      },
      actions: { // 비동기 작업 후 state 변경
        addTodo(context, payload) {
          const {commit, dispatch} = context;
          /* 비동기 작업 ex) axios(2초 소요) 후 commit 호출 */
          setTimeout(function() {
            commit('ADD_TODO', payload);
          }, 2000) //2초 후 실행
        },
      },
      getters: { // 컴포넌트의 computed에서 사용한다. (재사용 가능) computed처럼 캐싱기능 있음.
        numberOfCompletedTodo(state) {
          return state.todos.filter(todo => todo.checked).length
        }
      }
    }
    ```
  - ### store/modules/user.js
    ```js
    export default {
      namespaced: true,
      state: {
        users: [/* 생략 */],
      },
      mutations: {/* 생략 */},
      actions: {/* 생략 */},
      getters: {/* 생략 */}
    }
    ```


  - ### store/index.js

    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'
    import todo from './modules/todo'
    import user from './modules/user'
    Vue.use(Vuex)

    export default new Vuex.Store({
      modules: {
        todo,user // nameSpace 등록 
      },
      state: {},
      mutations: {},
      actions: {},
      getters: {},
    })
    ```

  - ### Arrow 참조 & Object Mapping

    ```html
    <script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
      computed: {
        ...mapState(state => state.todo.todos)
        ...mapState({schedule: state => state.todo.todos})
        ...mapGetters('todo', ['numberOfCompletedTodo']) // getters는 화살표 함수 참조가 불가능하다.
      },
      methods: {
        ...mapMutations({
          ADD_TODO: (context, payload) => context.commit('todo/ADD_TODO', payload),
        })
        ...mapActions({
          addTodo: (context, payload) => context.dispatch('todo/addTodo', payload)
        })
      }
    };
    </script>
    ```
  - ### Arrow 참조 & Object Mapping

    ```html
    <script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
      computed: {
        ...mapState('todo', ['todos'])
        ...mapState('todo', {schedule: 'todos'})
        ...mapGetters('todo', ['numberOfCompletedTodo']) // getters는 화살표 함수 참조가 불가능하다.
      },
      methods: {
        ...mapMutations('todo', {ADD_TODO: 'ADD_TODO'}),
        ...mapActions('todo', {addTodo: 'addTodo'}),
      }
    };
    </script>
    ```

  </details>
  <details>
  <summary style="font-size:30px; font-weight:bold; font-style:italic;">Vuex Modules 02 (createNamespacedHelpers)</summary>
  <br>

  - ### Arrow 참조 & Object Mapping

    ```html
    <script>
    
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('todo')
    export default {
      computed: {
        ...mapState(state => state.todos)
        ...mapState({
          people: state => state.todos
        })
        ...mapGetters(['numberOfCompletedTodo']) // getters는 화살표 함수 참조가 불가능하다.
      },
      methods: {
        ...mapMutations({
          ADD_TODO: (context, payload) => context.commit('ADD_TODO', payload),
        })
        ...mapActions({
          addTodo: (context, payload) => context.dispatch('addTodo', payload)
        })

      }
    };
    </script>
    ```
  - ### String 참조 - Array

    ```html
    <script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('todo')
    export default {
      computed: {
        ...mapState(['aS', 'bS', 'cS'])
        ...mapGetters(['aG', 'bG', 'cG']) 
      },
      methods: {
        ...mapMutations(['aM', 'bM', 'cM'])
        ...mapActions(['aA', 'bA', 'cA'])
      }
    };
    </script>
    ```

  - ### String 참조 - Object Mapping

    ```html

    <script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('todo')  export default {
      computed: {
        ...mapState(['todos'])
        ...mapState({schedule: 'todos'}) // 다른 이름으로 맵핑
        ...mapGetters(['numberOfCompletedTodo']) 
        ...mapGetters({count: 'numberOfCompletedTodo'}) // getters는 화살표 함수 참조가 불가능하다.
      },
      methods: {
        ...mapMutations(['ADD_TODO'])
        ...mapMutations({ADD_TODO: 'ADD_TODO'})
        ...mapActions(['addTodo'])
        ...mapActions({addTodo: 'addTodo'})
      }
    };
    </script>
    ```

    ## 다중 modules 참조

    ```js
    import { createNamespacedHelpers } from 'vuex'
    const {mapState : mapTodoState,  mapGetters: mapTodoGetters,
          mapActions: mapTodoActions,  mapMutations: mapTodoMutations } = createNamespacedHelpers('todo');
    const {mapState : mapUserState,  mapGetters: mapUserGetters,
          mapActions: mapUserActions,  mapMutations: mapUserMutations } = createNamespacedHelpers('user');
    export default {
      computed: {
        ...mapTodoState(['todos'])
        ...mapTodoState({schedule: 'todos'}) 
        ...mapTodoGetters(['numberOfCompletedTodo']) 
        ...mapTodoGetters({count: 'numberOfCompletedTodo'}) 

        ...mapTodoState(['users'])
        ...mapTodoState({people: 'users'}) 
        ...mapTodoGetters(['numberOfCompletedUser']) 
        ...mapTodoGetters({size: 'numberOfCompletedUser'}) 
      },
      methods: {
        ...mapTodoMutations(['ADD_TODO'])
        ...mapTodoMutations({ADD_TODO: 'ADD_TODO'})
        ...mapTodoActions(['addTodo'])
        ...mapTodoActions({addTodo: 'addTodo'})

        ...mapTodoMutations(['ADD_USER'])
        ...mapTodoMutations({ADD_USER: 'ADD_USER'})
        ...mapTodoActions(['addUser'])
        ...mapTodoActions({addUser: 'addUser'})
      }
    };
    ```

  </details>
  <details>
  <summary style="font-size:30px; font-weight:bold; font-style:italic;">Vuex Modules 03 (Dynamic Register)</summary>
  <br>

    - ### 동적 모듈 추가/제거
      ```js
      // user 모듈 추가
      this.$store.registerModule('user');

      // user 모듈 제거
      this.$store.unregisterModule('user');

      ```

    - ### 동적 중첩 모듈 추가/제거
      ```js

      // 중첩 모듈 추가
      this.$store.registerModule(['user', 'profile']);
      // 중첩 모듈 추가
      this.$store.registerModule(['user', 'profile']);

      // 중첩 모듈 제거
      this.$store.unregisterModule(['user', 'profile']);
      ```
      
      동적 모듈 추가/제거 기능은 언제 사용할까?  


      1. **조건부 필요성**  
      특정 기능이나 데이터가 더 이상 필요하지 않은 경우, 예를 들어 사용자가 로그아웃할 때 사용자 관련 모듈을 제거하거나 특정 페이지에서만 필요한 모듈을 동적으로 제거할 수 있습니다.
      2. **메모리 관리**  
      불필요한 모듈을 제거함으로써 메모리 사용을 최적화할 수 있습니다. 특히 모바일 기기나 리소스가 제한된 환경에서는 메모리 관리가 중요합니다.
      3. **성능 개선**  
      불필요한 상태 관리 및 뮤테이션이 계속해서 발생하는 것을 방지하여 애플리케이션의 성능을 개선할 수 있습니다. 사용자가 다른 섹션으로 이동할 때 해당 섹션과 관련된 상태를 해제할 수 있습니다.
      4. **동적 라우팅과 UI 변화**  
      애플리케이션이 사용자의 행동이나 네비게이션에 따라 UI를 변경하는 경우, 필요한 모듈만 등록하고, 더 이상 필요하지 않은 모듈은 제거하여 상태를 적절하게 관리할 수 있습니다.
      5. **개발과 디버깅**  
      개발 중에 모듈을 추가하거나 제거하면서 기능을 테스트하고, 문제가 발생했을 때 특정 모듈을 제거하여 원인을 찾는 데 유용합니다.


      로그인 컴포넌트에 들어왔다고 가정한다.  
      로그인 기능에서 먼저 모듈을 등록한 뒤 등록 여부를 명확히 확인한다(hasOwnProperty).
      등록된 모듈을 기준으로 로그인을 진행한다.  
      (액세스/리프레시토큰 로컬스토리지/세션 에 적절히 저장)  
      이후 로그아웃을 진행한 뒤 (로컬스토리지/세션 에서 제거) 해당 모듈을 제거한다.

    </details>
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