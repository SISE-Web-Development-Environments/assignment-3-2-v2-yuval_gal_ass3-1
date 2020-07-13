<template>
  <div>
    <h1>My Favorites</h1>
    <RecipePreviewList
        title=""
        :url="url"
        v-if="$root.store.isLoggedin()"
        :large="isLarge"
    />
  </div>
</template>

<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    export default {
      name: "Favorites",
      data() {
          return {
              url: 'http://localhost/profile/favorites',
              isLarge: true
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