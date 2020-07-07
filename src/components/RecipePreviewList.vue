<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row md="3">
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

    async function getRecipesData (get_ids_url) {
        let randomIds
        await axios
            .get(get_ids_url)
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
            },
            url: {
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
                const { recipesArray, length } = await getRecipesData(this.url);
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
  .row{
    width: 100%;
    height: 10%;
  }
  .col{
    width: 100%;
    height: 10%;
  }
</style>
