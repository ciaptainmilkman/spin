import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Function to load a model and its texture with OrbitControls
function loadModelAndTexture(tag, modelPath, texturePath, position) {
    const canvas = document.querySelector(tag);
    if (!canvas) {
        console.error(`Canvas with tag '${tag}' not found.`);
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0xffffff, 0); // Set clear color to white

    const loader = new GLTFLoader();
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.target.set(position.x, position.y, position.z);
    camera.position.set(position.x, position.y, position.z + 10);

    // Instantiate a TextureLoader
    const textureLoader = new THREE.TextureLoader();

    // Load the texture
    textureLoader.load(
        // resource URL
        texturePath,

        // onLoad callback
        function (texture) {
            // Create a material using the loaded texture
            const material = new THREE.MeshBasicMaterial({
                map: texture
            });

            // Load the model
            loader.load(modelPath,
                // onLoad callback
                function (gltf) {
                    const model = gltf.scene;

                    // Apply the created material to the model's meshes
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.material = material;
                        }
                    });

                    // Ensure the model is visible by setting its position and adding it to the scene
                    model.position.copy(position);
                    scene.add(model);

                    // Animate the scene
                    animate();
                },
                // onProgress callback (optional)
                undefined,
                // onError callback
                function (error) {
                    console.error('Error loading model:', error);
                }
            );
        }
    );

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
}

// Load the models and textures after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
// Load the Sun model with the tag 'planet1'
loadModelAndTexture('#planet1', 'planets/sun.gltf', 'planets/8k_sun.jpg', new THREE.Vector3(0, 0, 0));

// Load the Jupiter model with the tag 'planet2'
loadModelAndTexture('#planet2', 'planets/jupiter.gltf', 'planets/2k_jupiter.jpg', new THREE.Vector3(0, 0, 0));

// Load the Earth model with the tag 'planet3'
loadModelAndTexture('#planet3', 'planets/earth.gltf', 'planets/8k_earth_daymap.jpg', new THREE.Vector3(0, 0, 0));
loadModelAndTexture('#planet4', 'planets/venus.gltf', 'planets/8k_venus_surface.jpg', new THREE.Vector3(0, 0, 0));
loadModelAndTexture('#planet5', 'planets/moon.gltf', 'planets/8k_moon.jpg', new THREE.Vector3(0, 0, 0));
loadModelAndTexture('#planet6', 'planets/mecury.gltf', 'planets/8k_mercury.jpg', new THREE.Vector3(0, 0, 0));
loadModelAndTexture('#planet7', 'planets/mars.gltf', 'planets/8k_mars.jpg', new THREE.Vector3(0, 0, 0));
loadModelAndTexture('#planet8', 'planets/uanus.gltf', 'planets/2k_uranus.jpg', new THREE.Vector3(0, 0, 0));
loadModelAndTexture('#planet9', 'planets/neptune.gltf', 'planets/2k_neptune.jpg', new THREE.Vector3(0, 0, 0));
});
const slides = document.querySelectorAll('.slides img');
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
    }
    // Add event listeners to navigation buttons
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}