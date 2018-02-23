<template>
  <div id="app">
    <div class="leftside-menu">
      <div class="search-contacts">
        Hello World
      </div>
      <div class="contacts-list">
        test
      </div>
      <div class="add-contact">
        add contact
      </div>
    </div>
  </div>
</template>

<script>
  import VueCookie from 'vue-cookies'

  export default {
    name: 'app',
    data () {
      return {
        contacts: VueCookie.get(`contacts`)
      }
    }
  }
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>

<!-- Global CSS -->
<style>
  body {
    font-family: 'Poppins';
  }

  code {
    font-size: 0.9em;
    white-space: pre-wrap;
    color: #2c3e50;
  }

  code::before, code::after {
    content: '`';
  }
</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  #app {
    text-align: center;
  }

  .leftside-menu {
    position: absolute;
    float: left;
    width: 20%;
    height: 100%;
    background-color: #1234;
  }

  .search-contacts {
    position: absolute;
    float: top;
    width: 100%;
    height: 150px;
    background-color: #4321;
  }

  .contacts-list {
    /* position: absolute; */
    /* width: 100%;
    height: 180px; */
    /* height: 90%; */
    width: 100%;
    margin-top: 150px;
    background-color: #987656;
  }

  .add-contact {
    background-color: #ff2311;
    position: absolute;
    float: bottom;
    width: 100%;
    height: 40px;
  }

  /* #app h1 {
    color: #2c3e50;
    font-weight: 300;
    margin: 0;
  }

  .banner {
    height: 200px;
    background-color: #f6f6f6;
    padding: 50px 10px;
  }

  .bottom {
    padding: 80px 10px;
    font-size: 24px;
    font-weight: 300;
  }

  .fade {
    font-size: 14px;
  }

  .logo {
    animation: spin 4s 1s infinite linear
  }

  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  } */
</style>

    // <div class="banner">
    //   <img
    //     src="https://vuejs.org/images/logo.png"
    //     width="100"
    //     alt="vue"
    //     class="logo"
    //   />
    //   <h1>Welcome to Vue.js</h1>
    // </div>
    // <div class="bottom">
    //   To get started, edit <code>./src/components/App.vue</code> and save to reload.<br/>
    //   <span class="fade">
    //     Checkout <code>./README.md</code> for more usages.
    //   </span>
    // </div>
    // <div>
    //   <!-- <button class="btn btn-primary" v-on:click="counter++">You've clicked this button {{counter}} times!</button> -->
    // </div>