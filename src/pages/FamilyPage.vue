<template>
  <div>
    <h1>Family Recipes</h1>
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
      name: "FamilyPage",
      data() {
          return {
              url: 'http://localhost/profile/family_recipes'
          }
      },
      components: {
          RecipePreviewList
      }
    }
</script>

<style scoped>

</style>