import { createApp } from 'vue'
// import App from './App.vue'
// import './index.css'

// createApp(App).mount('#app')

// main.ts
// import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')