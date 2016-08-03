/**
 * 
 */

//订单详情
$(function(){
    var currentHref=window.location.href;
	
	//url参数
	var shopId = getUrlParam("shopId") ||  getUrlParam("shop_id") ;
	var orderId  = getUrlParam("orderId")  ||  getUrlParam("order_id");
	var shopSid = getUrlParam("shopSid");
	
	var openId = getUrlParam("openId")|| globalUtil.getUrlParam('open_id');
	var appId   =  getUrlParam("appId")|| globalUtil.getUrlParam('app_id');;
	var orderDetails ={
		
			init:function(){
				  //关闭分享
 				globalUtil.globalShareFun('');
				globalUtil.changeTitle("消费详情");
				//fastClick 
				//FastClick.attach(document.body);
				
				this.getShopInfo();
			
			},getShopInfo: function(){
				var _this = this;
				//2获取店铺信息
 				$.ajax({
		        	 url:request.shop.shopInfo,
		        	 data:{
		        		 shop_id   :  shopId,
		        		 open_id   :  openId
		        	 },
		        	 type:"get",
		 			 dataType:"json",
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8"),
		 					  	shopInfoData =  JSON.parse(decodeObj);
		 					
		 					   _this.getOrderDetails(shopInfoData);
		 					 
		 					   store.remove("shopInfoData");
		 					   store.set("shopInfoData",shopInfoData);
		 				 }
		 			 }
		      });
			},getOrderDetails : function(shopInfoData){
				/*
				 * 获取订单详情
				 */
				var _this = this;
				$.ajax({
					url: request.user.userOrderItermInfo,
					type:"get",
					data:{
							shop_id : shopId,
							order_id : orderId,
							app_id :appId,
							open_id :openId
						},
					dataType:"json",
					success: function(data){
						if(200 == data.status && data.content){
							var content = globalUtil.b64ToUtf8(data.content,"utf8");
								content=JSON.parse(content);
							
							   console.log("订单详情",content);
							laytpl($("#orderInfotemp").html()).render({ 
								content:content,
								webRoot:GLOBAL.webRoot,
								shopId:shopId,
								shopSid:shopSid,
								jing:"#",
								shopInfoData : shopInfoData 
							}, function(render){
								$("#orderInfoView").empty();
							    $("#orderInfoView").append(render);
							    
						    });
						}else{
						
						}
					},error:function(e){
						
					}	
						
				});
				
			}
			
	};
	
	orderDetails.init();
  
});