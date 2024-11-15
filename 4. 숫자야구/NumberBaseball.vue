<template>
  <div>

    <h1>{{ result }}</h1>
    <!-- <form v-on:submit="onSubmitForm"> -->
    <form @submit.prevent="onSubmitForm">
      <input minlength="4" maxlength="4" type="text" v-model="value" ref="answer">
      <button>입력!</button>
    </form>
    <div>시도 : {{ tries.length }}</div>
    <ul>
      <li v-for="(t, idx) in tries" :key="idx">{{ t }}</li>
    </ul>
  </div>
</template>
<script>
  const getNumbers = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
      const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen)
    }
    return array;
  };
  export default {
    
    data() {
      return {
        answer: getNumbers(),
        tries: [],
        value: '',
        result: ''
      }

    },
    methods: {
      onSubmitForm(e) {
        // e.preventDefault();
        if (this.value === this.answer.join('')) { // 정답
          this.tries.push({try:this.value, result: '홈런'})
          this.result = '홈런';
          alert('게임을 다시 실행합니다.')
          this.value = '';
          this.tries = [];
          this.$refs.answer.focus();
        } else { // 오답
          let strike = 0; // 화면에 보여지지 않는 계산식 등은 일반 변수로 사용
          let ball = 0;
          const answerArray = this.value.split('').map(v => parseInt(v)) // 문자열 배열을 숫자 배열로 변환
          console.log(this.answer)
          console.log(answerArray)
          for (let i = 0; i < 4; i++) {
            if (answerArray[i] === this.answer[i]) { // 숫자 자릿수 모두 정답인 갯수
              strike++;
            }
            else if (this.answer.includes(answerArray[i])) { // 숫자만 정답인 갯수
              ball++;
            }
          }
          this.tries.push({try:this.value, result: `${strike} 스트라이크, ${ball}볼`})
        }
        this.value = '';
        this.$refs.answer.focus();
      }
    },
  }
</script>
<style>

</style>