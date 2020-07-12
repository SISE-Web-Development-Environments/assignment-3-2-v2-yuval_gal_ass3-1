<template>
  <div id="app">
    <div id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="btn btn-sm btn-outline-secondary" type="button" :to="{ name: 'main' }">Home Page</router-link>
      <router-link class="btn btn-sm btn-outline-secondary" type="button" :to="{ name: 'search' }">Search</router-link>
      <router-link class="btn btn-sm btn-outline-secondary" type="button" :to="{ name: 'about' }">About</router-link>

      <span v-if="!$root.store.username">
         Hello Guest:
        <router-link class="btn btn-sm btn-outline-secondary" type="button" :to="{ name: 'register' }">Register</router-link>
        <router-link class="btn btn-sm btn-outline-secondary" type="button" :to="{ name: 'login' }">Login</router-link>
      </span>
      <span v-else >
        <router-link class="btn btn-sm btn-outline-secondary" type="button" :to="{ name: 'MyFavorites' }">Favorites</router-link>
        <router-link class="btn btn-sm btn-outline-secondary" type="button" :to="{ name: 'Family' }">Family</router-link>

        Hello There {{ $root.store.username }}: <b-button
          type="submit"
          variant="primary"
          class="logout-btn"
          @click="Logout">Logout</b-button>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  name: "App",
  methods: {
    Logout() {
      console.log("Logging Out");
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$cookies.remove('ass_session');


      this.$router.push({name: "main"}).catch(() => {
        this.$router.go();
      });
    }
  }
};
</script>

<style lang="scss">
@import "src/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
  background-image: url("./assets/marble-background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

#nav {
  padding: 25px;
}

#nav a {
  font-weight: bold;
  color: #3b8ee2;
}

#nav a.router-link-exact-active {
  color: #6bacf8;
}

.logout-btn {
  cursor: pointer;
}
</style>
