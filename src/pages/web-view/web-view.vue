<template>
  <view class="web-view">
    <web-view class="web-view" :src="url"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: '/hybrid/html/local.html',
    };
  },
};
</script>

<style>
  @import '../../common/uni.css';

  .web-view {
    flex: 1;
    flex-direction: column;
    background-color: #f5f5f5;
  }
</style>
