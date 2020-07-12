<template>
  <div>
  <b-container>
    <h3>
      {{ title }}
    </h3>
    <button class="button" style="vertical-align:middle" v-if="rand" @click="randomize"><span>More </span></button>

    <slot></slot>
    <b-row md="3">
      <b-col v-for="(r, index) in loadedRecipesArray" :key="index">
        <PreviewRecipe class="PreviewRecipe" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</div>
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
                type: Boolean
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
  .button{
    display: inline-block;
    border-radius: 4px;
    background-color: #1b89ff;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    height: 40px;
    width: 200px;
    transition: all 0.5s;
    cursor: pointer;
  }
  .button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }

  .button span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }

  .button:hover span {
    padding-right: 25px;
  }

  .button:hover span:after {
    opacity: 1;
    right: 0;
  }
</style>
