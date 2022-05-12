<template>
  <span class="mx-auto"></span>
</template>

<script lang='ts' setup>
</script>

<style lang='scss' scoped>
span {
    height: 20px;
    width: 20px;
    display: block;
    background: transparent;
    border-radius: 50%;
    position: relative;
}

span::after,
span::before {
  content: "";
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  animation: 2s ease-in-out 0s infinite normal none running animate;
  background-color: #FFF;
  top:0;
  left:0;
}

span::after {
  animation-delay: -1s;
}

@keyframes animate {
  from {
    opacity: 0;
    transform: scale(-1);
  }

  to {
    background-color: rgba(255,255,255,0.5);
    transform: scale(1.1);
  }
}

</style>