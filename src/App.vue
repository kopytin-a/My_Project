<template>
  <router-view></router-view>
  <home-page></home-page>
</template>

<script>
import HomePage from "@/components/HomePage";
export default {
  components: {
    HomePage
  }
}
</script>