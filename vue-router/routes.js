import Vue from 'vue';
import VueRouter from 'vue-router';
/* 프로젝트 외부 디렉토리 컴포넌트 참조의 경우 node_modules가 존재해야 하며 vue 버전이 일치해야한다. */
// import TicTacToe from '../8. 틱택토 Vuex/component/mapHelper/TicTacToe.vue' // vuex의 getters를 찾을 수 없음
import TicTacToe from '../8. 틱택토 EventBus/TicTacToe.vue'
import GameMatcher from './GameMatcher'
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/tictactoe', component: TicTacToe },
    { path: '/game/:name', component: GameMatcher },
  ],
});