<template>
  <div id="app">
    <top-bar></top-bar>
    <keep-alive> <router-view /> </keep-alive>
    <the-footer></the-footer>
  </div>
</template>
<script>
// @ is an alias to /src
import TopBar from "@/components/TopBar";
import TheFooter from "@/components/TheFooter";
export default {
  components: { TopBar, TheFooter }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  font-weight: bold;
  color: #2c3e50;
  font-size: 16px;
}
</style>
