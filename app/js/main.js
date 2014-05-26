var Book = require("./book");
var Character = require("./character");
var HexGrid = require("./hexgrid");
var Preloader = require("./preloader");
var Achievement = require("./achievement");
var moment = require("moment");

(function() {

  var camera, scene, renderer, controls;
  var geometry, material, mesh;
  var projector = new THREE.Projector();


  var book, hexGrid;
  var startTime;



  init();
 // createDesk();
  createBook();

  createHexGrid();
  
  animate();
  
  function init() {
    
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = 300;
    camera.position.y = -400;
    camera.position.z = 1500;
    camera.target = new THREE.Vector3(0, 0, 0);

    
    window.scene = scene = new THREE.Scene();

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;

    window.addEventListener('resize', onResize);

  }

  function onResize(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  
  function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();    
    
    controls.update();
    renderer.render(scene, camera);
  }


  function createBook() {
    book = new Book(scene);
  }

  function createHexGrid() {
    hexGrid = new HexGrid(scene);
  }

  
  function createDesk() {
    var obj = new THREE.CSS3DObject($(".desk").get(0));
    obj.position.z = -20;
    scene.add(obj);
  }


  function zoomInGame(cb) {
    var position = new THREE.Vector3(0, -1250, 800);
    var target = new THREE.Vector3(0, -500, -500);
    var duration = 2000;
    

    new TWEEN.Tween( camera.position ).to( {
      x: position.x,
      y: position.y,
      z: position.z}, duration).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
	camera.lookAt(camera.target);
      }).start();
    new TWEEN.Tween( camera.target ).to( {
      x: target.x,
      y: target.y,
      z: target.z}, duration).easing(TWEEN.Easing.Linear.None).onComplete(cb).start();
  }


  function openBook() {
    book.open();
  }

  $(".portraits").on('click', "li", function(event) {
    var $this = $(this);
    Character.switchTo($this, book);

    $(".portrait i.selected").removeClass("selected");
    $("i", $this).addClass("selected");
  });

/*
  $(".page").on('click', function(event) {
    var vector = new THREE.Vector3(
      ( event.clientX / window.innerWidth ) * 2 - 1,
	- ( event.clientY / window.innerHeight ) * 2 + 1,
      0.5 );
    
    projector.unprojectVector( vector, camera );
    
    var dir = vector.sub( camera.position ).normalize();
    
    var distance = - camera.position.z / dir.z;
    
    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
  
    var tile = hexGrid.posToTile(pos.x, pos.y);
    console.log("Clicked on ", tile);
  
    return false;
  });
*/

  window.endGame = function() {
    $(".portraits").show();
    $(".items").show();
    hexGrid.hide();

    $("#time").text(moment().diff(startTime, 'minutes') + " minutes");

    if (moment().diff(startTime, 'seconds') < 60 * 3) {
      Achievement.unlockAchievement("speedy");
    }

    var achievements = Achievement.getAchievements();
    $("#achievements").text(achievements  + "/ 9");
  };


  $("#restart").on("click", function() {
    window.location.reload();
  });

  $(".start").on("click", function() {
    zoomInGame(function() {
      $(".portraits").show();
      $(".items").show();

      startTime = new Date();

      hexGrid.show();
      book.goTo(1);

      $(".beauty.portrait").trigger('click');
      
      return false;
    });
  });

  $(".goTo").on("click", function() {
    book.goTo(parseInt($(this).data("page")));

    return false;
  });


  Array.prototype.remove = function(element) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == element) { this.splice(i,1); }
    }
  };
  
  $.fn.preloadImages = function(callback, progress) {
    var checklist = this.toArray();
    var total = checklist.length;

    var onLoad = function(index) {
      return function() {
	checklist.remove($(this).attr('src'));
	if (checklist.length == 0) { callback(); }
	else progress(index, total);
      };
    };

    this.each(function(index) {
      $('<img>').attr({ src: this }).load(onLoad(index));
    });
  };

  var bookOpening = false;
  $(Preloader.images).preloadImages(function() {
    $("progress").hide();
  }, function(current, total) {
    var percent = Math.floor(current * 100 / total);
    $("progress").val(percent);
    $("progress").html(percent + "%");
    
    if (current > total / 2 && !bookOpening) {
      bookOpening = true;
      openBook();
    }
  });
})();
