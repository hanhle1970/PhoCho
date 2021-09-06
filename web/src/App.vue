<template>
  <v-app id="app">
    <div v-if="loading">
      <div class="loading">Loading... Please wait a moment</div>
    </div>
    <div v-else>
      <div v-if="$store.state.isLogined">
        <MasterPage></MasterPage>
      </div>
      <div v-else>
        <Login @completed="onLoginCompleted"></Login>
      </div>
    </div>
  </v-app>
</template>

<script>
import MasterPage from './MasterPage';
import Login from './Login';

export default {
  name: 'App',
  components: {
    Login,
    MasterPage,
  },
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    this.$http.relogin((res) => {
      this.loading = false;
      this.$store.dispatch('login', res);
    },
    () => this.loading = false);
  },
  methods: {
    onLoginCompleted(res) {
      this.$store.dispatch('login', res);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Segoe UI, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #2c3e50;
  background: #f5f5f5;

  .loading {
    margin-top: 300px;
    text-align: center;
  }
}
</style>
