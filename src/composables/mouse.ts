import { ref } from 'vue'
import { useEventListener } from './event'
export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event: Event) => {
    x.value = (event as HTMLElementEventMap['mousemove']).pageX
    y.value = (event as HTMLElementEventMap['mousemove']).pageY
  })

  return { x, y }
}
