const sendBtn = document.getElementById("send-btn");
const backBtn = document.getElementById("back-btn");
const promptInput = document.getElementById("prompt-input");
const textarea = document.getElementById("textarea");

const openAnimate = () => {
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

const sendRequest = async () => {
    if (promptInput.value.trim().length == 0 || textarea.value.trim().length == 0) { return; }
    let valid = true;
    let token = "";
    let creativity = "1";


    await chrome.storage.sync.get(["token"]).then((result) => {
        if (result.token && result.token.trim() != "") {
            token = result.token;
        } else {
            valid = false;
        }
    });

    await chrome.storage.sync.get(["creativity"]).then((result) => {
        creativity = result.creativity;
    });


    if (valid && promptInput.value.trim().length > 0 && textarea.value.trim().length > 0) {
        let value = textarea.value;
        if (promptInput.value.trim().length < 10 || textarea.value.trim().length < 10) { textarea.value = `*Caution*\nShort prompts are not recommended as the response can be unexpected\nbut let's see what the AI comes up with!`}

        
        promptInput.classList.add("loading");
        fetch('https://api.openai.com/v1/edits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'model': 'text-davinci-edit-001',
                'temperature': creativity,
                'input': `${value}`,
                'instruction': `${promptInput.value}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                promptInput.classList.remove("loading");
                promptInput.select();
                textarea.value = data.choices[0].text.trim();


            })
            .catch((error) => {
                promptInput.classList.remove("loading");
                textarea.value = "";
                textarea.placeholder = `Uh oh!\nPlease make sure your prompt is appropriate and your text to edit is valid,\nor that you have a valid bearer token saved in Settings.\n\nGet your barer token from:\nbeta.openai.com/account/api-keys`
                console.error("Error:", error)
            });
    } else {
        textarea.value = "";
        textarea.placeholder = `Uh oh!\nPlease make sure your prompt is appropriate and your text to edit is valid,\nor that you have a valid bearer token saved in Settings.\n\nGet your barer token from:\nbeta.openai.com/account/api-keys`
    }

}

sendBtn.addEventListener('click', async () => {
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















document.addEventListener("DOMContentLoaded", () => {
    openAnimate();
});



