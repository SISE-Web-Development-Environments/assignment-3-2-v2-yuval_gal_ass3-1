<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <labal v-if="recipe.watchedRecipe"> <img src="https://img.icons8.com/bubbles/50/000000/eye-checked.png"/>
          You already Watched this Recipe </labal>
        <labal v-if="recipe.savedRecipe"> <img class="my-icon" src="https://img.icons8.com/bubbles/50/000000/likes-folder.png"/> You already Saved this Recipe </labal>
        <img :src="recipe.image_url" class="center" />
      </div>
      <div class="recipe-body">
        <div class="mb-3">
          <div>
            <img class="my-icon" src="https://img.icons8.com/cotton/64/000000/clock--v1.png"/>
            Ready in {{ recipe.prepTime }} minutes |
            <img class="my-icon" src="https://img.icons8.com/plasticine/100/000000/like--v1.png"/>
            {{ recipe.popularity }} Likes  |
            <img class="my-icon" src="https://img.icons8.com/dusk/64/000000/tableware.png"/>
            Num of dishes: {{ recipe.num_of_dishes }}
            <div>
              <labal v-if="recipe.vegetarian"> <img class="my-icon" v-if="recipe.vegetarian" src="https://img.icons8.com/dusk/64/000000/vegetarian-food.png"/> Vegetarian </labal>
              <labal v-if="recipe.vegan"> <img class="my-icon" v-if="recipe.vegan" src="https://img.icons8.com/dusk/64/000000/natural-food.png"/> Vegan </labal>
              <labal v-if="recipe.glutenFree"> <img class="my-icon" v-if="recipe.glutenFree" src="https://img.icons8.com/officel/16/000000/no-gluten.png"/> Gluten-free </labal>

            </div>
          </div>
        </div>
        <div class="wrapper">
          <div class="wrapped">
            Ingredients:
            <ul class="list-group">
              <li
                  v-for="(r, index) in recipe.ingredients"
                  :key="index" class="list-group-item"
              >   <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="...">
                {{ r.count }} of {{r.name}}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol class="list-group">
              <li v-for="s in recipe._instructions" :key="s.number" class="list-group-item">
                {{ s }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                recipe: null
            };
        },
        async created() {
            try {
                let response;
                try {
                    response = await axios.get(
                            'http://localhost/recipes/recipe_page/recId/'+this.$route.params.recipeId,
                        // {
                        //     params: { recId: this.$route.params.recipeId }
                        // }
                    );
                    console.log(response)
                    if (response.status !== 200) this.$router.replace("/NotFound");
                } catch (error) {
                    console.log("error.response.status", error.response.status);
                    await this.$router.replace("/NotFound");
                    return;
                }

                let {
                    instructions,
                    ingredients,
                    popularity,
                    prepTime,
                    image_url,
                    title,
                    vegetarian,
                    vegan,
                    glutenFree,
                    num_of_dishes,
                    watchedRecipe,
                    savedRecipe
                } = response.data;

                let _instructions = instructions
                    // .map((fstep) => {
                    //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
                    //     return fstep.steps;
                    // })
                    // .reduce((a, b) => [...a, ...b], []);

                let _recipe = {
                    instructions,
                    _instructions,
                    ingredients,
                    popularity,
                    prepTime,
                    image_url,
                    title,
                    vegetarian,
                    vegan,
                    glutenFree,
                    num_of_dishes,
                    watchedRecipe,
                    savedRecipe
                };

                this.recipe = _recipe;
            } catch (error) {
                console.log(error);
            }
        }
    };
</script>

<style scoped>
  .wrapper {
    display: flex;
  }
  .wrapped {
    width: 50%;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  .my-icon {
    height: 50px;
    width: 50px;
  }
  /* .recipe-header{

  } */
</style>
