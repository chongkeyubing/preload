# preload

jquery图片预加载插件

使用方式
var imgs=[
		'http://45.34.137.202:8080/comicdata/12307/1/1.jpg',

        'http://45.34.137.202:8080/comicdata/12307/1/2.jpg',

        'http://45.34.137.202:8080/comicdata/12307/1/3.jpg',

        'http://45.34.137.202:8080/comicdata/12307/1/4.jpg',
		];

//有序预加载
$.preload(imgs,{
      ordered : true,  //是否有序加载
      each : function(index){  //每张图片加载完后的执行函数
        console.log('第'+ (index+1) +'张图片加载完毕');
      },
      all : function(){  //所有图片加载完后的执行函数
        console.log('所有图片加载完毕');
      }
});
