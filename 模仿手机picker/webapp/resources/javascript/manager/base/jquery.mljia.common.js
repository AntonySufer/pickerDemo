/**
 * 常用js工具类
 */
;(function($){
	$.extend({
		mljiaCommonTool:{
			wxAjax:function(opt,fn){
			  $.ajax({
				 url	:	opt.url,
				 data	:	opt.data,
				 dataType:	opt.dataType,
				 type	:	opt.type,
				 async  :   opt.async == "undefined"? true : opt.async,
				 success:	function(data){
					 if(data.status == 200){
						 if(data.content){
							 fn && Object.prototype.toString.call(fn)=="[object Function]" && fn(data.content);
						 }else{
							 fn && fn();
						 }
					 }else{
						
					 }
				 },
				 fail :	function(data){
					 
				 }
				 
			  });
			  
			  
			},
			wxES6WxAjax: function(opt){
				return new Promise(function(resolve,reject){
					 $.ajax({
						 url	:	opt.url,
						 data	:	opt.data,
						 dataType:	opt.dataType,
						 type	:	opt.type,
						 async  :   opt.async == "undefined"? true : opt.async,
						 success:	function(data){
							 if(data.status == 200){
								 if(data.content){
									 resolve(data.content);
								 }else{
									reject({status:data.status,content:""});
								 }
							 }else{
								 reject({status:data.status});
							 }
						 },
						 fail :	function(data){
							 reject("fail")
						 }
						 
					  });
					
				})
			}
			
	    },
	    
	});
})(jquery);