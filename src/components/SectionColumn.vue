<script setup>
import { useStore } from 'vuex'
import Task from './TaskCard.vue'
import TaskInput from './TaskInput.vue'
const store = useStore()

const props = defineProps({
  title: {
    type: String,
    default: "New Task"
  },
  type: {
    type: String,
    default: "todo",
    validator: (val) => ["todo", "done", "in-progress"].indexOf(val) !== -1
  },
  tasks: {
    type: Array,
    default: () => []
  }
})

const dragOver = (el) => {
  el.dataTransfer.dropEffect = "move"
}

const drop = (el) => {
  const transerInfo = el.dataTransfer.getData("text/plain")
  let [taskId, ] = transerInfo.split("*#*")
  store.dispatch("MOVE_TASK", {taskId, taskType: props.type})
}
</script>

<template>
  <div
    class="column"
    :class="type"
  >
    <h2>{{ title }}</h2>

    <div
      class="body"
      @dragover.prevent="dragOver"
      @drop.prevent="drop"
    >
      <Task
        v-for="(task, index) of tasks"
        :key="index"
        :index="task.id"
        :title="task.title"
        :type="task.type"
      />
      
      <TaskInput :type="props.type" />
    </div>
  </div>
</template>

<style scoped>
.column{
  position: relative;
  margin: 1rem;
  width: 100%;
  outline: solid 2px #e3ebf0;
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 1fr;
  min-height: 100px;
  max-height: 80vh;
}
h2{
  display: inline-flex;
  justify-content: center;
  flex-grow: 0;
  padding: 1rem;
  margin: 0;
  user-select: none;
}
.done > h2{
  background-color: #70f491;
}
.todo > h2{
  background-color: #e3ebf0;
}
.in-progress > h2{
  background-color: #5fc3ff;
}
.default{
  background-color: gray;
}
.body{
  flex-grow: 1;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 1fr;
  overflow-y: auto
}
.body > div{
  margin-bottom: .2em;
}
</style>