import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
  target: HTMLElement | Window,
  type: keyof HTMLElementEventMap,
  callback: any
): void {
  onMounted(() => target.addEventListener(type, callback))
  onUnmounted(() => target.addEventListener(type, callback))
}
