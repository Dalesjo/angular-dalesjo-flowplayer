var videoplayer = angular.module('videoplayer', ['ngRoute','ngTouch','flowplayerAngular']);

videoplayer.config(function($routeProvider){
	$routeProvider.when('/',{
		controller: 'startpage',
		templateUrl: 'pages/startpage.htm'
	}).when('/dvr',{
		controller: 'event',
		templateUrl: 'pages/dvr.htm'
	}).when('/event',{
		controller: 'event',
		templateUrl: 'pages/event.htm'
	}).when('/style',{
		controller: 'event',
		templateUrl: 'pages/style.htm'
	}).when('/touch',{
		controller: 'event',
		templateUrl: 'pages/touch.htm'
	}).when('/trigger',{
		controller: 'event',
		templateUrl: 'pages/trigger.htm'
	}).when('/seek/:time',{
		controller: 'event',
		templateUrl: 'pages/seek.htm'
  }).when('/upload',{
			controller: 'event',
			templateUrl: 'pages/upload.htm'
  });
});

videoplayer.controller('startpage',function($scope){
  $scope.title = "Hello world";
});

videoplayer.controller('event',function($scope,$routeParams){
  $scope.title = "Hello world";

	$scope.seekTo = function(time) {
		if($scope.player !== undefined && $scope.player !== null) {
			$scope.player.seek(time);
		} else {
			console.log("Danger");
		}
	};

	$scope.seekAtStart = function(e, api) {
		if($routeParams.time !== undefined) {
			api.seek($routeParams.time);
		}
	};

	$scope.touchlog = "empty<br>";
	$scope.swipeLeft = function() {
		if($scope.player !== undefined && $scope.player !== null) {
			var time = $scope.player.video.time + 16
			if(time < $scope.player.video.duration) {
				$scope.player.seek(time);
			} else {
				$scope.player.seek($scope.player.video.duration);
			}
		}
	};

	$scope.swipeRight = function() {
		if($scope.player !== undefined && $scope.player !== null) {
			var time = $scope.player.video.time - 16
			if(time > 0) {
				$scope.player.seek(time);
			} else {
				$scope.player.seek(0);
			}

		}
	};


	$scope.uploaded = function(file){
		playlist = [{
				sources: [
					{ type:  file.type,
						src:  file.url
					}
				],
				title: file.name
		}];

		$scope.player.setPlaylist(playlist).play(0);
	};

	$scope.play = function() {

		playlist = [{
				sources: [
	        { type: "application/x-mpegurl",
	          src:  "//cdn1.fnf.nu/falkoping-play/_definst_/0/000/002/142/9c45ca5423/auto.smil/playlist.m3u8" }
			  ],
				thumbnails: {
					preload:false,
					interval: 4,
					template: '//static.dalesjo.com/images/thumbs/0/000/002/142/e1f2a3e0/{time}.jpg'
				},
				title: "Fristad för förföljda författare och journalister"
		},
		{
				sources: [
					{ type: "application/x-mpegurl",
						src:  "//cdn1.fnf.nu/falkoping-play/_definst_/0/000/002/143/98a14189a3/auto.smil/playlist.m3u8" }
				],
				thumbnails: {
					preload:false,
					interval: 4,
					template: '//static.dalesjo.com/images/thumbs/0/000/002/143/95141a4e/{time}.jpg'


				},
				title: "Styrdokument i Falköpings kommun  begrepps- definitioner"
		},

	];


		if(flowplayer.support.firstframe) {
			//$scope.player.setPlaylist(playlist).play(0);
			$scope.debug = "should start";
		} else {
			$scope.debug = "Unsupported load";
		}

		$scope.player.setPlaylist(playlist).play(0);
		/*
		if ($scope.player !== undefined && $scope.player.ready && $scope.player.video.seekable) {
			$scope.player.setPlaylist(playlist).play(0);
			console.log("play");
		} else {
			$scope.player.setPlaylist(playlist).play(0).unload();
			console.log("unload");
		} */

	}

	/**
	 * inställningar för flowplayer
	 * @type {object}
	 */
    $scope.options = {
    	/**
    	 * Licensnyckel för att få använda flowplayer
    	 * @type {string}
    	 */
        key: '$583037835140940',
        /**
         * splash image, används endast vid autoplay (när man stängt av spelaren)
         * @type {string}
         */
        splash: "//static.dalesjo.com/images/clips/0/000/000/227/757a471a/540p.jpg",
        /**
         * om flowplayers inbyggda embed funktion ska användas, vi använder vår egen
         * @type {boolean}
         */
        embed: false, // setup would need iframe embedding
        /**
         * Om fullskärmsläge ska vara tillåtet
         * @type {boolean}
         */
        fullscreen: true,
        /**
         * Om webbläsarna ska försöka gå till fullskärmsläge,
         * behövs för att fungera i ipad,android och för att slippa url bar på desktop
         * @type {boolean}
         */
        native_fullscreen: true,
        /**
         * för debugging
         * @type {boolean}
         */
        debug: false,
				/**
				 * Vi använder inte flowplayers inbyggda delning.
				 * @type {Boolean}
				 */
				share: false,
        /**
         * autostart av videoklipp är avstängt som standard
         * @type {boolean}
         */
        autoplay: false,
        /**
         * Vi vill inte att spelaren visar balong typs på hur man använder spelaren
         * @type {boolean}
         */
        tooltip: false,
        /**
         * hls.js sköter uppspelningen av video material i alla webbläsare med MSE stöd.
         * @type {object}
         */
        hlsjs: {
        	/**
        	 * Förhindrar att videospelaren använder en större videoström än nödvändigt,
        	 * väljer alltid en videokvalitet större än vad spelaren är och skalar neråt
        	 * @type {boolean}
        	 */
            capLevelToPlayerSize: true,
            /**
             * hls.js försöker alltid ha minst 24 sekunder i buffert
             * @type {integer}
             */
            maxBufferLength: 8 * 3,
            /**
             * hls.js får inte ladda mer än 32 sek i buffert
             * @type {integer}
             */
            maxMaxBufferLength: 8 * 4,		/* hls.js får max ha 32 sekunder buffrat */
           /**
            * Vid DVR fylls cachen till maxBufferSize om man spolar bakåt. 16MB ca 30 sekunder 4Mbit
            * @type {integer}
            */
            maxBufferSize: 16 * 1000 * 1000,
            /**
             * Vid direktsändningar ska hls.js börja med den 4 sista .ts filen i listan. standard är 3.
             * @type {integer}
             */
            liveSyncDurationCount: 4,
            /**
             * Samma som .ts fil
             * @type {integer}
             */
            maxSeekHole: 8
        },
        /**
         * Spellistan innehåller klippet som spelas just nu, kan innehålla två klipp, ett reklam klipp och det riktiga klipppet.
         * @type {array}
         */
        clip:
				{
				 		sources: [
				 			{ type: "application/x-mpegurl",
				 				src:  "//cdn1.fnf.nu/nyhem-play/_definst_/0/000/000/227/5326aa8d65/auto.smil/playlist.m3u8" }
				 		],
						live:false,
						dvr:false,
				 		thumbnails: {
				 			preload:false,
				 			interval: 8,
							live: false,
							startIndex:1,
							timeframe: 1,
				 			template: '//static.dalesjo.com/images/thumbs/0/000/000/227/f524518e/{time}.jpg',
				 		},
				 		title: "22 juni, Konsert med Mattias och Therese Martinson"
				 }


    };

	$scope.beforeseek = function(e, api, video) {
		console.log("beforeseek.api",api);
		console.log("beforeseek.video",video);
	};

	$scope.buffer = function(e, api) {
		console.log("buffer.api",api);
	};

	$scope.disable = function(e, api, video) {
		console.log("disable.api",api);
		console.log("disable.video",video);
	};

	$scope.error = function(e, api, video) {
		console.log("error.api",api);
		console.log("error.video",video);
	};

	$scope.finish = function(e, api, video) {
		console.log("finish.api",api);
		console.log("finish.video",video);
	};

	$scope.flashdisabled = function(e, api, video) {
		console.log("flashdisabled.api",api);
		console.log("flashdisabled.video",video);
	};

	$scope.fullscreen = function(e, api, video) {
		console.log("fullscreen.api",api);
		console.log("fullscreen.video",video);
	};

	$scope.fullscreenExit = function(e, api, video) {
		console.log("fullscreenExit.api",api);
		console.log("fullscreenExit.video",video);
	};

	$scope.load = function(e, api, video) {
		console.log("load.api",api);
		console.log("load.video",video);
	};

	$scope.mute = function(e, api, video) {
		console.log("mute.api",api);
		console.log("mute.video",video);
	};

	$scope.pause = function(e, api) {
		console.log("pause.api",api);
	};

	$scope.progress = function(e, api, video) {
		console.log("progress.api",api);
		console.log("progress.video",video);
	};

	$scope.quality = function(e, api, video) {
		console.log("quality.api",api);
		console.log("quality.video",video);
	};

	$scope.ready = function(e, api, video) {
		console.log("ready.api",api);
		console.log("ready.video",video);
	};

	$scope.resume = function(e, api, video) {
		console.log("resume.api",api);
		console.log("resume.video",video);
	};

	$scope.seek = function(e, api, video) {
		console.log("seek.api",api);
		console.log("seek.video",video);
	};

	$scope.shutdown = function(e, api, video) {
		console.log("shutdown.api",api);
		console.log("shutdown.video",video);
	};

	$scope.speed = function(e, api, video) {
		console.log("speed.api",api);
		console.log("speed.video",video);
	};

	$scope.stop = function(e, api, video) {
		console.log("stop.api",api);
	};

	$scope.unload = function(e, api, video) {
		console.log("unload.api",api);
		console.log("unload.video",video);
	};

	$scope.volume = function(e, api, volume) {
		console.log("volume.api",api);
		console.log("volume.volume",volume);
	};

});

videoplayer.directive('localvideo', function() {
	return {
      restrict: 'A',
      scope: {
          localvideo: '='
			},
      link: function (scope, element, attrs) {
				/* empy element to validate upload video */
 				video = document.createElement("video"),

				element[0].onchange = function(change) {

					// according to http://demos.flowplayer.org/scripting/filereader.html
					// hls is always considered as audio/mpegurl locally
	        // so we cannot avoid a player error without excluding hls video
					var file = element[0].files[0],
			        canplay = !!video.canPlayType(file.type).replace("no", ""),
			        isaudio = file.type.indexOf("audio/") === 0 && file.type !== "audio/mpegurl";

					/* Valid videofile */
					if (canplay && !isaudio) {
						file.url = URL.createObjectURL(file);
						scope.localvideo(file);
					} else {
						console.log("Wrong filetype");
					}


				}
			}
	}
});
