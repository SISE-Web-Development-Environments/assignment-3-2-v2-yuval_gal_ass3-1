<template>
  <div>
    <h1>Own Recipes</h1>
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
      name: "PersonalPage",
      data() {
          return {
              url: 'http://localhost/profile/personal_recipes'
          }
      },
      components: {
          RecipePreviewList
      }
    }
</script>

<style scoped>

</style>