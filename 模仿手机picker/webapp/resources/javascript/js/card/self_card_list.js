/**
 * Created by Administrator on 2016/7/27.
 */
new Vue({
    el:"#cardList",
    data:{
        card_list:[],
        flagShow:false,
        accessToken:"",
        openId :""

    },
    beforeCompile:function(){
       this.accessToken = store.get('mpGlobal').accessToken || GLOBAL.accessToken;
       this.openId = store.get('mpGlobal').openId || GLOBAL.openId;
       if (!this.accessToken) {
       	  console.log("错误日志：没有获取到accesstoken");
       }if (!this.openId) {
       	  console.log("错误日志：没有获取到openid");
       }
       
       this.getCardList();//获取数据
    },
    compiled:function (){

    },
    filter:{
       effectiveFilter:function(value){
          if(value=="-1"){
              return '永久';
          }
       }
    },
    //方法
    methods :{
    	 //获取消费卡数据
         getCardList : function(accessToken){
         	var _this = this;
            $.fetchAjaxData({
            url:request.user.fetchCardList+_this.openId + "/cards",
            data:{token:_this.accessToken,offset:0,limit:100}
            },function(jsonData){
            	 if (jsonData.returnCode =="success") {
            	   var resultList = jsonData.cards;
            	   resultList[2]=
                   {
                    "appid": "wx9f284019acd75b4a",
                    "cardMoney": 11, // 开卡金额
                    "cardName": "111", // 卡名称
                    "cardOpenTime": 13600000, //开卡时间
                    "effectiveTime": -1,
                    "cardSeq": 1, // 卡ID
                    "cardShopId": 1, //
                    "cardShopNo": "1", // 开卡店铺编号
                    "cardType": 1, //开类别： 卡类型  0:次卡  1:储蓄卡
                    "customSeq": 1, // 顾客ID
                    "customShopId": 1, 
                    "customShopNo": "1", // 顾客所在店铺
                    "freeItemName": 20, // 赠送项目
                    "openId": "ox1dUs33LfD9kwxjcCUBOoIz4Krs",
                    "remainderMoney": 2000, // 剩余金额
                    "userId": 1// 美丽加注册用户ID
                }
             ;

            	    if (resultList !="" && resultList.length>0) {
            	      	 _this.flagShow = true;
            	      	 _this.card_list = resultList;
            	      }else{
            	      	//不存在店铺
            	      	 _this.flagShow = false;
            	      }
            	      
            	 }else{	 
            	   console.log("错误信息："+jsonData.errDesc+jsonData.errCode);
            	 }
            });
       }
    }
});