import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.css'

// Components globais
import {HeadPage, Modal, SelectInput} from '@/components/global';

const app = createApp(App);

app.component('HeadPage', HeadPage);
app.component('Modal', Modal);
app.component('SelectInput', SelectInput);
app.use(store)
app.use(router)
app.mount('#app')
