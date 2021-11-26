import app from './index';
import router from './router'
import store from './store'
import Maska from 'maska';
import Notifications from 'notiwind'
import '@/assets/css/index.css'

import '@/components/global'; // Componentes globais
import '@/directives/global'; // Diretivas globais

app.use(store)
app.use(router)
app.use(Maska)
app.use(Notifications)
app.mount('#app')
