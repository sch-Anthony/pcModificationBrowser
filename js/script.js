import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const viewContainer = document.getElementById("viewerArea");
const modelScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
60,
viewContainer.clientWidth / viewContainer.clientHeight,
0.1,
1000
);
camera.position.set(0,1,4);
const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setSize(viewContainer.clientWidth,viewContainer.clientHeight);

viewContainer.appendChild(renderer.domElement)

const light1 = new THREE.HemisphereLight(0xffffff,0x444444,1);
modelScene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff,1);
light2.position.set(5,5,5);
modelScene.add(light2);

const loader = new GLTFLoader();

let model;

function loadModel(path){
if(model){
modelScene.remove(model);
}
loader.load(path,(gltf)=>{
model = gltf.modelScene;
modelScene.add(model);
});
}

loadModel("./models/CPU.glb")

function animate(){
requestAnimationFrame(animate);
controls.update();
renderer.render(modelScene,camera);
}
animate();

const models = [
{
name:"A",
description:"A 모델의 설명입니다."
},

{
name:"B",
description:"B 모델의 설명입니다."
}

];
let currentModel = 0;

function updateModel(){

document.getElementById("modelName").innerText =
models[currentModel].name;
document.getElementById("infoTitle").innerText =
models[currentModel].name;
document.getElementById("modelDescription").innerText =
models[currentModel].description;

loadModel("./models/" + models[currentModel].name + ".glb");

}

function openMain()
  {

  document.getElementById("titleScreen").style.display="none";
  document.getElementById("mainFeature").style.display="flex";
  document.body.style.background="white";
    closeCreditList();

    currentModel = 0;
    updateModel();
}

function nextModel(){
currentModel++;

if(currentModel >= models.length){
  currentModel = 0;
  }
updateModel();
}

function prevModel(){
currentModel--;

if(currentModel < 0){
  currentModel = models.length - 1;
  }
updateModel();
}

function toggleInfo(){

let panel = document.getElementById("infoPanel");
let btn = document.getElementById("infoButton");

panel.classList.toggle("open");
btn.classList.toggle("open")

if(panel.classList.contains("open")){
btn.innerHTML="⟫";
}else{
btn.innerHTML="⟪";
}

}

function toggleCreditList(){
let dev = document.getElementById("credit");

if(dev.style.display==="flex"){
    dev.style.display="none";
}
else{
    dev.style.display="flex";

    dev.scrollIntoView({
        behavior: "smooth"
    });

}

}

function closeCreditList()
  {

  let dev = document.getElementById("credit");

  if(dev.style.display==="flex" || dev.style.display==="")
    {
       dev.style.display="none";
    }

}

function backToTitle()
  {
    if(document.getElementById("mainFeature").style.display==="flex")
    {
      document.getElementById("titleScreen").style.display="flex";
      document.getElementById("mainFeature").style.display="none";
      document.body.style.background="black";
    }
    
    let dev = document.getElementById("titleScreen")
    
    dev.scrollIntoView({behavior : "smooth"});
    
    setTimeout(function()
      {
        closeCreditList();
      }, 700);
  }

// window.addEventListener("load", function(){

//   let box = document.getElementById("modelBox");

//   box.addEventListener("mouseenter", function(){
//     document.body.style.overflow = "hidden";
//   });

//   box.addEventListener("mouseleave", function(){
//     document.body.style.overflow = "auto";
//   });

// });
