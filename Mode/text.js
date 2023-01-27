const sendBtn = document.getElementById("send-btn");
const backBtn = document.getElementById("back-btn");
const outputDiv = document.getElementById("output-div");
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
        document.getElementsByTagName("html")[0].style.height="50px";
        
    }, 100);
    promptInput.focus();

}

const openOutput = () => {
    outputDiv.style.transition =
    `width 250ms ease-in,
    height 250ms ease-in
    `;
    outputDiv.style.display = "block";
    setTimeout(() => {
        // Animate expand of popup to these units
        outputDiv.style.width="600px";
        outputDiv.style.height="100px";
        
    }, 100);
}

let x;
sendBtn.addEventListener('click', async () => {
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


    if (valid && promptInput.value.length > 10) {

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
                'max_tokens': 1024
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Success:", data)

                promptInput.classList.remove("loading");
                outputDiv.innerText = data.choices[0].text.replace(/^\s*|\s*$/g, "");;
                openOutput();
                


            })
            .catch((error) => {
                promptInput.classList.remove("loading");
                openOutput();
                outputDiv.value = `Uh oh!\nPlease make sure your prompt is valid (more than 10 characters),\nor that you have a valid bearer token saved in Settings.`
                console.error("Error:", error)
            });
    } else {
        openOutput();
        outputDiv.value = `Uh oh!\nPlease make sure your prompt is valid (more than 10 characters),\nor that you have a valid bearer token saved in Settings.`
    }
    


})

backBtn.addEventListener('click', () => {
    chrome.storage.sync.set({ "backFromPage": true }).then(() => { });

    console.log("Back!");
    console.log("Animate ran.")
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








document.addEventListener("DOMContentLoaded", () => {
    console.log("Opened text.")
    openAnimate();
});




