AFRAME.registerComponent('avatar-picker', {
  schema: { type: 'string', default: 'none'},

  update: function() {
    console.error('avatar picker update', this.data);
    if (this.data === 'none') {
      return;
    }
    
    var avatars = this.el.querySelectorAll('.avatar');
    if (avatars.length === 0) {
      console.error('could not find any .avatar elements');
      return;
    }
    
    var selectedAvatar = this.el.querySelector('.' + this.data);
    if (!selectedAvatar) {
      console.error('Could not find avatar with class=', this.data);
    }
    selectedAvatar.setAttribute('visible', true);
    
    // Remove all other avatars
    for(var i = 0; i < avatars.length; i++) {
      if (avatars[i] !== selectedAvatar) {
        avatars[i].parentNode.removeChild(avatars[i]);
      }
    }
  }
});

AFRAME.registerComponent('avatar-picker-controller', {
  init: function() {
    var urlParams = this.getUrlVars();
    var avatar = urlParams['avatar'] || 'avatar1';
    
    console.error('local avatar=', avatar);
    this.el.setAttribute('avatar-picker', avatar);
  },
  
  getUrlVars: function () {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }
});