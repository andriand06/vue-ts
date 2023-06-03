import type { App } from 'vue'

export default {
  install: (app: App<any>, options: any) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$translate = (key: string) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
