
$(function(){
	// alert("content script");
	// console.log("coontent script");

	function getFriendsList(){
		your_name = $("#fb-timeline-cover-name").text();
		var friends_list = $("#pagelet_timeline_medley_friends .uiProfileBlockContent a:first-child").map(function(){
			return {fb_name:$(this).text(), fb_url:$(this).attr('href')};
		}).get();
		return friends_list;
	}

	function pausecomp(millis){
		var date = new Date();
		var curDate = null;
		do { curDate = new Date(); }
		while(curDate-date < millis);
	}

	chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

		if($("div.sectionHeader").size() != 0){
			friends_list = getFriendsList();
		}else{
			friends_list = [];
		}

		sendResponse( {data:window.JSON.stringify(friends_list)} );
	});
});

