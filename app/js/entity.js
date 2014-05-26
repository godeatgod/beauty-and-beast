var Sprite = require("./sprite");
var HexGrid = require("./hexgrid");


function Entity(data, book) {
  var grid = HexGrid.instance;
  var self = this;
  var moveAborted = false;

  self.data = data;
  if (data.tile === undefined)
    data.tile =  1;

  var spriteData = jQuery.extend({}, data);
  
  grid.setTile(data.x, data.y, data.tile);

  if (data.tiles) {
    for (var x = -data.tiles[0]; x <= data.tiles[0]; x++)
      for (var y = -data.tiles[1]; y <= data.tiles[1]; y++) 
	grid.setTile(data.x + x, data.y + y, data.tile);
  }

  var p = grid.pagePos(data.x, data.y);
  spriteData.x = p.x;
  spriteData.y = p.y;
  spriteData.class = "entity";

  Sprite.call(this, spriteData, book);


  this.element.on('click', function() {
    var Character = require("./character");
    if (Character.selected) {
      Character.selected.interactWithEntity(self);
    }
  });

  this.convert = function(type) {
    this.data.type = type;

    this.element.attr("src", "img/" + type + ".png");
  };


  this.setWalkable = function(value) {
    if (value) {
      data.oldTile = data.tile;
      data.tile = 0;
    } else {
      data.tile = data.oldTile || 1;
    }

    grid.setTile(data.x, data.y, value ? 0 : data.tile);
  };

  this.unlock = function() {
    data.class = "character";
  };

  this.move = function(pos, next) {
    console.log("Moving to ", pos);
    grid.setTile(data.x, data.y, 0);

    var p = grid.pagePos(pos.x, pos.y);

    console.log("Page coordinates ", p);
    new TWEEN.Tween(this.pivot.position)
      .to({x:p.x * this.pageMod, y:p.y, z:data.z}, 300)
      .easing(TWEEN.Easing.Linear.None).onComplete(function() {
	data.x = pos.x;
	data.y = pos.y;

	grid.setTile(data.x, data.y, data.tile);
	spriteData.x = p.x;
	spriteData.y = p.y;
	self.updatePivot();
	if (!moveAborted) next();
      }).start();
  };
  
  this.stopPath = function() {
    moveAborted = true;
  };

  this.movePath = function(path, complete) {
    var self = this;
    var i = 0;
    moveAborted = false;
    var walkSegment = function() {
      if (i >= path.length) {
	self.updatePivot();
	if (complete) complete();
	return;
      }

      self.move(path[i++], walkSegment);
    };

    walkSegment();
  };
}

module.exports = Entity;
