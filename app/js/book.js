var Levels = require('./levels');
var Sprite = require('./sprite');
var Entity = require('./entity');
var HexGrid = require('./hexgrid');
var Character = require('./character');

function Book(scene) {
  var self = this;
  var frontCover;

  Book.instance = self;

  var pages = [];
  var elements = [];

  this.pages = pages;
  this.currentPage = 0;

  function slidePage(page, direction, duration) {
    duration = duration || 2000;
    
    console.log("Direction of slide ", direction);

    new TWEEN.Tween(page.rotation )
      .to({ y: direction < 0 ? - Math.PI : 0 }, duration)
      .easing( TWEEN.Easing.Exponential.InOut )
      .onComplete(function() {
      }).start();

/*
    new TWEEN.Tween(page.position )
      .to({ z: -page.position.z }, duration)
      .easing( TWEEN.Easing.Exponential.InOut )
      .onComplete(function() {
      }).start();
*/
  }
  

  function createPages() {
    var book = new THREE.Object3D();
    book.position.x = 0;

    scene.add(book);
    var p = $('.cover,.page');

    p.each(function(idx) {
      var obj = new THREE.CSS3DObject(this);

      if ($(this).hasClass('left')) {
	obj.rotation.y = Math.PI;
      }

      if ($(this).hasClass("page")) {
	obj.position.x = 704 / 2;
      } else {
	obj.position.x = 724 / 2;
      }
      
      obj.position.y = 0;
//      obj.position.z = (p.length / 2) - idx;

      var pivot = new THREE.Object3D();
      pivot.position.z = p.length - idx;
      pivot.add(obj);


      if (idx === 0) {
	frontCover = pivot;
      } else {
	pages.push(pivot);
      }

      book.add(pivot);
    });
  }


  
  function openPage(idx) {
    idx = Math.floor(idx / 2);
    var level = Levels.level[idx];

    console.log("Loading level ", idx, " ", level);

    var sprites = level.sprites;
    var entities = level.entities;
    var tiles = level.tiles;

    if (sprites) for (var i = 0; i < sprites.length; i++) {
      var s = new Sprite(sprites[i], self);
      elements.push(s);
    }

    if (entities) for (i = 0; i < entities.length; i++) {
      var e;
      
      if (Character.chars[entities[i].type]) {
	e = new Character(entities[i], self);
      } else {
	e = new Entity(entities[i], self);
      }
      elements.push(e);
    }
  }

  function closePage(idx) {
    var left = pages[idx - 1];
    var right = pages[idx];

    elements.forEach(function(el) {
      if (el) el.hide();
    });

    HexGrid.instance.clear();

    elements = [];
  }



  this.getEntityByType = function(type) {
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el.data && el.data.type == type) {
	return el;
      }
    }

    return null;
  };


  this.getEntityAt = function(i, j) {
    for (var k = 0; k < elements.length; k++) {
      var el = elements[k];
      if (el.data && el.data.x == i && el.data.y == j) {
	return el;
      }
    }

    return null;
  };

  
  this.open = function() {
//    frontCover.position.z -= 1;
//    pages[0].position.z -= 1;

    slidePage(frontCover, -1, 5000);
    slidePage(pages[0], -1, 5000);
  };

  this.goTo = function (idx) {
    var pageIdx = idx * 2;

    if (pageIdx >= pages.length || pageIdx === this.currentPage) return;
    console.log('Switching to page ', idx , ' of ', pages.length);
    
    var direction = pageIdx > this.currentPage ? -1 : 1;

    closePage(this.currentPage + 1);

    if (direction > 0) {
      slidePage(pages[this.currentPage], direction);
    }

  //  frontCover.position.z += direction;


    for (var i = 0; i < pages.length; i++) {
      var toZ = i <= pageIdx ? i - pageIdx : pageIdx - i;
      
//      pages[i].position.z = toZ;
      new TWEEN.Tween(pages[i].position )
	.to({ z: toZ }, 2000)
	.easing( TWEEN.Easing.Exponential.InOut )
	.onComplete(function() {
	}).start();
    }

    for (i = this.currentPage - direction; i != pageIdx; i-= direction)
      slidePage(pages[i], direction);
    
    if (direction < 0) {
      slidePage(pages[pageIdx], direction);
    }
    this.currentPage = pageIdx;

    openPage(pageIdx + 1);

  };

  createPages();
}

module.exports = Book;
