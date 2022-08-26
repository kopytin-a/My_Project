import { createApp } from 'vue'
import App from './App'
import { useAccordion } from 'vue3-rich-accordion'
import 'vue3-rich-accordion/accordion-library-styles.css'
import Paginate from "vuejs-paginate-next"
import router from '@/router/router'

const app = createApp(App)

app
    .use(useAccordion)
    .use(Paginate)
    .use(router)
    .mount('#app')
