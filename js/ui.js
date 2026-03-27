function backToTitle() {

    if (document.getElementById("mainFeature").style.display === "flex") {
        document.getElementById("titleScreen").style.display = "flex";
        document.getElementById("mainFeature").style.display = "none";
        document.body.style.background = "black";

        stopViewer();
    }

    document.getElementById("titleScreen").scrollIntoView({ behavior: "smooth" });

    setTimeout(function() {
        closeCreditList();
    }, 700);
}

function toggleCreditList() {
    let dev = document.getElementById("credit");

    if (dev.style.display === "flex") {
        dev.style.display = "none";
    } else {
        dev.style.display = "flex";
        dev.scrollIntoView({ behavior: "smooth" });
    }
}

function closeCreditList() {
    let dev = document.getElementById("credit");

    if (dev.style.display === "flex" || dev.style.display === "") {
        dev.style.display = "none";
    }
}

function toggleInfo() {
    let panel = document.getElementById("infoPanel");
    let btn = document.getElementById("infoButton");

    panel.classList.toggle("open");
    btn.classList.toggle("open");

    if (panel.classList.contains("open")) {
        btn.innerHTML = "⟫";
    } else {
        btn.innerHTML = "⟪";
    }
}