import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'element-plus/dist/index.css'
import store from './store'
import './styles/styles.scss'
import * as uiv from 'uiv'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(uiv)
app.mount('#app')
