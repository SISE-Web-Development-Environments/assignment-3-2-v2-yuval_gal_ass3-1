<template>
  <div>
    <h1>My Personal Recipes</h1>
    <div class="personal-cntnr">
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
        name: "PersonalRecipes",
        data() {
            return {
                url: 'http://localhost/profile/personal_recipes',
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
  .personal-cntnr {
    text-align: center;
    left: 0;
    transform: translateX(35%);
    width: 1200px;
  }
</style>