import Vue from 'vue'
import MineSweeper from './MineSweeper'
import store from './store'

new Vue({
  store,
  render: createElement => createElement(MineSweeper)
}).$mount('#root'); // vue2 마운트