(function (){
	"use strict";
	window.HELP_IMPROVE_VIDEOJS = false;
	videojs.options.flash.swf = "../bower_components/video.js/dist/video-js.swf";
	var videos = [{
		src: 'http://bad-videos.dev.zype.com/good-video1/ArduinoTheDocumentary.mp4',
		type: 'video/mp4'
	}, 
	{
		src: 'http://bad-videos.dev.zype.com/good-video2/sintel-2048-stereo.mp4',
		type: 'video/mp4'
	},
	{
		src: 'http://bad-videos.dev.zype.com/good-video3/bipbopall.m3u8',
		type: "application/x-mpegURL"
	}];

	var player = videojs('good-videos');

	//Default Video
	player.src({"type": videos[2].type, "src":videos[2].src});

	$(".change-video").click(function() {
		var $this = $(this);
	});


})();