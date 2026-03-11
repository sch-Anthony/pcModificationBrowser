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

window.addEventListener("load", function(){

let box = document.getElementById("modelBox");

box.addEventListener("mouseenter", function(){
  document.body.style.overflow = "hidden";
});

box.addEventListener("mouseleave", function(){
  document.body.style.overflow = "auto";
});

});