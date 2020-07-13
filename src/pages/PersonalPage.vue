<template>
  <div>
    <h1>Own Recipes</h1>
    <div class="up-sctn">
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
      name: "PersonalPage",
      data() {
        return {
            url: 'http://localhost/profile/personal_recipes',
            isModalVisible: false,
            openOn: 'right'
        }
      },
      components: {
          RecipePreviewList,
      }
    }
</script>

<style scoped>

.add-btn {
  z-index: 2;
  left: 0;
  transform: translate(-100%, -100%);

}
</style>