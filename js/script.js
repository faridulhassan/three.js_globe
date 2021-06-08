// Users Data
var usersData = [
  {
    lat: 23.8103,
    lon: 90.4125,
    size: 1
  },
  {
    lat: 29.53523,
    lon: 76.262967,
    size: 1
  },
  {
    lat: 30.448674,
    lon: 38.620663,
    size: 1
  },
  {
    lat: 49.382373,
    lon: -66.614873,
    size: 1
  },
  {
    lat: 73.2267,
    lon: -32.138744,
    size: 1
  },
  {
    lat: 45.828799,
    lon: 127.529316,
    size: 1
  }
];
// Utils
function _convertLatLonToVec3(lat, lon) {
  lat = (lat * Math.PI) / 180.0;
  lon = (-lon * Math.PI) / 180.0;
  return new THREE.Vector3(Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon));
}
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
// Variables
var container = document.getElementById("globe_container");
var containerWidth = window.innerWidth,
  containerHeight = window.innerHeight;

container.style.width = containerWidth + "px";
container.style.height = containerHeight + "px";

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
var camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
camera.position.set(0.8364644311960452, 2.5815672623532335, -7.525678555804041);
renderer.setSize(containerWidth, containerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

/* Globe */
var sceneGroup = new THREE.Group();
var radius = 3;
var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(radius, 32, 32),
  new THREE.MeshBasicMaterial({
    // color: 0xffffff,
    map: new THREE.TextureLoader().load("./images/globe.jpg")
  })
);
sceneGroup.add(sphere);

/* User Markers */
var pinnedMarkers = [];
for (var i = 0; i < usersData.length; i++) {
  var marker = new THREE.Mesh(
    new THREE.CylinderGeometry(0.21, 0.21, 0.01, 64, 64, false, 0, 6.3),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("./images/user_" + (i + 1) + ".jpg")
    })
  );
  marker.position.copy(_convertLatLonToVec3(usersData[i].lat, usersData[i].lon).multiplyScalar(radius));

  marker.lookAt(0, 0, 0);
  marker.rotateX(toRadians(90));
  marker.rotateY(-toRadians(90));
  pinnedMarkers.push(marker);
  sceneGroup.add(marker);
}
scene.add(sceneGroup);

/* Animation */
function animate() {
  sceneGroup.rotation.y -= 0.003;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
