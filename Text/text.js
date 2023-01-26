document.addEventListener("DOMContentLoaded", () => {
    console.log("Opened text.")
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
        document.getElementsByTagName("html")[0].style.width="600px";
        document.getElementsByTagName("html")[0].style.height="50px";
    
    }, 100);
}

const sendBtn = document.getElementById("send-btn");
const backBtn = document.getElementById("back-btn");
const outputDiv = document.getElementById("output-div");

sendBtn.addEventListener('click', () => {
    console.log("SENT!");
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
})