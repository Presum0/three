import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerHeight/window.innerWidth, 1, 500);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight, window.innerWidth);
document.body.appendChild(renderer.domElement);

camera.position.set(0,0,100);
camera.lookAt(0,0,0);

const material = new THREE.LineBasicMaterial({color: 0x0000ff});
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line(geometry, material);
scene.add(line);
renderer.render(scene,camera);