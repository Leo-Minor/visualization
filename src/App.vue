<template>
	<div id="app">
		<headViews></headViews>
		<div class="content-box">
			<leftViews></leftViews>
			<centerViews @currComp="currComp" :myCurrComp="myCurrComp"></centerViews>
			<rightViews @updateComp="updateComp" :myCurrComp="myCurrComp"></rightViews>
		</div>
	</div>
</template>

<script>
	import headViews from "./views/headViews.vue"
	import centerViews from "./views/centerView.vue"
	import leftViews from "./views/leftView.vue"
	import rightViews from "./views/rightView.vue"

	export default {
		name: 'App',
		components: {
			headViews,
			centerViews,
			leftViews,
			rightViews
		},
		data(){
			return{
				myCurrComp:null
			}
		},
		methods:{
			updateComp(comp){
				this.myCurrComp = comp;
			},
			currComp(comp){
				this.myCurrComp = comp;
			}

		}
	}
</script>

<style  lang="less">
	.content-box{
		display: flex;
		height: calc(100vh - 80px);
	}
</style>
