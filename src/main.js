import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'

const kanban = createApp(App)
kanban.use(store)
kanban.mount('#app')
