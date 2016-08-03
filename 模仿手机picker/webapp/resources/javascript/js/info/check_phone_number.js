
/**
 * Created by Administrator on 2016/7/21.
 */

/*Vue.filter('my-max-length', {
    read: function(val) {
        console.log(val)
        return  val.substring(0,6)

    },
    // view -> model
    // 在写回数据之前格式化值
    write: function(val, oldVal) {
        console.log("oldval:",oldVal);
        return !isNaN(val) ? val.substring(0,7): " "
    }



})*/


var vm =new Vue({
    el:"#check_phone_number",
    data:{
        phoneNumber:"",         //手机号
        allowFetchCode:true, //防止重复多次获取验证码
        shouldSubmit:false,//是否可以提交标志
        codeText:"获取验证码",
        submit_success:false,//手机号提交成功标志
        //submitSuccessClass:{"btn_yz_pnone_tj":false,"btn_yz_pnone_tj_g":true},
        interval: null, // 计时器句柄
        verifyPhone:false,//正则验证手机号
        correctTimeClass:{"btn_get_yzm":false,"btn_get_yzm_h":true},//时间样式
        verifyCode:""    ,//验证码
        regexpVerfiyCode:"" ,// 正则验证 验证码
        endTimes:3, //提交成功之後倒計時
        endTimesInterval:null


    },
    methods:{
        submit:function(){
            if (this.shouldSubmit== true){
                var _this =this;
                var mpGlobal = store.get("mpGlobal");
                var openId = mpGlobal.openId;
                var accessToken = mpGlobal.accessToken;


                $.fetchAjaxData({
                    url:request.user.submitPhoneNumber+openId+ "/verif",
                    data:{token:accessToken || 1 ,phone_no:_this.phoneNumber,code:this.verifyCode}
                },function(data){
                    if(data.returnCode=="success"){
                        _this.submit_success=true;
                        _this.tick();
                    }

                })
            }

        },
        checkRepeatPhoneNumber:function(){


        },
        getCheckCode:function(){
            if(this.allowFetchCode==true && this.verifyPhone==true){
                var _this =this;
                var mpGlobal = store.get("mpGlobal");
                var openId = mpGlobal.openId;
                var accessToken = mpGlobal.accessToken;
                $.fetchAjaxData({
                    url:request.user.getverifyCode+openId+"/verif/code",
                    data:{phone_no:_this.phoneNumber,token:accessToken || 1}
                },function(data){
                    if(data.returnCode=="success"){
                        _this.correctTimeClass={"btn_get_yzm":false,"btn_get_yzm_h":true};
                        _this.allowFetchCode=false;
                        _this.codeText=120;
                    }

                })
            }



        },
        tick:function () {
            var  _this = this
            if(this.submit_success==false){
                this.interval = setInterval(function () {
                    if (_this.codeText > 0) {
                        _this.codeText--
                    } else {
                        _this.stop()
                    }
                }, 1000)

            }else {
                this.endTimesInterval = setInterval(function(){
                    if(_this.endTimes>0){
                        _this.endTimes--;
                    }else{
                        _this.stop()
                    }
                },1000)
            }



        },
        stop:function () {

            if(this.submit_success==false){
                clearInterval(this.interval)
                this.allowFetchCode=true;
                this.codeText="重新获取";
                this.correctTimeClass={"btn_get_yzm":true,"btn_get_yzm_h":false};

            }else {
                clearInterval(this.endTimesInterval);
                var url ="";
                if (this.urlFrom=="shopList"){
                    url="shop-self_ref_shop_lis"

                }else if(this.urlFrom=="orderList"){
                    url ="order-order_list"

                }else if(this.urlFrom=="cardList"){
                    url ="card-self_card_list"

                }
                if (url){
                    location.href = GLOBAL.contextPath+url;
                }else{
                    var mpGlobal =store.get("mpGlobal");
                    var openId = mpGlobal.openId;
                    var accessToken = mpGlobal.accessToken;
                    location.href = GLOBAL.contextPath+"info-self_consume_snapshoot?openid="+openId+"&token="+accessToken+"&menu=mine";
                }
            }

        }
    },

    computed:{
        /*  计算 是否可以提交 */
        submitSuccessClass:function(){
            if(this.verifyPhone==true && this.regexpVerfiyCode==true){
                this.shouldSubmit=true;
                return {"btn_yz_pnone_tj":true,"btn_yz_pnone_tj_g":false}

            }else{
                this.shouldSubmit=false;
                return {"btn_yz_pnone_tj":false,"btn_yz_pnone_tj_g":true}
            }
        },
        /* 計算 來源 屬性 */
        urlFrom:function(){
            return globalUtil.getUrlParam("from") || "self_snapshoot";
        }


    },

    watch: {
        allowFetchCode:function(newVal, oldVal) {
            if ( newVal==false && oldVal==true  ) {
                this.tick()
            }

        },
        phoneNumber:function(newVal){
            var telReg =new RegExp(/^1[3-9]\d{9}$/)
            if(newVal) {
                console.log(telReg.test(newVal))
                this.verifyPhone = telReg.test(newVal);
                if (this.verifyPhone == true) {
                    this.correctTimeClass={"btn_get_yzm":true,"btn_get_yzm_h":false};



                } else {
                    this.verifyPhone = false;
                    this.correctTimeClass={"btn_get_yzm":false,"btn_get_yzm_h":true};
                }
            }

        },
        verifyCode:function(newVal){
            var regEx = new RegExp(/^\d{6}$/);
            this.regexpVerfiyCode= regEx.test(newVal);

        }

    },
    ready:function(){
        document.title="验证手机";
    }


});

