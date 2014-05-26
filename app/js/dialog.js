var moment = require("moment");
var play = require("play-audio");

var Quest = {

};

var readAttempt = 0;
var dialogs = {

  books:[{
    beauty: "They look heavy!",
    beast: "I've been meaning to finish them.",
    post:function() {
      readAttempt ++;
      if (readAttempt > 3) {
	require("./achievement").unlockAchievement("bookworm");
      }
    }
  }],

  gate: [{
    beauty: "It's locked and I cannot open it",
    beast: "That would be very foolish."
  }],

  bed: [{
    beauty: "No time to sleep right now!",
    beast: "I don't feel sleepy."
  }],

  library: [{
    beauty: "I've read all these.",
    beast: "I've left my glasses in my other jacket.",

    post:function() {
      readAttempt ++;
      if (readAttempt > 3) {
	require("./achievement").unlockAchievement("bookworm");
      }
    }
  }],

  mirrortable: [{
    beauty: "Nothing.",
    beast: "It's empty!"
  }],

  table: [{
    beast: "Smells like teen spirit."
  }],


  table2: [{
    beauty: "It's full of odds and ends.",
    beast: "Just junk."
  }],

  rosebush: [{
    beauty: "They could do with a little trimming."
  }],

  diningchair: [{
    beauty: "I should change the curtains to match.",
    beast: "It looks comfy"
  }],

  diningtable: [{
    beauty: "I'm not hungry!",
    beast: "No time right now"
  }],

  placard: [{
    beauty: "You can never have enough clothes.",
    beast: "I'm out of clean socks."
  }],

  placard2: [{
    beast: "Just silverware.",
    beauty: "Its a lovely furniture piece."
  }],

  placard3: [{
    beast: "There are too many things to even count."
  }],



  chair2 :[{
    player: "It's really dusty! I wouldn't sit on it."
  }],

  vaseflowers: [{
    beauty: "These roses are freshly cut from the garden.",
    post:function() {
      require("./achievement").unlockAchievement("smellroses");
    }
  }],

  rock: [
    {
      beauty: "I might break a fingernail."
    },
    {
      beast: function() {
	var texts = [
	  "Let me take care of that.",
	  "Awww yeah!",
	  "Rock & Roll!",
	  "It looked a lot easier in the youtube video."
	];
	  
	  return texts[Math.floor(Math.random() * texts.length)];
      },
      pre:function() {
	play(['snd/smash.mp3', 'snd/smash.ogg']).autoplay();

	this.entity.convert("rubble");
	this.entity.setWalkable(true);

	if (require("./book").instance.getEntityByType("rock") == null) {
	  require("./achievement").unlockAchievement("hardworker");
	}

	Quest.CLEAR = true;
      }
    }
  ],

  romanvase: [

    {
      beast: "Roses, roses everywhere.",
      beauty: "I should water them.",
      post:function() {
	require("./achievement").unlockAchievement("smellroses");
      }
    }
  ],


  vasewithrose: [
    {
      condition:function() {
	return Quest.ROSE === undefined;
      },
      beauty: "Its so shiny!"
    },
    {
      condition:function() {
	return Quest.ROSE == 1;
      },
      beauty: "This is the magic rose he was talking about.",
      beast: "I need to take this magic rose with us.",
      post: function() {
	Quest.ROSE = true;
	require("./items").getItem("rose");
	this.entity.convert("vaseempty");
      }
  }],

  trapdoor : [
    {
      condition:function() {
	return !require("./items").hasItem("key");
      },
      beauty: "It's locked and it looks like it hasn't been opened in a long time.",
      beast: "If only I can remember where I've put the key."
    }
  ],


  mirror:[
    {
      condition:function() {
	return Quest.MIRROR === 1;
      },
      beast: "Bella needs to talk to her father."
    },
    
    {
      condition:function() {
	return Quest.MIRROR === 1;
      },
      beauty: "Father, are you there ?",
      post: function() {
	this.entity.convert("mirroractivated");
	module.exports.startDialog("mirroractivated", this.entity, this.character, undefined); 
      }      
    },
    
    {
      beast: "You handsome beast!",
      beauty: "Look at all those split ends."
    }
  ],

  mirroractivated:[
    {
      beast: "Belle should talk to her dad."
    },

    {
      condition:function() {
	return Quest.MIRROR == 1;
      },

      beauty: "Daddy, we need your help!",
      response: "Gladly, what can I do ?",
      next: 2
    },

    {
      condition:function() {
	return false;
      },
      
      beauty: "Meet us in the forest behind the castle",
      response: "I'll go saddle the horses now.",
      next:3
    },

    {
      condition:function() {
	return false;
      },
      
      beauty: "Thank you daddy, you're the best!",
      response: "Anything for my little pumpkin.",

      post: function() {
	Quest.MIRROR = true;
	this.entity.convert("mirror");
      }
    }
  ],

  fence: [
    {
      condition:function() {
	return Quest.START === undefined;
      },

      beauty: "What are you doing here ?",
      response: "We've come to rescue you from the monster.",

      options: [
	{
	  say:"He's not a monster!",
	  action:function() {
	    require("./achievement").unlockAchievement("stockholm");
	    Quest.START = true;
	    return 3;
	  }
	},
	{
	  say:"Please rescue me!",
	  action:function() {
	    Quest.START = true;
	    return 1;
	  }
	}
      ]
    },
    
    {
      condition:function() {
	return false;
      },
      beauty: "Its horrible here. Please rescue me!",
      response:"Just open the gate so we can enter!"
    }, 

    {
      beast: "Your mother is a hamster and your father smell like elderberries.",
      post:function() {
	require("./achievement").unlockAchievement("foulmouth");
      }
    },
    
    {
      beauty: "Go away!",
      response:"Open that gate, NOW!"
    }
  ],

  beast: [
    {
      condition: function() {
	return Quest.ROSE === undefined;
      },
      
      beauty: "We have to run! The villagers want to kill you.",
      response: "We cannot leave without the rose. Its in the tower!",

      post:function() {
	Quest.ROSE = 1;
	var Character = require("./character");
	var book = require("./book").instance;
	Character.unlockChar(book.getEntityByType("beast"), book);
      }
    },

    {
      condition: function() {
	return Quest.ROSE === true && Quest.MIRROR === undefined;
      },
      
      beauty: "My father can help us.",
      response: "Good ideea, talk to him using the magic mirror in the bedroom.",
      post:function() {
	Quest.MIRROR = 1;
      }
    },

    {
      condition: function() {
	return Quest.MIRROR === true && Quest.KEY === undefined;
      },
      
      beauty: "Father will meet us in the forest behind the castle.",
      response: "Good, we can use the secret passage in the bedroom to escape to the forest.",
      post:function() {
	Quest.KEY = 1;
	Quest.KEY_start = new Date();
	
      }
    }, 

    {
      condition: function() {
	return Quest.KEY == 1 && !require("./items").hasItem("key");
      },
      
      beauty: "Where is the key for the underground passage ?",
      response: "I wish i knew. Search around the castle for it."
    }

  ],

  beauty: [
    {
      condition: function() {
	return Quest.MIRROR === true && Quest.KEY === undefined;
      },
      
      beast: "We will use the secret passage in the bedroom to escape to the forest.",
      post:function() {
	Quest.KEY = 1;
	Quest.KEY_start = new Date();
	
      }
    }, 
    {
      condition: function() {
	return Quest.ROSE === true && Quest.MIRROR === undefined;
      },

      beast: "I have the rose, we can leave now!",
      response: "We should ask my father for help.",
      next: 2
    },
    {
      condition: function() {
	return false;
      },

      beast: "Good Ideea. Talk to him using the magic mirror in the bedroom.",
      post:function() {
	Quest.MIRROR = 1;
      }
    }
  ],

  father: [
    {
      condition: function() {
	var book = require("./book").instance;
	return book.getEntityByType("beast") == null;
      },
      beauty: "Daddy, you came.",
      response: "Where is he ?",
      next: 2
    },

    {
      condition: function() {
	var book = require("./book").instance;
	return book.getEntityByType("beauty") == null;
      },
      beast: "Thank you for coming on such short notice.",
      response: "Where is my daughter ?",
      next: 2
    },

    {
      condition: function() {
	return false;
      },
      response: "Hurry up, There is no time to lose."
    },

    {
      beauty: "Daddy, we're here!",
      beast: "We've arrived, Sir!",
      response: "Excellent. I have arranged safe transport for both of you. We shall leave soon as night falls.",

      post: function() {
	var book = require("./book").instance;
	window.endGame();
	book.goTo(9);
      }
    }
  ]
};

var DIALOG_LINGER = 3000;
var openDialogs = [];

module.exports = {
  startDialog:function(type, entity, character, obj) {
    var entityDialogs = dialogs[type];

    if (entityDialogs === undefined) return;

    var i = 0;
    while(entityDialogs[i] && 
	  ((!entityDialogs[i][character.data.type] && !entityDialogs[i].player) ||
	   (entityDialogs[i].condition != undefined &&
	    !entityDialogs[i].condition()))) i++;

    var dialog = entityDialogs[i];
    if (dialog === undefined) return;
    
    module.exports.showDialog(dialog, entity, character, obj);
  },

  close:function() {
    while(openDialogs.length > 0) {
      openDialogs[0].destroy();
    }
  },

  findDialog:function(type, idx) {
    var entityDialogs = dialogs[type];
    
    return entityDialogs[idx];
  },

  showDialog:function(dialog, entity, character, obj) {
    if (obj === undefined) {
      var speechEl = $(".speech").clone();
      obj = new THREE.CSS3DObject(speechEl.get(0));
      speechEl.show();
    } else {
      speechEl = obj.element;
    }

    var context = {
      entity:entity,
      character:character,
      obj:obj
    };

    

    var timer;

    if (dialog.pre) dialog.pre.call(context);

    var destroy = function() {
      openDialogs.splice(openDialogs.indexOf(context), 1);
      clearTimeout(timer);


      if (dialog.post) dialog.post.call(context);

      if (isNaN(dialog.next)) {
	console.log("Removing dialog ", dialog);
	window.scene.remove(obj);
      } else {
	var newDialog = module.exports.findDialog(entity.data.type, dialog.next);
	module.exports.showDialog(newDialog, entity, character, obj);
      }
    };
    context.destroy = destroy;
    openDialogs.push(context);

    window.scene.add(obj);

    var positionBubble = function(entity) {
      var vector = new THREE.Vector3();
      vector.setFromMatrixPosition( entity.pivot.matrixWorld);

      obj.position = vector;
      obj.position.z += 300;
      obj.rotation.x = Math.PI / 2;
    };


    var showOptions = function() {
      positionBubble(character);

      $("span.text", speechEl).text("");
      var options = $("ul.options", speechEl);
      options.empty();

      for (var i=0; i < dialog.options.length; i++) {
	var option = dialog.options[i];
	var item = $("<li>" + option.say + "</li>");
	item.on("click", option, function(event) {
	  var option = event.data;
	  var res;

	  if (option.action) 
	    res = option.action.call(context);
	  
	  if (!isNaN(res)) {
	    var newDialog = module.exports.findDialog(entity.data.type, res);
	    module.exports.showDialog(newDialog, entity, character, obj);
	  } else {
	    destroy();
	  }
	});
	item.appendTo(options);
      }
    };

    var showChSpeech = function() {
      var sss = dialog[character.data.type] || dialog.player;
      if (typeof(sss) == "function") 
	sss = sss();
      positionBubble(character);
      $("ul.options", speechEl).empty();
      $("span.text", speechEl).text(sss);
      
      timer = setTimeout(showEtSpeech, DIALOG_LINGER);
    };

    var showEtSpeech = function() {
      if (dialog.response === undefined) {
	destroy();
	return;
      }
      positionBubble(entity);
      var sss = dialog.response;
      if (typeof(sss) == "function") 
	sss = sss();

      $("ul.options", speechEl).empty();
      $("span.text", speechEl).text(dialog.response);      

      if (dialog.options) {
	timer = setTimeout(showOptions, DIALOG_LINGER);
      } else {
	timer = setTimeout(destroy, DIALOG_LINGER);
      }
    };


    if (dialog[character.data.type] || dialog.player) {
      showChSpeech();
    } else {
      showEtSpeech();
    }    

    console.log("Character says ", dialog[character.data.type]);
    console.log("Entity responds ", dialog.response);
  }
};


function hideKey() {
  var key = {
    condition:function() {
      return Quest.KEY !== undefined && !require("./items").hasItem("key");
    },
    beauty: "There's a key hidden here.",
    beast: "So this is where the key ended up.",
    post: function() {
      Quest.KEY = true;
      require("./items").getItem("key");
      
      if (moment().diff(Quest.KEY_start, 'seconds') < 60) {
	require("./achievement").unlockAchievement("finder");
      }
    }
  };

  
  var hideList = ["romanvase", "placard", "placard2", "placard3", "library", "mirrortable", "table", "table2"];
  var hideIn = hideList[Math.floor(Math.random() * hideList.length)];
  dialogs[hideIn].splice(0, 0, key);
}

hideKey();
