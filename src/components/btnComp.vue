<template>
    
<div :style="setStyle">
	<span style="display:block">12313</span>
	<button  @click="test()" class="wrapper textComp">{{dataString}}</button>
</div>
</template>

<script>
export default {
  components: {},
  props: {
		width:{
			type:[String,Number]
		},
		height:{
			type:[String,Number]
		},
		color:{
			type:[String]
		},
		fontSize:{
			type:[String,Number]
		},
		data:{
			type:String
		}
	},
  data () {
    return {
			dataString:JSON.parse(this.data).txt
			
    };
  },
  computed: {
		setStyle(){
			return{
				width:this.width+'px',
				height:this.height+'px',
				fontSize:this.fontSize+'px',
				color:this.color
			}
		}
	},
  watch: {},
  methods: {
		test(){
			alert(1)
		}
  }
}
</script>

<style scoped lang = 'less'>
.textComp{
	overflow: hidden;
	cursor: pointer;
}
</style>
