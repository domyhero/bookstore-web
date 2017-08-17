<template>
  <div id="app" class="app-container">
    <div class="app-side">
      <side-menu></side-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu'

export default {
  name: 'app',
    components: {SideMenu},
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 30px auto;
  padding: 0 20px;
  max-width: 1600px;
  min-width: 600px;
}

.app-container {
  display: flex;
}
.app-container > div {
  /*background-color: red;*/
  min-height: 200px;
  margin-left: 10px;
}
.app-side {
  min-width: 150px;
  &.hooked {
    position: absolute;
    float: left;
  }
}
.app-main {
  flex: 1;
}


@media only screen and (max-width : 1200px) {
  .app-side {
    display: none;
  }
}
/* Medium Devices, Desktops */
@media only screen and (min-width : 992px) {
  .x-menu {
    width: 200px;
  }
  .x-side {
    width: 300px;
  }
}

/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
  .x-menu {
    width: 250px;
  }
  .x-side {
    width: 400px;
  }
}

.x-flex-list {
  display: flex;
  flex-flow: row wrap;
}


.el-col {
  border-radius: 4px;
}

/* for demo showcase*/
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
