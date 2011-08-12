// ==UserScript==
// @name            Hacker News Threshold
// @namespace       http://giu.me
// @description     Gives the ability to highlight threads with a number of votes higher than a user-defined threshold
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
		if(!isNaN(threshold)){
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
		else{
			$(".hnth").removeClass("hnth");
			$hnfti.addClass("hnterr");
		}
	}

	$("#hnfti").live("keyup", function(){
		highlightThreads($(this).val());
	});

	var startthreshold = 100;

	$($(".pagetop")[0]).append(" | Threshold: <input type='text' id='hnfti' value='"+startthreshold+"'  />");

	highlightThreads(startthreshold);
});