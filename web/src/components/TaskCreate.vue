<template>
  <div>
    <p v-if="!create" @click="create = !create" class="cursor-pointer">Create a new task +</p>
    <TaskForm v-else :submit-method="createTask" />
  </div>
</template>
<script>
import TaskForm from '@/components/TaskForm.vue'
export default {
  components: {
    TaskForm
  },
  data () {
    return {
      create: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    }
  },
  methods: {
    createTask (task) {
      fetch('/api/task', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ task })
      })
        .then(response => response.json())
        .then(task => {
          const tasks = this.currentUser.tasks.map(task => task._id)
          tasks.push(task._id)
          return fetch(`/api/user/${this.currentUser._id}`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ user: { tasks } })
          })
        })
        .then(_ => {
          return this.$store.dispatch('getCurrentUser')
        })
        .then(_ => {
          this.create = false
        })
        .catch(console.error)
    }
  }
}
</script>
