<template>
	<img :src="picUrl" alt="" class="wrapper" :style="setStyle">
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
		
		data:{
			type:String
		}
	},
  data () {
    return {
			dataString:JSON.parse(this.data).filename
			
    };
  },
  computed: {
		picUrl(){
			return require('../assets/'+this.dataString)
		},
		setStyle(){
			return{
				width:this.width+'px',
				height:this.height+'px',
			}
		}
	},
  watch: {},
  methods: {
  }
}
</script>

<style scoped lang = 'less'>

</style>
