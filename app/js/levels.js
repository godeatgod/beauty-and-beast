module.exports = {
  level:[
    {},
    { // Page 1 - Castle outside
      sprites:[
	{ type:'castle2', x:269 , y:350, z:0},
	{ type:'castle2', x:-269, y:350, z:0},
	{ type:'tree', x:-500, y:250, z:0},
	{ type:'tree', x:500, y:150, z:0},
	{ type:'peasant4',x: 169, y:-350, z:0},
	{ type:'peasant2',x: -269, y:-350, z:0},
	{ type:'peasant1',x: -50, y:-350, z:0},
	{ type:'peasant3',x: 169, y:-250, z:0},
	{ type:'peasant2',x: -430, y:-350, z:0},
	{ type:'peasant3',x: -400, y:-350, z:0},
	{ type:'peasant1',x: -300, y:-250, z:0},
	{ type:'peasant4',x: 400, y:-250, z:0}
      ],

      entities:[
	{ type:'romanvase', x:5, y:1, z:0, dialog:true},
	{ type:'gate', x:6, y:6, z:0, dialog:true, tiles:[1, 0] },
	{ type:'gate', x:8, y:6, z:0, dialog:true, tiles:[1, 0] },
	{ type:'fence',x: 3,y:6, z:0, tiles:[4, 0], dialog:true},
	{ type:'fence',x:11,y:6, z:0, tiles:[4, 0], dialog:true},
	{ type:'rosebush', x:10, y:1, z:0, dialog:true},
	{ type:'rosebush', x:4, y:3, z:0, dialog:true},
	{ type:'door', x:7, y:0, z:0, toPage:2, toTile: [7, 7], tiles:[1, 0]},

	{ type:'beauty',x: 11, y:4, z:0, scale:1, dialog:true }
      ]
    },
    { // Page 2 - Main lobby
      sprites:[
	{ type:'interiorwall1', x:282 , y:350, z:0, scale:1 },
	{ type:'interiorwall2', x:-282, y:350, z:0, scale:1 },
	
	{ type:'towerdoor', x:0, y:340, z:100, scale:1.5}

      ],

      entities:[
	{ type:'stairs', x:4 , y:0, z:0, toPage:3, toTile:[10, 7]},
	{ type:'stairs', x:10, y:0, z:0, toPage:3, toTile:[10, 7]},

	{ type:'library', x:0, y:2, z:0, rotation:Math.PI / 2, dialog:true, tiles:[0, 2]},
	{ type:'library', x:14, y:2, z:0,  rotation:Math.PI / 2, dialog:true, tiles:[0, 2]},
	{ type:'library', x:14, y:6, z:0, rotation:Math.PI / 2, dialog:true, tiles:[0, 2]},

	{ type:'door', x:0, y:5, z:0, toPage:4, toTile:[14, 6], rotation: Math.PI / 2, tiles:[0, 1]},
	{ type:'door', x:10, y:8, z:0, toPage:1, toTile:[7, 1], tiles:[1, 0]},


	{ type:'books', x:4, y:4, z:130, dialog:true},
	{ type:'table', x:4, y:4, z:0, tiles:[1, 0], dialog:true},
	{ type:'chair', x:6, y:4, z:0},

	{ type:'beast',x: 8, y:3, z:0, scale:1, dialog:true}
      ]
    },

    { // Page 3 Tower
      sprites:[
	{ type:'towerwall', x:282, y:300, z:0, scale:1 },
	{ type:'towerwall', x:-282, y:300, z:0, scale:1 },
	{ type:'painting', x:1, y:290, z: 300}

      ],
      entities:[
	{ type:'towerdoor', x:10, y:8, z:0, toPage:2, toTile:[2, 2], tiles:[1, 0]},
	
	{ type:'table2', x:4, y:2, z:0, dialog:true},
	{ type:'vasewithrose', x:4, y:2, z:100, dialog:true },
	{ type:'chair2', x:12, y:2, z:0, dialog:true, tiles:[1, 0]}
      ]
    },

    { // Page 4 Dining Room
      sprites:[
	{ type:'diningwall', x:-282, y:350, z:0},
	{ type:'diningwall', x:282, y:350, z:0}
      ], 

      entities:[
	{ type:'vaseflowers', x:14, y:0, z:170, dialog:true, rotation:-Math.PI / 4},
	{ type:'placard2', x:14, y:0, z:0, dialog:true, rotation:-Math.PI / 4},

	{ type:'candle', x:1, y:1, z:80, rotation:-Math.PI / 4},
	{ type:'placard3', x:1, y:1, z:0, dialog:true, rotation:-Math.PI / 4},
	{ type:'door', x:15, y:6, z:0, toPage:2, toTile:[1, 4], rotation: Math.PI / 2, tiles:[0, 1]},
	{ type:'door', x:0, y:5, z:0, toPage:5, toTile:[14, 6], rotation: Math.PI / 2, tiles:[0, 1]},

	{ type:'diningchair', x:3, y:4, z:0, dialog:true},
	{ type:'fruitbasket', x:5, y:4, z:150},
	{ type:'diningcandles', x:7, y:4, z:150},
	{ type:'fruitbasket', x:9, y:4, z:150},
	{ type:'diningtable', x:7, y:4, z:0, dialog:true, tiles:[2, 0]},
	{ type:'diningchair', x:11, y:4, z:0, dialog:true}
      ]
    },

    { // Page 5 Bedroom
      sprites:[
	{ type:'bedroomwall', x:282, y:350, z:0},
	{ type:'bedroomwall', x:-282, y:350, z:0}
      ],

      entities:[

	{ type:'placard', x:1, y:2, z:-15, dialog:true, rotation:-Math.PI / 4},
	{ type:'door', x:15, y:6, z:0, toPage:4, toTile:[1, 5], rotation:Math.PI / 2, tiles:[0, 1]},
	{ type:'trapdoor', x:1, y:4, z:-10, toPage:7, toTile:[6, 1], floor:true, dialog:true, canOpen:function() {
	  return require("./items").hasItem("key");
	}},

	{ type: 'bed', x: 7, y:1, z:0, dialog:true, tiles:[2, 0]},
	{ type: 'bedroomchair', x: 12, y: 1, z:0, dialog:true},
	{ type: 'mirror', x: 10, y: 1, z:100, dialog:true},
	{ type: 'mirrortable', x: 10, y: 1, z:0, dialog:true}
      ]
    },


    { // Page 6 Garden
      sprites:[
	{ type:'castle2', x:282, y:350, z:0, scale:1 },
	{ type:'castle2', x:-282, y:350, z:0, scale:1 }
      ],
      
      entities:[
	{ type:'rosebush', x:10, y:3, z:0 },
	{ type:'door', x:5, y:0, z:0, toPage:2, tiles:[1, 0]},

	{ type:'peasant',x: 10, y:5, z:0, scale:1, tile:2 },
	{ type:'peasant',x: 9, y:4, z:0, scale:1, tile:2 },
	{ type:'peasant',x: 11, y:5, z:0, scale:1, tile:2 },
	{ type:'peasant',x: 9, y:6, z:0, scale:1, tile:2 },
	{ type:'tree', x:3, y:3, z:0, scale:1, tile:1 },
	{ type:'tree', x:10, y:2, z:0, scale:1, tile:1 },
	{ type:'tree', x:4, y:3, z:0, scale:1, tile:1 }
      ]
    },

    { // Page 7 Undeground passage
      sprites:[
	{ type:'undergroundwall', x:282, y:350, z:0, scale:1 },
	{ type:'undergroundwall', x:-282, y:350, z:0, scale:1 }
      ],
      
      entities:[
	{ type:'table2', x:3, y:0, z:0 },
	{ type:'candle', x:3, y:0, z:100 },
	{ type:'ladder', x:6, y:0, z:0, toPage:5, toTile:[1, 2]},
	{ type:'rock',x:10, y:0, z:0, scale:0.8, dialog:true },
	{ type:'rock',x:10, y:1, z:0, scale:0.7, dialog:true },
	{ type:'rock',x:10, y:2, z:0, scale:0.9, dialog:true },
	{ type:'rock',x:10, y:3, z:0, scale:0.7, dialog:true },
	{ type:'rock',x:10, y:4, z:0, scale:0.8, dialog:true },
	{ type:'rock',x:10, y:5, z:0, scale:0.7, dialog:true },
	{ type:'rock',x:10, y:6, z:0, scale:1, dialog:true },
	{ type:'rock',x:10, y:7, z:0, scale:0.7, dialog:true },
	{ type:'rock',x:10, y:8, z:0, scale:0.9, dialog:true },
	{ type:'rock',x:11, y:0, z:0, scale:0.8, dialog:true },
	{ type:'rock',x:11, y:3, z:0, scale:0.7, dialog:true },
	{ type:'rock',x:11, y:4, z:0, scale:0.8, dialog:true },
	{ type:'rock',x:11, y:5, z:0, scale:0.7, dialog:true },
	{ type:'rock',x:11, y:7, z:0, scale:0.7, dialog:true },
	{ type:'rock',x:12, y:0, z:0, scale:0.8, dialog:true },
	{ type:'rock',x:12, y:5, z:0, scale:0.7, dialog:true },
	{ type:'rock',x:12, y:7, z:0, scale:0.7, dialog:true },
	{ type:'rock',x:10, y:8, z:0, scale:0.9, dialog:true },
	{ type:'gardendoor', x:15, y:6, z:0, toPage:8, toTile: [2, 1], rotation:Math.PI / 2, tiles:[0, 1]}
      ]
    },


    { // Page 8 Forest
      sprites:[
	{ type:'castle2', x:269, y:350, z:0, scale:0.5 },
	{ type:'castle2', x:0, y:350, z:0, scale:0.5 }
      ],
      
      entities: [
	{ type:'mountain', x:3, y:0, z:0, toPage:7, toTile:[14, 6], tiles:[1, 0]},

	{ type:'tree', x:5, y:2, z:0, scale:0.5 },
	{ type:'tree', x:6, y:3, z:0, scale:0.7 },
	{ type:'tree', x:8, y:3, z:0, scale:0.5 },
	{ type:'tree', x:10, y:2, z:0, scale:0.5 },
	{ type:'tree', x:10, y:3, z:0, scale:0.7 },
	{ type:'tree', x:14, y:3, z:0, scale:0.7 },
	{ type:'tree', x:10, y:4, z:0, scale:0.8 },
	{ type:'tree', x:13, y:5, z:0, scale:0.9 },
	{ type:'tree', x:12, y:6, z:0, scale:1.2 },
	{ type:'tree', x:13, y:6, z:0, scale:1 },
	{ type:'tree', x:12, y:7, z:0, scale:1.3 },
	{ type:'father', x:7, y:7, z:0, dialog:true }
      ]      
    },


    { // Page 9 The End
      sprites:[
	{ type:'ending', x:-350, y:170, z:70, scale:1 },
	
	{ type:'flowers', x:-150, y:100, z:10, scale:1 },
	{ type:'flowers', x:-320, y:210, z:10, scale:1 },
	{ type:'flowers', x:-50, y:-170, z:10, scale:1 },
	{ type:'flowers', x:-150, y:100, z:10, scale:1 },
	{ type:'flowers', x:-260, y:230, z:10, scale:1 },
	{ type:'flowers', x:-50, y:-100, z:10, scale:1 },
	{ type:'flowers', x:-160, y:-100, z:10, scale:1 },
	{ type:'flowers', x:-330, y:-240, z:10, scale:1 },
	{ type:'flowers', x:-120, y:-290, z:10, scale:1 },
	{ type:'flowers', x:-450, y:100, z:10, scale:1 },
	{ type:'flowers', x:-520, y:210, z:10, scale:1 },
	{ type:'flowers', x:-450, y:-170, z:10, scale:1 },
	{ type:'flowers', x:-650, y:100, z:10, scale:1 },
	{ type:'flowers', x:-460, y:230, z:10, scale:1 },
	{ type:'flowers', x:-350, y:-100, z:10, scale:1 },
	{ type:'flowers', x:-460, y:-100, z:10, scale:1 },
	{ type:'flowers', x:-630, y:-240, z:10, scale:1 },
	{ type:'flowers', x:-620, y:-290, z:10, scale:1 }


      ],
      entities: [
	{ type:'hugging', x:3, y:4, z:0}
      ]      
    }
  ]
};
