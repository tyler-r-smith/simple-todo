<template>
  <div class="my-2">
    <template v-if="!edit">
    <div class="flex items-baseline">
      <div @click="toggleComplete" :class="['rounded-full border border-black border-solid text-2xl w-8 text-center cursor-pointer', task.completed ? 'bg-green' : '']">
        ✓
      </div>
      <h3 @click="showDescription = !showDescription" class="cursor-pointer">{{task.title}}</h3><p class="px-2">{{this.formatedDate}}</p>
      <p @click="edit = !edit" class="cursor-pointer mx-2">Edit </p>
      <p @click="removeTask" class="cursor-pointer mx-2">Remove</p>
    </div>
    <p v-if="showDescription">{{task.description || 'No description provided'}}</p>
    </template>
    <TaskForm v-else :task="task" :submit-method="updateEntireTask" />
  </div>
</template>
<script>
  import TaskForm from '@/components/TaskForm.vue'
  export default {
    components: {
      TaskForm
    },
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        showDescription: false,
        edit: false,
      }
    },
    computed: {
      currentUser(){
        return this.$store.state.user
      },
      formatedDate(){
        return this.task.dueDate.split('T')[0]
      },
    },
    methods: {
      updateTask(body){
        return new Promise( (resolve, reject) => {
          fetch(`/api/task/${this.task._id}`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(body)
          })
          .then(res => this.$store.dispatch('getCurrentUser'))
          .then(resolve)
          .catch(reject)

        })
      },
      removeTask(){
        const newTasks = this.currentUser.tasks.map(task => task._id)
        const index = newTasks.indexOf(this.task._id)
        newTasks.splice(index, 1)
        console.log({newTasks, _id: this.task._id, index})
        fetch(`/api/user/${this.currentUser._id}`, {
          method: 'put',
          headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({user: {tasks: newTasks}})
        })
        .then(_ => this.$store.dispatch('getCurrentUser'))
        .catch(console.error)
      },
      updateEntireTask(task){
        const body = {
          task
        }
        this.updateTask(body)
        .then(_ =>{
          this.edit = false
        })
        .catch(console.error)
      },
      toggleComplete(){
        const body = {
            task: {
              completed: this.task.completed ? false : true,
            }
        }
        this.updateTask(body)
      }
    }
  }
</script>