<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div class="container">
      <br/>
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <form class="card card-sm">
            <div class="card-body row no-gutters align-items-center">
              <div class="col-auto">
                <i class="fas fa-search h4 text-body"></i>
              </div>
              <!--end of col-->
              <div class="col">
                <label>
                  <input v-model="line" class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords">
                </label>
              </div>
              <!--end of col-->
              <div class="col-auto">
                <button class="btn btn-lg btn-success" @click="search">Search</button>
              </div>
              <!--end of col-->
            </div>
          </form>
          <label> How many recipes to retrieved
            <select v-model="selected">
              <option v-for="item in numberOfRecipes" :key="item">{{item}}</option>
            </select>
          </label>
          <br>
          <label> Cuisines
            <select v-model="selectCuisines">
              <option v-for="item in cuisines" :key="item">{{item}}</option>
            </select>
          </label>
          <label>  Intolerances
            <select v-model="selectIntolerances">
              <option v-for="item in intolerances" :key="item">{{item}}</option>
            </select>
          </label>
          <label>  Diet
            <select v-model="selectDiet ">
              <option v-for="item in diet " :key="item">{{item}}</option>
            </select>
          </label>
        </div>
        <!--end of col-->
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "Search",
        data() {
            return {
                line: "",
                selected: 5,
                numberOfRecipes: [5, 10, 15],
                selectCuisines:'',
                cuisines: ["African", "American", "British", "Cajun", "Caribbean","Chinese"
                ,"Eastern European","European","French","German","Greek","Indian",
                "Irish","Italian","Japanese","Jewish","Korean", "Latin American"
                ,"Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai"
                ,"Vietnamese"],
                selectIntolerances: '',
                intolerances: ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood"
                    ,"Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"],
                selectDiet: '',
                diet: ["Whole30", "Primal", "Paleo", "Pescetarian", "Vegan", "Ovo-Vegetarian",
                "Lacto-Vegetarian", "Vegetarian", "Ketogenic", "Gluten Free"]
            }
        },
        methods:{
            search(){
                console.log("search is clicked");
            },
        }
    }
</script>
<style>
  .form-control-borderless {
    border: none;
  }

  .form-control-borderless:hover, .form-control-borderless:active, .form-control-borderless:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
  h1{
    text-align: center;
  }
</style>