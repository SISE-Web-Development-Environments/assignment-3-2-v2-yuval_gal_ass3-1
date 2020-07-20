<template>
  <div>
    <img src="../../src/assets/AboutUs-01.png" height="466" width="1164"/>
    <p>
      <br>
      Hello everyone !
      <br>
      We are Third year students for B.Sc in Software and System Information at Ben Gurion University of the negev,
      <br>
      as part of our homeworks in Internet Development Environments course we were asked to prepare a recipe site.
    </p>
    <p>
      In this homework we learned VueJS, an advanced javaScript framework used to build user interfaces, with the help of this framework we edited the client side.
      <br>
      For the server side, we developed an API and worked with the site <a href="https://spoonacular.com/food-api">spoonacular</a> to get information about recipes,
      and we also used azure cloud SQL as our Database.
    </p>
    <p>
      This work was very challenging and very fun, we were very happy to learn new tools to help us in the future!
    </p>
    <p>
      Links to previous exercises we did:
      <br>
      <a href="https://sise-web-development-environments.github.io/assignment2-yuval_gal/">Pacman Game</a>
      <br>
      <a href="https://sise-web-development-environments.github.io/313581381/">Yuval's Personal Site</a>
      <br>
      <a href="https://sise-web-development-environments.github.io/312585268/">Gal's Personal Site</a>

    </p>

    <br>
    <div class="row">
      <div class="column">
        <div class="card">
          <div class="container">
            <h2>Yuval Ben Eliezer</h2>
            <p class="title">Information Systems Engineer</p>
            <p>ybene@post.bgu.ac.il</p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <div class="container">
            <h2>Gal Rosenthal</h2>
            <p class="title">Information Systems Engineer</p>
            <p>rosengal@post.bgu.ac.il</p>
          </div>
        </div>
      </div>
  </div>
    </div>
</template>

<script>
    export default {
        name: "AboutPage"
    }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700");

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  p{
    text-align:center;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-size: large;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  .column {
    float: bottom;
    width: 33.3%;
    margin-bottom: 16px;
    padding: 0 8px;
  }

  @media screen and (max-width: 650px) {
    .column {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }

  .card {
    display: flex;
    align-items: center;
    align-content: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .container {
    padding: 0 16px;
  }

  .container::after, .row::after {
    content: "";
    clear: both;
    display: table;
  }

  .title {
    color: grey;
  }
  h2{
    text-align: center;
  }
  .row{
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
</style>