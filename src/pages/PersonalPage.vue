<template>
  <div>
    <h1>Own Recipes</h1>

    <RecipePreviewList
        title=""
        :url="url"
        v-if="$root.store.isLoggedin()"
    />
    <slideout-panel></slideout-panel>
    <button @click.prevent="showPanel">
      Add Another Recipe
    </button>
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
      methods: {
        showPanel() {
          this.$showPanel({
            component: 'recipeForm',
            height: 600,
            width: 600,
            openOn: this.openOn
          });
        }
      },

      components: {
          RecipePreviewList,
      }
    }
</script>

<style scoped>

</style>