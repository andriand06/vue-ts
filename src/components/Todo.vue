<script lang="ts" setup>
import { ref } from 'vue'
interface Todo {
  id: number
  task: string
  done: boolean
}

const columns = [
  {
    title: 'Task',
    dataIndex: 'task',
    key: 'task'
  },
  {
    title: 'Done',
    dataIndex: 'done',
    key: 'done'
  },
  {
    title: 'Action',
    key: 'action'
  }
]

const isMarkAll = ref(false)
const submitLabel = ref('Add')
const todoForm = ref<Todo>({ id: 0, task: '', done: false })
const todos = ref<Todo[]>([{ id: 1, task: 'Task 1', done: false }])
const patchTodo = () => {
  if (todoForm.value.id) {
    let index = todos.value.findIndex((todo) => todo.id === todoForm.value.id)
    if (index != -1) todos.value[index].task = todoForm.value.task
    todoForm.value.task = ''
    todoForm.value.id = 0
    submitLabel.value = 'Add'
    return
  }
  if (todoForm.value.task) {
    todos.value.push({ id: todos.value.length + 1, task: todoForm.value.task, done: false })
  }
}

const deleteTodo = (record: Todo) => {
  const index = todos.value.findIndex((todo) => todo.id === record.id)
  if (index != -1) todos.value.splice(index, 1)
}

const handleMark = (record: Todo) => {
  const index = todos.value.findIndex((todo) => todo.id === record.id)
  if (index != -1) todos.value[index].done = !record.done
}

const handleEdit = (record: Todo) => {
  todoForm.value.id = record.id
  todoForm.value.task = record.task
  submitLabel.value = 'Update'
}

const handleMarkAll = () => {
  isMarkAll.value = !isMarkAll.value
  todos.value.map((todo) => (todo.done = isMarkAll.value))
}
</script>

<template>
  <div class="wrapper">
    <a-form name="todo" :model="todoForm">
      <a-form-item name="task">
        <a-input placeholder="Input task" v-model:value="todoForm.task" />
      </a-form-item>
      <div class="button-wrapper">
        <a-button type="primary" html-type="submit" @click="patchTodo">{{ submitLabel }}</a-button>
        <a-button type="secondary" @click="handleMarkAll">{{
          isMarkAll ? 'Unmark All' : 'Mark All'
        }}</a-button>
      </div>
    </a-form>
    <a-table :dataSource="todos" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'done'">
          <span>
            <a-checkbox v-model:checked="record.done"></a-checkbox>
          </span>
        </template>
        <template v-if="column.key === 'action'">
          <span>
            <a @click="handleEdit(record)">Edit</a>
            <a-divider type="vertical" />
            <a @click="deleteTodo(record)">Delete</a>
            <a-divider type="vertical" />
            <a @click="handleMark(record)">{{ record.done ? 'Unmark' : 'Mark' }} Done</a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.button-wrapper {
  display: flex;
  gap: 1rem 1rem;
}
</style>
