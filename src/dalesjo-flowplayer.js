"use strict";
angular.module('dalesjo.flowplayer',[])
.directive('flowplayer', function() {
  return {
    restrict: 'A',
    scope: {
        flowplayer: '=',
				api: '=',
				beforeseek: '=',
				buffer: '=',
				disable: '=',
				error: '=',
				finish: '=',
				flashdisabled: '=',
				fullscreen: '=',
				fullscreenExit: '=',
				load: '=',
				mute: '=',
				pause: '=',
				progress: '=',
				quality: '=',
				ready: '=',
				resume: '=',
				seek: '=',
				shutdown: '=',
				speed: '=',
				stop: '=',
				unload: '=',
				volume: '=',
        cuepoint: '='
    },
    //template: 'This is my supercool directive',
    link: function (scope, element, attrs) {

			/* Create flowplayer and bind all event handlers. */
      scope.api = flowplayer(element[0], scope.flowplayer)
			.on("beforeseek.angular",scope.beforeseek)
			.on("buffer.angular",scope.buffer)
			.on("disable.angular",scope.disable)
			.on("error.angular",scope.error)
			.on("finish.angular",scope.finish)
			.on("flashdisabled.angular",scope.flashdisabled)
			.on("fullscreen.angular",scope.fullscreen)
			.on("fullscreen-exit.angular",scope.fullscreenExit)
			.on("load.angular",scope.load)
			.on("mute.angular",scope.mute)
			.on("pause.angular",scope.pause)
			.on("progress.angular",scope.progress)
			.on("quality.angular",scope.quality)
			.on("ready.angular",scope.ready)
			.on("resume.angular",scope.resume)
			.on("seek.angular",scope.seek)
			.on("shutdown.angular",scope.shutdown)
			.on("speed.angular",scope.speed)
			.on("stop.angular",scope.stop)
			.on("unload.angular",scope.unload)
			.on("volume.angular",scope.volume)
      .on("cuepoint.angular",scope.cuepoint);

      /* Clean up the flowplayer element on destroy */
      scope.$on('$destroy', function(){
        scope.api.unload();
      });
    }
  };
});
