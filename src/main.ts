import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'tippy.js/dist/tippy.css'
import VueTippy from 'vue-tippy'
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import './assets/main.css'

library.add(faCircleInfo)

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)


app.use(createPinia())
app.use(router)
app.use(VueTippy)

app.mount('#app')
