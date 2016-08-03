/**
 * 
 */
//消费查询  
$(function(){
	
	var openId = globalUtil.getUrlParam('open_id');
	var appId  = globalUtil.getUrlParam('app_id');

	 var currentHref=window.location.href;
	
	
 	var shopInfoData;
 
 	var orderList={
 			init:function(){
 				//设置title 
 				globalUtil.changeTitle("消费记录");
 			   //关闭分享
 				
 				//globalUtil.globalShareFun('');
 				this.getOrderListData();
 				
 				//fastClick 
 				FastClick.attach(document.body);
 			},getOrderListData :function(){
 				var _this= this;
 				//获取订单列表
 				$.ajax({
 				url: request.user.mljiaOrderLis,
 				type:"get",
 				data:{
 						open_id:openId,
 						app_id :appId,
 						rows:50,
 						page :1
 						
 					},
 				dataType:"json",
 				success: function(data){
 						if(200 == data.status && data.content){
 							var content = globalUtil.b64ToUtf8(data.content,"utf8");
 						    content = JSON.parse(content);
 						    console.log("订单列表",content);
 						    
 						 
 						   
 						    
 							if(content.length>0){
 								laytpl($("#mjOrderLisTemp").html()).render({
 									webRoot:GLOBAL.webRoot,
 									staticImage:request.staticImage.thumb,
 									content:content,
 									appId:appId,
 									openId:openId
 								}, function(render){
 									$("body").find("div").remove();
 								    $("body").append(render);
 								    //修改title
 								 
 								    //点击进入订单详情
 								    $(".yy_hlkx_box").on("click",function(){
 								    	var _this = $(this);
 								    	var orderId =_this.attr("data-order-id");
 								    	var shopId = _this.attr("data-shop-id");
 								    	var shopSid = _this.attr("data-shop-sid");
 								    	location.href= GLOBAL.webRoot + "/agent/manager-mljia-order-order_info?orderId="+orderId
 								    	+"&shopId="+shopId
 								    	+"&shopSid="+shopSid
 								    	+"&openId="+openId
 								    });
 								    
 								    
 								    
 							    });
 								
 							}else{
 								$("#customView").show();
 								$("body").css("background-color","#fff");
 								
 							}
 				
 						}else{
 							$("#customView").show();
 							$("body").css("background-color","#fff");
 							
 						}
 					},error:function(e){
 					
 					}	
 					
 				});
 				
 				
 				
 				
 			},initSelectShop:function(){
 				$("#customView").show();
 				globalUtil.changeTitle("消费记录");
 				$("body").addClass("bgbai");
 				var _this=this;
 	 			 var localHref=window.location.href.toString(),
 		 		 	 locals=localHref.split("#"),
 		 		 	 currentUrl=locals[0];
 				 
 	 			//获取经纬度
 	 			globalUtil.getEchoOrientation({
 	  				appId: appId,
 	  				currentUrl: currentUrl,
 	  				userId: userId
 	  			}, function(latitude,longitude){
 	  			//2获取店铺信息
 	  				 $.ajax({
 					 		url : request.shop.shoplist,
 					 		type : "get",
 					 		data:{
 	 				 			user_id :userId,
 	 				 			app_id:  appId,
 	 				 			open_id: openId,
 	 				 			longitude:longitude,
 	 				 			latitude:latitude
 	 				 		},
 					 		dataType : "json",
 					 		success:function(data){
 					 			if(data.status==200 && data.content){
 					 				var content = globalUtil.b64ToUtf8(data.content,"utf8");
 			 					    content = JSON.parse(content);
 			 					var shoplistNum = content.length;
 			 					//如果为单店铺,返回该店铺shopid
 			 					if(shoplistNum == 1){
 			 						sigalShopID=content[0].shop_id;
 			 						
 			 						$("#customView a").attr("href",GLOBAL.webRoot+"/agent/manager-shop-info-wx_shops_home?appId="+appId+"&openId="+openId+"&userId="+userId+"&shopId="+sigalShopID);
 			 					}else{
 			 						$("#customView a").on("click",function(){
 			 							location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=shopHome";
 			 						});
 					 				
 			 					}
 					 			}
 					 		},error:function(){
 					 			alert('服务错误');
 					 		}
 					 	});
 	  			});
 				
 				
 				
 				
 			},hasServerTips:function(hasServer,hasServerNum,soleServerParameter){
 				
 				if(hasServer){
 					layer.open({
 					    content:"<div class='cardtishi_op poi2' style='margin-left:-205px;margin-top:-150px;'>"+	
 					    		"<p class='a1'><img src=' "+ GLOBAL.webRoot +"/resources/images/meirong/shop/cardtise_cancel0.gif' width='65' height='65'/></p>"+
 								 "<p class='a2'>您当前有正在进行中的服务，是否进入？</p>"+
 								 "<p class='a3'>"+
 								 "<a class='but1' id='cancelTips'>取消</a>"+
 								 " <a class='but2' id='confirmTips'>进入</a>"+
 								 " </p></div>"
 					});
 					jQuery(".layermchild").attr("style","  box-shadow: none");
 					jQuery("body").delegate("#cancelTips","click",function(e){
 						layer.closeAll();
 					});   
 					jQuery("body").delegate("#confirmTips","click",function(e){
 						if(hasServerNum>1){
 							layer.closeAll();
 						}else if(hasServerNum==1){
 							window.location.href=  GLOBAL.webRoot +"/agent/manager-user-catalog-wx_user_order_info?orderId="+soleServerParameter.order_id+"&shopId="+soleServerParameter.shop_id+"&shopSid="+soleServerParameter.s_id;
 						}
 					});
 					
 				}
 				
 			}
 	};

 	orderList.init();
	
 	
});