<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <div class="spinner-div">
      <b-spinner v-if="arrayLength === 0" variant="secondary" type="grow" label="Spinning"></b-spinner>
    </div>
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
            .then(response => {
                // console.log("RecipePreviewList: axios response:");
                // console.log(response);
                randomIds = response.data;
                return randomIds;
            })
            // .then(response => {
            //     console.log("Second then:" + response)
            //     if(Number.isInteger(response[0])){
            //         console.log('Integer: The random IDs from axios: ' + response)
            //     }
            //     else
            //     {
            //         console.log('Object: The random IDs from axios: ' + response.id)
            //     }
            // })
        let recipeId
        const recipesArray = []
        for (recipeId in randomIds) {
            if(Number.isInteger(parseInt(randomIds[recipeId])))
            {
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
            else
            {
                await axios('http://localhost/recipes/preview/recId/' + randomIds[recipeId].id)
                    .then(response => {
                        // console.log(response)
                        return response.data
                    })
                    .then((jsonData) => {
                        // console.log(jsonData)
                        recipesArray.push(jsonData)
                    })
            }
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
        // computed: {
        //
        // },
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
  .spinner-div{
    top: 0;
    position: fixed;
    transform: translate(800%, 500%);
  }
</style>
