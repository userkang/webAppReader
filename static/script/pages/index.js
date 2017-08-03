$.get('/ajax/index', function(d){
	var sreenWidth = $(window).width();
	new Vue({
		el: '#app',
		data: {
			top: d.items[0].data.data,
			hot: d.items[1].data.data,
			recommend: d.items[2].data.data,
			female: d.items[3].data.data,
			male: d.items[4].data.data,
			free: d.items[5].data.data,
			topic: d.items[6].data.data,
			duration: '0',
			header_duration: '0',
			tab_1_class: 'Swipe-tab-on',
			tab_2_class: '',
			header_translate3d: 'translate3d(0px,0px,0px)',
			translate3d: 'translate3d(0px,0px,0px)',
			
		},
		methods: {
			tabSwitch: function(pos) {
				this.header_duration = '0.5';
				this.duration = '0.5';

				if (pos == 0) {
					this.header_translate3d = 'translate3d(0px,0px,0px)';
					this.translate3d = 'translate3d(0px,0px,0px)';
					this.tab_1_class = 'Swipe-tab-on';
					this.tab_2_class = '';
				} else {
					this.header_translate3d = 'translate3d(71px,0px,0px)';
					this.translate3d = 'translate3d(-320px,0px,0px)';
					this.tab_2_class = 'Swipe-tab-on';
					this.tab_1_class = '';
				}
			}
		}
	})
},'json');