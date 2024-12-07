import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/** 게임 시작 */
export const START_GAME = 'START_GAME';
/** 칸 열기 */
export const OPEN_CELL = 'OPEN_CELL';
/** 지뢰 클릭 */
export const CLICK_MINE = 'CLICK_MINE';
/** 칸 깃발(지뢰표시) */
export const FLAG_CELL = 'FLAG_CELL';
/** 칸 임시(긴가민가) */
export const QUSTION_CELL = 'QUSTION_CELL';
/** 칸 해제 */
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
/** 시간 증가 */
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export default new Vuex.Store({
  state: {
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    result: '',
  },
  getters: {
  },
  mutations: {
    [START_GAME] (state) {
      
    },
    [OPEN_CELL] (state) {
      
    },
    [CLICK_MINE] (state) {
      
    },
    [FLAG_CELL] (state) {
      
    },
    [QUSTION_CELL] (state) {
      
    },
    [NORMALIZE_CELL] (state) {
      
    },
    [INCREMENT_TIMER] (state) {
      
    },
    
  },
  actions: {

  },
})
