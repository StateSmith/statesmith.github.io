
function dispatchEventToSm(sm, eventId, checkboxId) {
    /** @type {ExBase} */
    let smBase = sm;
    smBase.clearTempHighlights();
    sm.dispatchEvent(eventId);

    if (getCheckboxById(checkboxId).checked) {
        window.clearTimeout(smBase.autoClearTimeoutId);
        smBase.autoClearTimeoutId = window.setTimeout(() => {
            smBase.clearTempHighlights();
        }, 750);
    }
}

function setupEx01() {
    let exName = `Ex01`;
    let divSelector = `div.${exName}`;
    let smClass = Ex01;
    let sm = new smClass();

    /** @type {HTMLObjectElement} */
    let object = document.querySelector(`${divSelector} object.StateMachine`);
    sm.smSvgDoc = object.contentDocument;

    object = document.querySelector(`${divSelector} object.LightBulb`);
    sm.lightBulbSvgDoc = object.contentDocument;

    sm.start();

    let checkboxId = `${exName}-auto-clear-highlights`;

    getElementBySelector(`${divSelector} button.Ex-button-increase`).onclick = () => {
        dispatchEventToSm(sm, smClass.EventId.INCREASE, checkboxId);
    };

    getElementBySelector(`${divSelector} button.Ex-button-dim`).onclick = () => {
        dispatchEventToSm(sm, smClass.EventId.DIM, checkboxId);
    };
}


function setupEx10() {
    let exName = `Ex10`;
    let divSelector = `div.${exName}`;
    let smClass = Ex10;
    let sm = new smClass();

    /** @type {HTMLObjectElement} */
    let object = document.querySelector(`${divSelector} object.StateMachine`);
    sm.smSvgDoc = object.contentDocument;

    object = document.querySelector(`${divSelector} object.LightBulb`);
    sm.lightBulbSvgDoc = object.contentDocument;

    sm.start();

    let checkboxId = `${exName}-auto-clear-highlights`;

    /**
     * @param {number} eventId
     */
    function myDispatch(eventId)
    {
        dispatchEventToSm(sm, eventId, checkboxId);
        document.querySelector(`div.Ex10 span.sm-var-count-value`).innerHTML = sm.vars.count + "";
    }

    getElementBySelector(`${divSelector} button.Ex-button-increase`).onclick = () => {
        myDispatch(smClass.EventId.INCREASE);
    };

    getElementBySelector(`${divSelector} button.Ex-button-dim`).onclick = () => {
        myDispatch(smClass.EventId.DIM);
    };

    getElementBySelector(`${divSelector} button.Ex-button-off`).onclick = () => {
        myDispatch(smClass.EventId.OFF);
    };
}


// FIXME - use a smarter approach over timeout. we need to wait for nested svg documents to load.
window.setTimeout(() => {
    setupEx01();
    setupEx10();
}, 250);

/**
 * @param {string} selectorString
 * @returns {HTMLElement}
 */
function getElementBySelector(selectorString) {
    return document.querySelector(selectorString);
}

/**
 * @param {string} id
 * @returns {HTMLInputElement}
 */
function getCheckboxById(id) {
    /**@type {any} */
    let checkbox = document.getElementById(id);

    return checkbox;
}


// Below code allows us to define css templates directly inline HTML
// Eventually, we should move to something like vue.js or something.
document.addEventListener("DOMContentLoaded", () => {
    /** @type {Map<string, string[]>} */
    let map = new Map();
    let elementArray = Array.from(document.querySelectorAll("*"));

    elementArray.forEach(htmlElement => {
        let templateName = findTemplateClass(htmlElement);
        if (!templateName)
            return;

        let list = map.get(templateName);
        if (list) {
            htmlElement.classList.add(...list);
        }
        else {
            let a = Array.from(htmlElement.classList);
            let startIndex = a.indexOf(templateName);
            list = a.slice(startIndex);
            map.set(templateName, list);
        }
    });

    /**
     * @param {Element} htmlElement
     * @returns {string}
     */
    function findTemplateClass(htmlElement) {
        let result = undefined;
        htmlElement.classList.forEach(className => {
            if (!result && className.startsWith("SS_TEMPLATE_")) {
                result = className;
            }
        });

        return result;
    }

    document.querySelectorAll(".SS_HIDE_WHILE_LOADING").forEach(element => {
        element.classList.remove("SS_HIDE_WHILE_LOADING");
    });
});
