<template>
  <div>
    <h1>Family Recipes</h1>
    <div class="family-cntnr">
      <RecipePreviewList
          title=""
          :url="url"
          v-if="$root.store.isLoggedin()"
          :size="size"
          :recipes-per-row="1"
      />
    </div>
  </div>
</template>

<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    export default {
      name: "FamilyPage",
      data() {
          return {
              url: 'http://localhost/profile/family_recipes',
              size: "extra"
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
 .family-cntnr {
   text-align: center;
   align-items: center;
   justify-content: center;
   left: 0;
   transform: translateX(50%);
   width: 900px;
 }
</style>