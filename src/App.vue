<script setup>
import Board from './components/KanbanBoard.vue'
</script>

<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <Board
    msg="Vue Kanban"
  />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img{
  width: 100px;
  height: auto;
}
</style>
