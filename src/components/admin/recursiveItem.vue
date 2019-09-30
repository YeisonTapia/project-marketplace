<template>
	<q-list separator link no-border id="listMenuAdmin" class="q-pa-none">
		<!--Single Item-->
		<q-item v-for="(item,key) in menu" :key="key"
            v-if="checkItemSingle(item)"
						:class="`single-item ${$route.name == item.name ? 'router-link-active' : ''}`"
            @click.native="redirectTo(item)">
			<q-item-side :icon="item.icon"/>
			<q-item-main>{{$tr(item.title)}}</q-item-main>
		</q-item>

		<!-- Dropdwon Item -->
		<q-collapsible v-else-if="checkItemMultiple(item)" :class="selectedChildren(item)">
			<!--Custom Header-->
			<template slot="header">
				<q-item-main>
					<q-icon :name="item.icon" class="icon-collapsible q-mr-sm" />
					<span class="icon-collapsible">{{$tr(item.title)}}</span>
				</q-item-main>
			</template>
			<!--Recursive item-->
			<recursive-menu :key="key" :menu="item.children"/>
		</q-collapsible>
	</q-list>
</template>
<script>
	//Plugins
	import auth from '@imagina/quser/_plugins/auth'

	export default {
		name: 'recursiveMenu',
		components: {},
		props: {
			menu: {default: false}
		},
		created() {
			this.$nextTick(function () {
				this.checkCollapsibles()
			})
		},
		methods: {
			checkItemSingle(item) {
				let response = true
				if (!item.activated) response = false
				if (item.children) response = false
				if (!item.name) response = false
				if (item.permission && !auth.hasAccess(item.permission)) response = false
				return response//Response
			},
			checkItemMultiple(item) {
				let response = true
				if (!item.children) response = false
				if (item.children && !item.children.length) response = false
				if (item.permission && !auth.hasAccess(item.permission)) response = false
				return response//Response
			},
			checkCollapsibles() {
				let collapsibles = this.$el.getElementsByClassName('q-collapsible')
				if(collapsibles.length){
					for(var group of collapsibles){
						let items = group.getElementsByClassName('single-item')
						if(!items.length)
							group.style.display = 'none'
					}
				}
			},
      redirectTo(item){
				let itemClone = this.$clone(item)
        if (itemClone.linkType == 'external'){
          window.open(`https://${itemClone.url}`,itemClone.target);
        }else{
          this.$router.push({name: itemClone.name})
        }
      },
			selectedChildren(item){
				let response = ''//Defualt response

				//If has children's
				if(item.children){
					let routeName = this.$route.name
					let isSelectedChildren = item.children.find(item => item.name == routeName)
					if(isSelectedChildren) response = 'collapsible-active'
				}

				return response //Response
			}
		}
	}
</script>
<style lang="stylus">
	@import "~variables";
	#listMenuAdmin
		font-weight 700
		font-size 16px
		border-top 1px solid #e0e0e0 !important
		.q-icon
			font-size 16px
			padding 0 15px
			color #444444

		.q-collapsible-inner
			a, .q-collapsible
				border-top none !important
				color #444444
					
			.q-collapsible-sub-item
				padding 0
				&:hover
					color #444444
				.q-item
					padding 10px
					border 0
				.q-item.router-link-active
					padding 10px
					border 0
					background $light !important
					color $tertiary !important
					i
						color $tertiary
					&:hover
						background $light !important
						color $tertiary !important
				.q-item-side-left
					padding-left 15px		
					

		.collapsible-active
			background $tertiary!important
			color #fff !important
			.icon-collapsible
				transition .5s
				color #ffffff !important
				font-weight bold
			.q-collapsible-sub-item
				background #fff!important
				color #444444
				

		.router-link-active
			transition .5s
			background $tertiary
			color #ffffff
			.q-item-side-left
				i 
					color #ffffff 
			.q-icon
				transition .5s

		.q-item
			padding 20px 10px
			&:hover
				background $tertiary!important
				color #ffffff
				i 
					color #ffffff
</style>


