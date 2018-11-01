<template>
  <div>
    <h1 class="text-5xl title">Login</h1>
    <form @submit.prevent="authenticate" class="content flex flex-col">
      <input type="text" name="username" v-model="username" placeholder="username" class="input"/>
      <input type="password" name="password" v-model="password" placeholder="password" class="input"/>
      <input type="submit" name="submit" value="Login" class="input bg-grey"/>
      <p class="text-red">{{displayError}}</p>
    </form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    displayError() {
      if (!this.username) 
        return 'Please fill out the username.'
      else if(!this.password)
        return 'Please fill out the username.'
      else 
        return this.error
    }
  },
  methods: {
    authenticate () {
      this.error = ''
      this.$store.dispatch('authenticate', { username: this.username, password: this.password })
        .then(user => {
          this.$router.push('/user')
        })
        .catch(err => {
          console.error(err)
          this.error = 'There was an issue with either the username or password.'
        })
    }
  }
}
</script>
