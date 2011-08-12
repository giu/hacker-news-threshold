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
	$("head").append("<style>.hnfph{background: #FFFB93 !important;}</style>");

	function highlightThreads(threshold){
		if(!isNaN(threshold)){
			$(".hnfph").removeClass("hnfph");
			$("span[id^='score_']").filter(function(){
				var m = $(this).html().match(/[0-9]+/g);

				if(m){
					return parseInt(threshold) <= parseInt(m[0]);
				}
				else{
					return false;
				}
			})
			.closest("tr").prev().addClass("hnfph");
		}
	}

	$("#hnf-point-threshold").live("keyup", function(){
		highlightThreads($(this).val());
	});

	var startthreshold = 100;

	$($(".pagetop")[0]).append(" | Set threshold: <input type='text' id='hnf-point-threshold' value='"+startthreshold+"'  />");

	highlightThreads(startthreshold);
});