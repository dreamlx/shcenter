<template>
    <a :class='["button"]'> 
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </a>
</template>
<script>
const prefixCls = 'ivu-btn';
export default {
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
       
    }
};
</script>

<style  scoped>
  
    .button { 
        transform: skewX(-33deg); 
        height: 145px;
        background: #FEA000;
        min-width: 460px;
        display: inline-block;
        position: relative;
        transform-origin: right bottom;
    } 

    .button > span { 
        transform: skewX(33deg);
        color: #fff;
        font-size: 45px;
        text-align: center;
        display:block;
        vertical-align: middle;
        text-align: center;
        line-height: 145px;
        padding: 0 10px;
        width: 100%;
    }

    .button:hover {
        opacity: .9;
    }
    
    .button.disabled{
        background: #b6b6b5
    }
</style>

