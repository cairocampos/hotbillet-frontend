import app from './index';
import router from './router'
import Maska from 'maska';
import Notifications from 'notiwind'
import { VMoney } from "v-money";
import './assets/css/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createPinia } from 'pinia';

library.add(fas)
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './components/global'; // Componentes globais
import './directives/global'; // Diretivas globais

const pinia = createPinia();

app.component('Icon', FontAwesomeIcon)
app.use(router)
app.use(Maska)
app.use(Notifications)
app.use(pinia)
app.directive("money", VMoney);
app.mount('#app')


console.log('env', import.meta.env)