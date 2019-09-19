AFRAME.registerComponent('high-five', {
  schema: {
    eventId: { type: 'number', default: -1},
    init: { type: 'vec3' },
    from: { type: 'vec3' },
    to: { type: 'vec3' },
  },
  
  timeout: null,
  
  update: function () {
    if (this.data.eventId > -1) {
      this.startHighFive();
    }
  },
  
  startHighFive: function() {    
    const el = this.el, data = this.data;
    
    if(el.hasAttribute('animation')){
      el.removeAttribute('animation');
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    el.setAttribute('animation', {
              property: 'rotation',
              dir: 'normal',
              dur: 500,
              from: data.from,
              to: data.to
    });

    this.timeout = setTimeout(function(){   
      el.setAttribute('rotation', data.init);
      el.removeAttribute('animation'); 
    }, 750);
  }
});

AFRAME.registerComponent('high-five-controller', {
  
  iterator: 0,
  
  init: function() {
    var spacebarKeyCode = 32;
    var that = this;
    document.body.onkeyup = function(e){
      if(e.keyCode == spacebarKeyCode){
        that.doHighFive();
      }
    }
    
    const sceneEl = this.el.sceneEl;
    const canvasEl = sceneEl.canvas;

    if (!canvasEl) {
      sceneEl.addEventListener('render-target-loaded', this.addEventListeners.bind(this));
      return;
    }

    // canvasEl.addEventListener('touchend', this.onTouchEnd);
    
    var clicks = 0;
    var onTouchStart = function(e){
      clicks++;
      if (clicks == 1) {
        setTimeout(function(){
          if(clicks == 1) {
            // ignore
          } else {
            that.doHighFive();
          }
          clicks = 0;
        }, 700);
      }
    };
    
    canvasEl.addEventListener('touchstart', onTouchStart);

  },
  
  doHighFive: function () {
    console.log('do high five');
    this.el.setAttribute('high-five', 'eventId', this.iterator++);
  }
});


    