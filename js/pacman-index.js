// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables


var player = new THREE.Group();
var enemy = new THREE.Group();




var collidableMeshList = [];

var arrowList = [];
var unitDirections = {
  left: new THREE.Vector3(-1, 0, 0),
  right: new THREE.Vector3(1, 0, 0),
  up: new THREE.Vector3(0, 0, -1),
  down: new THREE.Vector3(0, 0, 1)
}

const availableDirections = {
  up: true,
  down: true,
  left: true,
  right: true
}

let lastDirection = null

const COLLISION_THRESHOLD = 5
let leftCollider, rightCollider, upCollider, downCollider
const corridor = 55



init();
animate();

// FUNCTIONS
function init() {
  // SCENE
  scene = new THREE.Scene();
  // CAMERA
  var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;
  var VIEW_ANGLE = 45,
    ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
    NEAR = 0.1,
    FAR = 20000;
    // camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 900, 0);
  camera.lookAt(scene.position);
  var axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
  // RENDERER
  if (Detector.webgl)
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
  else
    renderer = new THREE.CanvasRenderer();
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  container = document.getElementById('ThreeJS');
  container.appendChild(renderer.domElement);
  // EVENTS
  THREEx.WindowResize(renderer, camera);
  THREEx.FullScreen.bindKey({
    charCode: 'm'.charCodeAt(0)
  });
  // CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  // STATS
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild(stats.domElement);
  // LIGHT
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 250, 0);
  scene.add(light);
  // FLOOR
  var floorMaterial = new THREE.MeshBasicMaterial({
    color: 0x444444,
    side: THREE.DoubleSide
  });
  var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.5;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);
  // SKYBOX/FOG
  var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
  var skyBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0x9999ff,
    side: THREE.BackSide
  });
  var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  scene.add(skyBox);

  ////////////
  // CUSTOM //
  ////////////

  player.position.set(150, 25, 125)
  scene.add(player)

  enemy.position.set(-150, 25, -125)
  scene.add(enemy)

  var cubeGeometry = new THREE.CylinderGeometry( 25, 25, 20, 32 );;
  var wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });
  var playerMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: false
    });
  var enemyMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: false
    });
  const MovingCubePlayer = new THREE.Mesh(cubeGeometry, playerMaterial);
  MovingCubePlayer.position.set(0, 0, 0);
  player.add(MovingCubePlayer);

  const MovingCubeEnemy = new THREE.Mesh(cubeGeometry, enemyMaterial);
  MovingCubeEnemy.position.set(0, 0, 0);
  enemy.add(MovingCubeEnemy);



  var colliderGeometry = new THREE.CubeGeometry(1, 50, 50, 5, 5, 5);
  var colliderMaterial = new THREE.MeshBasicMaterial({
    color: 0xfffff00,
    wireframe: false,
    transparent: true,
    opacity: 0.2
  });

  leftCollider = new THREE.Mesh(colliderGeometry, colliderMaterial);
  leftCollider.position.set(-24.4999, 0, 0);
  player.add(leftCollider);

  rightCollider = new THREE.Mesh(colliderGeometry, colliderMaterial);
  rightCollider.position.set(24.4999, 0, 0);
  player.add(rightCollider);

  upCollider = new THREE.Mesh(colliderGeometry, colliderMaterial);
  upCollider.position.set(0, 0, -24.4999);
  upCollider.rotation.y = Math.PI / 2
  player.add(upCollider);

  downCollider = new THREE.Mesh(colliderGeometry, colliderMaterial);
  downCollider.position.set(0, 0, 24.4999);
  downCollider.rotation.y = Math.PI / 2
  player.add(downCollider);

  var wallGeometry = new THREE.CubeGeometry(150, 50, 50, 1, 1, 1);
  var wallMaterial = new THREE.MeshBasicMaterial({
    color: 0x8888ff
  });
  var wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
  });
  var playerMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: false
  });
  //
  // var wall = new THREE.Mesh(wallGeometry, wallMaterial);
  // wall.position.set(100, 25, -100);
  // scene.add(wall);
  // collidableMeshList.push(wall);
  //
  //
  // var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
  // wall2.position.set(-150, 25, 0);
  // wall2.rotation.y = 3.14159 / 2;
  // scene.add(wall2);
  // collidableMeshList.push(wall2);


    //
    // var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    // wall.position.set(-50, 25, 0);
    // wall.rotation.y = 3.14159 / 2;
    // scene.add(wall);
    // collidableMeshList.push(wall);
    //
    //
    //     var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    //     wall.position.set(50, 25, 0);
    //     wall.rotation.y = 3.14159 / 2;
    //     scene.add(wall);
    //     collidableMeshList.push(wall);

    // detectCollision(player,'left')

    // center walls
    addWall(wallGeometry, wallMaterial, -75, 0, Math.PI/2)
    addWall(wallGeometry, wallMaterial, 75, 0, Math.PI/2)

    // right from center walls
    addWall(wallGeometry, wallMaterial, 200, 125, Math.PI/2)
    addWall(wallGeometry, wallMaterial, 200, -125, Math.PI/2)

    // left from center walls
    addWall(wallGeometry, wallMaterial, -200, 125, Math.PI/2)
    addWall(wallGeometry, wallMaterial, -200, -125, Math.PI/2)

    // top horizontal line
    addWall(wallGeometry, wallMaterial, -100, -175, 0)
    addWall(wallGeometry, wallMaterial, 25, -175, 0)

    // bottom horizontal line
    addWall(wallGeometry, wallMaterial, -25, 175, 0)
    addWall(wallGeometry, wallMaterial, 100, 175, 0)



}

function clearText() {
  document.getElementById('message').innerHTML = '..........';
}

function appendText(txt) {
  document.getElementById('message').innerHTML += txt;
}

function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

function update() {
  var delta = clock.getDelta(); // seconds.
  var moveDistance = 200 * delta; // 200 pixels per second





  let possiblePosition = {
    left: player.position.clone().add(unitDirections.left) * moveDistance,
    right: player.position.clone() + unitDirections.right * moveDistance,
    up: player.position.clone() + unitDirections.up * moveDistance,
    down: player.position.clone() + unitDirections.down * moveDistance
  }

  if (keyboard.pressed("left")) {
    enemy.position.x += moveDistance * availableDirections.right;
    // lastDirection = 'right'
    // if (availableDirections.right) availableDirections.left = true
  }

    if (keyboard.pressed("left")) {
      player.position.x -= moveDistance * availableDirections.left;
      lastDirection = 'left'
      if (availableDirections.left) availableDirections.right = true
    }
  if (keyboard.pressed("right")) {
    player.position.x += moveDistance * availableDirections.right;
    lastDirection = 'right'
    if (availableDirections.right) availableDirections.left = true
  }
  if (keyboard.pressed("up")) {
    player.position.z -= moveDistance * availableDirections.up;
    lastDirection = 'up'
    if (availableDirections.up) availableDirections.down = true


  }
  if (keyboard.pressed("down")) {
    player.position.z += moveDistance * availableDirections.down;
    lastDirection = 'down'
    if (availableDirections.down) availableDirections.up = true
  }

  // collision detection:
  //   determines if any of the rays from the cube's origin to each vertex
  //		intersects any face of a mesh in the array of target meshes
  //   for increased collision accuracy, add more vertices to the cube;
  //		for example, new THREE.CubeGeometry( 64, 64, 64, 8, 8, 8, wireMaterial )
  //   HOWEVER: when the origin of the ray is within the target mesh, collisions do not occur
  var originPoint = player.position.clone();

  clearText();

  detectCollision(player,'left')
  detectCollision(player,'right')
  detectCollision(player,'up')
  detectCollision(player,'down')



  controls.update();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

function addWall(wallGeometry, wallMaterial, x, z, rotation){
  const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  wall.position.set(x, 25, z);
  wall.rotation.y = rotation;
  scene.add(wall);
  collidableMeshList.push(wall);
}

function detectCollision(obj,direction){
  // console.log(leftCollider.geometry.vertices)
  // console.log(obj.position)
  // console.log(leftCollider.geometry.vertices.map(vertex => vertex.clone().add(obj.position)))
  // console.log('!!!!!!!!');

  const collider = {left: leftCollider,right: rightCollider,up: upCollider,down: downCollider}

  // console.log(collider[direction].geometry.vertices.length);
  const distance = collider[direction].geometry.vertices
      .map(relativeVertex => relativeVertex.clone().add(obj.position))
      .map(absoluteVertex => (direction === 'left' || direction === 'right') ? absoluteVertex.addScaledVector(unitDirections[direction],25) : absoluteVertex)
      .map(absoluteVertex => new THREE.Raycaster(absoluteVertex, unitDirections[direction]) )
      .map(ray  => ray.intersectObjects(collidableMeshList))
      .map(collisionResults => collisionResults[0] ? collisionResults[0].distance : Infinity)
      .reduce((acc, dist) => acc < dist ? acc : dist, Infinity)

  // console.log(direction, distance);
  if (distance < Infinity){
    if (distance < COLLISION_THRESHOLD && lastDirection !== opposite(direction)) {
      appendText(" Hit ");
			availableDirections[direction]= false
      obj.position.addScaledVector(unitDirections[direction], distance-0.001)
    } else if (distance < COLLISION_THRESHOLD && lastDirection !== direction){
      availableDirections[direction]= true
    }
  } else {
    availableDirections[direction]= true
  }
}


function opposite(direction){
  if (direction === 'left') return 'right'
  if (direction === 'right') return 'left'
  if (direction === 'up') return 'down'
  if (direction === 'down') return 'up'
}
