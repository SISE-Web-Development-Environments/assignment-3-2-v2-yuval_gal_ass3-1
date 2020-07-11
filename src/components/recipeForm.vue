<template>
  <div class="my-cntnr bg-gra-01 page-wrapper p-t">
    <div class="wrapper wrapper--w780">
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
                  type="email"
                  required
                  placeholder="Enter Name"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Image URL" label-for="input-2">
              <b-form-input
                  id="input-2"
                  v-model="recipe.name"
                  required
                  placeholder="Enter URL"
              ></b-form-input>
            </b-form-group>


            <h5>Instructions Steps:</h5>
            <b-form-group
              id="input-group-3"
              :label="instruction.name"
              v-for="(instruction, index) in recipe.instructions"
              :key="index"
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
              :key="index"
              label-for="input-3">
              <b-row class="my-1">
                <b-col sm="9">
                  Name:
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

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        recipe: {
          title: '',
          image_url: '',
          prepTime: '',
          popularity: 0,
          checked: [],
          instructions: [
            {
              name: 'Step0',
              instruction: ''
            }
          ],
          ingredients: [
              {
                  name: '',
                  count: null
              }
          ],
        },
        show: true
      }
    },
    methods: {
      addInstruction() {
        let nextNum = this.recipe.instructions.length;
        this.recipe.instructions.push({
            name: 'Step'+nextNum,
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
      removeIngredient() {
          this.recipe.ingredients.pop();
      },
      onSubmit(evt) {
          evt.preventDefault()
          alert(JSON.stringify(this.form))
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
                  name: 'Step0',
                  instruction: ''
              }
          ],
        this.recipe.ingredients = [
              {
                  name: '',
                  count: null
              }
          ]
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
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
    padding-top: 100px;
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

</style>