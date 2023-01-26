const backBtn = document.getElementById("back-btn");
const infoDiv = document.getElementById("info-div");
const tokenIcon = document.getElementById("token-icon")
const tokenInput = document.getElementById("token-input");
const creativityInput = document.getElementById("creativity-input");
const smallImgInput = document.getElementById("small-img-input");
const mediumImgInput = document.getElementById("medium-img-input");
const largeImgInput = document.getElementById("large-img-input");
const saveBtn = document.getElementById("save-btn")



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

const restoreSettings = () => {
    chrome.storage.sync.get(["token"]).then((result) => {
        console.log("Value currently is " + result.token);
    });

    chrome.storage.sync.get(["creativity"]).then((result) => {
        console.log("Value currently is " + result.creativity);
    });

    chrome.storage.sync.get(["size"]).then((result) => {
        console.log("Value currently is " + result.size);
    });
}


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


saveBtn.addEventListener('click', (e) => {
    let token = tokenInput.value;
    let creativity = (creativityInput.value / 10);
    let size = "";
    
    let radioElement = document.getElementsByName("size");
    for(i = 0; i < radioElement.length; i++) {
        if (radioElement[i].checked) {
            size = radioElement[i].value;
        }
    }
    
    chrome.storage.sync.set({ "token": token }).then(() => {});
    chrome.storage.sync.set({ "creativity": creativity }).then(() => {});
    chrome.storage.sync.set({ "size": size }).then(() => { });

})







document.addEventListener("DOMContentLoaded", () => {
    console.log("Opened settings.")
    openAnimate();
    restoreSettings();
});