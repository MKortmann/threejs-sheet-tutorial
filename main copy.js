// There are different way to import the library 
// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import * as THREE from './Threejs/three.module.js';
// Orbit controls allow the camera to orbit around a target.
import { OrbitControls } from './Threejs/OrbitControls.js';
// CSS2DRenderer is a simplified version of CSS3DRenderer. The only transformation that is supported is translation.
// import { CSS2DRenderer, CSS2DObject } from './Threejs/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from './Threejs/CSS3DRenderer.js';

// Create a new scene object. - Scenes allow you to set up what and where is to be rendered by three.js. 
const scene = new THREE.Scene();

// Create a new camera object. - The camera defines the portion of the scene that is visible.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a new renderer object. - The renderer renders the scene using the camera.
const renderer = new THREE.WebGLRenderer();

// Set the size of the renderer to the size of the window.
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the document.
document.body.appendChild(renderer.domElement);

// Create a new geometry object. - Geometres define the shape of an object. Cube 
// BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
const geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// We added a MeshPhongMaterial to the cube. This material allows the cube to be lit by the lights in the scene.
// const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const material = new THREE.MeshPhongMaterial();

const cube = new THREE.Mesh(geometry, material);
cube.position.x = 1;
cube.position.y = 1;
cube.position.z = 0;
// Add the cube to the scene.
scene.add(cube)

// add second cube
const cube2 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0xff0000}));
cube2.position.set(-1,1,0);
scene.add(cube2);

// add third cube
const cube3 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0x0000ff}));
cube3.position.set(-1,0,-1);
scene.add(cube3);


// Move the camera out on the z-axis.
camera.position.x = 0;
// camera high
camera.position.y = 0;
camera.position.z = 5;

// set the camera to look at the cube position (0,0,0).
camera.lookAt(0,0,0)

// A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb
// PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
const pointLight = new THREE.PointLight(0xFFFFFF, 9,100);
pointLight.position.set(0,0,2);
scene.add(pointLight)

// The Ambient Light - This light globally illuminates all objects in the scene equally. This light cannot be used to cast shadows as it does not have a direction.
// soft white light 0x404040
// AmbientLight( color : Integer, intensity : Float )
const ambientLight = new THREE.AmbientLight(0x404040, 0.1);
scene.add(ambientLight)

// CSS2DRenderer( parameters : Object )
const css2DRenderer = new CSS2DRenderer();
css2DRenderer.setSize(window.innerWidth, window.innerHeight);
css2DRenderer.domElement.style.position = 'absolute';
css2DRenderer.domElement.style.top = '0';

// // // Create an HTML element
const label1 = createLabel('Cube 1', cube);
createLabel('Cube 2', cube2);
createLabel('Cube 3', cube3);

function createLabel(text, cube) {
  const divLabel = document.createElement('div');
  divLabel.className = 'label';
  divLabel.textContent = text;
  const label = new CSS2DObject(divLabel);
  // label.position.clone(cube.position)
  label.position.set(cube.position.x, cube.position.y + 1, cube.position.z);
  scene.add(label);
  return label;
}


// Initialize the OrbitControls object.
// OrbitControls( object : Camera, domElement : HTMLDOMElement )
// domElement: The HTML element used for event listeners. By default this is the whole document, but if you only want to use part of the page you can set it to a specific element.
const controls = new OrbitControls(camera, renderer.domElement);

const animate = () => { 
  requestAnimationFrame(animate);
  // udpate the camera
  controls.update();
  renderer.render(scene, camera);
};

// Load the object to load the texture
const textureLoader = new THREE.TextureLoader();
// Load the texture and renderer
const texture = textureLoader.load('texture.jpg',() => {
  // This part of code will be loaded after the texture is loaded.To allow the texture to be loaded before the render.
  // Set the texture to the material
  material.map = texture;
  // optimize the texture
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2,2);
  // renderer.render(scene, camera);	
  animate();
});

// // Render
// renderer.render(scene, camera);	

// setTimeout(() => {
//   renderer.render(scene, camera);	
// }, 100)

// Function to animate
// const animate = () => {
//   // Call the animate function on the next frame.
//   requestAnimationFrame(animate);

//   // Rotate the cube on the x and y axes.
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   // cube.rotation.z += 0.04;

//   // Render
//   renderer.render(scene, camera);	
// }

// animate();
// Function to animate
// const animate = () => {
//   // Call the animate function on the next frame.
//   requestAnimationFrame(animate);

//   // Rotate the cube on the x and y axes.
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   // cube.rotation.z += 0.04;

//   // Render
//   renderer.render(scene, camera);	
// }

// animate();
