import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function main() {
    // Setup renderer
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        canvas,
        alpha: true
    });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111122);
    
    // Add fog for depth
    scene.fog = new THREE.FogExp2(0x111122, 0.1);

    // Setup camera
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Add orbit controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Add directional light with shadow
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    // Add hemisphere light for natural lighting
    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    scene.add(hemiLight);

    // Create a sphere with a reflective material
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x00aaff,
        shininess: 100,
        specular: 0x111111,
        flatShading: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

    // Add a ground plane
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x333344,
        roughness: 0.8,
        metalness: 0.2
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.5;
    plane.receiveShadow = true;
    scene.add(plane);

    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x88ccff,
        transparent: true,
        opacity: 0.8
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);

    // Animation loop
    function animate(time) {
        requestAnimationFrame(animate);
        
        // Update time
        time *= 0.001;
        
        // Rotate sphere
        sphere.rotation.x = time * 0.2;
        sphere.rotation.y = time * 0.3;
        
        // Animate particles
        const particles = particlesMesh.geometry.attributes.position.array;
        for (let i = 0; i < particles.length; i += 3) {
            particles[i + 1] += Math.sin(time * 0.5 + i) * 0.01;
            if (particles[i + 1] > 10) particles[i + 1] = -10;
        }
        particlesMesh.geometry.attributes.position.needsUpdate = true;
        
        // Update controls
        controls.update();
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate(0);
    
    // Initial resize check
    onWindowResize();
}

// Start the application
main();