import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


// off start
let viewerInitialized = false;
let animating = false;
let scene, camera, renderer, controls;
let model;

// gltf load
const loader = new GLTFLoader();

// model list
const models = [
    { name: "Kirby", description: "냠냠"},
];
let currentModel = 0;


// three reset(only once)
function initViewer() {
    if (viewerInitialized) return;
    viewerInitialized = true;

    const viewContainer = document.getElementById("viewerArea");
    //console.log("viewerArea 크기:", viewContainer.clientWidth, viewContainer.clientHeight);
    

    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xff0000); // 빨간 배경 임시 추가
    
    camera = new THREE.PerspectiveCamera(
        60, //fov
        viewContainer.clientWidth / viewContainer.clientHeight, //ratio
        0.1, // nearest render range
        1000  // farest render range
    );
    camera.position.set(-5, 1, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(viewContainer.clientWidth, viewContainer.clientHeight);
    viewContainer.appendChild(renderer.domElement);
    //console.log("canvas 추가됨:", renderer.domElement); // 추가

    controls = new OrbitControls(camera, renderer.domElement);

    const light1 = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(5, 5, 5);
    scene.add(light2);

    window.addEventListener("resize", () => {
        camera.aspect = viewContainer.clientWidth / viewContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(viewContainer.clientWidth, viewContainer.clientHeight);
    });

    controls.target.set(0, 0, 0);  // 카메라가 원점을 바라보도록
    controls.update();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.scale.set(0.1,0.1,0.1);
}

// render (animating t/f)
function animate() {
    if (!animating) return;
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// start rendering
function startViewer() {
    if (animating) return;
    animating = true;
    animate();
}

// stop rendering
function stopViewer() {
    animating = false;
}


// Gltf load (비동기 = 완료 기다리지 않고 넘김)
function loadModel(path) {

    if (model) {
        scene.remove(model);
        model = null;
    }

    loader.load(path, function(gltf) {
    model = gltf.scene;

    // sub 대신 직접 0으로 설정
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.set(0,0,0);

    model.scale.set(10, 10, 10); // 임시로 크게

    scene.add(model);
    console.log(model.position);
    console.log(camera.position);

    
});
}

// UI text update + reload
function updateModel() {

    document.getElementById("modelName").innerText = models[currentModel].name;
    document.getElementById("infoTitle").innerText = models[currentModel].name;
    document.getElementById("modelDescription").innerText = models[currentModel].description;

    loadModel("./models/" + models[currentModel].name + ".glb");
}


// title to main
function openMain() {

    // display 먼저 변경
    document.getElementById("titleScreen").style.display = "none";
    document.getElementById("mainFeature").style.display = "flex";
    document.body.style.background = "white";

    closeCreditList();

    // 화면이 보인 후에 초기화
    requestAnimationFrame(function() {
        initViewer();
        startViewer();
        currentModel = 0;
        updateModel();
    });
}

function nextModel() {
    currentModel = (currentModel + 1) % models.length;
    updateModel();
}

function prevModel() {
    currentModel = (currentModel - 1 + models.length) % models.length;
    updateModel();
}


// HTML onclick 및 ui.js에서 접근 가능하도록 전역 등록
window.openMain = openMain;
window.nextModel = nextModel;
window.prevModel = prevModel;
window.stopViewer = stopViewer;