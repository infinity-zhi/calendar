//引入Vue
import Vue from 'vue';
//引入App
import App from './App.vue';
//关闭Vue的生产提示
Vue.config.productionTip = false;

import { Button, InputNumber, Form, Radio, Checkbox, message, Modal } from 'ant-design-vue';
import 'ant-design-vue/lib/col/style/css.js';
import 'ant-design-vue/lib/button/style/index.css';
import 'ant-design-vue/lib/input-number/style/index.css';
import 'ant-design-vue/lib/form/style/index.css';
import 'ant-design-vue/lib/form-model/style/index.css';
import 'ant-design-vue/lib/radio/style/index.css';
import 'ant-design-vue/lib/modal/style/index.css';
import 'ant-design-vue/lib/checkbox/style/index.css';
import 'ant-design-vue/lib/message/style/index.css';

Vue.use(Button);
Vue.use(InputNumber);
Vue.use(Form);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Modal);
Vue.use(message);
Vue.prototype.$message = message;

import request from './utils/request';
Vue.prototype.$request = request;

//创建vm
new Vue({
    el: '#app',
    render: (h) => h(App),
});
