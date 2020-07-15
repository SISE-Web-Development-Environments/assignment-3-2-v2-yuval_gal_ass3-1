<template>
  <div>
    <h1>My Favorites</h1>
    <div class="fav-cntnr">
      <RecipePreviewList
          title=""
          :url="url"
          v-if="$root.store.isLoggedin()"
          :size="size"
      />
    </div>
  </div>
</template>

<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    export default {
      name: "Favorites",
      data() {
          return {
              url: 'http://localhost/profile/favorites_recipes',
              size: "large"
          }
      },
      components: {
          RecipePreviewList
      }
    }
</script>

<style scoped>
  h1{
    text-align: center;
  }
  .fav-cntnr {
    text-align: center;
    left: 0;
    transform: translateX(35%);
    width: 1200px;
  }
</style>