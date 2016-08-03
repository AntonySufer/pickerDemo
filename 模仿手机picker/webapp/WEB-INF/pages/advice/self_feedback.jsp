
<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../layout_main/header.jsp"/>
<!-- 外部CSS资源文件引入 -->

<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/160725_yj_fk.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/javascript/library/picker/base.css" rel="stylesheet" type="text/css" />

<style>
    .xx{display: inline-block;margin-top: 28px;font-size: 24px;color:red}
    .fix_cursor_pos{
        padding: 44px 0px;
        display:inline-block;
        line-height:25px;
    }

</style>
</head>
<body >


<div class="shopmanmain wx_guanlian bghui lh40" id="feedbackApp" style="margin-top: 60px;">
    <!-- 输入意见 S -->
    <div class="write_yj_box">
        <textarea name="" id="" class="write_yj_box_text" maxlength="200" placeholder="请输入您的反馈意见（300字以内）"   v-model="comment_input"  ></textarea>

        <p class="write_yj_box_num" ><span>{{ count }}</span>/{{ comment_max_length }}</p>
    </div>
    <!-- 输入意见 E -->
    <!--手机号码 S-->
    <div class="phone_number_box">
        <div class="phone_number_event">
            <span class="phone_number_s1">手机号码</span>
            <input type="tel" placeholder="选填" class="phone_number_inp fix_cursor_pos" maxlength="11" v-model="phone_number"  onkeyup="this.value=this.value.replace(/\D/g,'')" /><span class="xx" @click="clearPhone" v-if="!verifyPhone">X</span>
        </div>
    </div>
    <!--手机号码 E-->
    <!--意见反馈 S-->
    <div class="phone_number_box" id="page-picker">
        <div class="phone_number_event">
            <span class="phone_number_s1">反 馈 给</span>
            <input type="text"  v-model="selectedShop"  class="phone_number_inp" id="picker" readonly @click="chooseWaiter"  />
            <span class="vip_myself_s3"></span>
        </div>
    </div>
    
      <a  v-bind:class="{ 'btn_tj_red_g': notbuttonsub, 'btn_tj_red': allowtbuttonsub}" href="javascript:;"   @click ="submitBut">提交</a>
    <!--意见反馈 E-->

</div>






<!-- 外部js资源文件引入 -->


<script src="<%=request.getContextPath()%>/resources/javascript/library/timePlugIn/zepto.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/library/picker/picker.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/js/advice/self_feedback.js"></script>

<jsp:include  page="../layout_main/footer.jsp" />

