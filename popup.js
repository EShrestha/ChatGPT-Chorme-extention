document.addEventListener("DOMContentLoaded", () => {
    console.log("Opened popup.")
    openAnimate();
});

const openAnimate = () => {
    console.log("Animate ran.")
    document.getElementsByTagName("html")[0].style.transition =
    //`width 400ms cubic-bezier(0.18, 0.89, 0.05, 1.51),
    //height 400ms cubic-bezier(0.18, 0.89, 0.05, 1.51)
    `width 350ms ease-in,
    height 350ms ease-in
    `;

    // Animate expand of popup to these units
    document.getElementsByTagName("html")[0].style.width="100px";
    document.getElementsByTagName("html")[0].style.height="100px";
}