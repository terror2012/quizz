<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form action="#">
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onLogin" type="submit" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

  <script>
import UserServices from "@/services/UserServices.js";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onLogin() {
      let data = new FormData();
      data.append("username", this.username);
      data.append("password", this.password)
      UserServices.login(data).then(result => {
          if(result.data.status == "success")
          {
              this.$session.set("user", result.data.message);
              this.$router.push("/admin")
          }
          else if(result.data.status == "redirect")
          {
              this.$router.push(result.data.message);
          }
          else if(result.data.status == "failed")
          {
              console.log(result.data.message);
          }
      })
    }
  }
};
</script>