import * as THREE from 'three';
import TimestampQueryPool from 'three/src/renderers/common/TimestampQueryPool.js';

function main(){
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    const fov = 75; 
    const near = 0.1;
    const far = 5;
    const aspect = 2;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    const scene = new THREE.Scene();
    const boxWidth = 1;
    const boxheight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxheight, boxDepth);
    const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    renderer.render(scene,camera);
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1,2,4);
    scene.add(light);

    function render(time){
        time*=0.001;
        cube.rotation.x = time;
        cube.rotation.y = time;
        renderer.render(scene,camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render); 
}

main();