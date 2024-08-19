function DomHandler() {
    // Scroll page to last element
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

    // Scroll page to top
    const scrollToTop = (button) => {
        // Check if the button exists
        if (!button) {
            console.warn('Scroll button element not found.');
            return;
        }

        // Default no display button
        button.style.display = 'none';

        // Display button after scrolling 1000px
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });

        // Scroll to top
        button.addEventListener('click', () => {
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 300);
        });
    };

    return {
        scrollToLastElement,
        scrollToTop
    };
}

export { DomHandler };
