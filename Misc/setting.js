const backBtn = document.getElementById("back-btn");
const infoDiv = document.getElementById("info-div");
const tokenIcon = document.getElementById("token-icon")
const tokenInput = document.getElementById("token-input");
const creativityInput = document.getElementById("creativity-input");
const smallImgInput = document.getElementById("small-img-input");
const mediumImgInput = document.getElementById("medium-img-input");
const largeImgInput = document.getElementById("large-img-input");



const openAnimate = () => {
    document.getElementsByTagName("html")[0].style.transition =
    `width 250ms ease-in,
    height 250ms ease-in
    `;
    
    setTimeout(() => {
        // Animate expand of popup to these units
        document.getElementsByTagName("html")[0].style.width="275px";
        document.getElementsByTagName("html")[0].style.height="250px";
        
    }, 100);
}

const restoreSettings = () => {
    chrome.storage.sync.get(["token"]).then((result) => {
        if(result.token)
            tokenInput.value = result.token;
    });

    chrome.storage.sync.get(["creativity"]).then((result) => {
        if (result.creativity)
            creativityInput.value = (result.creativity * 10);
    });

    chrome.storage.sync.get(["size"]).then((result) => {
        let radioElement = document.getElementsByName("size");
        for(i = 0; i < radioElement.length; i++) {
            if (radioElement[i].value === result.size) {
                radioElement[i].checked = true;
                break;
            }
        }
    });

    // Default page
    chrome.storage.sync.get(["page"]).then((result) => {
        let radioElement = document.getElementsByName("default-page");
        for(i = 0; i < radioElement.length; i++) {
            if (radioElement[i].value === result.page) {
                radioElement[i].checked = true;
                break;
            }
        }
    });

    
    
}


backBtn.addEventListener('click', () => {
    chrome.storage.sync.set({ "backFromPage": true }).then(() => { });
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
    chrome.tabs.create({"url":"https://beta.openai.com/account/api-keys"},()=>{})
});



tokenInput.addEventListener('change', () => {
    let token = tokenInput.value.trim();
    if (tokenInput.value.trim().length > 0) {
        chrome.storage.sync.set({ "token": token }).then(() => {});
    }
})


creativityInput.addEventListener('change', () => {
    let creativity = (creativityInput.value / 10);
    chrome.storage.sync.set({ "creativity": creativity }).then(() => {});
})




document.addEventListener("DOMContentLoaded", () => {
    openAnimate();
    restoreSettings();
    var sizeRadios = document.querySelectorAll('input[type=radio][name="size"]');
    sizeRadios.forEach(radio => radio.addEventListener('change', () => {
    chrome.storage.sync.set({ "size": radio.value }).then(() => { });

    }));

    var pageRadio = document.querySelectorAll('input[type=radio][name="default-page"]');
    pageRadio.forEach(radio => radio.addEventListener('change', () => {
        chrome.storage.sync.set({ "page": radio.value }).then(() => { });

    }));
});