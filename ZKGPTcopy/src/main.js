import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {router} from './router'
import {store} from './store'
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')