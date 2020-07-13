<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else >
        <router-link :to="{ name: 'MyFavorites' }">Favorites</router-link>|
        <router-link :to="{ name: 'Family' }">Family</router-link>|
        <router-link :to="{ name: 'Personal' }">Personal</router-link>|
        <b-button variant="link" @click.prevent="showPanel">Add new Recipe</b-button>
        Hello There {{ $root.store.username }}:
        <b-button
          type="submit"
          variant="primary"
          class="logout-btn"
          @click="Logout">Logout</b-button>
      </span>
<!--      <div class="down-sctn">-->
<!--        <button >-->
<!--          Add Another Recipe-->
<!--        </button>-->
<!--      </div>-->
    </div>
    <slideout-panel></slideout-panel>
    <b-modal ref="my-modal" hide-footer hide-header size="sm" body-bg-variant="success">
      <div class="d-block text-center">
        <h5>Recipe added successfully</h5>
      </div>
    </b-modal>
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
      return {
          isModalVisible: false,
          openOn: 'right',
      }
  },
  methods: {
    Logout() {
      console.log("Logging Out");
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$cookies.remove('ass_session');


      this.$router.push({name: "main"}).catch(() => {
        this.$router.go();
      });
    },

    showPanel() {
        const panelResult = this.$showPanel({
            component: 'recipeForm',
            height: 600,
            width: 900,
            openOn: this.openOn
        });

        panelResult.promise
            .then(result => {
                console.log(result);
                if( result === "success")
                {
                    this.$refs['my-modal'].toggle('#toggle-btn')
                    setTimeout(() => {
                        this.$refs['my-modal'].toggle('#toggle-btn');
                        this.$router.go();
                    }, 1000)
                }
            })
    }
  }
};
</script>

<style lang="scss">
@import "src/scss/form-style.scss";

.down-sctn{
  text-align: right;

}

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
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.logout-btn {
  cursor: pointer;
}
</style>
