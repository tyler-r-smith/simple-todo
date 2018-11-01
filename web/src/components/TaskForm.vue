<template>
  <form @submit.prevent="submitMethod(taskWithUpdatedFields)" class="flex flex-col my-2">
    <select class="input" v-model="completed"  required="required">
      <option value="true">Complete</option>
      <option value="false">Open</option>
    </select>
    <input class="input"  required="required" type="text" v-model="title" placeholder="title"/>
    <input class="input"  required="required" type="text" v-model="description" placeholder="description"/>
    <input class="input" required="required" type="date" v-model="dueDate"/>
    <input class="input bg-green hover:bg-green-lighter cursor-pointer" type="submit" value="Save Your Task"/>
  </form>
</template>
<script>
export default {
  props: {
    submitMethod: {
      type: Function,
      required: true
    },
    task: {
      type: Object
    }
  },
  data () {
    return {
      completed: 'false',
      title: '',
      description: '',
      dueDate: '2018-10-31'
    }
  },
  computed: {
    taskWithUpdatedFields () {
      return {
        completed: this.completed,
        title: this.title,
        description: this.description,
        dueDate: this.dueDate
      }
    }
  },
  created () {
    if (this.task) {
      this.title = this.task.title
      this.completed = this.task.completed
      this.description = this.task.description
      this.dueDate = this.task.dueDate.split('T')[0]
    }
  }
}
</script>
