<template>
	<div>
		<div class="weui-mask" v-show="showValue"></div>
		<div class="weui-dialog" v-show="showValue">
			<div class="weui-dialog__hd">
	        	<strong class="weui-dialog__title">{{ title }}</strong>
	      	</div>
	     	<div class="weui-dialog__bd">
		        <slot>
		          	<div v-html="content"></div>
		        </slot>
	      	</div>
	      	<div class="weui-dialog__ft">
	        	<a href="javascript:;"
	          	class="weui-dialog__btn weui-dialog__btn_primary"
	          	@click="_onHide">{{ buttonText || $t('button_text') }}</a>
	      	</div>
		</div>

	</div>
</template>
<script>
export default {
    props : {
        value: Boolean,
	    title: String,
	    content: String,
	    buttonText: String,
	    hideOnBlur: {
	      type: Boolean,
	      default: false
	    },
    },
    data () {
	    return {
	      showValue: false
	    };
    },
	 watch: {
	    value (val) {
	      	this.showValue = val;
	    },
	    showValue (val) {
	      	this.$emit('input', val);
	    }
  	},
    created () {
	    if (typeof this.value !== 'undefined') {
	      	this.showValue = this.value;
	    }
    },
    methods: {
	    _onHide () {
	      this.showValue = false;
	    }
 	},
 
};
</script>