<template>
  <operations v-if="this.state === 'operations'"></operations>
</template>

<script>
export default {
  name: 'cashbox',
  data () {
    return {
      state: "operations"
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
  
</style>
