import { createStore } from "vuex"
import {nanoid} from "nanoid"

export const store = new createStore({
  state: {
    tasks: [
      {
        title: "Drink 2 litres of water",
        id: nanoid(),
        type: "todo"
      },
      {
        title: "Go to the Gym",
        id: nanoid(),
        type: "todo"
      },
      {
        title: "Review project's PRs",
        id: nanoid(),
        type: "todo"
      }
    ]
  },
  getters: {
    allTasks: state => state.tasks,
    allTasksByType: state => (type) => state.tasks.filter(task => task.type === type),
    getTask: state => (id) => state.tasks.filter(task => task.id === id)[0]
  },
  mutations: {
    addTask(state, task){
      state.tasks.push(task)
    },
    deleteTask(state, payload){
      state.tasks = state.tasks.filter(task => task.id !== payload.id)
    },
    updateTask(state, payload){
      let index = state.tasks.findIndex(task => task.id === payload.id)
      state.tasks[index] = payload
    }
  },
  actions: {
    ADD_TASK({commit}, task){
      commit("addTask", task)
      return true
    },
    DELETE_TASK({commit}, task){
      commit("deleteTask", task)
      return true
    },
    UPDATE_TASK({commit}, task){
      commit("updateTask", task)
      return true
    },
    MOVE_TASK({commit, state}, {taskId, taskType}){
      const taskData = state.tasks.filter(task => task.id === taskId)[0];
      const updatedTaskData = Object.assign(taskData, {type: taskType})
      commit("updateTask", updatedTaskData)
      return true
    }
  }
})