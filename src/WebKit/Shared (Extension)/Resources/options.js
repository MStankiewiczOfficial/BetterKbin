const saveOptions = () => {
    const instance = document.getElementById('instance').value;
    const theme = document.getElementById('theme').checked;
    const themeLight = document.querySelector('#themeLight').value;
    const themeDark = document.querySelector('#themeDark').value;
    const language = document.querySelector('#language').value;
    const openInNewTab = document.getElementById('openInNewTab').checked;
    const useBetterPageNavigation = document.getElementById('useBetterPageNavigation').checked;
    if (instance) {
        browser.storage.local.set(
            { instance: instance, theme: theme, themeLight: themeLight, themeDark: themeDark, language: language, openInNewTab: openInNewTab, useBetterPageNavigation: useBetterPageNavigation },
            () => {
                translate();
                const status = document.getElementById('status');
                if (language == 1) {
                    var lang = "Options saved.";
                }
                else
                if (language == 2) {
                    var lang = "Ustawienia zapisane.";
                }
                status.textContent = lang;
                setTimeout(() => {
                    status.textContent = '';
                }, 3000);
            }
        );
    }
    else {
        browser.storage.local.get(
            { language: 'language' },
            (items) => {
                if (items.language == 1) {
                    var lang2 = "Please enter an instance.";
                }
                else
                if (items.language == 2) {
                    var lang2 = "Proszę podać adres instancji.";
                }
                const status = document.getElementById('status');
                status.textContent = lang2;
                setTimeout(() => {
                    status.textContent = '';
                }, 3000);
            }
        );
    }
};

const restoreOptions = () => {
    browser.storage.local.get(
        { instance: 'kbin.social', theme: false, themeLight: 1, themeDark: 1, language: 1, openInNewTab: false, useBetterPageNavigation: false },
        (items) => {
            document.getElementById('instance').value = items.instance;
            document.getElementById('theme').checked = items.theme;
            document.querySelector('#themeLight').value = items.themeLight;
            document.querySelector('#themeDark').value = items.themeDark;
            document.querySelector('#language').value = items.language;
            document.getElementById('openInNewTab').checked = items.openInNewTab;
            document.getElementById('useBetterPageNavigation').checked = items.useBetterPageNavigation;
        }
    );
};

const disableTheme = () => {
    const theme = document.getElementById('theme');
    const themeLight = document.querySelector('#themeLight');
    const themeDark = document.querySelector('#themeDark');
    if (theme.checked == false) {
        themeLight.disabled = true;
        themeDark.disabled = true;
    }
    else {
        themeLight.disabled = false;
        themeDark.disabled = false;
    }
};

useBetterPageNavigation.onclick = () => {
    checkCommunityTheme();
}

themeDark.onchange = () => {
    checkCommunityTheme();
}

function checkCommunityTheme() {
    if (themeDark.value == 5 || themeDark.value == 6) {
        useBetterPageNavigation.checked = false;
        useBetterPageNavigation.disabled = true;
    }
    else {
        useBetterPageNavigation.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.addEventListener('mouseover', disableTheme);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('theme').addEventListener('click', disableTheme);