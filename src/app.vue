<template>
	<div class="container">
		<router-view></router-view>
	</div>
	<div class="mask" v-if="loading">
		<div>
			<span><i class="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;加载中...</span>
		</div>
	</div>
	<div class="snackbar snackbar-{{snackbarMsg.type}}" v-if="snackbarMsg" transition="fade" v-text="snackbarMsg.msg"></div>
</template>

<style lang="stylus" scoped>
@import "./assets/variables.styl"

div.container
	padding-top 0px
	height 100%
	overflow auto
div.mask
	width 100%
	height 100%
	position fixed
	top 44px
	bottom 0
	left 0
	right 0
	color white
	text-align center
	display: table
	>div
		font-size 18px
		display: table-cell
		vertical-align: middle
		>span
			padding 1em 2em
			background rgba(0,0,0,0.3)
			border-radius 3px;
div.snackbar
	position: fixed;
	bottom: 20px;
	width: 100%;
	text-align: center;
	color: white;
	line-height: 44px;
	font-size: 15px;
div.snackbar-error
	background #FF4444
div.snackbar-success
	background #42B983
div.snackbar-warning
	background #FFDC00

// transition
div.snackbar.fade-transition {
  transition: all 1s ease
  opacity: 1
  height 44px
}
div.snackbar.fade-enter {
	opacity 0
	height 0
}
div.snackbar.fade-leave {
  opacity 0
  height 0
}


header
	display -webkit-flex
	display -ms-flexbox
	display flex
	padding 5px
	height 20px
	background $themeColor
	position fixed
	top 0
	left 0
	right 0
	z-index 100
	box-shadow 0 1px 3px rgba(0,0,0,0.3)
	a
		color white
		float left
		i
			line-height $appbarHeight
			width $appbarHeight
			text-align center
		&:last-child
			float right
	h3
		text-align center
		line-height $appbarHeight
		font-size 13px
		width 100%
		color white
		display inline-block
</style>

<script>
import Vue from 'vue'
import Appbar from './components/appbar.vue'
/*import resize from './resize.js'
resize.init();*/

// 拦截器
export default {
	data () {
		return {
			loading: false,
			snackbarMsg: null,
			title: '首页'
		}
	},
  ready () {
  	// 拦截器
  	var _this = this;
    Vue.http.interceptors.push({
      request(req){
      		_this.loading = true
          return req
      },
      response(res){
      		if (res.status === 401) {
      			_this.$router.go({ name: 'login', replace: true })
      			_this.$router.app.snackbar('warning', '没有登录')
      		}
      		// setTimeout(function () {
      			_this.loading = false
      		// }, 00)
          return res
      }
    })
  },
	components: {
		'appbar': Appbar
	},
	methods : {
		snackbar (type, msg) {
			var _this = this;
			_this.snackbarMsg = { 'type': type, 'msg': msg }
			setTimeout(function () {
				_this.snackbarMsg = null
			}, 3000)
		},
		showIndicator () {
			this.loading = true
		},
		closeIndicator () {
			this.loading = false
		}
	}
}
</script>