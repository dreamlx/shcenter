<template>
  <transition :name="transition">
    <div
      class="weui-loading_toast vux-loading"
      :class="!text ? 'vux-loading-no-text' : ''"
      v-show="show">
      <div class="weui-mask_transparent"></div>
      <div
        class="weui-toast"
        :style="{
          position: position
        }">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content" v-if="text">{{ $t(text) || $t('loading') }}<slot></slot></p>
      </div>
    </div>
  </transition>
</template>

<i18n>
loading:
  en: loading
  zh-CN: 加载中
</i18n>

<script>
export default {
    name: 'loading',
    model: {
        prop: 'show',
        event: 'change'
    },
    props: {
        show: Boolean,
        text: String,
        position: String,
        transition: {
            type: String,
            default: 'vux-mask'
        }
    },
    watch: {
        show (val) {
            this.$emit('update:show', val);
        }
    }
};
</script>

<style lang="less">

.vux-loading .weui-toast {
  z-index: 999
}
.weui-icon_toast.weui-loading {
  margin: 6vw 0 0;
 
  vertical-align: baseline;
  display: inline-block;
}
.vux-mask-enter, .vux-mask-leave-active,
.vux-mask-leave-active, .vux-mask-enter-active {
  position: relative;
  z-index: 1;
}
.vux-mask-enter, .vux-mask-leave-active {
  opacity: 0;
}
.vux-mask-leave-active, .vux-mask-enter-active {
  transition: opacity 300ms;
}
.vux-loading-no-text .weui-toast {
  min-height: 25vw;
}
</style>
