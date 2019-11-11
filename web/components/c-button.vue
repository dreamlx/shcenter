<template>
    <a :class='["button",{disabled: disable}]'  @click="handleClickLink"> 
        <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="loading"></i>
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </a>
</template>
<script>
const prefixCls = 'ivu-btn';
export default {
    props: {
        loading: Boolean,
        disable: Boolean
    },
    data () {
        return {
            showSlot: true
        };
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                  
                    [`${prefixCls}-loading`]: this.loading != null && this.loading,
                 
                }
            ];
        }
    },
    watch:{
       
    },
    created() {
     
    },
    mounted () {
        this.showSlot = this.$slots.default !== undefined;
    },
    methods: {
        handleClickLink (event, new_window = false) {
            this.$emit('click', event);
        }
    }
};
</script>

<style  scoped>
  
    .button { 
        transform: skewX(-33deg); 
        height: 1.25rem;
        background: #FEA000;
        width: 7.5rem;
        display: inline-block;
        position: relative;
        max-height: 50px;
    } 

    .button > span { 
        transform: skewX(33deg) translateY(-50%);
        color: #fff;
        font-size: 16px;
        text-align: center;
        display:block;
        vertical-align: middle;
        text-align: center;
        width: 100%;
        position: absolute;
        top:50%;
        left:0;
        width: 100%;
    }

    .button:hover {
        opacity: .9;
    }
    .button.disabled{
        color: #c5c8ce;
        background-color: #f7f7f7;
        border-color: #dcdee2; 
        pointer-events: none;
    }
    .button.disabled > span {
      color: #c5c8ce;
    }
</style>

