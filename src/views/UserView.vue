<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useGridConfig } from '../AppConfig'
// import { NetworkService } from '../services/network'
import { BryntumGrid } from '@bryntum/grid-vue-3'
// import { useRoute } from 'vue-router'
// const size = useRoute().query.size as string
const data = ref<null | {}>(null)
const grid = ref(null)
const gridConfig = reactive(useGridConfig())
const isLoading = ref(false)
// const networkService = new NetworkService()
onMounted(async () => {
  isLoading.value = true
  let response = [{ username: 'Andrian', email: 'andriandavinta@gmail.com' }]
  data.value = response
  isLoading.value = false
})
</script>

<template>
  <BryntumGrid ref="grid" v-bind="gridConfig" :data="data"></BryntumGrid>
  <div class="loading" v-if="isLoading"></div>
</template>
