<template>
  <div id="app">
    <div id="nav" class="nav">
      <router-link to="/">Home</router-link>
      <template v-if="currentUser" >
      | <router-link to="/user">User</router-link>
      | <a @click="logout" class="cursor-pointer">Logout</a>
      </template>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  computed: {
    currentUser () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(result => {
          this.$router.go('/')
        })
        .catch()
    }
  }
}
</script>
<style>
@import 'assets/styles/tailwind.postcss';
.nav {
  @apply ml-6 py-3
}
.title {
  @apply text-5xl px-12 mb-1
}
.content {
  @apply px-12 w-full
}
.input {
  @apply p-4 mb-1 border border-solid border-black
}
@screen md {
  .content {
    @apply w-1/2
  }
}

</style>
