/**
 * Created by Administrator on 2016/7/25.
 */

new Vue({
	
    el:"#feedbackApp",
    data:{
        picked_shop:"",
        phone_number:"",//电话号码
        comment_input:"",//意见内容
        comment_max_length:300,
        disable:false,
        selectedShop:"美丽加服务号",//建议对象
        targetType : 1, //提交类型 0 店铺  1服务号
        shopNo :"",//店铺号  提交类型为1 的时候必传
        shop_data :"",//提交数据集
        verifyPhone:true,//验证手机
        notbuttonsub :true,//button样式
        allowtbuttonsub :false,//可以提交样式
        selectId :""  //提交对象id


    },
   //在编译前
    beforeCompile:function(){
       
      //获取手机
       this.getUserTel();
       //服务列表
      this.getShoplist();
      
    },

    //在编译结束和 $el 第一次插入文档之后调用，如在第一次 attached 钩子之后调用。注意必须是由 Vue 插入（如 vm.$appendTo() 等方法或指令更新）才触发 ready 钩子。
    ready : function(){
    	
        
    },

    //时间和方法
    methods : {
        	//**************************绑定事件*******************************/
        	//提交
         submitBut : function(){
              var _this =this;
              if (_this.allowtbuttonsub==true && _this.notbuttonsub ==false ) {
                     if (!_this.comment_input) {
                             layer.msg('请输入反馈意见!', {icon: 2});    
                             return;
                        }
                     if (this.verifyPhone==false) {
                     	layer.msg('请输入正确的手机号码格式!', {icon: 2});    
                             return;
                     }
                     var proList = _this.shop_data ||"";  
                     if (proList.length>0 && proList !="" ) {
                        for(var j = 0 ;j< proList.length;j++){
                        	    if (_this.selectedShop =="美丽加服务号") {
                        	    	 _this.shopNo = "";
                                    _this.targetType = 1;
                                    break;
                        	    }
                        	
                                if(proList[j].shopName == _this.selectedShop ){
                                    _this.shopNo =  proList[j].shopNo;
                                    _this.targetType = 0;
                                    break;
                                }
                                
                        }
                     }else{
                     	
                          layer.msg('请选择反馈对象!', {icon: 2});  
                     }
                     
                     if (_this.comment_input && proList.length>0 && proList !="") {
                            _this.allowbuttonsub = true;
                            _this.commitRequse();
                     }
              }
              
              
         		
            },
         
            //清空
          clearPhone: function(){
               this.phone_number="";
            },
         //**************************绑定事件end*******************************/
            
            
         //*************************  获取数据start****************************/
            
         //获取用户手机号码 
         getUserTel: function(){
         	 /* 获取用户手机号码*/
            var _this =this;
            var accessToken = store.get('mpGlobal').accessToken || GLOBAL.accessToken;
            var openId = store.get('mpGlobal').openId || GLOBAL.openId;

            globalUtil.getUserInfo({
                openId:openId,
                accessToken:accessToken
            },function(jsonData){
                if(jsonData){
                _this.phone_number = jsonData.relationPhoneNo; 
                }
            })
         },
         //获取服务列表  
         getShoplist : function(){
         	    var _this =this;//注意指向当前el对象
                var accessToken = store.get('mpGlobal').accessToken || GLOBAL.accessToken;
                var openId = store.get('mpGlobal').openId || GLOBAL.openId;
                if (!accessToken) {
                       console.log('没有获取到accessToken!', {icon: 2});   
                }
               //获取
                   $.fetchAjaxData({url:request.shop.fetchUserBindshopLis+"/"+openId+"/shops",data:{
                        token:accessToken,
                        offset:1,
                        limit:50
                    }},function(jsonData){
                     if (jsonData.returnCode == "success") {
                     	 var shopList =jsonData.shops;
                        if (shopList != null && shopList.length > 0) {
                            for (var i = 0; i < shopList.length; i++) {
                                 shopList[i].targetType ="0";
                            }     
                        }
                          _this.shop_data = shopList;//存储数据集
                          _this.chooseWaiter();
                        /*  _this.selectedShop = shopList[0].shopName;
                          _this.targetType = shopList[0].targetType;
                          _this.shopNo = shopList[0].shopNo;*/
                        
                     }else{
                        console.log("错误信息："+jsonData.errDesc+jsonData.errCode);
                     }
                      
                })
         },
            
          //弹出列表插件
         chooseWaiter:function(){
         	var _this =this;
           //重新请求数据列表
          //  _this.getShoplist();
            //选择插件
         	var proList =  _this.shop_data;
         	
            var fnameList=["美丽加服务号"];
            //获取建议list
            if (proList !="" && proList.length>0) {
            	proList.forEach(function(item, index){
            		fnameList.push(item.shopName);
            	});
             
           
            }
            
            //防止冲突，用$$代替zepto
            $$("#picker").picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                  <div id="confirmBtn" style="text-align:center;top:280px;"><button class="button button-link  close-picker">\
                                                确定\
                  </button></div><h1 class="title">请选择您要反馈的对象</h1>\
                  </header>',
                cols: [
                    {
                        textAlign: 'center',
                        values: fnameList,
                        cssClass: 'picker-items-col-normal'
                    }
                ],
                onChange :function(p, values, displayValues){
                    _this.selectedShop =values;
                    //根据员工姓名 获取员工ID
                    // var staffID = getstaffIDfun(values);
                   /* var staffId;
                    if(proList){
                        for(var j = 0 ;j< proList.length;j++){
                            jQuery.each(proList[j],function(attr,val){
                                if(proList[j].staff_name == values ){
                                    staffId=  proList[j].staff_id;
                                }
                            });
                        }
                    }*/
                }

            }); 
            
          },
          //提交意见
         //*************************  获取数据start****************************/
           /***
            *  * @param openId
             * @param appId
             * @param content 反馈内容
             * @param targetType 反馈对象类型Shop(0,"店铺"), MP(1,"服务号");
             * @param phoneNo 
             * @param shopNo 店铺编号
            */
         commitRequse : function(){
         	 var _this =this;
             var openId = store.get('mpGlobal').openId || GLOBAL.openId; 
             var accessToken = store.get('mpGlobal').accessToken || GLOBAL.accessToken;
             var appId = store.get('mpGlobal').appId || GLOBAL.appId;
             var param ={
                "appId":appId,
                "openId":openId,
                "targetType":_this.targetType,
                "content" :_this.comment_input,
                "phone_no" :_this.phone_number,
                "shop_no":_this.shopNo
            }
         	 $.fetchAjaxData({type:"post",url:request.user.feedBackAdvice+openId+"/feedback",data:param},function(jsonData){
                  if (jsonData.returnCode =="success") {
                     	layer.msg('已提交,谢谢建议', {icon: 1});  
                  	   window.location.href =GLOBAL.contextPath+ "info-self_consume_snapshoot"+"?openid="+openId+"&menu=mine&token="+accessToken;
                  	    
                  	   }else{
                  	console.log("错误信息："+jsonData.errDesc+jsonData.errCode);
                  }
             })
         	
         	
         	
         }
        
        	
    },
    
    computed :{
    	//输入
        'count' : function() {
            return this.comment_input.length
        }
     
    },
    //数据变化监控
    watch: {
      "comment_input" : function (newVal, oldVal) {
      	
            if ( newVal && newVal.length >= this.comment_max_length) {
                this.comment_input = newVal.slice(0, this.comment_max_length);
                this.disable=true;
            }
          
           if (this.comment_input && this.verifyPhone ) {
                    this.allowtbuttonsub = true;
                    this.notbuttonsub = false;
             }else{
                    this.allowtbuttonsub = false;
                    this.notbuttonsub = true;
             }
       

       },
      "phone_number" : function(newVal,oldVal){
      	   	 var telReg =new RegExp(/^1[3-9]\d{9}$/)
                if(newVal){
                    console.log( telReg.test(newVal))
                    this.verifyPhone=telReg.test(newVal);
    
                }else{
                    this.verifyPhone=true;//现实X
                }
                
             if (this.comment_input && this.verifyPhone ) {
                    this.allowtbuttonsub = true;
                    this.notbuttonsub = false;
             }else{
                    this.allowtbuttonsub = false;
                    this.notbuttonsub = true;
             }
        }
      
    }


});



