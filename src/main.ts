import app from './index';
import router from './router'
import {store, key} from './store'
import Maska from 'maska';
import Notifications from 'notiwind'
import { VMoney } from "v-money";
import './assets/css/index.css'

import './components/global'; // Componentes globais
import './directives/global'; // Diretivas globais

app.use(store, key)
app.use(router)
app.use(Maska)
app.use(Notifications)
app.directive("money", VMoney);
app.mount('#app')