
/**
 * @param {any} sm
 * @param {number} eventId
 * @param {HTMLInputElement} autoClearCheckbox
 * @param {boolean} ignoreForClearHighlights
 */
function dispatchEventToSm(sm, eventId, autoClearCheckbox, ignoreForClearHighlights) {
    /** @type {ExBase} */
    let smBase = sm;

    if (!ignoreForClearHighlights)
        smBase.clearTempHighlights();

    sm.dispatchEvent(eventId);

    if (!ignoreForClearHighlights && autoClearCheckbox && autoClearCheckbox.checked) {
        window.clearTimeout(smBase.autoClearTimeoutId);
        smBase.autoClearTimeoutId = window.setTimeout(() => {
            smBase.clearTempHighlights();
        }, 750);
    }
}

class ExampleConfig {
    exName;
    smClass;
    postDispatch;
    ignoreHighlightClearOnDoEvent = true;
    sm;

    constructor(smClass) {
        this.smClass = smClass;
        this.exName = smClass.name;
        this.sm = new smClass();
    }

    setup() {
        let exName = this.exName;
        let smClass = this.smClass;

        let divSelector = `div.${exName}`;
        let sm = this.sm;

        /** @type {HTMLObjectElement} */
        let object = document.querySelector(`${divSelector} object.StateMachine`);
        sm.smSvgDoc = object.contentDocument;

        object = document.querySelector(`${divSelector} object.LightBulb`);
        sm.lightBulbSvgDoc = object.contentDocument;

        sm.start();

        let autoClearCheckbox = getCheckboxById(`${exName}-auto-clear-highlights`);

        let postDispatch = this.postDispatch;

        /**
         * @param {number} eventId
         */
        function myDispatch(eventId, ignoreForClearHighlights) {
            dispatchEventToSm(sm, eventId, autoClearCheckbox, ignoreForClearHighlights);

            if (postDispatch)
                postDispatch();
        }

        addOnClickIfExists(`${divSelector} button.Ex-button-increase`, () => myDispatch(smClass.EventId.INCREASE));
        addOnClickIfExists(`${divSelector} button.Ex-button-dim`, () => myDispatch(smClass.EventId.DIM));
        addOnClickIfExists(`${divSelector} button.Ex-button-off`, () => myDispatch(smClass.EventId.OFF));
        addOnClickIfExists(`${divSelector} button.Ex-button-err`, () => myDispatch(smClass.EventId.ERR));

        /** @type {HTMLSelectElement} */
        const pollRateSelect = document.querySelector(`${divSelector} select.Ex-poll-rate`);
        if (pollRateSelect) {
            /** @type {HTMLInputElement} */
            const switchInput = document.querySelector(`${divSelector} input.Ex-input-switch-1`);

            const pollFunction = () => {
                /** @type {Ex01Polled} */
                let typedSm = sm;
                typedSm.vars.switch_is_on = switchInput.checked;
                myDispatch(smClass.EventId.DO, true && this.ignoreHighlightClearOnDoEvent);
                window.setTimeout(pollFunction, parseInt(pollRateSelect.value));
            };
            pollFunction();
        }
    }
}


function addOnClickIfExists(selector, action) {
    const button = getElementBySelector(selector);
    if (button)
        button.onclick = action;
}

function setupEx10() {
    let config = new ExampleConfig(Ex10);
    config.postDispatch = () => {
        document.querySelector(`div.Ex10 span.sm-var-count-value`).innerHTML = config.sm.vars.count + "";
    }
    config.setup();
}

function setupEx08() {
    let config = new ExampleConfig(Ex08);
    config.postDispatch = () => {
        document.querySelector(`div.Ex08 span.sm-var-count-value`).innerHTML = config.sm.vars.count + "";
    }
    config.setup();
}

function setupEx01Polled() {
    let config = new ExampleConfig(Ex01Polled);
    config.ignoreHighlightClearOnDoEvent = false; // required for polled example
    config.setup();
}

window.onload = () => {
    new ExampleConfig(Ex01).setup();
    setupEx01Polled();
    new ExampleConfig(Ex02).setup();
    new ExampleConfig(Ex03).setup();
    new ExampleConfig(Ex04).setup();
    new ExampleConfig(Ex05).setup();
    new ExampleConfig(Ex06).setup();
    setupEx08();
    setupEx10();
};

/**
 * @param {string} selectorString
 * @returns {HTMLElement}
 */
function getElementBySelector(selectorString) {
    return document.querySelector(selectorString);
}

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

/**
 * @param {HTMLObjectElement} object
 * Approach from http://xn--dahlstrm-t4a.net/svg/html/get-embedded-svg-document-script.html
 */
function getSubDocument(object) {
    let document = object.contentDocument;

    if (!document)
        document = object.getSVGDocument();

    if (!document)
        throw "couldn't get sub document";

    return document;
}
