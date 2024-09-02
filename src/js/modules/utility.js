function DomUtilityManager() {
    const statusIconClasses = {
        completed: 'fas fa-circle-check text-success',
        'in-progress': 'fas fa-spinner text-primary',
        unstarted: 'fas fa-circle-xmark text-danger',
        postponed: 'fas fa-hourglass-half text-info',
        default: 'fas fa-question-circle text-muted'
    };

    const getStatusIconClass = (status) => statusIconClasses[status] || statusIconClasses.default;

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
            itemsWithIcon.forEach(({ text, iconClass }) => {
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
        if (itemsWithBadge.length) {
            itemsWithBadge.forEach(({ text, badgeText, badgeClass }) => {
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

    // Creates an image element for the card
    const createCardImage = (imageSource = '', imageName = '', imageClass = []) => {
        return createDOMElement({
            elementTag: 'img',
            elementAttributes: { 'src': `/img/${imageSource}`, 'alt': imageName },
            elementClass: imageClass
        });
    };

    // Creates 'card-header' element for the card
    const createCardHeader = ({
        headerClass = [],
        headerTitleText = '',
        headerTitleClass = [],
        headerIconClass = []
    }) => {
        // Create card header container
        const cardHeader = createDOMElement({
            elementTag: 'div',
            elementClass: ['card-header'].concat(headerClass)
        });

        // Create card title if title text is provided
        if (headerTitleText) {
            const title = createDOMElement({
                elementTag: 'h4',
                elementClass: ['card-title'].concat(headerTitleClass),
                elementText: headerTitleText
            });

            header.appendChild(title);
        }

        // Add icon if icon classes are provided
        if (headerIconClass.length > 0) {
            const icon = createDOMElement({
                elementTag: 'i',
                elementClass: headerIconClass
            });

            cardHeader.appendChild(icon);
        }

        return cardHeader;
    };

    // Creates 'card-body' element for the card
    const createCardBody = ({
        bodyClass = [],
        bodyTitle = '',
        bodyText = '',
        bodyListItems = [],
        bodyListItemsWithIcon = [],
        bodyListItemsWithBadge = []
    }) => {
        // Create card body container
        const cardBody = createDOMElement({
            elementTag: 'div',
            elementClass: ['card-body'].concat(bodyClass)
        });

        // Add title if provided
        if (bodyTitle) {
            const title = createDOMElement({
                elementTag: 'h5',
                elementClass: ['card-title'],
                elementText: bodyTitle
            });
            cardBody.appendChild(title);
        }

        // Add text if provided
        if (bodyText) {
            const text = createDOMElement({
                elementTag: 'p',
                elementClass: ['card-text'],
                elementText: bodyText
            });
            cardBody.appendChild(text);
        }

        // Add simple list if items are provided
        if (bodyListItems.length > 0) {
            const list = createList({
                items: bodyListItems
            });
            cardBody.appendChild(list);
        }

        // Add list with icons if itemsWithIcon are provided
        if (bodyListItemsWithIcon.length > 0) {
            const list = createList({
                itemsWithIcon: bodyListItemsWithIcon
            });
            cardBody.appendChild(list);
        }

        // Add list with badge if itemsWithBadge are provided
        if (bodyListItemsWithBadge.length > 0) {
            const list = createList({
                itemsWithBadge: bodyListItemsWithBadge
            });
            cardBody.appendChild(list);
        }

        return cardBody;
    };

    // Constructs a complete card with image, header, and body
    const buildCard = ({
        cardClass = [],
        cardImage = {},
        cardHeader = {},
        cardBody = {}
    }) => {
        // Create card container
        const card = createDOMElement({
            elementTag: 'div',
            elementClass: ['card'].concat(cardClass)
        });

        if (cardImage.imageSource) {
            card.appendChild(createCardImage(cardImage.imageSource, cardImage.imageName, cardImage.imageClass));
        }

        if (cardHeader.headerTitleText) {
            card.appendChild(createCardHeader(cardHeader));
        }

        if (Object.keys(cardBody).length > 0) {
            card.appendChild(createCardBody(cardBody));
        }

        return card;
    };

    return {
        clearPageContent,
        createDOMElement,
        createList,
        buildCard,
        getStatusIconClass
    };
}

export { DomUtilityManager };
