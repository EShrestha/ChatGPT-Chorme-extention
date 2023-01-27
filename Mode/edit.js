const sendBtn = document.getElementById("send-btn");
const backBtn = document.getElementById("back-btn");
const promptInput = document.getElementById("prompt-input");
const textarea = document.getElementById("textarea");

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

const sendRequest = async() => {
    let valid = true;
    let token = "";
    let creativity = "";

    console.log("Before:", valid, token, creativity)

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


    if (valid && promptInput.value.length > 10 && textarea.value.length > 10) {

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
                'input': `${textarea.value}`,
                'instruction': `${promptInput.value}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Success:", data)
                promptInput.classList.remove("loading");
                promptInput.select();
                textarea.value = data.choices[0].text.replace(/^\s*|\s*$/g, "");;
                


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
    console.log("Opened edit.")
    openAnimate();
});



