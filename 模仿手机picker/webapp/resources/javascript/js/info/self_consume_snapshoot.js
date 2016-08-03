/**
 * Created by Administrator on 2016/7/21.
 */


$(function(){
    new Vue({
        el: '#consume_app',
        data: {
            head_img_url: '',
            vip_user_name:"",
            relation_status:true


        },
        init:function(){
            console.log("init function");
        },



        created: function () {
            console.log("created function");
            // `this` 指向 vm 实例

        },
        beforeCompile:function(){
            var _this=this;
            //设置全局变量
            var mpGlobal={
                openId:globalUtil.getUrlParam("openid"),
                accessToken:globalUtil.getUrlParam("token")
            };

            store.remove("mpGlobal");
            store.set("mpGlobal",mpGlobal);


        },


        compiled:function (){
            var _this =this;
            var mpGlobal = store.get("mpGlobal");
            var openId = mpGlobal.openId;
            var accessToken = mpGlobal.accessToken;

            globalUtil.getUserInfo({
                openId:openId,
                accessToken:accessToken
            },function(jsonData){
                if(jsonData){
                    _this.relation_status = jsonData.strongCorrelation;
                    _this.vip_user_name=jsonData.wechatAlias;
                    _this.head_img_url = jsonData.wechatUserImg;


                    //add mpGlobal appId;
                    var mpGlobal = store.get("mpGlobal");
                        if(mpGlobal.appId){
                            store.remove(mpGlobal.appId);
                            mpGlobal.appId=jsonData.appId;
                            store.set("mpGlobal",mpGlobal)
                        }else{
                            mpGlobal.appId=jsonData.appId;
                            store.set("mpGlobal",mpGlobal)

                        }
                }
            })

        },
        methods:{
            orderListUrl:function(){
                if(this.relation_status==false){
                    window.location.href =GLOBAL.contextPath+ "/shop-self_no_ref_shop"+"?from=orderList"
                }else if(this.relation_status==true){
                    window.location.href =GLOBAL.contextPath+ "order-order_list"
                }

            },
            myShopsUrl:function(){
                if (this.$data.relation_status==false){
                    window.location.href =GLOBAL.contextPath+ "/shop-self_no_ref_shop"+"?from=shopList"
                }else if (this.$data.relation_status==true){
                    window.location.href =GLOBAL.contextPath+ "/shop-self_ref_shop_lis"
                }

            },
            myCardUrl:function(){
                if(this.relation_status==false){
                    window.location.href =GLOBAL.contextPath+ "/shop-self_no_ref_shop"+"?from=cardList"

                }else if(this.relation_status==true){
                    window.location.href =GLOBAL.contextPath+ "card-self_card_list"
                }
            },
            adviceUrl:function(){
                window.location.href =GLOBAL.contextPath+ "/advice-self_feedback"
            }
        },


        ready:function(){
            console.log("ready function");
            document.title="我的消费";





        }

    })

});
