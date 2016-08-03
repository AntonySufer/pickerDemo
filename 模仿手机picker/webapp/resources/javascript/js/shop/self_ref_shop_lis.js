/****
 * @description 我的店，强关联
 * @date 2016-07-28
 * @author antony
 */


new Vue({
    el:"#refShopLis",
    data:{
        shoplist:"",
        isbind:false,//是否关联 默认没有关联
        shopCount:""//是否存在数据
    },
    beforeCompile:function(){
    	var _this =this;//注意指向当前el对象
    	var accessToken = store.get('mpGlobal').accessToken || GLOBAL.accessToken;
    	var openId = store.get('mpGlobal').openId || GLOBAL.openId;
    	if (!accessToken) {
    		  console.log('没有获取到accessToken!', {icon: 2});   
    		   return;
    	}
    	//获取
       $.fetchAjaxData({url:request.shop.fetchUserBindshopLis+"/"+openId+"/shops",data:{
            token:accessToken,
            offset:1,
            limit:50
        }},function(jsonData){
            if (jsonData.returnCode =="success") {
            	var shopList =jsonData.shops;
             if (shopList != null && shopList.length > 0) {
            	   shopList.forEach(function(item, index){
            	   	  
            	 	  var startNum = item.startNum;
            	 	    if (startNum && startNum > 0) {
            	 	    	var startHtml ="";
                            for (var i = 1; i <= startNum; i++) {
                            	startHtml +='<span class="shop_inf_lv_zuan sp"></span>';
                            }                            
                            shopList[index].startHtml =startHtml;//填充htmlstart
            	 	    }else{
            	 	      shopList[index].startHtml ="";
            	 	    }
            	 	  
            	 	})
            	 	
            	 	
            	 	
            	 	
            	 	//**********重置赋值 sss****************/
            	 	 _this.isbind = true;//是否关联 默认没有关联
            	 	 _this.shopCount = true;	 
            	 	 _this.shoplist = shopList;    
            	 }else {
            	    _this.shopCount = false;
            	 }
            	
            }else{
            	console.log("错误日志"+jsonData.errDesc +jsonData.errCode);   
            }
        })
    },
    compiled:function(){
      
    },
    ready:function(){
      
    },
    methods:{
    	directShop:function(userId){
    	 //alert(userId);
    	}
   

    }
    
});