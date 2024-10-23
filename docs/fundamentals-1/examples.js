//   888    888  .d88888b.  888      8888888b.       888     888 8888888b.  888 888 888 
//   888    888 d88P" "Y88b 888      888  "Y88b      888     888 888   Y88b 888 888 888 
//   888    888 888     888 888      888    888      888     888 888    888 888 888 888 
//   8888888888 888     888 888      888    888      888     888 888   d88P 888 888 888 
//   888    888 888     888 888      888    888      888     888 8888888P"  888 888 888 
//   888    888 888     888 888      888    888      888     888 888        Y8P Y8P Y8P 
//   888    888 Y88b. .d88P 888      888  .d88P      Y88b. .d88P 888         "   "   "  
//   888    888  "Y88888P"  88888888 8888888P"        "Y88888P"  888        888 888 888 
//
// Hey there! This isn't the best place to learn.
//
// The generated state machines have been modded/instrumented so that we can trace
// the state machine behavior and update the svg diagrams dynamically.
// 
// Best to learn by checking out the StateSmith wiki or example repos
// https://github.com/StateSmith/
//
// However, if you would like to help improve the content here, hit us up github or discord!

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
    eventCount = 0;

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

        /** @type {HTMLSpanElement} */
        const eventCountSpan = document.querySelector(`${divSelector} span.event-count`);

        let autoClearCheckbox = getCheckboxById(`${exName}-auto-clear-highlights`);
        let postDispatch = this.postDispatch;
        let countSpan = document.querySelector(`${divSelector} span.sm-var-count-value`);

        const exampleConfig = this;

        /**
         * @param {number} eventId
         */
        function myDispatch(eventId, ignoreForClearHighlights) {
            dispatchEventToSm(sm, eventId, autoClearCheckbox, ignoreForClearHighlights);

            exampleConfig.eventCount++;

            if (eventCountSpan)
                eventCountSpan.innerHTML = exampleConfig.eventCount + "";

            if (countSpan)
                countSpan.innerHTML = sm.vars.count + "";

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
    new ExampleConfig(Ex07).setup();
    new ExampleConfig(Ex08).setup();
    new ExampleConfig(Ex09).setup();
    new ExampleConfig(Ex10).setup();
    new ExampleConfig(Ex11).setup();
    new ExampleConfig(Ex12).setup();
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
