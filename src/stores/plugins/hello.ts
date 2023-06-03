import { ref } from 'vue'
import { type PiniaPluginContext } from 'pinia'
export function HelloPlugin(context: PiniaPluginContext) {
  context.store.hello = ref('world')
  context.store.simpleNumber = Math.random()
}
