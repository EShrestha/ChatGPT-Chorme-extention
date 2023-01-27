
const checkDefaultPage = async() => {
    
    let backFromPage;
    await chrome.storage.sync.get(["backFromPage"]).then((result) => {
        if (result.backFromPage){backFromPage = true}
    });
    
    if (backFromPage) {
        chrome.storage.sync.set({ "backFromPage": false }).then(() => { });
        return;
    }
    
    await chrome.storage.sync.get(["page"]).then((result) => {
        
        
        if (backFromPage) { return; }
        switch (result.page) {
            case "text":
                window.location.pathname = "./Mode/text.html";
                break;
                case "edit":
                    window.location.pathname = "./Mode/edit.html";
                    break;
                    case "image":
                        window.location.pathname = "./Mode/image.html";
                        break;
                        
                    }
                });
            }

            
            let box1 = document.getElementById("box1");
            let box2 = document.getElementById("box2");
            let box3 = document.getElementById("box3");
            let box4 = document.getElementById("box4");
            let box5 = document.getElementById("box5");
            
            box1.addEventListener('click', () => {
                window.location.pathname = "./Mode/text.html";
            });
            
            box2.addEventListener('click', () => {
                window.location.pathname = "./Mode/edit.html";
            });
            
            box3.addEventListener('click', () => {
                window.location.pathname = "./Mode/image.html";
            });
            
            
            box4.addEventListener('click', () => {
    chrome.tabs.create({"url":"https://www.buymeacoffee.com/Airdik", "pinned":true},()=>{})
});
box5.addEventListener('click', () => {
    window.location.pathname = "./Misc/setting.html";
});
checkDefaultPage();
document.addEventListener("DOMContentLoaded", () => {
    document.getElementsByTagName("html")[0].style.width="100px";
    document.getElementsByTagName("html")[0].style.height = "100px";
});