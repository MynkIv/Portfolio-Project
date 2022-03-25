//Naming Variables
let scene, camera, renderer, stars, starGeo, canvas;

//Creating Main Function
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  canvas = document.querySelector(".webgl");
  renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(window.innerWidth, 300);
  //(window.innerWidth, window.innerHeight);

  starGeo = new THREE.Geometry();
  for (let i = 0; i < 6000; i++) {
    star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.02;
    starGeo.vertices.push(star);
  }

  let starTexture = new THREE.TextureLoader().load("./img/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: starTexture,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  //window.addEventListener("resize", onWindowResize, false);

  animate();
}

//Resize Window Function
//function onWindowResize() {
//camera.aspect = window.innerWidth / window.innerHeight;
// camera.updateProjectionMatrix();
//renderer.setSize(window.innerWidth, window.innerHeight);
//}

//Animation Function
function animate() {
  starGeo.vertices.forEach((p) => {
    p.velocity += p.acceleration;
    p.y -= p.velocity;

    if (p.y < -200) {
      p.y = 200;
      p.velocity = 0;
    }
  });
  starGeo.verticesNeedUpdate = true;
  stars.rotation.y += 0.002;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
init();

//GSAP Moon Animation
//x- horizontal y-Vertical
const flightPath = {
  curviness: 2,
  autoRotate: true,
  values: [
    { x: 100, y: -20 },
    { x: 100, y: 10 },
    { x: 200, y: 400 },
    { x: 200, y: 500 },
    { x: 200, y: 700 },
    { x: 200, y: 900 },
    { x: -600, y: 900 },
    { x: window.innerHeight, y: window.innerWidth },
  ],
};
const flightPath2 = {
  curviness: 2,
  autoRotate: true,
  values: [
    { x: 200, y: 100 },
    { x: 300, y: 90 },
  ],
};

const tween = new TimelineLite();
//For Ufo
const tween2 = new TimelineLite();
//For Moon Scroll Animation
tween.add(
  TweenLite.to(".moon", 5, {
    bezier: flightPath,
    ease: Power1.easeInOut,
  })
);
//UFO animation
tween2.add(
  TweenLite.to(".ufo", 5, {
    bezier: flightPath2,
    ease: Power1.easeInOut,
  })
);

//Scroll Magic for Moon
const controller = new ScrollMagic.Controller();

const gsapScene = new ScrollMagic.Scene({
  triggerElement: ".gsap-animation",
  duration: 2000,
})
  .setTween(tween)
  .addTo(controller);
//.addIndicators()
