if (typeof wodniw === 'undefined') { var wodniw = {}; }

(function(){
  'use strict';
  
  function StopWatch() {
    this.isRunning = false;
    this.timerID = 0;
  }
  
  var proto = StopWatch.prototype;
  
  proto.reset = function reset() {};
  
  proto.start = function start(stopAt) {
    this.timerID = setTimeout(function(){
      this.stop();
      this.onTimeElapsed();
    }.bind(this), stopAt);
    this.isRunning = true;
  };
  
  proto.stop = function stop() {
    clearTimeout(this.timerID);
    this.isRunning = false;
  };
  
  Object.defineProperty(proto, 'isRunning', {
    get: function isRunning() {}
  });
  
  // can't be named onstop... yuck!!!
  proto.onTimeElapsed= function () {};
  
  wodniw.StopWatch = StopWatch;
  
})(wodniw);
