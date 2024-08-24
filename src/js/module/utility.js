function DomHandler() {
    // Scroll page to last element
    const scrollToLastElement = (elementClass, behavior = 'smooth') => {
        const element = document.querySelector(`.${elementClass}:last-of-type`);

        if (element) {
            element.scrollIntoView({ behavior });
        } else {
            console.error('Element with class ${elementClass} not found.');
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
