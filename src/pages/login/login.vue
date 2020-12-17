<template>
  <view class="wrap">
    <view class="top"></view>
    <view class="content">
      <view class="title">
        欢迎登录美团
      </view>
      <input v-model="loginName" class="u-border-bottom" type="number" placeholder="请输入账号" />
      <view class="tips">
        未注册的手机号验证后自动创建美团账号
      </view>
      <button :style="[inputStyle]" class="getCaptcha" @tap="onLogin">
        获取短信验证码
      </button>
      <view class="alternative">
        <view class="password">
          密码登录
        </view>
        <view class="issue">
          遇到问题
        </view>
      </view>
    </view>
    <view class="buttom">
      <view class="loginType">
        <view class="wechat item">
          <view class="icon">
            <u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
          </view>
          微信
        </view>
        <view class="QQ item">
          <view class="icon">
            <u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon>
          </view>
          QQ
        </view>
      </view>
      <view class="hint">
        登录代表同意
        <text class="link">
          美团点评用户协议、隐私政策
        </text>
        并授权使用您的美团点评账号信息（如昵称、头像、收获地址）以便您统一管理
      </view>
    </view>
  </view>
</template>

<script>
import { LOGIN } from '@/store/login';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loginName: '',
      loginPass: '',
    };
  },
  computed: {
    inputStyle() {
      const style = {};
      if (this.loginName) {
        style.color = '#fff';
        style.backgroundColor = this.$u.color.warning;
      }
      return style;
    },
  },
  methods: {
    ...mapActions([LOGIN]),
    async onLogin(values) {
      if (!values || values.errors) return;
      try {
        const result = await this[LOGIN]({
          loginName: values.username,
          loginPass: values.password,
        });
        if (result.token) {
          this.$refs.uToast.show({
            title: '登录成功',
          });
          this.loading = false;
          setTimeout(() => {
            //  跳转主页
            uni.navigateTo({
              url: '/pages/web-view/webview',
            });
          }, 1000);
        }
      } catch (err) {
        this.loading = false;
        this.$refs.uToast.show({
          title: err.message,
        });
      }
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 28rpx;
  .content {
  width: 600rpx;
  margin: 80rpx auto 0;

  .title {
    text-align: left;
    font-size: 60rpx;
    font-weight: 500;
    margin-bottom: 100rpx;
  }
  input {
    text-align: left;
    margin-bottom: 10rpx;
    padding-bottom: 6rpx;
  }
  .tips {
    color: $u-type-info;
    margin-bottom: 60rpx;
    margin-top: 8rpx;
  }
  .getCaptcha {
    background-color: rgb(253, 243, 208);
    color: $u-tips-color;
    border: none;
    font-size: 30rpx;
    padding: 12rpx 0;

    &::after {
      border: none;
    }
  }
  .alternative {
    color: $u-tips-color;
    display: flex;
    justify-content: space-between;
    margin-top: 30rpx;
  }
}
.buttom {
  .loginType {
    display: flex;
    padding: 350rpx 150rpx 150rpx 150rpx;
    justify-content:space-between;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $u-content-color;
      font-size: 28rpx;
    }
  }

  .hint {
    padding: 20rpx 40rpx;
    font-size: 20rpx;
    color: $u-tips-color;

    .link {
      color: $u-type-warning;
    }
  }
}
}
</style>
