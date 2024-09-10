function DomUtilityManager() {
    const statusIconClasses = {
        completed: ['fa-solid', 'fa-circle-check', 'text-success'],
        'in-progress': ['fa-solid', 'fa-spinner', 'text-primary'],
        unstarted: ['fa-solid', 'fa-circle-xmark', 'text-danger'],
        postponed: ['fa-solid', 'fa-hourglass-half', 'text-info'],
        default: ['fa-solid', 'fa-circle-question', 'text-muted']
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

        if (Array.isArray(elementClass)) {
            elementClass.forEach(className => element.classList.add(className));
        } else {
            console.error('elementClass is not an array:', elementClass);
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

            cardHeader.appendChild(title);
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

    // Creates an <option> element for a <select> dropdown
    const createOptionElement = ({
        optionValue,
        optionText,
        optionDisabled = false,
        optionSelected = false
    }) => {
        const option = document.createElement('option');

        option.value = optionValue;
        option.textContent = optionText;

        option.disabled = optionDisabled;
        option.selected = optionSelected;

        return option;
    };

    // Creates <option> elements for a <select>, with an optional pre-selected option
    const createSelectOptions = (options, selectedOption = '') => {
        const fragment = document.createDocumentFragment();

        if (options?.length) {
            options.forEach((option) => {
                const optionElement = createOptionElement({
                    optionValue: option,
                    optionText: option
                });

                if (option === selectedOption) {
                    optionElement.selected = true;
                }

                fragment.appendChild(optionElement);
            });
        }

        return fragment;
    };

    // Clear and update <select> options
    const updateSelectOptions = (selectElement, optionsArray, placeholder = '', selectedOption = '') => {
        // Check if element exists
        if (!selectElement) {
            console.error(`Select element is not found.`);
            return;
        }

        // Clear existing options
        clearPageContent(selectElement);

        // Optional, add a placeholder option as the first item
        if (placeholder) {
            const placeholderOption = createOptionElement({
                optionValue: '',
                optionText: placeholder,
                optionDisabled: true,
                optionSelected: !selectedOption // Select placeholder if no other option is selected
            });
            selectElement.appendChild(placeholderOption);
        }

        // Add options to <select> element
        const fragment = createSelectOptions(optionsArray, selectedOption);
        selectElement.appendChild(fragment);
    };

    return {
        clearPageContent,
        createDOMElement,
        createList,
        buildCard,
        getStatusIconClass,
        createOptionElement,
        createSelectOptions,
        updateSelectOptions
    };
}

function StringUtilityManager() {
    // Capitalize first word from a text
    const capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    // Capitalize each option from a select
    const capitalizeSelectOptions = (selectElement) => {
        if (selectElement) {
            Array.from(selectElement.options).forEach((option) => {
                option.text = capitalizeFirstLetter(option.text);
            });
        }
    };

    return {
        capitalizeFirstLetter,
        capitalizeSelectOptions
    };
}

export { DomUtilityManager, StringUtilityManager };
