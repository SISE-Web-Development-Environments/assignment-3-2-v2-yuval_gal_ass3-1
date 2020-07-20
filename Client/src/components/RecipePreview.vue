<template>

  <div id="prvw-rcpe">
    <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="recipe-preview"
    >
      <b-card :id="relevant_class" class="wrapper" :title="recipe.title" :img-src="recipe.image_url" img-alt="Image">
        <div class="border"></div>
        <br>
        <b-card-text class="text-card">
          <img class="my-icon" src="https://img.icons8.com/cotton/64/000000/clock--v1.png"/>  {{ recipe.prepTime ? recipe.prepTime : 1 }} Minutes
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
          <div v-if="recipe.from_whom">
            <img class="medium" src="https://img.icons8.com/plasticine/100/000000/user-male-circle.png"/>
            {{recipe.from_whom}}
          </div>
          <div v-if="recipe.special_time">
            <img class="medium" src="https://img.icons8.com/plasticine/100/000000/new-year-calendar.png"/>
            We usually prepare this on {{recipe.special_time}}
          </div>
          <div v-if="recipe.ingredients">
            <br>
            <b-row class="ingrdnts-row">
              <b-col md="auto">
                <img class="medium" src="https://img.icons8.com/plasticine/100/000000/ingredients.png"/>
              </b-col>
              <b-col cols="7" class="ingrdnts">
                <b-row v-for="(ing, index) in recipe.ingredients" :key="index">
                  {{ing.name}}: {{ing.count}}
                </b-row>
              </b-col>
            </b-row>
          </div>
          <div v-if="recipe.instructions">
            <br>
            <br>
            <img class="medium" src="https://img.icons8.com/plasticine/100/000000/brief.png"/>
            <b-row>
              <b-col style="color: #b6a0a0; font-weight: bold" v-for="(ing, index) in recipe.instructions" :key="index">
                {{ing}}
              </b-col>
            </b-row>
          </div>
<!--          <img src="https://img.icons8.com/plasticine/100/000000/brief.png"/>-->
          <div v-if="recipe.saved">
            <img class="my-icon" src="https://img.icons8.com/bubbles/50/000000/likes-folder.png"/>
            Saved
          </div>
        </b-card-text>
          <br>
        <div id="save-btn-div">
          <a v-if="!recipe.saved && $root.store.isLoggedin()" @click.prevent="addToFavorite(recipe.id)" href="#" class="button">Save recipe</a>
        </div>
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
          relevant_class: String,
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
                  let response = await axios.post(
                      'http://localhost/profile/add_to_favorite/',
                      {
                           recipeId: id
                       }
                  );
                  this.recipe.saved=true;
              } catch (error) {
                  console.log(error)
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

  #save-btn-div a {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: -0px;
    border-radius: 20px;
  }
  #wrapper-reg {
    background: #fff;
    position: relative;
    margin: 50px auto;
    box-shadow: 0px 0px 40px 10px #212129;
    opacity: 0.9;
    background-size: cover;
    width: 200px;
    height: 40rem;
  }

  #wrapper-large {
    background: #fff;
    position: relative;
    margin: 50px auto;
    box-shadow: 0px 0px 40px 10px #212129;
    opacity: 0.9;
    background-size: cover;
    width: 350px;
    height: 40rem;
  }

  #wrapper-xl {
    background: #fff;
    position: relative;
    margin: 50px auto;
    box-shadow: 0px 0px 40px 10px #212129;
    opacity: 0.9;
    background-size: cover;
    width: 60%;
    height: 70rem;
  }

   /*.recipe-preview :hover {*/
   /*  overflow: hidden;*/
   /*  transform: scale(1.2);*/
   /*  z-index: 3;*/
   /*  opacity: 1;*/
   /*  -webkit-transition-duration: 0.5s;*/
   /*  -moz-transition-duration: 0.5s;*/
   /*  -o-transition-duration: 0.5s;*/
   /*  transition-duration: 0.5s;*/
   /*}*/


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

  .ingrdnts-row {
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }

  .ingrdnts {
    left: 0;
    align-items: start;
  }
  .medium{
    justify-content: center;
    align-items: center;
    height: 45px;
    width: 45px;
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
  #save-btn-div a {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: -0px;
    border-radius: 20px;
  }
</style>
