
(function($){
    $.extend({
        fetchAjaxData:function(arg,fn){
            $.ajax({
                url:arg.url,
                data:arg.data,
                type:arg.type || "get",
                dataType:"json",
                async: arg.async? arg.async:true,
                success:function(data){
                    if(data.returnCode == "success" ){
                        fn && fn(data);
                    }else{
                        layer.msg("后台错误:"+data.errDesc,{
                            //icon: 0,
                            time: 2000, //2秒关闭（如果不配置，默认是3秒,）
                            offset:100,
                            shift:6
                        });

                    }
                },
                error:function(data){
                    layer.msg("调用失败:"+data.statusText,{
                        //icon: 0,
                        time: 2000, //2秒关闭（如果不配置，默认是3秒,）
                        offset:100,
                        shift:6
                    });
                }


            });
        }



    });

    function globalShareFun(opt, fun ,cancelShare){
        /**
         *  opt 为空则表示关闭分享
         *  fun 分享成功后执行的函数
         *  cancelShare 取消分享后执行的函数
         */

        //获取全局变量
        var globalVar=store.get("globalVar") || {};
        var userId= globalVar.userId || 0;
        var appId=globalVar.appId || 0;

        var localHref=window.location.href.toString(),
            locals=localHref.split("#"),
            currentUrl=locals[0];


        jQuery.ajax({
            url:GLOBAL.webRoot+"/getJsTicket",
            type:"get",
            data:{
                appId:appId,
                currentUrl:currentUrl,
                user_id:userId
            },
            success:function(data){
                if(data.status === 200 && data.data){

                    var odata = data.data;
                    wx.config({

                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: appId, // 必填，公众号的唯一标识
                        timestamp: odata.timestamp, // 必填，生成签名的时间戳
                        nonceStr: odata.nonceStr, // 必填，生成签名的随机串
                        signature: odata.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                    wx.ready(function(){

                        var bool=false;
                        if(typeof opt ==='object'){
                            for(var attr in opt){
                                if(opt[attr]){
                                    bool=true;
                                    break;
                                }
                            }
                        }

                        if(bool){
                            wx.showOptionMenu();
                        }else{
                            wx.hideOptionMenu();
                            return;
                        }


                        var  urlSend= opt.urlSend,
                            titleSend= opt.titleSend,
                            imgUrlSend= opt.imgUrlSend,
                            descption= opt.descption;


                        wx.onMenuShareTimeline({
                            title: titleSend,
                            link: urlSend, // 分享链接
                            desc: descption||'', // 分享描述
                            imgUrl: imgUrlSend,
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                if(typeof(fun)=='function'){
                                    fun();
                                }
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                if(typeof( cancelShare)=='function'){
                                    cancelShare();
                                }
                            }
                        });
                        wx.onMenuShareAppMessage({
                            title: titleSend, // 分享标题
                            desc: descption||'', // 分享描述
                            link: urlSend, // 分享链接
                            imgUrl: imgUrlSend, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                if(typeof(fun)=='function'){
                                    fun();
                                }
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                if(typeof( cancelShare)=='function'){
                                    cancelShare();
                                }
                            }
                        });

                        wx.onMenuShareQQ({
                            title: titleSend, // 分享标题
                            link: urlSend, // 分享链接
                            desc: descption||'', // 分享描述
                            imgUrl: imgUrlSend, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                if(typeof(fun)=='function'){
                                    fun();
                                }
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                if(typeof( cancelShare)=='function'){
                                    cancelShare();
                                }
                            }
                        });
                        wx.onMenuShareWeibo({
                            title: titleSend, // 分享标题
                            link: urlSend, // 分享链接
                            desc: descption||'', // 分享描述
                            imgUrl: imgUrlSend, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                if(typeof(fun)=='function'){
                                    fun();
                                }
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                if(typeof( cancelShare)=='function'){
                                    cancelShare();
                                }
                            }
                        });

                        wx.onMenuShareQZone({
                            title: titleSend, // 分享标题
                            link: urlSend, // 分享链接
                            desc: descption||'', // 分享描述
                            imgUrl: imgUrlSend, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                if(typeof(fun)=='function'){
                                    fun();
                                }
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                if(typeof( cancelShare)=='function'){
                                    cancelShare();
                                }
                            }
                        });


                    });
                }else{
                    console.log("错误信息："+JSON.stringify(data));
                }

            }
        });
    };

    //获取请求参数值
    function getUrlParam(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        if(result != null){
            return result[2];
        }else{
            return null;
        }
    };

    function changeTitle(title){
        var $body = $('body');
        document.title = title||'商家主页';
        // hack在微信等webview中无法修改document.title的情况
        //href="${contextPath}/resources/images/default/favicon.ico"
        var $iframe = $('<iframe src='+GLOBAL.webRoot+'/resources/images/default/favicon.ico style="display:none;"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    };

    //获取经纬度 longitude latitude
    function getEchoOrientation(opt,fn){

        var appId=opt.appId,
            currentUrl=opt.currentUrl,
            userId=opt.userId;


        var latitude=140,
            longitude=10;
        jQuery.ajax({
            url:GLOBAL.webRoot+"/getJsTicket",
            async:false,
            type:"get",
            data:{
                appId:appId,
                currentUrl:currentUrl,
                user_id:userId
            },
            success:function(data){
                if(data.status === 200 && data.data){
                    var odata = data.data;
                    wx.config({

                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: appId, // 必填，公众号的唯一标识
                        timestamp: odata.timestamp, // 必填，生成签名的时间戳
                        nonceStr: odata.nonceStr, // 必填，生成签名的随机串
                        signature: odata.signature,// 必填，签名，见附录1
                        jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                    wx.ready(function(){
                        wx.getLocation({
                            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function (res) {
                                latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

                                fn(latitude,longitude);
                            },
                            cancel: function () {
                                fn(latitude,longitude);
                            },
                            fail:function(res){
                                fn(latitude,longitude);

                            }
                        });


                        //获取网络状态 :2g /3g+
                        /*	wx.getNetworkType({
                         success: function (res) {
                         var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                         alert("networkType:"+networkType);
                         }
                         });*/

                    });

                    fn(latitude,longitude);
                }else{
                    fn(latitude,longitude);
                }

            },error:function(){
                fn(latitude,longitude);
            }
        });

    };
    /*
     * 获取某店铺的顾客Id ,costomId
     */
    function getCustomerId (openId,shopId,appId,userId){
        //获取 itemCustomId
        var itemCustomId=0;
        jQuery.ajax({
            url :request.user.getCustomId,
            data :{
                open_id :openId,
                shop_id :shopId,
                app_id:  appId,
                user_id : userId
            },
            type : "get",
            async:false,
            dataType :"json",
            success :function(data){
                if(data.status == 200){
                    if(data.content){
                        itemCustomId=data.content;

                        /* var decodeContent = $.base64.decode(data.content,"utf8");
                         var jsonContent   = JSON.parse(decodeContent);
                         itemCustomId =jsonContent.custom_id;*/
                    }
                }
            }
        });
        return itemCustomId;

    };

    function packParam(url,opt){
        if(typeof(opt)==='object'){
            var arrs=[];
            for(var attr in opt){
                arrs.push(attr +'='+opt[attr]);
            }
            if(arrs.length>0){
                return url+'?'+arrs.join('&');
            }else{
                return url;
            }
        }else{
            return null;
        }
    };

    function getUserData(shopId,userId,openId){
        var userData;
        jQuery.ajax({
            url: request.reserved.getWxUserInfo+"/"+openId,
            data:{
                shop_id:shopId,
                user_id :userId
            },
            type:"get",
            async:false,
            dataType:"json",
            success: function(data){
                if(200 == data.status){
                    userData= data.content
                    /* userData = $.base64.decode(data.content, "utf8");
                     userData=JSON.parse(userData);*/

                }
            }
        });
        return userData;

    };


    function getAccessToken (appId,openId){
        var accessToken ;
        jQuery.ajax({
            url:request.user.getAccessToken,
            data:{app_id:appId,open_id:openId},
            type:'get',
            dataType:'json',
            async:false,
            success:function(data){
                if(data.status == 200 && data.content){
                    accessToken=data.content;
                }
            }
        });
        return accessToken;
    };

    function getMainOrderId(shopId,openId,appId){
        var mainOrderId=0;
        jQuery.ajax({
            url:request.user.getMainOrderId,
            data:{shop_id: shopId,open_id:openId,app_id:appId},
            type:'get',
            dataType:'json',
            async:false,
            success:function(data){
                if(data.status == 200 && data.content){
                    mainOrderId=data.content
                }
            }
        });


        return mainOrderId;

    }

    /**
     * 是否关联,及关联强度
     */
    function getUserInfo(arg,fun){
        $.fetchAjaxData({
            url:request.user.getRelationStatusAndUserInfo+arg.openId,
            data:{token:arg.accessToken},
            async:false
        },function(jsonData){
            fun && fun(jsonData);

        })

       /* $.ajax({
            url:request.user.getRelationStatusAndUserInfo+GLOBAL.openId,
            data:{token:GLOBAL.accessToken},
            type:'get',
            async:false,
            dataType:'json',
            success:function(data){
                if(data.status == 200 && data.content){
                    fun && fun();
                }
            }

        });*/

    }
    
    /***
     * 算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
     */
    function Rad(d){
        return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
    }
     //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
    function GetDistance(lat1,lng1,lat2,lng2){
  
         var radLat1 = Rad(lat1);
         var radLat2 = Rad(lat2);
         var a = radLat1 - radLat2;
         var  b = Rad(lng1) - Rad(lng2);
         var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
         Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
         s = s *6378.137 ;// EARTH_RADIUS;
         s = Math.round(s * 10000) / 10000; //输出为公里
         s=s.toFixed(1);
         return s;
     } 

    window.globalUtil={
        changeTitle: changeTitle,
        getUrlParam: getUrlParam,
        packParam: packParam,
        globalShareFun: globalShareFun,
        getEchoOrientation: getEchoOrientation,
        getCustomerId: getCustomerId,
        getUserData:getUserData,
        getAccessToken:getAccessToken,
        getMainOrderId:getMainOrderId,
        getUserInfo:getUserInfo,
        GetDistance :GetDistance
    };



	 function getParamStr(name,str){
			if(!str){
				 return null;
			}
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		    //.substr(1)
		    var result = str.match(reg);
		    if(result != null){
		        return result[2];
		    }else{
		        return null;
		    }
	};
	//全局AJAX加上access_token参数
	$(document).ajaxSend(function(evt, request, settings){
		  /* 	   var accessToken='';
		   if(localStorage && localStorage.globalVar){
			   var  globalVarObj=JSON.parse(localStorage.globalVar);
			   accessToken= getUrlParam('access_token') || globalVarObj.accessToken;
		   }
		   
		   if('GET'==settings.type){
			   var url=settings.url;
			   if(url){
				   var parentUrl=url.split("?");
				   var getParam=parentUrl[1];
				   if(getParam){
					   if(!getParamStr('access_token',getParam)){
						   settings.url=url+'&access_token='+accessToken;
					   }
				   }else{
					   if(!getParamStr('access_token',getParam)){
						   settings.url=url+'?access_token='+accessToken;
					   }
				   }
			   }
		   }else if('POST'==settings.type){
			   	var postParam= settings.data ;
			   	if(postParam){
			   		if(!getParamStr('access_token',postParam)){
			   			settings.data=postParam+'&access_token='+accessToken;
					   }
			   	}else{
			   		settings.data='access_token='+accessToken;
			   	}
		   }*/
		}).ajaxError(function(event,request, settings){
		}).ajaxSuccess(function(evt, request, settings){
//			console.log('请求成功：',request,settings.url,settings.data);
		});
	
})(jQuery);


