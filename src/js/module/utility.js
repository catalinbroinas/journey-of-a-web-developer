function DomHandler() {
    const scrollToLastElement = (event, elementClass) => {
        const button = event.target;
        const element = document.querySelector(`.${elementClass}:last-of-type`);

        if (element && button) {
            element.setAttribute('id', `last-${elementClass}`);
            button.setAttribute('href', `#last-${elementClass}`);

            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    return {
        scrollToLastElement
    };
}

export { DomHandler };
