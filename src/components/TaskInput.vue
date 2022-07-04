<script setup>
import { nanoid } from "nanoid"
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const props = defineProps({
  type: {
    type: String,
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
  <a href="#" type="link" @click.prevent="showInput = true" v-if="!showInput">New Task</a>
  <div class="task-input" v-else>
    <span>
      <input type="text" v-model="newTask.title" @keydown.enter="addTask" @keydown.escape="showInput = false">
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