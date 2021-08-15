// JavaScript Document
$wrap = $("#wrap_content");
$(function(){
		var newHash = '';
		$(window).bind('hashchange', hashChanged);
		$(window).trigger('hashchange');
		
});

function hashChanged(){
	return false;
}