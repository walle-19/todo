import { createStore } from 'vuex';

const store = {
  state: () => ({
	tasks: [],
  }),
  
  mutations: {
    addTask(state, text){
		state.tasks.unshift(text);
	},
	deleteTask(state, i){
		state.tasks.splice(i,1);
	},
	saveEditTask(state, {i, newText}){console.log(newText)
		state.tasks[i] = newText;
	},
	saveTasks(state) {
		localStorage.setItem("tasks", state.tasks);
	},
	getOldTasks(state, oldTasks){
		state.tasks = oldTasks;
	}
  },
  
  actions: {
	addTask({ commit }, text){
		commit('addTask', text);
		commit('saveTasks');
	}, 
	deleteTask({ commit }, i){
		commit('deleteTask', i);
		commit('saveTasks');
	},
	saveEditTask({ commit }, {i, newText}){
		commit('saveEditTask', {i, newText});
		commit('saveTasks');
	},
	getOldTasks({ commit }) {
		let tasksOld = localStorage.getItem("tasks");
		if (tasksOld) {
			commit('getOldTasks', tasksOld.split(','));
		}
	},
  },
}

export default function () {
  return createStore(store)
}