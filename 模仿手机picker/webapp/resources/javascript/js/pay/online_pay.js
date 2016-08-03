/**
 * Created by Administrator on 2016/7/29.
 */

new Vue({
    el:"#onlinePayApp",
    data:{
        shop_img_url:"",
        default_shop_img:GLOBAL.contextPath+"resources/images/meirong/shop/wx_payment/payment_user_pic_mr.png"
    },
    computed:{

        whichBrowser:function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return "weixin";
            }else if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return "browser"
            }else {
                return "zhifubao"
            }
        }


    },
    metheds:{



    },
    beforeCompile:function(){
        alert(window.navigator.userAgent.toLowerCase());

    },
    ready:function(){
        document.title="我的消费";
    }



});
