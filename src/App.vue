<template>
  <div class="test">測試Extension</div>
</template>

<script setup>
import { nextTick, onMounted, ref, provide, computed, watch } from "vue";

const newPage = window.open("", "_blank");
setTimeout(() => {
  newPage.close();
}, 100);
</script>
<style lang="scss">
.test {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  background-color: #003366;
  color: #fff;
}
</style>
