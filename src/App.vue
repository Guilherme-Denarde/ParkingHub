<template>
    <Header />
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>  |
    <router-link to="/registervehicle">brand</router-link> |

  </nav>
  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Header from '@/components/Header.vue';

@Options({
  components: {
    // HelloWorld,
    Header,
  },
})
export default class HomeView extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
