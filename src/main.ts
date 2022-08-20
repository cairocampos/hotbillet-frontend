import app from './index';
import router from './router'
import Maska from 'maska';
import Notifications from 'notiwind'
import { VMoney } from "v-money";
import './assets/css/index.css'
import { createPinia } from 'pinia';

import './components/global'; // Componentes globais
import './directives/global'; // Diretivas globais

const pinia = createPinia();

app.use(router)
app.use(Maska)
app.use(Notifications)
app.use(pinia)
app.directive("money", VMoney);
app.mount('#app')


// console.log('env', import.meta.env)