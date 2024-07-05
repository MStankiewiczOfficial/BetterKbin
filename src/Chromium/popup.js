let URLtoShare = document.getElementById("textarea");
const theme = document.getElementById('theme').checked;

document.getElementById("settings").addEventListener("click", function() {
    chrome.runtime.openOptionsPage();
});

document.getElementById("share").addEventListener("click", function() {
    if (URLtoShare.value != "") {
        chrome.storage.sync.get(
            { instance: 'instance' },
            (items) => {
                var instance = items.instance;
                var newURL = "https://" + instance + "/new?url=" + URLtoShare.value;
                chrome.tabs.create({ url: newURL });
            }
        );
    }
    else {
        chrome.storage.sync.get(
            { language: 'language' },
            (items) => {
                if (items.language == 1) {
                    var lang = "Please enter an URL.";
                }
                else
                if (items.language == 2) {
                    var lang = "Proszę podać URL.";
                }
                const status = document.getElementById('status');
                status.textContent = lang;
                setTimeout(() => {
                    status.textContent = '';
                }, 3000);
            }
        );
    }
});

const saveOptions = () => {
    const theme = document.getElementById('theme').checked;
    chrome.storage.sync.set(
        { theme: theme },
    );
};

const restoreOptions = () => {
    chrome.storage.sync.get(
        { theme: false },
        (items) => {
            document.getElementById('theme').checked = items.theme;
        }
    );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('theme').addEventListener('click', saveOptions);