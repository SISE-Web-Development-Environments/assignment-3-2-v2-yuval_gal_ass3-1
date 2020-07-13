<template>
  <div>
    <h1>Family Recipes</h1>
    <div class="family-cntnr">
      <RecipePreviewList
          title=""
          :url="url"
          v-if="$root.store.isLoggedin()"
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
              url: 'http://localhost/profile/family_recipes'
          }
      },
      components: {
          RecipePreviewList
      }
    }
</script>

<style scoped>
 .family-cntnr {
   text-align: center;
   left: 0;
   transform: translateX(50%);
   width: 900px;
 }
</style>