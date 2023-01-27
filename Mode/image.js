const sendBtn = document.getElementById("send-btn");
const backBtn = document.getElementById("back-btn");
const textarea = document.getElementById("textarea");
const promptInput = document.getElementById("prompt-input");


const openAnimate = () => {
    document.getElementsByTagName("html")[0].style.transition =
    `width 250ms ease-in,
    height 250ms ease-in
    `;
    
    setTimeout(() => {
        // Animate expand of popup to these units
        document.getElementsByTagName("html")[0].style.width="600px";
        document.getElementsByTagName("html")[0].style.height="70px";
        
    }, 100);
    promptInput.focus();
}

const sendRequest = async() => {
        let valid = true;
    let token = "";
    let size = "512";


    await chrome.storage.sync.get(["token"]).then((result) => {
        if (result.token && result.token.trim() != "") {
            token = result.token;
        } else {
            valid = false;
        }
    });

    await chrome.storage.sync.get(["size"]).then((result) => {
        size = result.size;
    });


    if (valid && promptInput.value.length > 10 ) {

        promptInput.classList.add("loading");
        fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "prompt": `${promptInput.value}`,
                'size':`${size}x${size}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                promptInput.select();
                promptInput.classList.remove("loading");
                textarea.value = data.data[0].url.replace(/^\s*|\s*$/g, "");;
                


            })
            .catch((error) => {
                promptInput.classList.remove("loading");
                textarea.value = "";
                textarea.placeholder = `Uh oh!\nPlease make sure your prompt is valid (more than 10 characters),\nor that you have a valid bearer token saved in Settings.`
                console.error("Error:", error)
            });
    } else {
        textarea.value = "";
        textarea.placeholder = `Uh oh!\nPlease make sure your prompt is valid (more than 10 characters),\nor that you have a valid bearer token saved in Settings.`
    }

}


sendBtn.addEventListener('click', () => {
    sendRequest();
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


promptInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendRequest();
    }
})

textarea.addEventListener("click", () => {
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
})










document.addEventListener("DOMContentLoaded", () => {
    openAnimate();
});


