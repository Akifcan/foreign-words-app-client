import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import AppAlert from './components/AppAlert'
import { globalMixin } from './mixins/'


createApp(App)
    .use(store)
    .use(router)
    .mixin(globalMixin)
    .component('AppAlert', AppAlert)
    .mount('#app')
