<template>
  <div id="app">
    <div class="leftside-menu">
      <div class="search-contacts">
        Hello World
      </div>
      <div class="contacts-list">
        {{ this.letter = 'A' }}
        
        
        {{ this.letter }}
        <ul v-for="(item, index) in this.contacts">
          <li>
            
            {{ this.letter = 'C' }}
          </li>
          <li>
            {{ item.name }}
          </li>
        </ul>
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
        contacts: JSON.parse(VueCookie.get(`contacts`)),
        letter: 'b'
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
  
  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-button {
    width: 15px;
    height:0px;
  }
  ::-webkit-scrollbar-track {
    background:#eee;
    border: thin solid lightgray;
    box-shadow: 0px 0px 3px #dfdfdf inset;
    border-radius:10px;
  }
  ::-webkit-scrollbar-thumb {
    background:#999;
    border: thin solid gray;
    border-radius:10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background:#7d7d7d;
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
    width: 22%;
    height: 100%;
    background-color: #1234;
  }

  .search-contacts {
    width: 100%;
    height: 150px;
    top: 0;
    background-color: #4321;
  }

  .contacts-list {
    width: 100%;
    top: 150px;
    bottom: 40px;
    position: absolute;
    background-color: #987656;
    overflow-y: scroll;
  }

  .add-contact {
    background-color: #ff2311;
    bottom: 0;
    position: absolute;
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