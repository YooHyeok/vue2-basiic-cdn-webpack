<template>
  <div>
    <div>
      <router-link to="/tictactoe">틱택토</router-link>
      <router-link to="/game/tictactoe">틱택토 매쳐</router-link>
      <router-link to="/game/mine">지뢰찾기</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import router from './routes'
export default {
  router,
  name: 'Router'
}
</script>
<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>
