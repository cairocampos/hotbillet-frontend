import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Maska from 'maska';
import '@/assets/css/index.css'

// Components globais
import {HeadPage, Modal, SelectInput, Card, ButtonClose} from '@/components/global';

const app = createApp(App);

app.component('HeadPage', HeadPage);
app.component('Modal', Modal);
app.component('SelectInput', SelectInput);
app.component('Card', Card);
app.component('ButtonClose', ButtonClose);
app.use(store)
app.use(router)
app.use(Maska)
app.mount('#app')
