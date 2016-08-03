/* 订单列表 */
 new Vue({
	 el:"#orderList",
	 data:{
		 downLoadImgUrl:GLOBAL.mpDownLoadImgUrl,
		 orderList:[],
		 myOrderList:[],
		 hasOrder:false  //判断是否有订单

	 },
	 created:function(){

	 },
	 beforeCompile:function(){
		 var _this  =this;
		 var mpGlobal = store.get("mpGlobal");
		 if(mpGlobal){
			 var openId= mpGlobal.openId;
			 var accessToken = mpGlobal.accessToken ;
		 }
		 if(openId){
			 $.fetchAjaxData({
				 url:request.user.fetchOrderList+openId + "/orders",
				 data:{token:accessToken,offset:0,limit:30}
			 },function(data){
				 _this.orderList= data.orders;
				 _this.hasOrder=true
				 console.log("dowmloadimgurl:",GLOBAL.mpDownLoadImgUrl);
				 //_this.computedMyOrderlis();

			 })
		 }else{

		 }


	 },
	 compiled:function(){


	 },
	 methods:{
		 orderDetailUrl:function (orderId){
			 location.href= GLOBAL.contextPath+"order-order_info?orderId="+ orderId;
		 },
		 computedMyOrderlis:function(){
			 /* 包装 前端的 订单列表 */
			 if (this.orderList.length>0){
				 for(var i=0;i<this.orderList.length;i++){
					 var order_item = this.orderList[i];
					 var myorderInfo={
						 orderStatusDesc:"",
						 orderTime:"",
						 shopName:"",
						 itemImg:"",
						 itemName:"",
						 itemType:"",
						 yuyueTime:"",
						 totalMoney:"",
						 totalNum:""
					 };
					 /* 订单状态描述 */
					 myorderInfo.orderStatusDesc=order_item.orderStatusDesc;




					 this.myOrderList.push(myorderInfo)

				 }
			 }

		 }
	 },
	 ready:function(){
		 document.title="消费记录";
	 }

 });