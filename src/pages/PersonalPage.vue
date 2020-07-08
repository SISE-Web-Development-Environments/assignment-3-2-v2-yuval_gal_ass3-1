<template>
  <div>
    <h1>Own Recipes</h1>
    <div class="down-sctn">
      <button @click.prevent="showPanel" class="add-btn">
        Add Another Recipe
      </button>
    </div>

    <div class="up-sctn">
    <RecipePreviewList
        title=""
        :url="url"
        v-if="$root.store.isLoggedin()"
    />
    <slideout-panel></slideout-panel>
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
  .down-sctn{
    text-align: right;

  }
.add-btn {
  z-index: 2;
  left: 0;
  transform: translate(-100%, -100%);

}
</style>