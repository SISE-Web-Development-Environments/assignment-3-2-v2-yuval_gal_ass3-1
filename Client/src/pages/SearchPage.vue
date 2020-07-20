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
                <i class="fa fa-search fa-2x" aria-hidden="true"></i>
              </div>
              <!--end of col-->
              <div class="col">
                <label>
                  <input v-model="line" class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords">
                </label>
              </div>
              <!--end of col-->
              <div class="col-auto">
                <b-button :disabled="line.length === 0" class="btn btn-lg btn-success" @click.prevent="search">Search</b-button>
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
        <div v-if="url || lastSearchArray">
          <h5>Sort by:</h5>
          <input type="radio" id="time" value="Preparation Time" v-model="picked">
          <label for="time">Preparation Time</label>
          <br>
          <input type="radio" id="likes" value="Popularity" v-model="picked">
          <label for="likes">Popularity</label>
        </div>
        <!--end of col-->
      </div>
    </div>
    <div class="search-rslts">
      <PreviewRecipeList
        v-if="url || lastSearchArray"
        :url="url"
        :savedArray="lastSearchArray"
        title=""
        :shouldSave="shouldSave"
        @save-recipes="saveRecipes($event)"
        :picked="picked"
        :size="size"
       ></PreviewRecipeList>
    </div>
  </div>
</template>
<script>
    import PreviewRecipeList from "../components/RecipePreviewList";
    export default {
        name: "Search",
        data() {
            return {
                shouldSave: true,
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
                "Lacto-Vegetarian", "Vegetarian", "Ketogenic", "Gluten Free"],
                url:undefined,
                picked:'',
                size: "large",
                lastSearchArray: undefined,
            }
        },
        components: {
            PreviewRecipeList
        },
        mounted() {
            // let lastSearch = JSON.parse(localStorage.getItem(this.$root.store.username));
            let search_history = this.$session.get("search_history")
            console.log("SEARCH_PAGE: loadded last search")
            console.log("Session= " + this.$session);
            console.log("search_history");
            console.log(search_history);
            if(search_history){
                // if(this.$root.store.username === lastSearch.username)
                // {
                //     this.lastSearchArray = lastSearch.search;
                //     console.log("SEARCH_PAGE: after equation")
                //     console.log(this.lastSearchArray)
                // }
                search_history.forEach((userSearch) => {
                    if(userSearch.username === this.$root.store.username)
                    {
                        this.lastSearchArray = userSearch.search;
                        console.log("SEARCH_PAGE: after equation")
                        console.log(this.lastSearchArray)
                    }
                })
            }
        },
        methods:{
            saveRecipes (recipesArray){
                console.log("SEARCH_PAGE: save recipes")
                console.log(recipesArray)
                // localStorage.setItem(this.$root.store.username, JSON.stringify(recipesArray));
                let search_history = this.$session.get("search_history");
                console.log("search_history")
                console.log(search_history)
                let found_history = false;
                if(search_history) {
                    search_history.forEach((userSearch) => {
                        if (userSearch.username === this.$root.store.username) {
                            userSearch.search = recipesArray;
                            found_history = true;
                        }
                    })
                }
                else {
                    search_history = []
                }

                if(!found_history)
                {
                    search_history.push(
                            {
                        username: this.$root.store.username,
                        search: recipesArray
                    })
                }
                this.$session.set("search_history", search_history)

            },
            search(){
                console.log("search is clicked");

                this.url=undefined;
                this.lastSearchArray = undefined;
                this.url=`http://localhost/recipes/search/food_name/${this.line}/num/${this.selected}`;
                let query='';
                let queryArray=[];
                console.log(this.selectCuisines);
                console.log(this.selectIntolerances);
                console.log(this.selectDiet);

                if(this.selectCuisines){
                  queryArray.push(`cuisine=${this.selectCuisines}`)
                  console.log(queryArray)
                }
                if(this.selectIntolerances){
                    queryArray.push(`intolerances=${this.selectIntolerances}`)
                    console.log(queryArray)
                }
                if(this.selectDiet){
                    queryArray.push(`diet=${this.selectDiet}`)
                    console.log(queryArray)
                }
                for(let i in queryArray){
                    if(i === '0'){
                        query='?'+queryArray[i];
                    }
                    else{
                        query=query+'&'+queryArray[i];
                    }
                }
                if(query){
                    this.url=this.url+query;
                }
                console.log(this.url);
                console.log(this.$root.store.username)
                // let last_search = JSON.stringify({
                //     line : this.line,
                //       selected : this.selected,
                //       selectCuisines: this.selectCuisines,
                //       selectIntolerances: this.selectIntolerances,
                //       selectDiet: this.selectDiet
                // })
                // if(this.$root.store.username){
                //     localStorage.setItem(this.$root.store.username, last_search);
                //
                // }
                // this.selectCuisines='';
                // this.selectIntolerances='';
                // this.selectDiet='';
                // this.selected= 5;
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

  .search-rslts{
    text-align: center;
  }
</style>