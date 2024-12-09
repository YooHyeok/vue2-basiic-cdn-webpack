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

/**
 * ## 지뢰판 현황 상태코드 상수 객체  
 * 지뢰판 각 칸의 상태에 대한 숫자값을 코드로 치환  
 * ASIS  
 * ['-1', '-1', '-1'],  
 * ['-1', '-1', '-1'],  
 * ['-1', '-1', '-1']  
 * TOBE  
 * ['-1', '-2', '-7'],  
 * ['-3', '-7', '-1'],  
 * ['-1', '-1', '-1']
 */
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: -0, // 0 이상이면 다 opened
};

/**
 * 지뢰 초기화 함수
 * @param {*} row 
 * @param {*} cell 
 * @param {*} mine 
 */
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);

  // 1. 0 ~ (row * cell -1) 까지 숫자로 초기화 된 row * cell 2차원 배열 생성
  const candidate = Array(row * cell)
      .fill()
      .map((arr, index) => index)

  // 2. 지뢰의 개수만큼 무작위로 위치를 선택하여 shuffle 배열에 추가
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const randomValue = Math.random() * candidate.length; //Math.random(): 0 ~ 1사이 랜덤 - ex) 0.99999999999999999 * 100 = 99.999999999999999
    const randomIndex = Math.floor(randomValue); // floor: 소수 내림 함수(index 결정) - ex) 99.999999999999999 = 99
    const chosen = candidate.splice(randomIndex, 1)[0] // splice: 요소 제거 및 제거된 인덱스반환
    shuffle.push(chosen)
  }

  // 3. 게임판을 저장할 데이터 배열 생성 및 초기화(-1)
  const data = [];
  for (let index = 0; index < row; index++) {
    const rowData = [];
    data.push(rowData);
    for (let index = 0; index < cell; index++) {
      rowData.push(CODE.NORMAL);
    }
    
  }
  // 4. shuffle 배열에 저장된 지뢰 위치를 data 배열에 적용
  for (let index = 0; index < shuffle.length; index++) {
    const vertical = Math.floor(shuffle[index] / cell) // 행
    const horizon =  shuffle[index] % cell// 열
    data[vertical][horizon] = CODE.MINE;
    
  }
  console.log(data)
  return data;
}


export default new Vuex.Store({
  state: {
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    isHalted: true, // 중단여부
    result: '',
  },
  getters: {
  },
  mutations: {
    [START_GAME] (state, {row, cell, mine}) { // payload = {row, cell, mine}
      state.data = {row, cell, mine}
      state.tableData = plantMine(row, cell, mine)
      state.timer = 0;
      state.isHalted = false;
    },
    [OPEN_CELL] (state, {row, cell}) {
      if (row < 0 || row >= state.tableData.length || cell < 0)
      /* 주변 지뢰 갯수 - 동, 서, 남, 북, 대각선 */
      function checkAround() {
        let around = [];
        if (state.tableData[row - 1]) {
          around = around.concat([
          state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1],
          ])
        }
        around = around.concat([
          state.tableData[row][cell - 1], state.tableData[row][cell], state.tableData[row][cell + 1],
        ])
        if (state.tableData[row + 1]) {
          around = around.concat([
            state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1],
          ])
        }
        const counted = around.filter(function (value) {
          return [CODE.MINE, CODE.FLAG, CODE.QUESTION_MINE].includes(value)
        })
        return counted.length;
      }
      const count = checkAround();
      // state.tableData[row][cell] = CODE.OPENED
      // Vue.set(state.tableData[row], cell, CODE.OPENED)
      Vue.set(state.tableData[row], cell, count)
    },
    [CLICK_MINE] (state, {row, cell}) {
      state.isHalted = true;
      Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE)
    },
    [FLAG_CELL] (state, {row, cell}) {
      if (state.tableData[row][cell] === CODE.MINE) {
        Vue.set(state.tableData[row], cell, CODE.FLAG_MINE)
        return;
      }
      Vue.set(state.tableData[row], cell, CODE.FLAG)
    },
    [QUSTION_CELL] (state, {row, cell}) {
      if (state.tableData[row][cell] === CODE.FLAG_MINE) {
        Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE)
        return;
      }
      Vue.set(state.tableData[row], cell, CODE.QUESTION)
    },
    [NORMALIZE_CELL] (state, {row, cell}) {
      if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
        Vue.set(state.tableData[row], cell, CODE.MINE)
        return;
      }
      Vue.set(state.tableData[row], cell, CODE.NORMAL)
    },
    [INCREMENT_TIMER] (state) {
      state.timer++;
    },
    
  },
  actions: {

  },
})
