<template>

  <div >
    <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="recipe-preview"
    >
      <b-card
          :overlay="overlay"
          :title="recipe.title"
          :img-src="recipe.image_url"
          img-alt="Image"
          style="max-width: 30rem;"
          class="mb-2 preview"
      >
        <b-card-text>
          It will take you about {{ recipe.prepTime }} to prepare this dish
<!--          isVegan: {{ recipe.vegan }}-->
<!--          isVegi: {{ recipe.vegetarian }}-->
<!--          isGlutenFree: {{ recipe.glutenFree }}-->
<!--          popularity: {{ recipe.popularity }}-->
<!--          Watched: {{ recipe.watched }}-->
<!--          Saved: {{ recipe.saved }}-->
        </b-card-text>
      </b-card>
    </router-link>
  </div>
</template>

<script>

    export default {
      name: 'RecipePreview',
      props: {
          recipe: Object,
      },
      data()
      {
        return {
            overlay: false,
        }
      },
      mounted() {
        this.$nextTick(function() {
          window.addEventListener('resize', this.getWindowWidth);
          // window.addEventListener('resize', this.getWindowHeight);
          //Init
          this.getWindowWidth()
          // this.getWindowHeight()
        })
     },
      methods: {
        resizeView() {

        },
        getWindowWidth(event) {
            let windowWidth = document.documentElement.clientWidth;
            if(windowWidth < 700)
            {
                this.overlay = true;
                console.log("width less than 700 " + this.overlay)
            }
            else
            {
                this.overlay = false;
            }
        }
        //
        // getWindowHeight(event) {
        //     this.windowHeight = document.documentElement.clientHeight;
        // }
      },
      beforeDestroy() {
          window.removeEventListener('resize', this.getWindowWidth);
          // window.removeEventListener('resize', this.getWindowHeight);
      }
    }
</script>

<style scoped>
  .preview {
    box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  }
</style>
