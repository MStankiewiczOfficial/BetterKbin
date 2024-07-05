const BetterKbinCopyright = document.getElementById('textBetterKbinCopyright');
const Theme5 = document.getElementById('textTheme5');
const Theme6 = document.getElementById('textTheme6');
const BPN = document.getElementById('textBPN');
const BKB = document.getElementById('textBKB');

function translate() {
    chrome.storage.sync.get(
        { language: 'language' },
        (items) => {
            if (items.language == 1) {
                BetterKbinCopyright.innerHTML = `Copyright - Better /kbin`;
                Theme5.innerHTML = `HackerBin was made by <a class="url" href="https://userstyles.world/user/arsg0etia" target="_blank">arsg0etia</a>.`;
                Theme6.innerHTML = `Dark Dark Theme was made by <a class="url" href="https://userstyles.world/user/solomrdolo" target="_blank">solomrdolo</a>.`;
                BPN.innerHTML = `Better Page Navigation was made by <a class="url" href="https://userstyles.world/user/minnieo" target="_blank">minnieo</a>.`;
                BKB.innerHTML = `Better /kbin was made by <a class="url" href="https://www.mstankiewi.cz" target="_blank">Michał Stankiewicz</a>.`;
            }
            else
            if (items.language == 2) {
                BetterKbinCopyright.innerHTML = "Prawa autorskie - Better /kbin";
                Theme5.innerHTML = `HackerBin został stworzony przez <a class="url" href="https://userstyles.world/user/arsg0etia" target="_blank">arsg0etia</a>.`;
                Theme6.innerHTML = `Dark Dark Theme został stworzony przez <a class="url" href="https://userstyles.world/user/solomrdolo" target="_blank">solomrdolo</a>.`;
                BPN.innerHTML = `Better Page Navigation został stworzony przez <a class="url" href="https://userstyles.world/user/minnieo" target="_blank">minnieo</a>.`;
                BKB.innerHTML = `Better /kbin został stworzony przez <a class="url" href="https://www.mstankiewi.cz" target="_blank">Michała Stankiewicza</a>.`;
            }
        }
    );
}

document.addEventListener('DOMContentLoaded', translate);