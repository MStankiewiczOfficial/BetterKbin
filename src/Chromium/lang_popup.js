const ShareWithKbin = document.getElementById('textShareWithKbin');
const Share = document.getElementById('share');
const Settings = document.getElementById('settings');
const AutoThemeSwitch = document.getElementById('textAutoThemeSwitch');


function translate() {
    chrome.storage.sync.get(
        { language: 'language' },
        (items) => {
            if (items.language == 1) {
                ShareWithKbin.innerText = "Share with /kbin";
                Share.innerText = "Share";
                Settings.innerText = "Open options";
                AutoThemeSwitch.innerText = "Enable automatic theme switching";
            }
            else
            if (items.language == 2) {
                ShareWithKbin.innerText = "Udostępnij na /kbin";
                Share.innerText = "Udostępnij";
                Settings.innerText = "Otwórz ustawienia";
                AutoThemeSwitch.innerText = "Włącz automatyczną zmianę motywu";
            }
        }
    );
}

document.addEventListener('DOMContentLoaded', translate);