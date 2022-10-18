// Testing detection and manipulation of popup windows and elements.

const observer = new MutationObserver(callback);
const observer2 = new MutationObserver(callback2);
const observer3 = new MutationObserver(callback3);
var popUp;

observer.observe(document.body, {childList: true});

function callback(mutations) {
    start = performance.now();
    if (mutations[0].addedNodes.length) {
        popUp = mutations[0].addedNodes[0];
        observer2.observe(popUp, {childList: true, subtree: true, attributes: true});
    }
    else if(mutations[0].removedNodes.length) {
        observer.disconnect();
    }
}

function callback2(mutations) {
    console.log(mutations);
    var tab = popUp.querySelector(".tab-item:not(.tab-item-actived)");
    if (tab != null) {
        observer3.observe(tab, {attributes: true})
        tab.click();
        observer2.disconnect();
    }
}

function callback3() {
    popUp.querySelector(".tab-item:not(.tab-item-actived)").click();
    console.log(`Execution time: ${(performance.now() - start).toFixed(2)}ms`)
    observer3.disconnect();
}