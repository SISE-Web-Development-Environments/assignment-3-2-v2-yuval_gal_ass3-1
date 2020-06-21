<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="(r, index) in loadedRecipesArray" :key="index">
        <PreviewRecipe class="PreviewRecipe" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
    import PreviewRecipe from "./RecipePreview.vue";
    import axios from 'axios'
    axios.defaults.withCredentials = true;

    async function getRecipesData () {
        let randomIds
        await axios
            .get( 'http://localhost/recipes/get_random_recipe_id?numberToRetrieve=3' )
            .then(response => (randomIds = response.data))
            .then(response => console.log('The random IDs from axios: ' + response))
        let recipeId
        const recipesArray = []
        for (recipeId in randomIds) {
            await axios('http://localhost/recipes/preview/recId/' + randomIds[recipeId])
                .then(response => {
                    // console.log(response)
                    return response.data
                })
                .then((jsonData) => {
                    // console.log(jsonData)
                    recipesArray.push(jsonData)
                })
        }
        return {
            recipesArray: recipesArray,
            length: recipesArray.length
        }
    }
    export default {
        name: "PreviewRecipeList",
        components: {
            PreviewRecipe
        },
        props: {
            title: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                arrayLength: 0,
                loadedRecipesArray: []
            };
        },
        mounted() {
            this.updateRecipes();
        },
        methods: {
            async updateRecipes() {
                const { recipesArray, length } = await getRecipesData()
                this.arrayLength = length
                this.loadedRecipesArray = recipesArray
            }
        }
    };
</script>

<style lang="scss" scoped>
  .container {
    min-height: 400px;
  }
</style>
