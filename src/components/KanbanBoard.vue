<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Column from "./SectionColumn.vue"

defineProps({
  msg: {
    type: String,
    default: "Kanban Board"
  },
  
})

const store = useStore()

const todoList = computed(() => store.getters.allTasksByType("todo"))
const inProgressList = computed(() => store.getters.allTasksByType("in-progress"))
const doneList = computed(() => store.getters.allTasksByType("done"))
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="board">
    <Column
      type="todo"
      title="Todo"
      :tasks="todoList"
    />
    <Column
      type="in-progress"
      title="In Progress"
      :tasks="inProgressList"
    />
    <Column
      type="done"
      title="Done"
      :tasks="doneList"
    />
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
div.board{
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 50vh;
}
</style>
