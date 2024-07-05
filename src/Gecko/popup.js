let URLtoShare = document.getElementById("textarea");
const theme = document.getElementById('theme').checked;

document.getElementById("settings").addEventListener("click", function() {
    browser.runtime.openOptionsPage();
});

document.getElementById("share").addEventListener("click", function() {
    if (URLtoShare.value != "") {
        browser.storage.local.get(
            { instance: 'instance' },
            (items) => {
                var instance = items.instance;
                var newURL = "https://" + instance + "/new?url=" + URLtoShare.value;
                browser.tabs.create({ url: newURL });
            }
        );
    }
    else {
        browser.storage.local.get(
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
    browser.storage.local.set(
        { theme: theme },
    );
};

const restoreOptions = () => {
    browser.storage.local.get(
        { theme: false },
        (items) => {
            document.getElementById('theme').checked = items.theme;
        }
    );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('theme').addEventListener('click', saveOptions);