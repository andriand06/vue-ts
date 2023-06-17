<script setup lang="ts">
import { inject } from 'vue'
interface Props {
  msg?: string
}
withDefaults(defineProps<Props>(), { msg: 'Hello!' })
const textSize = inject<number>('textSize')

</script>

<template>
  <div class="wrapper">
    <h1 :style="{ fontSize: textSize + 'em' }">{{ msg }}</h1>
    <!-- $translate are global properties declared from i18n plugin and $translate type is from ComponentCustomProperties defined -->
    <h1>{{ $translate('greetings.hello') }}</h1>
  </div>
</template>

<style scoped></style>
