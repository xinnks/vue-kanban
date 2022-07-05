<script setup>
defineProps({
  title: {
    type: String,
    default: "New Task"
  },
  type: {
    type: String,
    required: true,
    validator: (val) => ["todo", "done", "in-progress"].indexOf(val) !== -1
  },
  index: {
    type: String,
    required: true,
    validator: (val) => !!val
  }
})

const emojis = {
  "in-progress": "🕓",
  done: "✅",
  todo: "☕"
}

const dragStart = (el) => {
  el.dataTransfer.setData("text/plain", el.target.id)
  el.dataTransfer.effectAllowed = "move"
}
</script>

<template>
  <div
    :id="`${index}*#*${type}`"
    class="task"
    draggable
    @dragstart="dragStart"
  >
    <span class="emoji">
      {{ emojis[type] }}
    </span> {{ title }}
  </div>
</template>

<style>
.task{
  display: inline-flex;
  padding: 1em;
  border-radius: 0.5em;
  border: solid 2px #f0f0f0;
  background-color: white;
  font-weight: 600;
}
.emoji{
  margin-right: 5px;
}
</style>