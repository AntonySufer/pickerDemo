
/**
 * Created by Administrator on 2016/7/22.
 */
/*此页面包括 未关联店铺 和关联了 但是店铺为空 两种情况*/

new Vue({
    el:"#noBindShop",
    data:{
        isBind: false, /*默认没有关联*/
        from :"shopList",//传参类型 ，公共
        fromHtml :"您当前还未关联店铺",
        title:"我的店铺"
    },
     
    beforeCompile : function(){
       //获取url传参，shopList店铺  orderList订单 cardList 卡
    	this.from =globalUtil.getUrlParam('from');
        if (!this.from) {
        	this.from ="shopList";
        }
        
        if(this.from =="shopList"){
        	this.fromHtml ="您当前还未关联店铺";
        	this.title ="我的店铺";
        }else if(this.from =="orderList"){
            this.fromHtml ="您当前还未关联任何店铺无法查看消费记录";
            this.title ="消费记录";
        }else if(this.from =="cardList"){
           this.fromHtml ="您当前还未关联，无法查看消费卡信息";
           this.title ="我的消费卡";
        }
    	
    },
     ready:function(){
        document.title=this.title;
    },

    methods : {
         commitShop :function(){
         	//跳转到绑定
              window.location.href =GLOBAL.contextPath+ "info-check_phone_number"+"?from="+ this.from;   
         }
        
    }
    
});

