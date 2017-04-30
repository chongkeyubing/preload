//图片预加载
(function($){

	function Preload(imgs,options){
		this.imgs = (typeof imgs === 'string')?[imgs]:imgs; //如果是字符串，自动包装被数组
		this.opts = $.extend({},Preload.DEFAULTS,options); //后面对象覆盖前面对象
		
		if(this.opts.ordered){
			this._ordered();    //有序加载
		}else{
			this._unordered();   //无序加载
		}
	}

	Preload.DEFAULTS = {
		ordered: false,
		each: null,//每张图片加载完毕后执行
		all: null//所有图片加载完毕后执行
	};

	Preload.prototype._ordered = function(){  //有序预加载，即一张加载完加载下一张
		var imgs = this.imgs,
			opts = this.opts,
			index = 0,
			len = imgs.length;
		
		load();

		function load(){
			var imgObj = new Image();
			$(imgObj).on('load error',function(){
				if(index >= len){
					opts.all && opts.all();   //所有图片加载完后执行
				}else{
					opts.each && opts.each(index); //当前图片加载完后执行
					load();
				}
				index++;
			});

			imgObj.src= imgs[index];

		}
	}

	Preload.prototype._unordered = function(){  //无序加载，即所有图片同时加载
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

		$.each(imgs,function(i,src){
			if(typeof src != 'string') return;

			var imgObj = new Image();
			$(imgObj).on('load error',function(){
				opts.each && opts.each(count); //当前图片加载完后执行

				if(count >= len-1){
					opts.all && opts.all();   //所有图片加载完后执行
				}
				count ++;	
			});
			imgObj.src = src;
		});
	}

	//$.fn.extend 该种插件方式的使用方式为 $().preload()
	$.extend({
		preload: function(imgs,opts){
			new Preload(imgs, opts);
		}
	});

})(jQuery);