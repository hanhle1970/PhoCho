<template>
  <div>
    <div class="d-flex main">
      <div class="mr-auto">
        <div>{{ paths }}</div>
      </div>
      <v-chip @click="logout">Logout</v-chip>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    paths() {
      return this.$store.state.paths.join(' > ');
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('login', false);
      this.$http.logout();
    }
  }
}
</script>

<style scope lang="scss">
.main {
  padding: 0 15px;
}
</style>