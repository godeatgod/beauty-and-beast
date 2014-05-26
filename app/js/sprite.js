function Sprite(data, book) {
  var self = this;
  data.class = data.class || "sprite";

  var pivotCreated = false;
  var pivot;
  var page;

  var initialX;


  this.updatePivot = function() {
    var right = data.x > 0;
    var bottom = data.y > 0;

    var pIdx = book.currentPage;

    if (right) {
      pIdx = pIdx + 1;
      self.pageMod = 1;
    } else self.pageMod = -1;

    page = book.pages[pIdx];

    pivot.position.x = Math.abs(data.x);
    pivot.position.y = data.y;
    pivot.position.z = data.floor ? data.z : 0;//(right ? -0.5 : 0.5);
    
    pivot.rotation.order = "ZYX";
    
    if (pivotCreated) {
      pivot.rotation.y = 0;
      pivot.rotation.z = data.rotation || 0;
      initialX = Math.PI / 2;
      if (!right) {
	initialX *= -1;
	pivot.rotation.y += Math.PI;
	pivot.rotation.z += Math.PI;;
      }
      if ((!data.rotation && !bottom) || 
	  (data.rotation == Math.PI / 2 && Math.abs(data.x) > 250)) {
	initialX *= -1;
      }
    } else {
      pivot.rotation.x = Math.PI / 2;
    
      if (!right) {
	pivot.rotation.x *= -1;
	pivot.rotation.y = Math.PI;
	pivot.rotation.z = Math.PI;
      } 
      pivot.rotation.z += data.rotation || 0;

      if ((!data.rotation && !bottom) || 
	  (data.rotation == Math.PI / 2 && Math.abs(data.x) > 250)) {
	pivot.rotation.x *= -1;
      }
      
      initialX = pivot.rotation.x;
      pivot.scale.x = pivot.scale.y = pivot.scale.z = data.scale || 1;
    }

    if (pivot.parent != page) {
      if (pivot.parent) pivot.parent.remove(pivot);
      page.add(pivot);
    }

    pivotCreated = true;
  };

  this.show = function() {
    var toX = data.floor ? pivot.rotation.x : 0;
    new TWEEN.Tween(pivot.rotation).delay(1000).to( {x: toX}, 1000).easing(TWEEN.Easing.Linear.None).start();
  };

  this.hide = function() {
    new TWEEN.Tween(pivot.rotation).to( {x: initialX}, 1000).easing(TWEEN.Easing.Linear.None).onComplete(function() {
	pivot.remove(pivot.children[0]);
	page.remove(pivot);
      }).start();
  };

  var image = $("<img src='img/" + data.type + ".png' class='" + data.class + "' style='z-index:" + (data.y + 500) +"'/>");
  image.load(function() {
    var obj = new THREE.CSS3DObject(this);
    obj.rotation.x = Math.PI / 2;

    console.log("Image: ", data.type + " >", this.height); 

    if (!data.floor)
      obj.position.z =  this.height / 2 + parseInt(data.z);
      
    if (!pivotCreated) {
      pivot = new THREE.Object3D();
      self.pivot = pivot;
      pivot.add(obj);
      
      self.updatePivot();
      self.show();
    } else {
      pivot.remove(pivot.children[0]);
      pivot.add(obj);
    }
  });

  this.element = image;
};

module.exports = Sprite;
