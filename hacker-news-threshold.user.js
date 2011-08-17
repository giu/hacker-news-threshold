// ==UserScript==
// @name            Hacker News Threshold
// @namespace       http://giu.me
// @description     Allows you to highlight threads on Hacker News which have a number of points greater than a specified threshold
// @include			http://news.ycombinator.com/
// @include			http://news.ycombinator.com/news
// @include			http://news.ycombinator.com/ask
// @include			http://news.ycombinator.com/newest
// @require			http://code.jquery.com/jquery.min.js
// ==/UserScript==
$(function(){
	$("head").append("<style>.hnth{background: #FFFB93 !important;}.hnterr{background:#FF0000;color:#fff;}</style>");

	function highlightThreads(threshold){
		var $hnfti = $("#hnfti");
		if(isNaN(threshold)){
			$(".hnth").removeClass("hnth");
			$hnfti.addClass("hnterr");
		}
		else{
			$hnfti.removeClass("hnterr");
			$(".hnth").removeClass("hnth");
			$("span[id^='score_']").filter(function(){
				var m = $(this).html().match(/[0-9]+/g);

				if(m){
					return parseInt(threshold) <= parseInt(m[0]);
				}
				else{
					return false;
				}
			})
			.closest("tr").prev().addClass("hnth");
		}
	}

	$("#hnfti").live("keyup", function(){
		highlightThreads($(this).val());
	});

	var startthreshold = 100;

	$($(".pagetop")[0]).append(" | Threshold: <input type='text' id='hnfti' value='"+startthreshold+"'  />");

	highlightThreads(startthreshold);
});