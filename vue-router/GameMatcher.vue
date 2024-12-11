<template>
  <div>
    <div>게임 매쳐 진입</div>
    <div v-if="currentGame === 'tictactoe'"><TicTacToe/></div>
    <div v-else>일치하는 게임이 없습니다.</div>
  </div>
</template>
<script>

import TicTacToe from '../8. 틱택토 EventBus/TicTacToe.vue';
export default {
  name: 'GameMatcher',
  components: {
    TicTacToe
  },
  mounted() {
    console.log(this.$router) // vue router 전체에 대한 설정
    console.log(this.$route) // 현재 주소에 대한 설정들
  },
  computed: {
    currentGame() {
      return this.$route.params.name;
    }
  }
}
</script>
