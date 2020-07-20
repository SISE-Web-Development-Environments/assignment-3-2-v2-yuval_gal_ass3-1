import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import routes from "./routes";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies"
import VueSlideoutPanel from 'vue2-slideout-panel';
import recipeForm from "./components/recipeForm";
import VueSessionStorage from 'vue-sessionstorage'

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormCheckboxPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  SpinnerPlugin,
  DropdownPlugin,
  ModalPlugin,
  AvatarPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormCheckboxPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  SpinnerPlugin,
  ModalPlugin,
  DropdownPlugin,
  AvatarPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);
Vue.use(VueSlideoutPanel);
Vue.component('recipeForm', recipeForm);
Vue.use(VueSessionStorage)

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});
// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
Vue.use(VueCookies)
axios.defaults.withCredentials = true

//Set an empty array for the search history
// if(!Vue.$session.get("search_history"))
// {
//   Vue.$session.set("search_history", JSON.stringify([]));
// }

const shared_data = {
  username: localStorage.username,
  prof_pic: localStorage.porfile_pic_url,
  async login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    await this.get_profile_pic();
    console.log("login", this.username);
  },
  async get_profile_pic(){
    try{
      let profPicUrl = '';
      await axios('http://localhost/profile/get_profile_pic')
          .then(response => {
            console.log(response)
            return response.data
          })
          .then((jsonData) => {
            profPicUrl = jsonData
            console.log(profPicUrl.url)
            localStorage.setItem("porfile_pic_url", profPicUrl.url)
            this.prof_pic = profPicUrl.url;
          })
    }
    catch (e) {
      console.log(e);
    }
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem(this.username);
    this.username = undefined;
  },
  isLoggedin() {
    // console.log("Testing 2")
    if(Vue.$cookies.get('ass_session'))
    {
      // console.log("true");
      return true;
    }
    else
    {
      // console.log("false");
      return false;
    }
  },
};
console.log(shared_data);

router.beforeEach((to, from, next) => {

  //Validate the cookie is still valid, if not logout the last user
  if(!Vue.$cookies.get("ass_session") && shared_data.username)
  {
    shared_data.logout();
  }

  if(to.meta.requireAuth && !Vue.$cookies.get("ass_session"))
  {
    next({ name: 'login' })
  }
  else{
    next();
  }
});
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
