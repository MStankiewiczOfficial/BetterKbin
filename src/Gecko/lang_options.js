const TypeDomain = document.getElementById('textTypeDomain');
const Security = document.getElementById('textSecurity');
const Lang = document.getElementById('textLang');
const AutoThemeSwitch = document.getElementById('textAutoThemeSwitch');
const ThemeLight = document.getElementById('textThemeLight');
const ThemeLightOption1 = document.getElementById('textThemeLightOption1');
const ThemeLightOption2 = document.getElementById('textThemeLightOption2');
const ThemeDark = document.getElementById('textThemeDark');
const ThemeDarkOption1 = document.getElementById('textThemeDarkOption1');
const ThemeDarkOption2 = document.getElementById('textThemeDarkOption2');
const ThemeDarkOption3 = document.getElementById('textThemeDarkOption3');
const ThemeDarkOption4 = document.getElementById('textThemeDarkOption4');
const ThemeDarkOption5 = document.getElementById('textThemeDarkOption5');
const ThemeDarkOption6 = document.getElementById('textThemeDarkOption6');
const OpenNewTab = document.getElementById('textOpenNewTab');
const UseBetterPageNavigation = document.getElementById('textUseBetterPageNavigation');
const Save = document.getElementById('save');
const Copyright = document.getElementById('textCopyrightURL');

function translate() {
    browser.storage.local.get(
        { language: 'language' },
        (items) => {
            if (items.language == 1) {
                TypeDomain.innerText = "Type your /kbin instance domain here:";
                Security.innerText = "For security reasons, you can only use /kbin instances that has a valid SSL certificate (address starts with \"https://\").";
                Lang.innerText = "Select language:";
                AutoThemeSwitch.innerText = "Enable automatic theme switching";
                ThemeLight.innerText = "Select light theme style:";
                ThemeLightOption1.innerText = "Light";
                ThemeLightOption2.innerText = "Solarized Light";
                ThemeDark.innerText = "Select dark theme style:";
                ThemeDarkOption1.innerText = "kbin (default)";
                ThemeDarkOption2.innerText = "Dark";
                ThemeDarkOption3.innerText = "Solarized Dark";
                ThemeDarkOption4.innerText = "Tokyo Night";
                ThemeDarkOption5.innerText = "HackerBin (by arsg0etia) [BETA]";
                ThemeDarkOption6.innerText = "Dark Dark Theme (by solomrdolo) [BETA]";
                OpenNewTab.innerText = "Open /kbin links in new tab";
                UseBetterPageNavigation.innerText = "Use Better Page Navigation (by minnieo)";
                Save.innerText = "Save";
                Copyright.innerText = "Copyright";
            }
            else
            if (items.language == 2) {
                TypeDomain.innerText = "Wpisz domenę instancji /kbin:";
                Security.innerText = "Z powodów bezpieczeństwa, możesz używać tylko instancji /kbin, które posiadają ważny certyfikat SSL (adres zaczyna się od \"https://\").";
                Lang.innerText = "Wybierz język:";
                AutoThemeSwitch.innerText = "Włącz automatyczną zmianę motywu";
                ThemeLight.innerText = "Wybierz styl jasnego motywu:";
                ThemeLightOption1.innerText = "Jasny";
                ThemeLightOption2.innerText = "Jasny (Solarized)";
                ThemeDark.innerText = "Wybierz styl ciemnego motywu:";
                ThemeDarkOption1.innerText = "kbin (domyślny)";
                ThemeDarkOption2.innerText = "Ciemny";
                ThemeDarkOption3.innerText = "Ciemny (Solarized)";
                ThemeDarkOption4.innerText = "Tokyo Nocą";
                ThemeDarkOption5.innerText = "HackerBin (autorstwa arsg0etia) [BETA]";
                ThemeDarkOption6.innerText = "Dark Dark Theme (autorstwa solomrdolo) [BETA]";
                OpenNewTab.innerText = "Otwieraj linki z /kbin w nowej karcie";
                UseBetterPageNavigation.innerText = "Użyj Better Page Navigation (autorstwa minnieo)";
                Save.innerText = "Zapisz";
                Copyright.innerText = "Prawa autorskie";
            }
        }
    );
}

document.addEventListener('DOMContentLoaded', translate);