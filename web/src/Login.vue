<template>
  <div class="body">
    <div class="d-flex">
      <div>
        <img src="@/assets/login_bkg.jpg" width="400" height="400">
      </div>
      <div class="content">
        <div class="form">
          <div>
            <v-icon large color="blue darken-2">mdi-docker</v-icon>
          </div>
          <div>
            <span style="color: primary">Login</span> Your Account
          </div>
          <v-form v-model="valid">
            <v-container>
              <div>
                <v-text-field v-model="userName" label="User Name" required></v-text-field>
              </div>
              <div>
                  <v-text-field v-model="pwd" label="Password" required 
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2">
                  </v-text-field>
              </div>
              <div class="buttons">
                <v-btn rounded dark color="primary" @click.stop="login" width="100"> Login </v-btn>
              </div>
              <div class="remember">
                <v-checkbox v-model="remember" label="Remember" ></v-checkbox>
              </div>
              <div v-if="error">
                <div class="err"> {{error}} </div>
              </div>
            </v-container>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: null,
      pwd: null,
      valid: true,
      show2: false,
      remember: true,
      error: null,
    }
  },
  methods: {
    login() {
      this.$http.login(this.userName, this.pwd, this.remember, (res) => {
        this.$emit('completed', res);
      },
      (err) => {
        this.error = err;
      });
    }
  }
}
</script>

<style lang="scss">
.body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
}
.content {
  background-color: #fff;
  width: 300px;

  .form {
    //margin-top: 20px;
    text-align: center;

    .buttons {
      padding: 5px auto;
    }
    .remember {
      margin-top: 5px;
    }
    .err {
      color: #ff0000;
    }
  }
}
</style>

