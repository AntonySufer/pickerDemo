<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->

<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<style>
	a{text-decoration:none}
</style>
</head>
<body data-user-id="${userId}"  data-open-id="${openId}"  data-app-id="${appId}"  data-shop-id="${shopId}" data-card-id="${cardId}" data-card-type="${cardType}" data-access-token="${ accessToken }">

<div class="shopmanmain wx_guanlian bghui" id="orderInfoView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'></div>
</div>


<script type="text/html" id="orderInfotemp">
<div class="shopmanmain wx_guanlian bghui" >

<ul class="shophyk_dat shopckdd_dat">
	<li class="a1 fl"><p><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/kaxiangtmp_r4_c2.png" width="130" height="130"></p></li>
	<li class="a2 fl">
	<p class="tatle"><span class="fl">{{ d.content.info }}</span></p>
	<p class="info">总价： <span class="txtpink">¥{{ d.content.order_pre_money }}
	     {{# if((d.content.card_type==2 || d.content.card_type==1) &&  d.content.type!=0 &&  d.content.type!=1) { }}
              (耗卡)
		{{# } }}
		{{# if(d.content.order_status==2){ }}
               {{# if((d.content.order_way==0 || d.content.order_way==-1 ) && d.content.pay_status==-1) { }}

               {{# }else{  }}
			  <!--	(定金) -->
               {{# } }}
		{{# } }}
    </span></p>
	<p class="info">数量：{{ d.content.num }}</p>

     {{# if(d.content.order_status == 1) { }}
		
 		 {{# if(d.content.staff_names){ }}
			<p class="info">服务员工：
			{{# for(var i=0;i<d.content.staff_names.length; i++){ }}
				{{# if(i<4){ }}	
				{{ d.content.staff_names[i] }}
					{{# if(!(i==(d.content.staff_names.length-1))){ }}
					;
					{{# } }}
				{{# } }}
			{{# }  }}
			{{# if(d.content.staff_names.length>3){ }}
				等 {{d.content.staff_names.length }}人
			{{# } }}
			</p>
     	 {{# }  }}
    
   {{# } }}


	</li>
</ul>



{{# if(d.content.order_way==6 && d.content.order_status ==1 ) { }}
 {{# var smsString = d.content.order_sms }}
  {{# if(smsString){ }}
<div class="infomore_xfm">消费码：<span style="color:#FE5FBC">{{smsString.substring(0,3)}}&nbsp;{{smsString.substring(3,6)}}&nbsp;{{ smsString.substring(6)}}</span>（已使用）</div>
 {{# } }}
{{# } }}


{{# if(d.content.order_status == 1) { }}



<div class="shopckdd_dat shopckdd_info">

		{{# if(d.content.card_ex_info){  }}	
	<div class="shopckdd_list01">
		<p class="tatle">剩余详情</p>
{{# if(d.content.card_name && d.content.type!=0 && d.content.type!=1){ }}
		<p >消耗卡项：{{ d.content.card_name }} </p>
{{# } }}

		<p class="tatle2">{{ (d.content.card_type!=0 && d.content.type!=0)?'剩余' :'卡内' }}项目：</p>
			{{# for(var i=0;i<d.content.card_ex_info.length;i++){ }}
				{{# var item= d.content.card_ex_info[i]; }}
				<p>
					<span class="a1">{{ item.massage_name }}</span>
           			<span class="a3">{{ -1==item.massage_left?'无限次':('X'+item.massage_left) }}</span>   
   					<span class="a3">
                     {{# if(item.massage_end_time =='永久') {  }}
                              {{  item.massage_end_time }}
                     {{# }else { }}
                              {{  item.massage_end_time + '月止' }}
                     {{# } }}
                  
                      </span>
				</p>
			{{# } }}
	</div>
		{{# } }}

		{{# if(d.content.card_type==2){ }}
            
		     <div class="shopckdd_list01  shopckdd_list01plus">
				<p class="tatle">剩余详情</p>
                {{# if(d.content.card_name && d.content.type!=0 && d.content.type!=1){ }}
				<p >消耗卡项：{{ d.content.card_name }} </p>
				{{# } }}
				<p>
					{{# if(d.content.type==1){ }}
						<span class="a1">余额</span>
						<span class="a3">¥{{ d.content.card_left_money }}
                         {{# if(d.content.card_given_money >0 ) { }}
                             (含赠¥{{ d.content.card_given_money }})
                         {{# } }}
                       </span>
						
					{{# }else{ }}
						<span class="a1">卡内金额</span>
           				<span class="a2">¥{{ d.content.card_left_money }}</span>   
					{{# } }}
   					<span class="a4">
                    {{# if(d.content.card_end_time == '永久' ){  }}
                                                                                       永久
                    {{# }else { }}
                           {{ d.content.card_end_time +'月止'   }}
                    {{# } }}
                   </span>
				     

				</p>
				{{# if(d.content.type==0){ }}
				<p>
					<span class="a1">赠送金额</span>
           			<span class="a2">¥{{ d.content.card_given_money }}
                   </span>   
   					<span class="a4">
                     {{# if(d.content.card_end_time == '永久') { }}
                                                                          永久
					 {{# }else { }}
                       {{ d.content.card_end_time +'月止' }}
                     {{# } }}
                   </span>
				</p>
				{{# } }}

			</div>
		{{# }  }}
			{{# if(d.content.card_preferent_list){ }}
     <div class="shopckdd_list02">
		<p class="tatle2">{{ (d.content.card_type!=0 && d.content.type!=0)?'剩余赠送' :'赠送' }}项目：</p>
	           {{# for(var i=0;i<d.content.card_preferent_list.length;i++){ }}
			<p><span class="a1">{{ d.content.card_preferent_list[i].massage_name }}</span> 
              <span class="a3">
                {{# if( d.content.card_preferent_list[i].massage_left == -1 ) { }} 
                                                             无限次
                {{#  } else { }}
                     X{{ d.content.card_preferent_list[i].massage_left }}
				{{# } }}
             
            </span>
            <span class="a3">
               {{# if(d.content.card_preferent_list[i].massage_end_time =='永久') {  }}
                             {{   d.content.card_preferent_list[i].massage_end_time  }}
                     {{# }else { }}
                              {{  d.content.card_preferent_list[i].massage_end_time + '月止' }}
                     {{# } }}
             
          </span> </p>
               {{# } }}
	</div>
			{{# } }}

       
	
</div>
{{# } }}




<!-- ******* -->

	<div class="shopckdd_dat shopckdd_shopinfo poi1">
		<p class="shop_infotatle">商家信息</p>
		<ul class="shopckdd_infotab01">
			<li class="fl" id="shopHomeInfo">
				<p class="td1"><span class="tatle">{{d.shopInfoData.shop_name}}</span></p>
				<p class="td1 td1b">
					<span class="pic">
						{{# for(var i=0;i<d.shopInfoData.shop_stars;i++){ }}
							<img src="{{ d.webRoot}}/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
						{{# } }}
					</span>
				</p>
			</li>
			<li class="fr"><a href="tel:{{ d.shopInfoData.shop_tel }}" style="display:inline-block;height:50px"><img src="{{ d.webRoot}}/resources/images/meirong/shop/cibangphone_r2_c2.gif" width="41" height="51"></a></li>
		</ul>
		
		<div class="shopckdd_infotab02">
			<div class="td2">
				<span class="a1"><img src="{{ d.webRoot}}/resources/images/meirong/shop/dbponit_r3_c2.gif" width="29" height="41"></span>
				<div class="a2 poi1">{{d.shopInfoData.shop_addr}}</div>
				<!-- <span class="poi2 txtview_km">{{ (parseFloat(d.shopInfoData.distance/1000)).toFixed(2) }}km</span> -->
			</div>
		</div>
	</div>

<!-- ******* -->



<div class="shopckdd_dat shopckdd_datmun">
    <p class="tatle">订单信息</p>
    {{# if( d.content.order_status == 2 || d.content.order_status == 4 || d.content.order_status == 0 ||  d.content.order_status == 3 ) { }}
	<p>订单编号：{{d.content.order_no }}</p>
	<p>生成时间：{{d.content.order_time }}</p>
    {{# }else {  }}
	<p>订单编号：{{d.content.order_no }}</p>
	<p>消费时间：{{d.content.order_time }}</p>
     {{# } }}
</div>

</div>

</div>
 
</script>

<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/mljia/order/order_info.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 