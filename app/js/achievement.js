var play = require('play-audio');

var achievements = {
  foulmouth: {
    text: "You kiss your mother with that mouth ?"
  },

  switch: {
    text: "I switched a character and i liked it."
  },

  stockholm: {
    text: "Stockholm sindrome"
  },

  hardworker: {
    text: "Put your back into it!"
  },

  bookworm: {
    text: "Book Worm"
  },

  smellroses: {
    text: "Stop and smell the roses!"
  },


  persistent: {
    text: "Persistance is the key!"
  },

  finder: {
    text: "The finder"
  },

  speedy: {
    text: "Such speed! Wow! Much playing!"
  }
};


module.exports = {

  getAchievements:function() {
    var c = 0;
    for (var i in achievements) {
      if (achievements[i].has) c++;
    }
    return c;
  },

  showUnlock:function(type, image, text) { 
    $('.achievement .title').html(type + " unlocked");
    $('.achievement #text').html(text);
    $('.achievement').show();
    $('.achievement').css({
      opacity: 0.0, 
      "background-image": 'url(img/'  + image + '.png)'
    });
			
    $('.achievement').animate({opacity: 1.0, bottom: '100px'}, 750);

    play(['snd/achievement.mp3', 'snd/achievement.ogg']).autoplay();

			
    setTimeout(function() { 
      $('.achievement').animate({opacity: 0.0, bottom: '-120px'}, 750, "linear", function() { $('.achievement').hide(); });
    }, 3000);
  },

  unlockAchievement:function(name) {
    var achievement = achievements[name];

    if (achievement === undefined || achievement.has) return;

    window.localStorage.setItem("achievement/" + name, true);
    achievement.has = true;
    module.exports.showUnlock("Achievement", "achievement", achievement.text);
    
  }
};


console.log("Loading achievements ...");

function loadAchievements() {
  var totalPlayed = window.localStorage.getItem("times");
  if (totalPlayed === undefined) totalPlayed = 1;
  else totalPlayed++;

  console.log("Total times played ", totalPlayed);

  window.localStorage.setItem("times", totalPlayed);

  for (var i in achievements) {
    if (window.localStorage.getItem("achievement/" + i)) {
      achievements[i].has = true;
    }
  }  

  if (totalPlayed >= 5) {
    module.exports.unlockAchievement("persistent");
  }

}

if (window.localStorage)
  loadAchievements();
