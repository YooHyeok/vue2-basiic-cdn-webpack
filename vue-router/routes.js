import Vue from 'vue';
import VueRouter from 'vue-router';
import TicTacToe from '../8. 틱택토 EventBus/TicTacToe.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/tictactoe', component: TicTacToe },
  ],
});