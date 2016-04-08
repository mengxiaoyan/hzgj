export default (router) => {
	router.map({
		//展览列表
		'/': {
			name: 'index',
			component: require('./views/exhibitList.vue')
			},
		//展览首页
		'/p/:id': {
			name: 'productionShow',
			component: require('./views/productionShow.vue'),
			
		},
		//展览介绍
		'/exhInfo/:id': {
			name: 'exhInfo',
			component: require('./views/exhInfo.vue'),
			
		},
		//展览介绍
		'/exhArts/:id': {
			name: 'exhArts',
			component: require('./views/exhArts.vue'),
			
		},
		
		'*': {
			component: require('./views/404.vue')			
		}
	})
}