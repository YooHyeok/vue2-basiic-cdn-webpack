import Vue from 'vue';
import Vuex from 'vuex';
/**
 * Object Dynamic Property (ES2015 문법)  
 * 메소드 key를 변수로 추출  
 * import { SET_WINNER, CLICK_CELL, CHANGE_TURN, RESET_GAME, NO_WINNER }  
 * vuex는 호출시 String 문자열로 메소드를 호출한다.  
 * commit(SET_WINNER ) == commit('SET_WINNER')  
 */
export const SET_WINNER = 'SET_WINNER'
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN = 'CHANGE_TURN'
export const RESET_GAME = 'RESET_GAME'
export const NO_WINNER = 'NO_WINNER'

Vue.use(Vuex);
export default new Vuex.Store({
  state: { // data 역할
    tableData: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    turn: 'O',
    winner: ''
  },
  getters: { // computed 역할

  },
  mutations: { // state 수정(동기)
    [SET_WINNER](state, payload) { // 승자 할당
      state.winner = payload;
    },
    [CLICK_CELL](state, {row, cell}) { // 셀 클릭 (클릭된 셀에 현재 턴 할당)
      Vue.set(state.tableData[row], cell, state.turn);
    },
    [CHANGE_TURN](state) { // Turn 변경
      state.turn = state.turn = 'O' ? 'X' : 'O';
    },
    [RESET_GAME](state) { // 게임 초기화
      state.turn = 'O'
      state.tableData = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]
    },
    [NO_WINNER](state) { // 무승부
      state.winner = ''
    }
  },
  actions: { // 비동기 혹은 다중 mutations 연속 실행

  },
})
