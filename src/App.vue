<script setup lang="ts">
import { ref, provide } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useMouse } from './composables/mouse'
const { x, y } = useMouse()
const visible = ref(false)
const showDrawer = () => {
  visible.value = !visible.value
}
const textSize = ref(1)
provide('textSize', textSize)
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <p>Mouse position is at: {{ `${x}, ${y}` }}</p>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/user">User</RouterLink>
      <!-- todo: when Tools is clicked will open a modal that can be used to -->
      <!-- 1. Enlarge Text -->
      <!-- 2. Dark Mode -->
      <a-button type="primary" @click="showDrawer">Tools</a-button>
      <a-drawer
        v-model:visible="visible"
        class="custom-class"
        style="color: red"
        title="Tools"
        placement="right"
      >
        <a-button type="primary" @click="textSize += 1">Enlarge Text</a-button>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </a-drawer>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-bottom: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
