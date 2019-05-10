<template>
<div class="suspension">
	<div class="suspension-box">
		<a  class="a a-service " target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=28449484&site=qq&menu=yes"><i class="i"></i></a>
		<a href="javascript:;" class="a a-service-phone "><i class="i"></i></a>
		<a href="javascript:;" class="a a-qrcode"><i class="i"></i></a>
		<a href="javascript:;" class="a a-cart" @click="goCart"><i class="i"></i></a>
		<a  class="a a-top" href="javascript:;" ><i class="i"></i></a>
		<div class="d d-service">
			<i class="arrow"></i>
			<div class="inner-box">
				<div class="d-service-item clearfix">
					<a href="#" class="clearfix"><span class="circle"><i class="i-qq"></i></span><h3>咨询在线客服</h3></a>
				</div>
			</div>
		</div>
		<div class="d d-service-phone">
			<i class="arrow"></i>
			<div class="inner-box">
				<div class="d-service-item clearfix">
					<span class="circle"><i class="i-tel"></i></span>
					<div class="text">
						<p>服务热线</p>
						<p class="red number">4001-123-456</p>
					</div>
				</div>
				<div class="d-service-intro clearfix">
					<p><i></i>功能和特性</p>
					<p><i></i>价格和优惠</p>
					<p><i></i>获取内部资料</p>
				</div>
			</div>
		</div>
		<div class="d d-qrcode">
			<i class="arrow"></i>
			<div class="inner-box">
				<div class="qrcode-img"><img src="./imgs/side_ewm.jpg" alt=""></div>
				<p>微信服务号</p>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
    name:'suspension',
    data(){
        return{}
	},
	mounted()
	{
		$(document).ready(function(){
	console.log(111)
	$(document).on("mouseenter", ".suspension .a", function(){
		var _this = $(this);
		var s = $(".suspension");
		var isService = _this.hasClass("a-service");
		var isServicePhone = _this.hasClass("a-service-phone");
		var isQrcode = _this.hasClass("a-qrcode");
		if(isService){ s.find(".d-service").show().siblings(".d").hide();}
		if(isServicePhone){ s.find(".d-service-phone").show().siblings(".d").hide();}
		if(isQrcode){ s.find(".d-qrcode").show().siblings(".d").hide();}
	});
	$(document).on("mouseleave", ".suspension, .suspension .a-top", function(){
		$(".suspension").find(".d").hide();
	});
	$(document).on("mouseenter", ".suspension .a-top", function(){
		$(".suspension").find(".d").hide(); 
	});
	$(document).on("click", ".suspension .a-top", function(){
		$("html,body").animate({scrollTop: 0});
	});
	$(window).scroll(function(){
		var st = $(document).scrollTop();
		var $top = $(".suspension .a-top");
		if(st > 400){
			$top.css({display: 'block'});
		}else{
			if ($top.is(":visible")) {
				$top.hide();
			}
		}
	});
	
});	
	},
	methods:{
		goCart()
		{
			if(this.$store.state.userMsg.user)
			{
				if(!this.$store.state.userMsg.root)
				{
					this.$router.push('/personal/cart')
				}
			}else{
				this.$router.push('/account')
			}

		}
	}
}
</script>
<style lang="scss" scoped>
html, body, h1, h2, h3, h4, h5, h6, div, dl, dt, dd, ul, ol, li, p, blockquote, pre, hr, figure, table, caption, th, td, form, fieldset, legend, input, button, textarea, menu{
    margin:0;
    padding:0;
}
body, button, input, keygen, legend, select, textarea{
    font-family:"Microsoft Yahei","HanHei SC",PingHei,"PingFang SC","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
    font-weight:400;
    color:#333;
    outline:0;
    speak:none;
    -webkit-font-feature-settings:normal;
    -moz-font-feature-settings:normal;
    font-feature-settings:normal;
    font-variant:normal;
    text-transform:none;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
}
h1, h2, h3, h4, h5, h6{font-weight:400;}
li{list-style:none;}
html, body, fieldset, img, iframe, abbr{border:0;}
img{vertical-align:top;}
a, button{cursor:pointer;}
a{color:#333;outline:none;text-decoration:none;}
a:focus{ color:#333;
     outline:none; 
     -moz-outline:none;
}  


/*common*/
body{background:#F4F5F9;}
a:hover{color:#fc8080;text-decoration:none;}
a:-webkit-any-link{text-decoration:none;}
.container{width:1200px;margin:0 auto;padding:0;}
.container:after{content:"";display:block;clear:both;}
.clearfix:after{content:"";display:block;clear:both;}
.fl{float:left;}
.fr{float:right;}
.tl{text-align:left;}
.tr{text-align:right;}
.tc{text-align:center;}
.color-white{color:white!important;}
.red{color:#fc8080!important;}
.fz12{font-size:12px;}
.fz14{font-size:14px;}
.wfs{width:100%;position:relative;}
.p_r{position:relative;}


/*悬浮链接*/
.suspension{position:fixed;z-index:55;right:0;bottom:85px;width:70px;height:240px;}
.suspension-box{position:relative;float:right;}
.suspension .a{display:block;width:44px;height:44px;background-color:#353535;margin-bottom:4px;cursor:pointer;outline:none;}
.suspension .a.active,
.suspension .a:hover{background:#F05352;}
.suspension .a .i{float:left;width:44px;height:44px;background-image:url(./imgs/side_icon.png);background-repeat:no-repeat;}
/* .suspension .a-service .i{background-position:0 0;} */
.suspension .a-service .i{width:20px;height:20px;margin-top:12px;margin-left:12px;background-image:url(./imgs/suspension-bg.png);background-repeat:no-repeat;background-position:0 0;}
.suspension .a-service-phone .i{width:20px;height:20px;margin-top:12px;margin-left:12px;background-image:url(./imgs/suspension-bg.png);background-repeat:no-repeat;background-position:-27px 0;}
.suspension .a-qrcode .i{background-position:-44px 0;}
.suspension .a-cart .i{background-position:-88px 0;}
.suspension .a-top .i{background-position:-132px 0;}
.suspension .a-top{background:#D2D3D6;display:none;}
.suspension .a-top:hover{background:#c0c1c3;}
.suspension .d{display:none;width:223px;background:#fff;position:absolute;right:67px;min-height:90px;border:1px solid #E0E1E5;border-radius:3px;box-shadow:0px 2px 5px 0px rgba(161, 163, 175, 0.11);}
.suspension .d .arrow{position:absolute;width:8px;height:12px;background:url(./imgs/side_bg_arrow.png) no-repeat;right:-8px;top:31px;}
.suspension .d-service{top:0;}
.suspension .d-service-phone{top:34px;}
.suspension .d-qrcode{top:78px;}
.suspension .d .inner-box{padding:8px 22px 12px;}
.suspension .d-service-item{border-bottom:1px solid #eee;padding:14px 0;}
.suspension .d-service .d-service-item{border-bottom:none;}
.suspension .d-service-item .circle{width:44px;height:44px;border-radius:50%;overflow:hidden;background:#F1F1F3;display:block;float:left;}
.suspension .d-service-item .i-qq{width:44px;height:44px;background:url(./imgs/side_con_icon03.png) no-repeat center 15px;display:block;transition:all .2s;border-radius:50%;overflow:hidden;}
.suspension .d-service-item:hover .i-qq{background-position:center 3px;}
.suspension .d-service-item .i-tel{width:44px;height:44px;background:url(./imgs/side_con_icon02.png) no-repeat center center;display:block;}
.suspension .d-service-item h3{float:left;width:112px;line-height:44px;font-size:15px;margin-left:12px;}
.suspension .d-service-item .text{float:left;width:112px;line-height:22px;font-size:15px;margin-left:12px;}
.suspension .d-service-item .text .number{font-family:Arial,"Microsoft Yahei","HanHei SC",PingHei,"PingFang SC","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;}
.suspension .d-service-intro{padding-top:10px;}
.suspension .d-service-intro p{float:left;line-height:27px;font-size:12px;width:50%;white-space:nowrap;color:#888;}
.suspension .d-service-intro i{height:27px;width:14px;margin-right:5px;vertical-align:top;display:inline-block;}
.suspension .d-qrcode{text-align:center;}
.suspension .d-qrcode .inner-box{padding:20px 0;}
.suspension .d-qrcode p{font-size:16px;color:#93959c;}
</style>


