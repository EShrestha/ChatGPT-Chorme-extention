document.addEventListener("DOMContentLoaded", () => {
    console.log("Opened settings.")
    openAnimate();
});

const openAnimate = () => {
    console.log("Animate ran.")
    document.getElementsByTagName("html")[0].style.transition =
    `width 250ms ease-in,
    height 250ms ease-in
    `;

    setTimeout(() => {
        // Animate expand of popup to these units
        document.getElementsByTagName("html")[0].style.width="200px";
        document.getElementsByTagName("html")[0].style.height="250px";
    
    }, 100);
}

const backBtn = document.getElementById("back-btn");
const infoDiv = document.getElementById("info-div");
const tokenIcon = document.getElementById("token-icon")

backBtn.addEventListener('click', () => {
    console.log("Back!");
    console.log("Animate ran.")
    document.getElementsByTagName("html")[0].style.transition =
        `width 250ms ease-in,
    height 250ms ease-in
    `;

    setTimeout(() => {
        // Animate expand of popup to these units
        document.getElementsByTagName("html")[0].style.width = "100px";
        document.getElementsByTagName("html")[0].style.height = "100px";
    }, 100);

    setTimeout(() => {
        window.location.pathname = "../popup.html";
    }, 350)
});

tokenIcon.addEventListener('click', () => {
    console.log("clicked 4");
    chrome.tabs.create({"url":"https://beta.openai.com/account/api-keys"},()=>{})
});