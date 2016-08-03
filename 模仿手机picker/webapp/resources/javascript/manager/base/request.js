(function(){
	
	var server =GLOBAL.saasActionServer;
	var wxServer = GLOBAL.wechatActionServer;
	
	var imageRoot  = "http://download.mljia.cn";
	
	
	var zhifuUrl = GLOBAL.payActionServer+"/pay"; //http://wx.mljiadev.cn/h5/pay";		//生产环境 为http://h5.mljia.cn/wx/pay //外网dev测试环境: http://pay.mljiadev.com/wx/pay
	
	var zhifuUrlLis =GLOBAL.payActionServer+"/paytwo"; //"http://wx.mljiadev.cn/h5/paytwo";  //生产环境 为 http://h5.mljia.cn/wx/paytwo  //外网dev测试环境: http://pay.mljiadev.com/wx/paytwo
	
	
	var request={
			zhifuUrl:zhifuUrl,
			//zhifuTestUrl:zhifuTestUrl,
			zhifuUrlLis:zhifuUrlLis,
			staticImage:{
				url: imageRoot + "/download/image/",
				thumb: imageRoot + "/download/image/thumb/",
			},
			shop:{
				 shopInfo      : server + "/saas.shop/h5/shop/get/information",
				 //店铺列表
				 shoplist      : server + "/saas.shop/h5/shop/list",
				 //页面下拉获取店铺列表
				 getShopList    :wxServer + "/wechat/h5/shop/list",
				 
				 getVerifyCode : wxServer + "/wechat/h5/user/get/smscode/",
				 bindUser      : wxServer + "/wechat/h5/user/bind",
			     getShopPicture :  server + "/saas.shop/h5/shop/get/images",
			    
			     //获取某店铺产品列表,前5个为推荐产品
			     getHotSaleInfo: server + "/saas.shop/h5/shop/get/product/list",
			     //商家推荐
			     getShopRecommendInfo: server + "/saas.shop/h5/shop/get/recommend",
			     getCommentInfo : server +  "/saas.shop/h5/comment/get/list",
			     
			     //获取用户拥有的店铺列表
			     getDiffShopConsumeList :server + "/saas.shop/h5/shop/list",
			     // 获取异店耗卡店铺列表
			     getDiffShopList        :server + "/saas.shop/h5/shop/other/list",
			     
			     //获取店铺服务卡列表
			     getCardListOfShopServe :server  + "/saas.shop/h5/shop/cardtype/list",
			     //获取某店铺产品列表
			     getProductListOfShopServe : server + "/saas.shop/h5/shop/get/product/list",
			     //获取某店铺的护理列表
			     getMassageListOfShopServe : server + "/saas.shop/h5/shop/massage/list",
			     
			     //获取服务卡详情
			     getCardDetailsOfShopServe  :server + "/saas.material/h5/card/cardtype/info",
			     //获取护理项目详情
			     getMassageDetailsOfShopServe : server + "/saas.material/h5/massage/get/detail",
			     //获取店铺产品信息
			     getProductDetailsOfShopServe : server + "/saas.material/h5/product/get/detail",
			     
			     //获取活动价格信息
			     getEventPriceById : wxServer + "/wechat/h5/activity/pre/info",
			     
			     
			     //查询产品类别内容
			     getProductClassItem          : server + "/saas.material/h5/product/type/info",
			     //查询护理类别内容
			     getMassageClassItem          : server + "/saas.material/h5/massage/type/info",
			     
			     //查询产品可耗卡
			     getProductAccseeCard         :server +"/saas.customer/h5/card/by/product",
			     //获取店铺已评价的订单
			     getShopOrderComment          : server + "/saas.order/weixin/order/comment/list"
			     
			     
			},
			user:{
				shopStafflis  :server + "/saas.staff/h5/staff/list",
				userList      :  server + "/saas.staff/h5/staff/list/all",
				//某一店铺员工列表  p: shop_id
				soleShopStaffLis : server + "/saas.staff/h5/staff/list",
				getCardList   :  server + "/saas.customer/h5/card/opencard/list",
				getCardInfoDetials : server + "/saas.customer/h5/card/opencard/info",
				userOrderList :  server + "/saas.order/weixin/order/list",
				//mljia order list
				mljiaOrderLis:  server + "/saas.order/mljia/weixin/order/list",
				
				userOrderItermInfo : server + "/saas.order/weixin/order/info",
				//
				simpleOrderInfo   :server +"/saas.order/weixin/order/simple/info",
				
				//获取用户状态
				getUserStatus      : wxServer + "/wechat/h5/user/get/status",
				checkUserPhone     :  wxServer + "/wechat/h5/user/phone/check",
				//获取验证码
				getQR               :wxServer + "/wechat/h5/app/info",
				//用openId  获取 customId
				getCustomId        : wxServer  + "/wechat/h5/wx/info",
				//获取accesstoken
				//http://dev.mljia.cn/wxpub/get/access_token?app_id=wx9f284019acd75b4a&open_id=ox1dUs_mEtwHgXbL1t_87P0CMOpw
				//用户意见反馈
				feekbackSuggest    : wxServer + "/wechat/h5/user/comment/add",
				getAccessToken     :  wxServer + "/get/access_token",
				//获取订单状态数量
				getOrderStatueNum  :  server + "/saas.order/weixin/order/count",
				//设置用户选择的店铺
				setPreferShop        :  wxServer + "/wechat/h5/shop/change/prefer",
				//获取mainOrderId
				getMainOrderId:			server+ "/saas.order/weixin/get/mainorderid"
				
			},
			comment:{
				consumeComment :  server + "/saas.shop/h5/comment/index", //提交用户评价
				getCommentItem :   server + "/saas.shop/h5/comment/get/item", // 获取评价细则列表
				
				getcommentInfo :  server + "/saas.shop/h5/comment/get/info",
				getOrderCommentInfo : server + "/saas.shop/h5/comment/get/info/order",
				//获取评论列表
				getCommentList : server + "/saas.shop/h5/comment/get/list",
				// 获取用户信息 {open_id} 
				getWXUserInfo  : wxServer + "/wechat/h5/user/info",
				// 获取微信用户 少量
				getWXUserDetailInfo: wxServer + "/wechat/h5/user/info/detail/",
				//分享朋友圈补贴美丽币
				shareGetScore : server +"/saas.shop/h5/reward/add/coin"
				
			},
			
			reserved:{
				//获取用户微信相关信息
				getWxUserInfo : wxServer + "/wechat/h5/user/info",
				//预约产品 二期 暂时不用
				//reserveProduct  : server + "/meirong.order.action/weixin/card/yuyueProduct",
				//预约护理 二期 暂时不用
				//reserveMassage  : server + "/meirong.order.action/weixin/card/yuyueMassage",
				//预约中的消费记录
				consumeRecored  : server + "/saas.order/weixin/card/records",
				//修改预约时间
				changeReserveTim : server + "/saas.order/weixin/opt/yuyueModify",
				//取消预约
				cancelReserve    : server + "/saas.order/weixin/opt/yuyueCancel",
				//获取护理项目详情
				getMassDetail   : server +"/saas.material/h5/massage/get/detail",
				//获取店铺详情
				getShopDetail  :  server + "/saas.material/h5/product/get/detail",
				
				//预约开卡
				reservOrderCard : server + "/saas.order/weixin/card/yuyue",
				//预约护理
				reservOrderMassage : server + "/saas.order/weixin/yuyue/massage ",
				//预约产品
				reservOrederProduct : server + "/saas.order/weixin/yuyue/product",
				
				//获取某护理用户可耗卡信息
				getMassageIncludeCardInfo    : server+ "/saas.customer/h5/card/by/massage",
				
				//获取某产品用户可耗卡信息
				getProductIncludeCardInfo     : server + "/saas.customer/h5/card/by/product",
				
				//获取微信签名信息
				getWXOrderPayInfo              :server + "/saas.order/weixin/opt/order/wxPayInfo"
				
				
				
			},
			order:{
				//申请退款
				wxApplyRefundMoney : server +"/saas.order/weixin/opt/refund"
				

			},
			event:{
				//优惠促销
				getPromotions :  wxServer + "/wechat/h5/activity/search",
				getDetailPromotions : wxServer + "/wechat/h5/activity/info",
				getPromotionsDeatils : wxServer + "/wechat/h5/activity/info"
			}
			
	};
	window.request=request;
	window.imageRoot = imageRoot;
	
	
	
	var tools ={
			comment:{
				// 外网没有pub.内网有
				upLoadImg    : wxServer + "/upload/image",              //上传图片
			}
	};
	window.tools =tools;
	
	
	
	// 对Date的扩展，将 Date 转化为指定格式的String   
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
	// 例子：   
	// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
	// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	 if(!Date.prototype.format){
			Date.prototype.format =function(format){
				var o = {
				"M+" : this.getMonth()+1, //month
				"d+" : this.getDate(), //day
				"h+" : this.getHours(), //hour
				"m+" : this.getMinutes(), //minute
				"s+" : this.getSeconds(), //second
				"q+" : Math.floor((this.getMonth()+3)/3), //quarter
				"S" : this.getMilliseconds() //millisecond
				};
				if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
				(this.getFullYear()+"").substr(4- RegExp.$1.length));
				for(var k in o)if(new RegExp("("+ k +")").test(format))
				format = format.replace(RegExp.$1,
				RegExp.$1.length==1? o[k] :
				("00"+ o[k]).substr((""+ o[k]).length));
				return format;
			};
	 }
	 
	 
	 //获取请求参数值
	 if(!window.getSearchString){
		 window.getSearchString =  function (name){
			    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			    var result = window.location.search.substr(1).match(reg);
			    if(result != null){
			        return result[2];
			    }else{
			        return null;
			    }
		};
		 
	 }
	 //获取请求参数值
	 if(!getUrlParam){
		 var getUrlParam =  function (name){
			    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			    var result = window.location.search.substr(1).match(reg);
			    if(result != null){
			        return result[2];
			    }else{
			        return null;
			    }
		};
		 window.getUrlParam=getUrlParam;
	 }
	 
	 //格式化输出日期  输出 最大唯一单位
	 if(!arrive_timer_format){
		var  arrive_timer_format=function(s) {
				var t;
				if(s<0){
					return;
				}
				if(s > -1){
				    hour = Math.floor(s/3600);
				    min = Math.floor(s/60) % 60;
				    sec = s % 60;
				    day = parseInt(hour / 24);
				    if (day > 0) {
				        hour = hour - 24 * day;
				        t = day + ":" + hour + ":";
				        }
				    else t = hour + ":";   
				    if(min < 10){t += "0";}
				        t += min + ":";
				    if(sec < 10){t += "0";}
				        t += sec;
				}
				if(  t.split(":").length==4 && Number(t.split(":")[0]) > 0 ){
					
					return Number(t.split(":")[0])+"天";
				}else if(t.split(":").length==3 && Number(t.split(":")[0]) > 0 ){
					return Number(t.split(":")[0])+"小时";
				}else if(t.split(":").length==3 && Number(t.split(":")[0]) == 0   ){
					return Number(t.split(":")[1])+"分钟";
				}
				
			};
		window.arrive_timer_format=arrive_timer_format;
	 }
	
	 
	//+---------------------------------------------------  
	//| 把日期分割成数组  
	//+---------------------------------------------------  
	Date.prototype.toArray = function()  
	{   
	    var myDate = this;  
	    var myArray = Array();  
	    myArray[0] = myDate.getFullYear();  
	    myArray[1] = myDate.getMonth();  
	    myArray[2] = myDate.getDate();  
	    myArray[3] = myDate.getHours();  
	    myArray[4] = myDate.getMinutes();  
	    myArray[5] = myDate.getSeconds();  
	    return myArray;  
	}
	 
	 
})();