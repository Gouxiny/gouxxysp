// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import GXY from './gxy.js';
import Vue from 'vue'
GXY.Vue = Vue;
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import store from './store';
import VueRouter from 'vue-router';

import htmlToPdf from "../src/libs/html2pdf";

Vue.config.productionTip = false
Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
