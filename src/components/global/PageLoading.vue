<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageLoading"
};
</script>

<style scoped>
.loading {
  z-index: 99;
  margin: 0 auto;
  text-align: center;
}
span {
  height: 10px;
  width: 10px;
  background: #222;
  border-radius: 50%;
  display: inline-block;
  margin: 4px;
  animation: dots 0.6s cubic-bezier(0.6, 0.1, 1, 0.4) infinite alternate;
}

span:nth-child(1) {
  animation-delay: 0.1s;
}

span:nth-child(2) {
  animation-delay: 0.2s;
}

span:nth-child(3) {
  animation-delay: 0.3s;
}

span:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes dots {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 30px, 0);
  }
}
</style>