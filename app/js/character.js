var AStar = require("astar");
var Entity = require("./entity");
var Book = require("./book");
var Levels = require("./levels");
var HexGrid = require("./hexgrid");
var Dialog = require("./dialog");

var chars = {
  beauty: {
    page:1
  }, 

  beast: {
  }
};

function Character(data, book) {
  var self = this;
  var isMoving = false;
  data.tile = 3;

  Entity.call(this, data, book);
  

  this.interactWithEntity = function(entity) {
    return this.interactWithTile(entity.data.x, entity.data.y, entity);
  };

  this.interactWithTile = function(i, j, entity) {
    if (isMoving) return; //this.stopPath();
    if (Dialog.close) Dialog.close();


    var graph = new AStar.Graph(HexGrid.grid);

    var start = graph.nodes[data.x][data.y];
    var end = graph.nodes[i][j];
    
    var p = AStar.aStar.search(graph.nodes, start, end);
    
    if (p.length == 0 && AStar.aStar.manhattan(start.pos, end.pos) > 1) {
      console.log("Distance between path ", AStar.aStar.manhattan(start.pos, end.pos)); 
      return;
    }

    var path = [];
    for (var x = 0; x < p.length; x++) {
      path.push(p[x].pos);
    }
    
    isMoving = true;

    this.movePath(path, function() {
      isMoving = false;
      if (entity === undefined)
	entity = book.getEntityAt(i, j);

      if (entity == self) return;

      if (entity && entity.data) {

	if (entity.data.toPage && 
	    (entity.data.canOpen === undefined || entity.data.canOpen())) {
	  self.goThroughDoor(entity.data.toPage, entity.data.toTile);
	} else if (entity.data.dialog) {
	  Dialog.startDialog(entity.data.type, entity, self);
	}
      }
    });
  };


  this.goThroughDoor = function(page, tile) {
    var oldLevel = Levels.level[book.currentPage / 2];
    var level = Levels.level[page];
    data.x = tile[0];
    data.y = tile[1];
    
    oldLevel.entities.splice(oldLevel.entities.indexOf(data), 1);
    level.entities.push(data);

    book.goTo(page);
    chars[self.data.type].page = page;

    Character.selected = book.getEntityByType(Character.selected.data.type);
  };
}


module.exports = Character;
module.exports.chars = chars;
module.exports.switchTo = function(el, book) {
  for (var i in chars) {
    if (el.hasClass(i)) {
      book.goTo(chars[i].page);
      if (Character.selected !== undefined)
	require("./achievement").unlockAchievement("switch");
      Character.selected = book.getEntityByType(i);
    }
  }
};


module.exports.unlockChar = function(entity, book) {
  if (chars[entity.data.type] === undefined || chars[entity.data.type].page) return;

  chars[entity.data.type].page = book.currentPage / 2;

  $(".portraits").append($("<li class='" + entity.data.type + " portrait'><i></i></li>"));
  require("./achievement").showUnlock("Character", entity.data.type, entity.data.type == "beast" ? "The Beast" : "The Beauty");

};

