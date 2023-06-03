<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'
const counterStore = useCounterStore()
/**
 *  `name` and `doubleCount` are reactive refs
 *  This will also extract refs for properties added by plugins
 *  but skip any action or non reactive (non ref/reactive) property
 * if you destructure without storeToRefs it will break reactivity
 */
//const { name, doubleCount } = storeToRefs(counterStore)

// the increment action can just be destructured
//const { increment } = counterStore
</script>
<script lang="ts">
//declare script tag separately to disabled fallthrough attribute in this component
//because the imherited attrs need to be applied to button elements besides the root node (in this ex is div)
export default {
  inheritAttrs: false
}
</script>
<template>
  <div class="wrapper">
    <p id="count">{{ counterStore.count }}</p>
    <p id="double-count">{{ counterStore.doubleCount }}</p>
    <p id="double-count-plus-one">{{ counterStore.doublePlusOne() }}</p>
    <!-- v-bind without an argument will bind all the attrs -->
    <a-button type="primary" @click="counterStore.increment" v-bind="$attrs" id="increment-btn"
      >Increment</a-button
    >
    <p>{{ counterStore.hello }}</p>
    <a-button @click="counterStore.$reset()" v-bind="$attrs" id="reset-btn">Reset</a-button>
  </div>
</template>

<style scoped>
p {
  text-align: center;
}
</style>
