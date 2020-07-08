
<template>
  <div>
    <h2>Setting panel openOn</h2>
    <slideout-panel></slideout-panel>
    <button @click.prevent="showPanel">
      Show Panel
    </button>
  </div>
</template>

<script>
  import recipe_input_form from "../components/recipeForm";
    //TODO: Should be removed before submitting the assignment
    export default {
      name: "test",
      data() {
        return {
          openOn: 'right'
        }
      },
      methods: {
        showPanel() {
          console.log("Show Panel")
          this.$showPanel({
            component: 'recipe_input_form',
            height: 600,
            width: 600,
            openOn: this.openOn
          });
        }
      }
    };

</script>

<style lang="scss">

</style>
