import './assets/main.scss'

import { createApp, type Ref } from 'vue'
import { createPinia } from 'pinia'
import { HelloPlugin } from './stores/plugins/hello'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import i18nPlugin from './plugins/i18n'
import type { Router } from 'vue-router'
const app = createApp(App)
const pinia = createPinia()
//add plugin directly to pinia
pinia.use(HelloPlugin)
app.use(pinia)
app.use(router)
app.use(Antd)
app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})

app.mount('#app')

//add $translate as global properties, also need to add this file to types property in package.json
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $translate: (key: string) => string
    $router: Router
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // by using a setter we can allow both strings and refs
    set hello(value: string | Ref<string>)
    get hello(): string

    // you can define simpler values too
    simpleNumber: number

    // type the router added by the plugin above (#adding-new-external-properties)
    router: Router
  }
}
