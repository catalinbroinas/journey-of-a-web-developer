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

    // Build a list group with optional icons and badges
    const createList = ({
        listClass = ['list-group-light'],
        itemClass = [],
        items = [],
        itemsWithIcon = [],
        itemsWithBadge = []
    }) => {
        const list = createDOMElement({
            elementTag: 'ul',
            elementClass: ['list-group'].concat(listClass)
        });

        // Adding simple list item
        if (items.length) {
            items.forEach((text) => {
                const listItem = createDOMElement({
                    elementTag: 'li',
                    elementClass: ['list-group-item'].concat(itemClass),
                    elementText: text
                });
                list.appendChild(listItem);
            });
        }

        // Adding list items with icons
        if (itemsWithIcon.length) {
            forEach(({ text, iconClass }) => {
                const listItem = createDOMElement({
                    elementTag: 'li',
                    elementClass: ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'].concat(itemClass)
                });

                const icon = createDOMElement({
                    elementTag: 'i',
                    elementClass: iconClass
                });

                listItem.appendChild(icon);
                listItem.insertAdjacentText('afterbegin', text);
                list.appendChild(listItem);
            });
        }

        // Adding list items with badges
        if (itemsWithBadge) {
            forEach(({ text, badgeText, badgeClass }) => {
                const listItem = createDOMElement({
                    elementTag: 'li',
                    elementClass: [
                        'list-group-item',
                        'd-flex', 'justify-content-between', 'align-items-center'
                    ].concat(itemClass),
                    elementText: text
                });

                const badge = createDOMElement({
                    elementTag: 'span',
                    elementClass: ['badge'].concat(badgeClass),
                    elementText: badgeText
                });

                listItem.appendChild(badge);
                list.appendChild(listItem);
            });
        }

        return list;
    };

    return {
        clearPageContent,
        createDOMElement,
        createList
    };
}

export { DomUtilityManager };
