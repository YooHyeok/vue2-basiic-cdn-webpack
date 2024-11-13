import Vue from 'vue'
import { createApp } from 'vue';
import NumberBaseball from './NumberBaseball'

// new Vue(NumberBaseball).$mount('#root'); // vue2 마운트
createApp(NumberBaseball).mount('#root'); // vue3 마운트