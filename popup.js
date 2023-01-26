document.addEventListener("DOMContentLoaded", () => {
    console.log("Opened popup.")
    document.getElementsByTagName("html")[0].style.width="100px";
    document.getElementsByTagName("html")[0].style.height="100px";
});

const openAnimate = () => {
    console.log("Animate ran.")
    document.getElementsByTagName("html")[0].style.transition =
    //`width 400ms cubic-bezier(0.18, 0.89, 0.05, 1.51),
    //height 400ms cubic-bezier(0.18, 0.89, 0.05, 1.51)
    `width 350ms ease-in,
    height 350ms ease-in
    `;

    // Animate expand of popup to these units
    document.getElementsByTagName("html")[0].style.width="100px";
    document.getElementsByTagName("html")[0].style.height="100px";
}


let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");

box1.addEventListener('click', () => {
    console.log("clicked 1");
    window.location.pathname = "./Mode/text.html";
});

box2.addEventListener('click', () => {
    console.log("clicked 2");
    window.location.pathname = "./Mode/edit.html";
});

box3.addEventListener('click', () => {
    console.log("clicked 3");
    window.location.pathname = "./Mode/image.html";
});
