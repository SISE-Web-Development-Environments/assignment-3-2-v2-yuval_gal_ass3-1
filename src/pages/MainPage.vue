<template>
  <div class="container">
    <div class="split left-side">
      <div class="centered expand-left">
        <RecipePreviewList title="Random Recipes" class="RandomRecipes center" :url="randomUrl" />
      </div>
    </div>
    <div class="split right-side">
      <div class="centered expand-left" >
<!--        <router-link v-if="!isLoggedin()" to="/login" tag="button">You need to Login to vue this</router-link>-->
        <Login v-if="!$root.store.isLoggedin()" @login="setLogin" class="login"/>
        <RecipePreviewList
        title="Last Viewed Recipes"
        :url="last_3_url"
        v-if="$root.store.isLoggedin()"
        :class="{
          RandomRecipes: true,
          blur: !$root.store.isLoggedin(),
          center: true
        }"

        disabled
        />
      </div>
    </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Login from "./LoginPage";
export default {
  components: {
    Login,
    RecipePreviewList
  },
  data() {
      return {
          randomUrl: 'http://localhost/recipes/get_random_recipe_id?numberToRetrieve=3',
          last_3_url: 'http://localhost/profile/get_last_3_watched'
      };
  },
  methods: {
    setLogin() {
        this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  top: 60px;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 20px;
}

/* Control the left side */
.left-side {
  left: 0;
}

/* Control the right side */
.right-side {
  right: 0;

}

.login {
  transform: translate(-15% ,-50%)
}

/* If you want the content centered horizontally and vertically */
@media screen and (min-width: 100px) and (max-width: 1500px){
  .expand-left {
    height: 30rem;
    width: 20rem;
  }
}
@media screen and (min-width: 1500px){
  .expand-left {
    width: 40rem;
  }
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  text-align: center;
}
.RandomRecipes {
  margin: 10px 0 10px;
  width: 100%;
}
</style>
