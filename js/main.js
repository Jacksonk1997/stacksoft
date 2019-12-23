$(window).on('load', function(){
	Main.init();
	Main.setParallaxHeight(); 
	$('#loader').fadeOut();
});
$(window).on('resize', function(){
	Main.setParallaxHeight();
	Main.setElementsHeight();
});
var Main = (function($){
	return {
		//inits
		init: function(){
			Main.events();
			Main.setElementsHeight();
			Main.setParallaxHeight();
			Main.countdownInit();
		},
		//events
		events: function(){
			$(document).on('click','#submit_form_btn',function(){
				var v			= true,
				firstName 	= $("#form_first_name").val()
				lastName 	= $("#form_last_name").val()
				email 		= $("#form_valid_email").val()
				message 	= $("#form_message").val();
				if(firstName == ''){
					v = false;
					$("#form_first_name").attr('style','border:1px solid #FF0000');
				}
				if(lastName == ''){
					v = false;
					$("#form_last_name").attr('style','border:1px solid #FF0000');
				}
				if(Main.isEmail(email) === false){
					v = false;
					$("#form_valid_email").attr('style','border:1px solid #FF0000');
				}
				if(message == ''){
					v = false;
					$("#form_message").attr('style','border:1px solid #FF0000');
				}

				if(v){
					Main.sendEmail(firstName, lastName, email, message);
				}
			});
		},
		//functions
		setParallaxHeight: function(){
			var height = $(window).height();
			$('#christmas_scene .layer-photo').css('height', height);
		},
		sendEmail:function(firstName, lastName, email, message){
			$.ajax({
				url: 'sendmail.php',
				type: 'post',
				data: { "firstName": firstName, "lastName": lastName, "email": email, "message":message },
				success: function(response){
					$(".mail-container").addClass('hidden');
					$("#form_success_msg").parent().removeClass('hidden');
					$("#form_success_msg").html(response);
				},
				error: function( jqXhr, textStatus, errorThrown ){
					console.log( errorThrown );
				}
			});
		},
		isEmail: function(email) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		},
		setElementsHeight: function(){
			var height = $(window).height();

			if( height <= 400){
				var width = $(window).height() / 2;
			}else if( height <= 500 ){
				var width = $(window).height() / 3.5;
			}else if( height <= 700 ){
				var width = $(window).height() / 3;
			}else if( height <= 800 )
			var width = $(window).height() / 2.8;
			else{
				var width = $(window).height() / 2.5;
			}
			$('#christmas_tree').css({ 'width' : width,
				'margin-left' : -(width/2)
			});
			$('#mail_pole').css('margin-left', -(width/1.2));
			$('#mail_pole img').css('width', width/3);
		},
		countdownInit: function(){
			$('#countdown_container').countdown('2019/12/25', function(event) {
				$(this).html(event.strftime('<div class="col-md-3 col-xs-3 countdown-globe">%D<div class="col-md-12 padding-none">天</div></div>\
					<div class="col-md-3 col-xs-3 countdown-globe">%H<div class="col-md-12 padding-none">时</div></div>\
					<div class="col-md-3 col-xs-3 countdown-globe">%M<div class="col-md-12 padding-none">分</div></div>\
					<div class="col-md-3 col-xs-3 countdown-globe">%S<div class="col-md-12 padding-none">秒</div></div>'));
			});
		}
	}
})($);
