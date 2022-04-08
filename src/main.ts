import app from './index';
import router from './router'
import {useDefaultStore} from './store'
import Maska from 'maska';
import Notifications from 'notiwind'
import '@/assets/css/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@/components/global'; // Componentes globais
import '@/directives/global'; // Diretivas globais

app.component('Icon', FontAwesomeIcon)
app.use(useDefaultStore)
app.use(router)
app.use(Maska)
app.use(Notifications)
app.mount('#app')
