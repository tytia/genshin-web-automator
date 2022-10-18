/**
 * Script for Genshin Impact's web event, Hidden Civilizations.
 * Event period: September 29, 2022 - October 31, 2022
 * Author: Terry Tian
 * 
 * Automates the redemption of the 'x60 Primogems' reward, redeeming it on cooldown ASAP before it runs out.
 * 
 * INSTRUCTIONS FOR USE:
 * Press Ctrl+Shift+I on the event webpage and paste into the DevTools console to run.
 */

const coinsNode = document.querySelector(".hyl-task-count_text");
const redeemBtn = document.querySelector(".right-bottom_right.daily"); // 'x60 Primogems' reward redeem button
const timerNode = document.querySelector(".van-count-down"); // timer display
var coins = coinsNode.textContent;

const btnObserver = new MutationObserver(redeemPrimos);
const popUpObserver = new MutationObserver(redeemPopUp);
const coinsObserver = new MutationObserver(updateCoins);
const config1 = {characterData: true};
const config2 = {childList: true};

btnObserver.observe(timerNode.childNodes[0], config1);
coinsObserver.observe(coinsNode.childNodes[0], config1)

if (timerNode.textContent === "Redeem Now") {
    popUpObserver.observe(document.body, config2);
    redeemBtn.click();
}

function redeemPrimos() {
    if (timerNode.textContent === "Redeem Now") {
        popUpObserver.observe(document.body, config2);
        redeemBtn.click();
    }
}

function redeemPopUp(mutations) {
    console.log(mutations);
    for (const mutation of mutations) {
        if (mutation.type === "childList") {
            console.log(mutation.addedNodes);
        }
    }

    btnObserver.disconnect();
    popUpObserver.disconnect();
}

function updateCoins() {
    coins = coinsNode.textContent;
}