<template>
  <div>
  <b-container>
    <h1>
      {{ title }}
    </h1>
    <button class="button" style="vertical-align:middle" v-if="rand" @click="randomize"><span>More </span></button>
    <div class="spinner-div">
      <b-spinner v-if="arrayLength === 0" variant="secondary" type="grow" label="Spinning"></b-spinner>
    </div>
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
                console.log(response)
                randomIds = response.data;
                return randomIds;
            }).catch(response=> console.log("no recipes"))
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
                        recipesArray.push(jsonData)
                    })
            }
            else
            {
                await axios('http://localhost/recipes/preview/recId/' + randomIds[recipeId].id)
                    .then(response => {
                        return response.data
                    })
                    .then((jsonData) => {
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
            },
            picked: {
                type: String
            },
        },
        data() {
            return {
                arrayLength: 0,
                loadedRecipesArray: [],
                errors: []
            };
        },
        mounted() {
            this.updateRecipes();
        },
        watch : {
           url : async function() {
                const { recipesArray, length } = await getRecipesData(this.url);
                this.arrayLength = length
                this.loadedRecipesArray = recipesArray
            },
            picked : function() {
               if(this.picked === 'Popularity'){
                   this.loadedRecipesArray.sort(function(a, b){
                       return a.popularity - b.popularity;
                   });
               }
               else if(this.picked === 'Preparation Time'){
                   console.log("Preparation Time")
                   this.loadedRecipesArray.sort(function(a, b){
                       return a.prepTime - b.prepTime;
                   });
               }
            }
        },
        methods: {
            async updateRecipes(){
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
  .spinner-div{
    top: 0;
    position: fixed;
    transform: translate(800%, 500%);
  }
</style>
