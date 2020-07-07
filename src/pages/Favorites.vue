<template>
  <div>
    <h1>Favorites</h1>
    <RecipePreviewList
        title=""
        :url="url"
        v-if="$root.store.isLoggedin()"
    />
  </div>
</template>

<script>
  import RecipePreviewList from "../components/RecipePreviewList";
    export default {
      name: "Favorites",
      data() {
          return {
              url: 'http://localhost/profile/favorites'
          }
      },
      components: {
          RecipePreviewList
      }

    }
</script>

<style scoped>

</style>