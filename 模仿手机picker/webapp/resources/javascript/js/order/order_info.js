
new Vue({
	el:"#orderInfo",
	data:{
		orderId:globalUtil.getUrlParam("orderId"),
		shopId:globalUtil.getUrlParam("shopId"),
		preorder_info:{
			preorder_time:"", // 预约时间
			preorder_staff:[], //预约员工
			order_id:"",		//订单编号
			generate_order_time:""		//订单生成时间
		},
        preorder_item_info:{
            item_img_url:"",
            item_name:"",
            item_num:"",
            total_money:""
        },
        orderStatus:""

	},
	beforeCompile:function(){
		/*$.fetchAjaxData({
			url:"",
			data:{}
		},function(){

		})*/

	},
	compiled: function(){

	},
	metheds:function(){

	},
	ready:function(){


	}


});