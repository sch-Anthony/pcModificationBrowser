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
    { name: "Kirby", description: "냠냠, 커비는 대충 오른쪽 뒤에 있슨 만든샛기가 000으로 정렬 안한듯"},
];
let currentModel = 0;


// three reset(only once)
function initViewer() {
    if (viewerInitialized) return;
    viewerInitialized = true;

    const viewContainer = document.getElementById("viewerArea");
    //console.log("viewerArea 크기:", viewContainer.clientWidth, viewContainer.clientHeight);
    

    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xff0000); // 빨간 배경 임시
    
    camera = new THREE.PerspectiveCamera(
        60, //fov
        viewContainer.clientWidth / viewContainer.clientHeight, //ratio
        0.1, // nearest render range
        1000  // farest render range
    );
    camera.position.set(0, 1, 4);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(viewContainer.clientWidth, viewContainer.clientHeight);
    viewContainer.appendChild(renderer.domElement);
    //console.log("canvas 추가됨:", renderer.domElement); // 추가

    controls = new OrbitControls(camera, renderer.domElement);

    const light1 = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(5, 5, 5);
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xa6bed8, 0.8)
    light3.position.set(-5,-5,-5);
    scene.add(light3);

    window.addEventListener("resize", () => {
        camera.aspect = viewContainer.clientWidth / viewContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(viewContainer.clientWidth, viewContainer.clientHeight);
    });

    controls.target.set(0, 0, 0);  // camera facing 000
    controls.update();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.scale.set(0.1,0.1,0.1);
}

function setCamera(posX,posY,posZ,facX,facY,facZ){
  controls.target.set(facX,facY,facZ);
  camera.position.set(posX,posY,posZ);
}
function resetCamera(){
  controls.target.set(0,0,0);
  camera.position.set(0,1,4);
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

    // 씨팔이게 안될리가없는데
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.set(0,0,0);

    model.scale.set(10, 10, 10); // fuck makeit biiiiiiig

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

    // display first
    document.getElementById("titleScreen").style.display = "none";
    document.getElementById("mainFeature").style.display = "flex";
    document.body.style.background = "white";

    closeCreditList();

    // reset
    requestAnimationFrame(function() {
        initViewer();
        startViewer();
        currentModel = 0;
        updateModel();
        resetCamera();
    });
}

function nextModel() {
    currentModel = (currentModel + 1) % models.length;
    updateModel();
    resetCamera();
}

function prevModel() {
    currentModel = (currentModel - 1 + models.length) % models.length;
    updateModel();
    resetCamera();
}


// HTML onclick 및 ui.js에서 접근 가능하도록 전역 등록   <  이게뭔소린지 아직도 모름
window.openMain = openMain;
window.nextModel = nextModel;
window.prevModel = prevModel;
window.stopViewer = stopViewer;