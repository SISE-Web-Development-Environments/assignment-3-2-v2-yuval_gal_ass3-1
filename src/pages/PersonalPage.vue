<template>
  <div>
    <h1>Own Recipes</h1>
    <div class="down-sctn">
      <button @click.prevent="showPanel" class="add-btn">
        Add Another Recipe
      </button>
    </div>
    <b-modal ref="my-modal" hide-footer hide-header size="sm" body-bg-variant="success">
      <div class="d-block text-center">
        <h5>Recipe added successfully</h5>
      </div>
    </b-modal>
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
          const panelResult = this.$showPanel({
            component: 'recipeForm',
            height: 600,
            width: 900,
            openOn: this.openOn
          });

          panelResult.promise
            .then(result => {
                console.log(result);
                if( result === "success")
                {
                    this.$refs['my-modal'].toggle('#toggle-btn')
                    setTimeout(() => {
                        this.$refs['my-modal'].toggle('#toggle-btn');
                        this.$router.go();
                    }, 1000)
                }
            })
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