class ExBase {
    /** @type {Document} */
    smSvgDoc;

    /** @type {Map<string, function>} */
    tempHighlightMap = new Map();

    /** @type {Map<string, function>} */
    stateHighlightMap = new Map();

    /**
     * @type {number}
     */
    autoClearTimeoutId;

    clearTempHighlights() {
        this.tempHighlightMap.forEach((restoreFunction) => {
            restoreFunction();
        });

        this.tempHighlightMap.clear();
    }

    /**
     * @param {Map<string, function>} map
     * @param {string} key
     */
    undoChangesForKey(map, key) {
        let undoFunction = map.get(key);
        undoFunction();
        map.delete(key);
    }

    /**
     * @param {string} actionCode
     * @param {string} behaviorId
     * @param {string} vertexId
     */
    trace_action(actionCode, behaviorId, vertexId) {
        console.log(`Action: ${actionCode}, ${behaviorId}, ${vertexId}`);

        let containingObj = this.getSvgElementFromDiagramId(behaviorId);

        /** @type {NodeListOf<HTMLDivElement>} */
        let divs = containingObj.querySelectorAll("div[data-drawio-colors] > div");

        /** @type {HTMLDivElement} */
        let div = divs[0];

        if (!div)
            return; // happens if no text

        let key = behaviorId + "-stroke";

        let old = this.tempHighlightMap.get(key);
        if (!old) {
            let oldBg = div.style.backgroundColor;
            this.tempHighlightMap.set(key, () => div.style.backgroundColor = oldBg);
            div.style.backgroundColor = "#3b3b3b";
        }
    }

    /**
     * @param {string} behaviorId
     */
    trace_transition(behaviorId) {
        console.log(`Transition: ${behaviorId}`);

        this.trace_action("", behaviorId, "");
        this.highlightPaths(this.tempHighlightMap, behaviorId, true);
    }

    /**
     * @param {string} stateName
     * @param {string} stateId
     */
    trace_enter(stateName, stateId) {
        console.log(`entered "${stateName}", "${stateId}"`);
        this.highlightPaths(this.stateHighlightMap, stateId, false);
    }

    /**
     * @param {string} stateName
     * @param {string} stateId
     */
    trace_exit(stateName, stateId) {
        console.log(`exited "${stateName}", "${stateId}"`)
        this.restorePaths(stateId);
    }

    /**
     * @param {string} diagramId
     */
    makePathsKey(diagramId) {
        let key = diagramId + "-paths";
        return key;
    }

    /**
     * @param {Map<string, Function>} restoreMap
     * @param {string} diagramId
     * @param {boolean} shouldFill
     */
    highlightPaths(restoreMap, diagramId, shouldFill) {
        const stateDom = this.getSvgElementFromDiagramId(diagramId);
        let paths = stateDom.querySelectorAll("path");

        let key = this.makePathsKey(diagramId);
        let old = restoreMap.get(key);
        if (old)
            return;

        let highlightColor = "#dc3545";

        paths.forEach(path => {
            this.setAttributeWithRestore(path, "stroke", highlightColor);
            this.setAttributeWithRestore(path, "stroke-width", "2px");
            if (shouldFillPath(path))
                this.setAttributeWithRestore(path, "fill", highlightColor);
        });

        restoreMap.set(key, () => {
            paths.forEach(path => {
                this.restoreOldAttribute(path, "stroke");
                this.restoreOldAttribute(path, "stroke-width");
                if (shouldFillPath(path))
                    this.restoreOldAttribute(path, "fill");
            });
        });

        /**
         * @param {SVGPathElement} path
         */
        function shouldFillPath(path) {
            let fill = path.getAttribute("fill");
            return shouldFill && fill && fill != "none";
        }
    }

    /**
     * @param {string} diagramId
     */
    restorePaths(diagramId) {
        let key = this.makePathsKey(diagramId);
        this.undoChangesForKey(this.stateHighlightMap, key);
    }

    /**
     * @param {string} stateId
     */
    getSvgElementFromDiagramId(stateId) {
        return this.smSvgDoc.getElementById("cell-" + stateId);
    }

    /**
     * @param {string} attributeName
     */
    makeOldAttrName(attributeName) {
        return attributeName + "-ss-old";
    }

    /**
     * @param {HTMLObjectElement|SVGPathElement} object
     * @param {string} attributeName
     * @param {string} newValue
     */
    setAttributeWithRestore(object, attributeName, newValue) {
        let old = object.getAttribute(attributeName);
        object.setAttribute(this.makeOldAttrName(attributeName), old);
        object.setAttribute(attributeName, newValue);
    }

    /**
     * @param {HTMLObjectElement|SVGPathElement} object
     * @param {string} attributeName
     */
    restoreOldAttribute(object, attributeName) {
        let old = object.getAttribute(this.makeOldAttrName(attributeName));
        object.setAttribute(attributeName, old);
    }
}

class Ex10Base extends ExBase {
    /** @type {Document} */
    lightBulbSvgDoc;

    /**
     * @param {string} color
     * @param {string=} strokeColor
     */
    setLightBulbColor(color, strokeColor) {
        strokeColor = strokeColor || color;
        let paths = this.lightBulbSvgDoc.querySelectorAll("path");
        paths.forEach(element => {
            element.setAttribute("fill", color);
            element.setAttribute("stroke", strokeColor);
        });
    }

    light_off() {
        console.log("light off");
        this.setLightBulbColor("#000000");
    }

    light_blue() {
        console.log("light blue");
        this.setLightBulbColor("#2ca7ff");
    }

    light_yellow() {
        console.log("light yellow");
        this.setLightBulbColor("yellow", "black");
    }

    light_red() {
        console.log("light red");
        this.setLightBulbColor("red");
    }
}