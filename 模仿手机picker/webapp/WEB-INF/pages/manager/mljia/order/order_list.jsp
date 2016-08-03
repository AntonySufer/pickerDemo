<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<title>消费记录</title> 
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/yy_orders.css" rel="stylesheet" type="text/css" />
<style>
 .yy_hlkx_top_s1{width:121px}
 .yy_hlkx_cent_total{line-height:57px;margin-left:25px}
 .yy_hlkx_top_s2{margin-left:31px;}
 .yy_hlkx_cent_name{margin-left:23px;}
 .yy_fg{line-height:57px}
 .yy_hlkx_cent_number{line-height:59px}
</style>
</head>
<body  data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-access-token="${ accessToken }">



<div class="shopmanmain wx_guanlian" style="display: none;" id="customView">
	<ul class="wx_nocardmain">
		<li class="a1"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/nodingdan_r2_c2.png" width="141" height="228">
		<li class="a2">您还没有任何订单</li>
		<li class="a3"><a class="" ></a></li>
	</ul>
</div>


<script type="text/html" id="mjOrderLisTemp">
     {{# for(var k=0;k<d.content.length;k++) { }}
      {{# var item = d.content[k] }}
		  <div class="yy_hlkx_box" data-shop-id="{{item.shop_id}}"  data-order-id="{{item.order_id}}" data-shop-sid="{{ item.s_id}}">
            <div class="yy_hlkx_top">
                <span class="yy_hlkx_top_s1">订单已完成</span>
                <span class="yy_hlkx_top_s2">{{ item.order_time}}</span>
            </div>
            <div class="yy_hlkx_cent">
                <div class="yy_hlkx_cent_pic">
                    <img src="{{ item.img_url}}" alt="">
                    {{# if(item.order_type == 1 || item.order_type == 2 || item.order_type == 3) { }}
              			<span class="kx_icon"></span>
 			  		{{# } }}
                </div>
                <div class="yy_hlkx_cent_text">
                    <p class="yy_hlkx_cent_name hid_slh1">{{item.info}}</p>
                    <p class="yy_hlkx_cent_time"></p>
                    <span class="yy_hlkx_cent_total">总价：<font class="yy_text_red">{{ item.order_money}}</font> </span>
                    <font class="yy_fg">|</font>
                    <span class="yy_hlkx_cent_number">数量：<font class="yy_text_red">{{item.num}}</font></span>
                </div>
            </div>
           
        </div>
    {{# } }}

</script>






<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/mljia/order/order_list.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 