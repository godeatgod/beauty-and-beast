var AStar = require("astar");

var WALKABLE = 0;
var OBSTACLE = 1;
var ENEMY = 2;
var PLAYER = 3;

var WIDTH = 1450;
var HEIGHT = 650;


function HexGrid(scene) {
  var self = this;
  var svg = $('<svg width="' + WIDTH + 'px" height="' + HEIGHT + 'px" xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>').get(0);
  var obj = new THREE.CSS3DObject(svg);
  obj.position.z = 10;
  scene.add(obj);
  
  var GRID_WIDTH = 16;
  var GRID_HEIGHT = 9;
  var HEX_LENGTH = 50;
  var c = HEX_LENGTH;
  var a = Math.round(c / 2);
  var b = Math.round(0.866 * c);

  var hexes = [];
  var grid = [];


  HexGrid.instance = self;
  HexGrid.grid = grid;
  HexGrid.width = GRID_WIDTH;
  HexGrid.height = GRID_HEIGHT;


  function svgAppend(tag, attrs) {
    attrs.opacity = attrs.opacity || 0;

    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
      el.setAttribute(k, attrs[k]);
    svg.appendChild(el);

    return el;
  }
  
  function createHex(i, j) {
    var pos = self.tilePos(i, j);
    var x = pos.x;
    var y = pos.y;

    var points = "";
    points += x + "," + (a+c + y) + " ";
    points += x + "," + (a + y) + " ";
    points += (b + x) + "," + y + " ";
    points += (2*b + x) + "," + (a + y) + " ";
    points += (2*b + x) + "," + (a + c + y) + " ";
    points += (b + x) + "," + (2*c + y);

    if (hexes[i] === undefined) {
      hexes[i] = [];
      grid[i] = [];
    }

    grid[i][j] = WALKABLE;

    var hex = hexes[i][j] = svgAppend('polygon', {fill:'rgba(0, 255, 0, 0.1) ', stroke:'black', 'stroke-width':2, points:points});

    hex.addEventListener('click', function(event) {
      var Character = require("./character");
      if (Character.selected) {
	Character.selected.interactWithTile(i, j);
      }
    });
  }


  this.clickOn = function(i, j) {
  };

  this.pagePos = function(i, j) {
    var p = this.tilePos(i, j);
    return {x: p.x - WIDTH / 2 + b, y: HEIGHT / 2 - p.y - a * 1.5};
  };

  this.tilePos = function(i, j) {
    var yOffset = (j % 2) == 0 ? b + 1 : 0;
    var x = i * (b + 2) * 2 + yOffset;
    var y = j * (a + 1) * 3;

    return {x:x, y:y};
  };

  this.posToTile= function(x, y) {
    x += WIDTH / 2;
    y += HEIGHT / 2;

    y = Math.round(y / ((a + 1) * 3));
    var yOffset = (y % 2) == 0 ? b + 1 : 0;
    x = Math.round((x - yOffset) / ((b + 2) * 2));

    return {x:x, y:GRID_HEIGHT - y};
  };

  this.setTile = function(x, y, state) {
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0 || x >= GRID_WIDTH ||
	y < 0 || y >= GRID_HEIGHT) return;

    grid[x][y] = state;
    var hex = hexes[x][y];

    switch(state) {
    case WALKABLE:
      hex.setAttribute("fill", 'rgba(0, 255, 0, 0.5)');
      hex.setAttribute("stroke", 'rgba(0, 0, 0, 0)');
      break;
    case OBSTACLE:
      hex.setAttribute("fill", 'rgba(0, 0, 0, 0.5)');
      hex.setAttribute("stroke", 'rgba(0, 0, 0, 0.5)');
      break;
    case ENEMY:
      hex.setAttribute("fill", 'rgba(255, 0, 0, 0.25)');
      hex.setAttribute("stroke", 'red');
    }
  };

  this.show = function() {
    $(svg).show();
  };

  this.hide = function() {
    $(svg).hide();
  };


  this.clear = function() {
    for (var x = 0; x < GRID_WIDTH; x++) {
      for (var y = 0; y < GRID_HEIGHT; y++) {
	this.setTile(x, y, WALKABLE);
	hexes[x][y].setAttribute("opacity", 0);
      }
    }
  };

  this.hide();

  for (var x = 0; x < GRID_WIDTH; x++) {
    for (var y = 0; y < GRID_HEIGHT; y++) {
      createHex(x, y);
    }
  }

}

module.exports = HexGrid;
