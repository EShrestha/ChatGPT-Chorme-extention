const sendBtn = document.getElementById("send-btn");
const backBtn = document.getElementById("back-btn");
const outputDiv = document.getElementById("output-div");
const promptInput = document.getElementById("prompt-input");



const openAnimate = () => {
    document.getElementsByTagName("html")[0].style.transition =
    `width 250ms ease-in,
    height 250ms ease-in
    `;
    
    setTimeout(() => {
        // Animate expand of popup to these units
        document.getElementsByTagName("html")[0].style.width="600px";
        
    }, 100);
    promptInput.focus();

}

const openOutput = () => {
    outputDiv.style.height = '50px';
    outputDiv.style.transition =
    `width 250ms ease-in,
    height 250ms ease-in
    `;
    outputDiv.style.display = "block";
    setTimeout(() => {
        // Animate expand of popup to these units
        outputDiv.style.width="600px";
        
        
    }, 100);
    setTimeout(() => {
        outputDiv.style.height = outputDiv.scrollHeight+5 + 'px';
        
    }, 300);
}

const sendRequest = async() => {
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


    if (valid && promptInput.value.trim().length > 0) {

        promptInput.classList.add("loading");
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'model': 'text-davinci-003',
                'prompt': promptInput.value,
                'temperature': creativity,
                'max_tokens': 2048
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                promptInput.select();
                promptInput.classList.remove("loading");
                let cleanFront = data.choices[0].text.trim().substring(0,4).replace(/\\n/g," ")
                outputDiv.value = cleanFront + data.choices[0].text.trim().substring(4).trim();
                openOutput();
                


            })
            .catch((error) => {
                promptInput.classList.remove("loading");
                openOutput();
                outputDiv.value = `Uh oh!\nPlease make sure your prompt is appropriate,\nor that you have a valid bearer token saved in Settings.`;
            });
    } else {
        openOutput();
        outputDiv.value = `Uh oh!\nPlease make sure your prompt is appropriate,\nor that you have a valid bearer token saved in Settings.`
    }

}

sendBtn.addEventListener('click', async () => {
    sendRequest();
});

backBtn.addEventListener('click', () => {
    chrome.storage.sync.set({ "backFromPage": true }).then(() => { });


    document.getElementsByTagName("html")[0].style.transition =
    `width 250ms ease-in,
    height 250ms ease-in
    `;
    
    setTimeout(() => {
        // Animate expand of popup to these units
        outputDiv.style.width="0px";
        outputDiv.style.height="0px";
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




