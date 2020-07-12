<template>
  <b-container>
    <h3>
      {{ title }}
    </h3>
    <button v-if="rand" @click="randomize">More</button>
    <slot></slot>
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
            },
            rand: {
                type: String
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
            },
            randomize(){
                if(this.rand){
                    this.updateRecipes();
                }
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
