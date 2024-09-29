import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // นำเข้า router
import './style.css'
 
createApp(App)
  .use(router) // ใช้ router ในแอปพลิเคชัน Vue
  .mount('#app');