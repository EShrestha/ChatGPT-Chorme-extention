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
let box4 = document.getElementById("box4");
let box5 = document.getElementById("box5");

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


box4.addEventListener('click', () => {
    console.log("clicked 4");
    chrome.tabs.create({"url":"https://www.buymeacoffee.com/Airdik", "pinned":true},()=>{})
});
box5.addEventListener('click', () => {
    console.log("clicked 5");
    window.location.pathname = "./Misc/setting.html";
});