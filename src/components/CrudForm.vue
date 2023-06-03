<script setup lang="ts">
import { reactive, ref, type Ref, computed } from 'vue'
import { Employee } from '../models/Employee'
const employees = reactive(
  new Array<Employee>(
    { id: 1, firstName: 'Andrian', lastName: 'Davinta' },
    { id: 2, firstName: 'John', lastName: 'Kim' }
  )
)
const searchQuery: Ref<string | null> = ref('')
const firstName = ref('')
const lastName = ref('')
const isSearching = ref(false)
let selectedEmployee = ref(0)

const filteredEmployees = computed(() =>
  employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().startsWith(searchQuery.value as string) ||
      employee.lastName.toLowerCase().startsWith(searchQuery.value as string)
  )
)

const handleQuery = () => {
  isSearching.value = true
}

const handleSearching = () => {
  isSearching.value = false
}

const handleSelected = (e: any) => {
  let employee = employees.find((employee) => employee.id == e.target.value)
  if (employee) {
    firstName.value = employee.firstName
    lastName.value = employee.lastName
  }
}

const addEmployee = () => {
  employees.push({ id: employees.length + 1, firstName: firstName.value, lastName: lastName.value })
}

const updateEmployee = () => {
  const employee = employees.find((employee) => employee.id === selectedEmployee.value)
  if (employee) {
    employee.firstName = firstName.value
    employee.lastName = lastName.value
  }
}

const deleteEmployee = () => {
  const index = employees.findIndex((e) => e.id === selectedEmployee.value)
  employees.splice(index, 1)
}
</script>
<template>
  <div class="wrapper">
    <a-input-search
      placeholder="type to filter"
      name="search-query"
      id="search-query"
      v-model:value="searchQuery"
      :loading="isSearching"
      @change="handleQuery"
      @keydown.stop="handleSearching"
    ></a-input-search>

    <div id="employee-form">
      <select
        name="employee-list"
        id="employee-list"
        size="5"
        v-model="selectedEmployee"
        @change="handleSelected"
      >
        <option :value="employee.id" :key="index" v-for="(employee, index) in filteredEmployees">
          {{ employee.firstName }} , {{ employee.lastName }}
        </option>
      </select>
      <a-form-item label="First Name">
        <a-input id="first-name" name="name" v-model:value="firstName"></a-input>
      </a-form-item>
      <a-form-item label="Last Name">
        <a-input id="last-name" name="name" v-model:value="lastName"></a-input>
      </a-form-item>
    </div>
    <div id="employee-buttons">
      <a-button @click="addEmployee" id="create-btn">Create</a-button>
      <a-button @click="updateEmployee" id="update-btn">Update</a-button>
      <a-button @click="deleteEmployee" id="delete-btn">Delete</a-button>
    </div>
  </div>
</template>
<style scoped>
#employee-list {
  width: 200px;
  grid-area: select;
}
#employee-form {
  display: grid;
  margin: 1rem 0;
  gap: 1rem;
  grid-template-areas:
    'select form-first-name'
    'select form-last-name';
}
#employee-buttons {
  display: flex;
  gap: 1rem;
}
</style>
