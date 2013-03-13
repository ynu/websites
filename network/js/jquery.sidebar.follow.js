// JavaScript Document
//origin:css-tricks.com/scrollfollow-sidebar/
$(function() {
	var offset = $("#sidebar-follow").offset();
	var topPadding = 26;
	$(window).scroll(function() {
		if ($(window).scrollTop() > offset.top) {
			$("#sidebar-follow").stop().animate({
				marginTop: $(window).scrollTop() - offset.top + topPadding
			});
		} else {
			$("#sidebar-follow").stop().animate({
				marginTop: 0
			});
		};
	});
});
