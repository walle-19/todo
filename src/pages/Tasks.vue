<template>
	<div class="content">
		<form class="add">
			<input type="text" placeholder="Add task" @keypress.enter="addTask" class="add-task">
			<button @click="addTask">Add</button>
		</form>
		<ul>
			<li v-for="(item, i) in allTasks" :key="i + item" class="task">
				<div>
					<span class="task-text">{{ item }}</span>
					<input 
						class="task-edit" 
						style="display: none" 
						type="text" 
						:value="item" 
						@keypress.enter="saveEditTask($event, i)"
						@blur.native="saveEditTask($event, i)"
					>
				</div>
				<button @click="editTask($event,i)">Edit</button>
				<button @click="deleteTask($event,i)">Delete</button>
			</li>
		</ul>
	</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'AppLayout',
	
	setup() {
		const store = useStore();	
		
		const allTasks = computed(() => store.state.tasks);
		
		function addTask(e){
			e.preventDefault();
			let text = e.target.closest('.add').querySelector('.add-task');
			store.dispatch('addTask', text.value);
			text.value = '';
		};
		
		function deleteTask(e, i){
			event.preventDefault();
			store.dispatch('deleteTask', i);
		};
		
		function editTask(e, i){
			e.preventDefault();
			let inputEditText = event.target.closest('.task').querySelector('.task-edit');
			let oldTaskText = event.target.closest('.task').querySelector('.task-text');
			inputEditText.style.display='inline-block';
			inputEditText.focus();
			oldTaskText.style.display = 'none';
		};
		
		function saveEditTask(e, i){
			let newText = e.target.value;
			let inputEditText = e.target.closest('.task').querySelector('.task-edit');
			store.dispatch('saveEditTask', {i, newText});
			inputEditText.style.display='none';
			let oldTaskText = event.target.closest('.task').querySelector('.task-text');
			oldTaskText.style.display = 'inline-block';
		};
		
		 onMounted(() => {
			store.dispatch('getOldTasks');
		 });
		
		return {
		  allTasks,
		  addTask,
		  deleteTask,
		  editTask,
		  saveEditTask,
		}
	},
}
</script>

<style scoped lang="scss">
form {
	display: flex;
	gap: 10px;
	padding-bottom: 30px;
}

input {
	width: 100%;
	border-radius: 30px;
    border: none;
	padding: 10px;
	outline:none;
	
	&.task-edit {
		color: #fff;
		background: transparent;
		padding: 0;
		
		&:focus {
			border: none;
			 
		}
	}
}

button {
	background: #040d3a;
	color: #fff;
	min-width: 120px;
    padding: 10px;
    border-radius: 30px;
    border: none;
	cursor: pointer;
	
	&:hover {
		background: #faac6d;
	}
}

ul {
	list-style-type: none;
	color: #fff;
	padding: 0;
}

li {
	display: flex;
	gap: 10px;
	padding: 10px;
	border: 1px solid #fff;
	border-radius: 30px;
	margin-bottom: 20px;
	
	div {
		width: 100%;
		align-self: center;
	}

	span {
		padding-left: 10px;
	}
}
</style>