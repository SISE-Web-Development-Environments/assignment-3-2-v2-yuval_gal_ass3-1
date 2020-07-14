<template>
  <div>
    <h1>My Favorites</h1>
    <RecipePreviewList
        title=""
        :url="url"
        v-if="$root.store.isLoggedin()"
        :size="size"
    />
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
</style>