const sendBtn = document.getElementById("send-btn");
const backBtn = document.getElementById("back-btn");
const textarea = document.getElementById("textarea");
const promptInput = document.getElementById("prompt-input");

const openAnimate = () => {
    console.log("Animate ran.")
    document.getElementsByTagName("html")[0].style.transition =
    `width 250ms ease-in,
    height 250ms ease-in
    `;
    
    setTimeout(() => {
        // Animate expand of popup to these units
        document.getElementsByTagName("html")[0].style.width="600px";
        document.getElementsByTagName("html")[0].style.height="100px";
        
    }, 100);
    promptInput.focus();
}


sendBtn.addEventListener('click', () => {
    
})

backBtn.addEventListener('click', () => {
    chrome.storage.sync.set({ "backFromPage": true }).then(() => { });
    
    
    setTimeout(() => {
        // Animate expand of popup to these units
        textarea.style.width="0px";
        textarea.style.height="0px";
        document.getElementsByTagName("html")[0].style.width = "100px";
        document.getElementsByTagName("html")[0].style.height = "100px";
    }, 100);
    
    setTimeout(() => {
        window.location.pathname = "../popup.html";
    }, 350)
});
















document.addEventListener("DOMContentLoaded", () => {
    console.log("Opened edit.")
    openAnimate();
});



