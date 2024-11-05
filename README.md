# vue2-basiic-cdn-zerocho


# CDN
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

# Vue 인스턴스 초기화 및 root 영역 할당

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

# data 속성

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

# methods 속성
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