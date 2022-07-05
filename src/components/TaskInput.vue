<script setup>
import { nanoid } from "nanoid"
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const props = defineProps({
  type: {
    type: String,
    default: "New Task",
    validator: (val) => ["todo", "done", "in-progress"].indexOf(val) !== -1
  }
})
let showInput = ref(false)
let newTask = ref()

watch(showInput, (val) => {
  if(val){
    newTask.value = {
      type: props.type,
      title: "New Task",
      id: nanoid()
    }
  }
})

const addTask = () => {
  store.dispatch("ADD_TASK", newTask.value)
  showInput.value = false
}
</script>

<template>
  <a
    v-if="!showInput"
    href="#"
    type="link"
    @click.prevent="showInput = true"
  >New Task</a>
  <div
    v-else
    class="task-input"
  >
    <span>
      <input
        v-model="newTask.title"
        type="text"
        @keydown.enter="addTask"
        @keydown.escape="showInput = false"
      >
    </span>
  </div>
</template>

<style scoped>
.task-input{
  display: inline-flex;
  padding: 1em;
  border-radius: 0.5em;
  border: solid 2px #f0f0f0;
  background-color: white;
  font-weight: 600;
}
input{
  padding: 3px;
  border: 2px solid #f0f0f0;
}
a{
  color: #666666;
  padding: 2px;
}
</style>