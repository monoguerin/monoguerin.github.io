(function (){
	"use strict";
	window.HELP_IMPROVE_VIDEOJS = false;
	videojs.options.flash.swf = "../bower_components/video.js/dist/video-js.swf";
	var player = videojs('good-videos'),
		videoSelector = ".change-video";

	var changeVideo = function(defaultVideo, clickedElement) {
		var $this,
			extensions = {
			"m3u8": "application/x-mpegURL",
			"mp4": "video/mp4"
			},
			baseUrl = "http://bad-videos.dev.zype.com/",
			videoUrl,
			type;

		if(defaultVideo) {
			$this = $(videoSelector + ":first");
		} else {
			$this = $(clickedElement);
		}
		videoUrl = $this.attr("href");
		type = extensions[videoUrl.substr(videoUrl.lastIndexOf('.') + 1)] ? extensions[videoUrl.substr(videoUrl.lastIndexOf('.') + 1)] : extensions.mp4;
		player.src({"type": type, "src": baseUrl + videoUrl});
		player.play();
	};

	//Default Video
	changeVideo(true);

	$(videoSelector).click(function(evt) {
		evt.preventDefault();
		changeVideo(false, this);
	});

})();