<template>
  <div class="my-3">
    <div v-for="key in keysForDisplay" :key="key" class="flex">
      <p v-if="user && user[key]">{{key}}: {{user[key]}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      keysForDisplay: [
        'userName',
        'about'
      ]
    }
  }
}
</script>
