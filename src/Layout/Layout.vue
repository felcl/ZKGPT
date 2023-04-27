<script setup>
import Header from '../components/Header.vue';
</script>

<template>
  <Header></Header>
  <router-view></router-view>
</template>

<style scoped >
.Home{
    background: url('../assets/Home/bg.png') 0 0 / 100% no-repeat;
    min-height: 100vh;
}
</style>
