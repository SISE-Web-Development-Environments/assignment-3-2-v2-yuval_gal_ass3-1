<template>

  <div >
    <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="recipe-preview"
    >
      <b-card class="wrapper" :title="recipe.title" :img-src="recipe.image_url" img-alt="Image">
      <div class="border"></div>
        <br>
      <b-card-text class="text-card">
        <img class="my-icon" src="https://img.icons8.com/cotton/64/000000/clock--v1.png"/>  {{ recipe.prepTime }}
        <br>
        <img class="my-icon" src="https://img.icons8.com/plasticine/100/000000/like--v1.png"/>  {{ recipe.popularity }} Likes
        <br>
        <div v-if="recipe.vegetarian">
        <img class="my-icon" v-if="recipe.vegetarian" src="https://img.icons8.com/dusk/64/000000/vegetarian-food.png"/> Vegetarian
        </div>
        <div v-if="recipe.vegan">
        <img class="my-icon" v-if="recipe.vegan" src="https://img.icons8.com/dusk/64/000000/natural-food.png"/> Vegan
        </div>
        <div v-if="recipe.glutenFree">
          <img class="my-icon" v-if="recipe.glutenFree" src="https://img.icons8.com/officel/16/000000/no-gluten.png"/> Gluten-free
        </div>
        <div v-if="recipe.watched">
          <img src="https://img.icons8.com/bubbles/50/000000/eye-checked.png"/>
          Watched
        </div>
        <div v-if="recipe.saved">
          <img class="my-icon" src="https://img.icons8.com/bubbles/50/000000/likes-folder.png"/>
          Saved
        </div>
      </b-card-text>
        <br>
        <a v-if="!recipe.saved && $root.store.isLoggedin()" @click="addToFavorite(recipe.id)" href="#" class="button">Save recipe</a>
    </b-card>
    </router-link>
  </div>
</template>

<script>

    import axios from "axios";

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
        },
          async addToFavorite(id){
              try {
                  response = await axios.post(
                      'http://localhost/profile/add_to_favorite/',
                      {
                           params: { recipeId: id }
                       }
                  );
                  if (response.status !== 201) console.log("!=201");
              } catch (error) {
                  console.log("error.response.status", error.response.status);
              }
          }
      },
      beforeDestroy() {
          window.removeEventListener('resize', this.getWindowWidth);
      }
    }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700");
  * {
    margin: 0;
    padding: 0;
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    outline: none;
    border: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
  }

  html, body {
    height: 200px;
  }

  body {
    background: #2B2D42;
  }
  b-card {
  }

  .wrapper {
    background: #fff;
    position: fixed;
    margin: 20px auto;
    box-shadow: 0px 0px 40px 10px #212129;
    opacity: 0.9;
    background-size: cover;
    width: 170px;
    height: 34rem;
  }

  .wrapper .name {
    font-size: 1.4em;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 20px;
  }
  .wrapper .border {
    border: #EF233C 2px solid;
    position: relative;
    margin: 0 auto;
    width: 64px;
  }

  .my-icon {
    height: 30px;
    width: 30px;
  }

  .text-card{
    top: 0;
    transform: translateY(2%);
  }
  .wrapper .button {
    background: #59595c;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    display: block;
    text-align: center;
    padding: 8px 0;
    transition: 300ms;
  }
  .wrapper .button:hover {
    background: #166cef;
    transition: 300ms;
  }
</style>
