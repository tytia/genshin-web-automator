/**
 * Script for Genshin Impact's web event, Hidden Civilizations.
 * Event period: September 29, 2022 - October 31, 2022
 * Author: Terry Tian
 * 
 * Automates the redemption of rewards, redeeming them on cooldown ASAP before it runs out.
 * 
 * INSTRUCTIONS FOR USE:
 * Press Ctrl+Shift+I on the event webpage and paste into the DevTools console to run.
 */

const redeemBtn = document.querySelector(".right-bottom_right.daily"); // reward redeem button
const timerNode = document.querySelector(".van-count-down"); // timer display
const coinsNode = document.querySelector(".hyl-task-count_text");

const timerObserver = new MutationObserver(redeemPrimos);
const coinsObserver = new MutationObserver(updateCoins);
const popUpObserver = new MutationObserver(popUpHandler);
const popUpObserver2 = new MutationObserver(redeemPopUp);
const popUpObserver3 = new MutationObserver(redeemPopUp2);

var coins = coinsNode.textContent;
var popUp, cost, redeemCountNode, start, i;

timerObserver.observe(timerNode.childNodes[0], {characterData: true});
coinsObserver.observe(coinsNode.childNodes[0], {characterData: true});

// TODO: implement reward selection
function redeemPrimos() {
    if (timerNode.textContent === "Redeem Now") {
        start = performance.now();
        timerObserver.disconnect();
        popUpObserver.observe(document.body, {childList: true});
        redeemBtn.click();
    }
    else if (timerNode.textContent === "Purchase Limit") {
        if (document.querySelector(".van-count-down").textContent === "Purchase Limit") {
            alert("You have reached the purchase limit for every reward.");
        }
        else {
            alert("You have reached the purchase limit for your selected reward.");
            // timerObserver.disconnect();
            // popUpObserver.observe(document.body, {childList: true});
            // document.querySelector(".right-bottom_right.daily").click();
        }
    }
}

function popUpHandler(mutations) {
    if (mutations[0].addedNodes.length) {
        popUpObserver.disconnect();
        popUp = mutations[0].addedNodes[0];
        popUpObserver2.observe(popUp, {attributes: true});
    }
}

function redeemPopUp() {
    var confirmBtn = popUp.querySelector(".draw-btn");
    var redeemAdd, redeemMax;
    
    if (confirmBtn !== null) {
        popUpObserver2.disconnect();
        redeemAdd = popUp.querySelector(".operate-btn:not(operate-btn_disabled)");
        cost = popUp.querySelector(".award-num").textContent;
        
        if (redeemAdd === null) {
            confirmBtn.click();
            console.log(`Execution time: ${(performance.now() - start).toFixed(2)}ms`);
        }
        else {
            redeemCountNode = popUp.querySelector(".number-input");
            redeemMax = Math.floor(coins / cost);
            popUpObserver3.observe(redeemCountNode.childNodes[0], {characterData: true});
            redeemAdd.click();
            i++;
        }
    }
}

function redeemPopUp2() {
    if (i == redeemMax) {
        popUpObserver3.disconnect();
        confirmBtn.click();
        console.log(`Execution time: ${(performance.now() - start).toFixed(2)}ms`);
    }
    else {
        redeemAdd.click();
        i++;
    }
}

function updateCoins() {
    coins = coinsNode.textContent;
}