<template>
  <div class="my-cntnr bg-gra-01 page-wrapper p-t">
    <b-alert
      class="mt-2"
      v-if="submitError"
      variant="warning"
      dismissible
      show
    >
      {{ submitError }}
    </b-alert>
    <div class="wrapper wrapper--w780" ref="formView">
      <div class="form-title">
        <h1 >Add a new Recipe</h1>
      </div>
      <div class="card card-3">
        <div class="card-body">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Recipe Name:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="recipe.title"
                  type="text"
                  required
                  placeholder="Enter Name"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Image URL" label-for="input-2">
              <b-form-input
                  id="input-2"
                  v-model="recipe.image_url"
                  type="text"
                  required
                  placeholder="Enter URL"
              ></b-form-input>
            </b-form-group>


            <h5>Instructions Steps:</h5>
            <b-form-group
              id="input-group-3"
              :label="instruction.name"
              v-for="(instruction, index) in recipe.instructions"
              :key="'instr' + index"
              label-for="input-3">
              <b-form-input
                :id="instruction.name"
                v-model="instruction.instruction"
                required
              ></b-form-input>
            </b-form-group>
            <b-button variant="link" @click="addInstruction">+ add another step</b-button>
            <b-button variant="link" @click="removeStep" v-show="recipe.instructions.length > 1">x remove last step</b-button>

            <h5>Ingredients:</h5>
            <b-form-group
              id="ingredients-group"
              v-for="(ingredient, index) in recipe.ingredients"
              :key="'ing' + index"
              label-for="input-3">
              <b-row class="my-1">
                <b-col sm="9">
                  Ingredient Name:
                  <b-form-input
                    :id="ingredient.name"
                    v-model="ingredient.name"
                    required
                  ></b-form-input>
                </b-col>
                <b-col sm="3">
                  Count:
                  <b-form-input
                    :id="ingredient.name"
                    v-model="ingredient.count"
                    type="number"
                    min="0"
                    max="20"
                    required
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-form-group>
            <b-button variant="link" @click="addIngredient">+ add another ingredient</b-button>
            <b-button variant="link" @click="removeIngredient" v-show="recipe.ingredients.length > 1">x remove last ingredient</b-button>


            <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="recipe.checked" id="checkboxes-4">
                <b-form-checkbox value="vegan">Vegan</b-form-checkbox>
                <b-form-checkbox value="vegetarian">Vegetarian</b-form-checkbox>
                <b-form-checkbox value="glutenFree">Gluten Free</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <b-form-group
              id="prep-time"
              label="How long would it take to prepare this dish? (min)"
              label-for="prep-time-inpt"
            >
              <b-form-input
                id="prep-time-inpt"
                v-model="recipe.prepTime"
                type="number"
                step="0.5"
                required
                min="0"
                placeholder="Enter Time"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="num-of-dishes"
              label="How many servings?"
              label-for="num-dishes-inpt">
              <b-form-input
                id="num-dishes-inpt"
                v-model="recipe.num_of_dishes"
                type="number"
                min="1"
                step="1"
                required
                placeholder="Enter number of servings"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="url-link"
              label="Extra Details url"
              label-for="url-link-inpt"
            >
              <b-form-input
                id="url-link-inpt"
                v-model="recipe.url"
                type="text"
                placeholder="Enter URL"
              ></b-form-input>
            </b-form-group>

            <div class="btns-grp">
              <b-button class="form-btns" id="sbmt-btn" type="submit" variant="primary">Submit</b-button>
              <b-button class="form-btns" id="rst-btn" type="reset" variant="danger">Reset</b-button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        recipe: {
          title: '',
          image_url: '',
          prepTime: '',
          popularity: 0,
          num_of_dishes: 1,
          checked: [],
          instructions: [
            {
              name: 'Step1',
              instruction: ''
            }
          ],
          ingredients: [
              {
                  name: '',
                  count: null
              }
          ],
          url: '',
        },
        show: true,
        submitError: undefined
      }
    },
    methods: {
      addInstruction() {
        let nextNum = this.recipe.instructions.length;
        this.recipe.instructions.push({
            name: 'Step'+(nextNum+1),
            instruction: ''
        });
      },
      removeStep() {
          this.recipe.instructions.pop();
      },

      addIngredient() {
          this.recipe.ingredients.push({
              name: '',
              count: null
          });
      },
      scrollToTop() {
          window.scrollTo(0,0);
      },
      removeIngredient() {
          this.recipe.ingredients.pop();
      },
      async onSubmit(evt) {
          evt.preventDefault()

          //Getting the details about the vegan/vegetarian/glutenFree
          for (let btn in this.recipe.checked)
          {
              if(this.recipe.checked[btn] === "vegan")
              {
                  this.recipe.vegan = true;
              }
              if(this.recipe.checked[btn] === "vegetarian")
              {
                  this.recipe.vegetarian = true;
              }
              if(this.recipe.checked[btn] === "glutenFree")
              {
                  this.recipe.glutenFree = true;
              }
          }

          if(!this.recipe.vegan)
          {
              this.recipe.vegan = false;
          }
          if(!this.recipe.vegetarian)
          {
              this.recipe.vegetarian = false;
          }
          if(!this.recipe.glutenFree)
          {
              this.recipe.glutenFree = false;
          }
          delete this.recipe.checked;
          //creating the right instructions array
          this.recipe.instructions = this.recipe.instructions.map((value, index, array) => {
              return value.name + ": " + value.instruction;
          })
          console.log(JSON.stringify(this.recipe))
          try{
              await axios.post('http://localhost/profile/add_recipe/', this.recipe);
          }
          catch (err) {
            console.log(err.response);
            this.submitError = err.response.data.message;
            this.onReset(evt);
            return;
          }
          this.onReset(evt)
          this.$emit('closePanel')
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.recipe.title = ''
        this.recipe.image_url = ''
        this.recipe.prepTime = null
        this.recipe.checked = []
        this.recipe.instructions = [
              {
                  name: 'Step1',
                  instruction: ''
              }
          ],
        this.recipe.ingredients = [
              {
                  name: '',
                  count: null
              }
          ]
        delete this.recipe.vegan;
        delete this.recipe.vegetarian;
        delete this.recipe.glutenFree;

        this.recipe.num_of_dishes = 1;
        this.recipe.url = '';
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
          this.$refs.formView.scrollTop = 0;
        })
      }
    }
  }
</script>
<style scoped>
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  * {
    padding: 0;
    margin: 0;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }
  .page-wrapper {
    min-height: 100vh;
  }
  .p-t {
    padding-top: 20px;
  }

  .bg-gra-01 {
    background: -webkit-gradient(linear, left bottom, left top, from(#fbc2eb), to(#a18cd1));
    background: -webkit-linear-gradient(bottom, #fbc2eb 0%, #a18cd1 100%);
    background: -moz-linear-gradient(bottom, #fbc2eb 0%, #a18cd1 100%);
    background: -o-linear-gradient(bottom, #fbc2eb 0%, #a18cd1 100%);
    background: linear-gradient(to top, #fbc2eb 0%, #a18cd1 100%);
  }

  .wrapper {
    margin: 0 auto;
  }


  .wrapper--w780 {
    max-width: 780px;
  }

  input {
    outline: none;
    margin: 0;
    border: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    width: 100%;
    font-size: 14px;
    font-family: inherit;
  }

  .input-group {
    position: relative;
    margin-bottom: 33px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .card {
    overflow: hidden;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background: #fff;
  }

  .card-3 {
    background: #b6a0a0;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
    width: 100%;
    display: table;
  }

  .card-3 .card-body {
    padding: 57px 65px;
    padding-bottom: 65px;
    display: table-cell;
  }

  @media (max-width: 767px) {
    .card-3 {
      display: block;
    }
    .card-3 .card-heading {
      display: block;
      width: 100%;
      padding-top: 400px;
      background-position: center center;
    }
    .card-3 .card-body {
      display: block;
      width: 100%;
      padding: 37px 30px;
      padding-bottom: 45px;
    }
  }

  .form-title {
    text-align: center;
    padding-bottom: 10px;
  }

  /*.form-btns{*/
  /*  margin: 0 5px;*/
  /*}*/

  #sbmt-btn {
    left: 0;
  }

  #rst-btn {
    position: absolute;
    right: 65px;
  }
</style>