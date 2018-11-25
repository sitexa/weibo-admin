<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include="cachedViews">
      <router-view/>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'Menu41',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>
