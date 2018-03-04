<template>
  <div id="app">
    <div class="leftside-menu lightgrayBackground">
      <router-view name="leftSideMenu" :key="$route.fullPath"></router-view>
    </div>
    <div class="main-content">
      <router-view name="mainContent" :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style scoped lang="less">
  #app {
    display: flex;
    display: -webkit-flex;
    text-align: center;
  }

  .leftside-menu {
    position: relative;
    top: 0;
    width: 26rem;
    height: 100vh;
    border-right: 2px solid rgba(93, 100, 122, 0.3); 
    -webkit-flex: none;
    flex: none;
    overflow-y: hidden;
  }

  .main-content {
    background-color: #fff;
    flex-grow: 100;
    text-align: left;

  }

  input {
    padding: 0 10px;
    color:  #5d647a;
  }
  
</style>

<style src="normalize.css/normalize.css"></style>

<style>
  body {
    font-family: 'Poppins';
  }
  
  .lightgray {
    color: #5d647a;
  }

  .lightgrayBackground {
    background-color: rgba(93, 100, 122, 0.15);
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