<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div id="nav" >

      <b-navbar-brand :to="{ name: 'main' }">
        <i class="fa fa-home"></i>
        Home Page
      </b-navbar-brand>
      <b-navbar-brand :to="{ name: 'search' }"><i class="fa fa-search"></i>
        Search</b-navbar-brand>
      <b-navbar-brand :to="{ name: 'about' }">
        <i class="fa fa-id-card-o"></i>
        About</b-navbar-brand>
      <span class="left-side" v-if="!$root.store.username">
         Hello Guest:
              <b-navbar-brand :to="{ name: 'register' }"><i class="fa fa-user-plus" aria-hidden="true"></i>
Register</b-navbar-brand>
              <b-navbar-brand :to="{ name: 'login' }"><i class="fa fa-sign-in" aria-hidden="true"></i>
Login</b-navbar-brand>

<!--        <router-link class="btn btn-sm btn-outline-secondary" type="button" :to="{ name: 'register' }">Register</router-link>-->
<!--        <router-link class="btn btn-sm btn-outline-secondary" type="button" :to="{ name: 'login' }">Login</router-link>-->
      </span>
      <span class="left-side" v-else >
              <b-dropdown text="Personal" variant="primary" class="m-2">
                <ol>
                  <b-navbar-brand :to="{ name: 'MyFavorites' }"><i class="fa fa-heart-o" aria-hidden="true"></i>
Favorites</b-navbar-brand>
                </ol>
                <ol>
                  <b-navbar-brand :to="{ name: 'PersonalRecipes' }"><i class="fa fa-pencil" aria-hidden="true"></i>Personal</b-navbar-brand>
                </ol>
                <ol>
                  <b-navbar-brand :to="{ name: 'Family' }"><i class="fa fa-users" aria-hidden="true"></i> Family</b-navbar-brand>
                </ol>
                <ol>
                  <b-navbar-brand  id="addRecipe" @click.prevent="showPanel"><i class="fa fa-plus" aria-hidden="true"></i> Add new Recipe</b-navbar-brand>
                </ol>
              </b-dropdown>
        Hello There {{ $root.store.username }}: <b-button
          type="submit"
          variant="primary"
          class="logout-btn"
          @click="Logout">Logout</b-button>
      </span>
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
  padding: 25px;
}

#nav a {
  font-weight: bold;
  color: #3b8ee2;
}
#addRecipe{
  font-weight: bold;
  color: #3b8ee2;
}

#nav a.router-link-exact-active {
  color: #3b8ee2;
}

.logout-btn {
  cursor: pointer;
}
  span.left-side{
    margin-left: 1100px;
  }
</style>
