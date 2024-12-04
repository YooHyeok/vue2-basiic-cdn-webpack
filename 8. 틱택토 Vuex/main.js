import Vue from 'vue'
// import TicTacToe from './TicTacToe'
// import TicTacToe from './component/storeAccess/TicTacToe'
import TicTacToe from './component/mapHelper/TicTacToe'
import store from './store'

new Vue({
  store,
  render: createElement => createElement(TicTacToe)
}).$mount('#root'); // vue2 마운트