/**
 * @description 模板 获取附近的店铺
 * @date 2016-07-29
 * @author antony
 */

new Vue({
	el : "#nearShopList",
	data : {
		showOrhide : false, // 是否显示模板
		latitude : "",// 纬度
		longitude : "",// 经度
		shoplist : ""
	},
	// 编译前
	beforeCompile : function() {

	},
	// 编译结束并插入dom
	ready : function() {
		this.getCoords();
	},
	methods : {
		//**********************绑定事件 s*****************************//
		//跳转店铺详情
		directShop:function(userid){
		  //alert(userid);
			
		},
		
		//**********************绑定事件 e*****************************//
		

		// 获取地理位置
		getCoords : function() {

			this.getShopNearby(this.latitude, this.longitude);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(data) {
					// h5采集到经纬度

					//alert(data.coords.latitude + "ddd" + data.coords.longitude);
					this.longitude = data.coords.longitude; // 113.94//经度
					this.latitude = data.coords.latitude; // 22.54879//纬度

					// 获取附近店铺
					this.getShopNearby(this.longitude, this.latitude);
						// errorMsg
				}, function(data) {
					/*
					 * 1、UNKNOW_ERROR：表示不包括在其它错误代码中的错误，这里可以在 message 中查找错误信息
					 * 2、PERMISSION_DENIED：表示用户拒绝浏览器获取位置信息的请求 3、
					 * POSITION_UNAVALIABLE：表示网络不可用或者连接不到卫星
					 * 4、TIMEOUT：表示获取超时。必须在options中指定了timeout值时才有可能发生这种错误
					 */
					if (data.code == "PERMISSION_DENIED") {
						layer("用户拒绝获取位置信息", {
									icon : 2
								});
						this.showOrhide = false;
					}
				}, {
					enableHighAcuracy : true,
					timeout : 5000,
					maximumAge : 10000
				});
			}

		},
		/**
		 * 查询附近店铺
		 * 
		 * @param x
		 *            纬度
		 * @param y
		 *            精度
		 * @param radius
		 *            范围
		 * @param offset
		 *            偏移
		 * @param limit
		 *            条数
		 */
		getShopNearby : function(my_x, my_y) {
			var my_x = 113.22;
			var my_y = 22.22;
			/*
			 * $.fetchAjaxData({url:request.shop.fetchUserBindshopLis+GLOBAL.openId+"/nearby/shops",data:{
			 * x:latitude, y:longitude, radius:"", offset:"", limit:3
			 * }},function(jsonData){ this.showOrhide = true;
			 * 
			 * this.shoplist = })
			 */
			var data = {
				"errCode" : null,
				"errDesc" : null,
				"returnCode" : "success",
				"shops" : [{
							"shopAddres" : "科技广场美丽家",
							"shopLogo" : "0",
							"shopName" : "antony的店",
							"shopNo" : "Dodds",
							"startNum" : 0,
							"userId" : 20357,
							"x" : 111.4,
							"y" : 22
						}, {
							"shopAddres" : "深圳深南大道",
							"shopLogo" : "0",
							"shopName" : "david的店",
							"shopNo" : "rrrr",
							"startNum" : 0,
							"userId" : 20357,
							"x" : 114,
							"y" : 22.2
						}, {
							"shopAddres" : "第三个地址",
							"shopLogo" : "0",
							"shopName" : "rainqin的店",
							"shopNo" : "rrrr",
							"startNum" : 0,
							"userId" : 20357,
							"x" : 114.1,
							"y" : 22.5
						}]
			}
			var shopdata = data.shops;
			shopdata.forEach(function(item, index) {

						// 计算距离√￣（x1-x）²+（y1-y）²
						if (item.x && item.y) {
							var distan = globalUtil.GetDistance(my_y, my_x,
									item.y, item.x);

							shopdata[index].distances = distan;// 最终距离
						} else {
							shopdata[index].distances = "未知";// 最终距离
						}

					});

			this.shoplist = shopdata;
			this.showOrhide = true;
		}
	}
});