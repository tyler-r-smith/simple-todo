<template>
  <div class="about">
    <h1 class="title">Welcome {{currentUser.userName}}!</h1>
    <div class="content">
      <UserInfo :user="currentUser" />

      <h2>Tasks:</h2>
      <TaskInfo v-for="task in currentUser.tasks" :key="task._id" :task="task" />
      <p v-if="currentUser.tasks.length <= 0">You are all done. All tasks complete.</p>
      <TaskCreate class="my-4"/>
    </div>
  </div>
</template>
<script>
import UserInfo from '@/components/UserInfo.vue'
import TaskInfo from '@/components/TaskInfo.vue'
import TaskCreate from '@/components/TaskCreate.vue'
export default {
  components: {
    UserInfo,
    TaskInfo,
    TaskCreate
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    }
  }
}
</script>
