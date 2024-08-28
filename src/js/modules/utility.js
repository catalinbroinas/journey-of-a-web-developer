function DomUtilityManager() {
    const clearPageContent = (container) => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    };

    const createDOMElement = ({
        elementTag,
        elementClass = [],
        elementId,
        elementText,
        elementScope,
        elementAttributes,
        clickHandler
    }) => {
        const element = document.createElement(elementTag);

        if (elementClass.length) {
            elementClass.forEach(className => element.classList.add(className));
        }

        if (elementId) {
            element.id = elementId;
        }

        if (elementScope) {
            element.scope = elementScope;
        }

        if (elementAttributes) {
            Object.entries(elementAttributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        if (elementText) {
            element.textContent = elementText;
        }

        if (clickHandler) {
            element.addEventListener('click', clickHandler);
        }

        return element;
    };

    return {
        clearPageContent,
        createDOMElement
    };
}

export { DomUtilityManager };
