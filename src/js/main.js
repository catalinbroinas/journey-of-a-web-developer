import { DomHandler } from "./module/utility.js";

function PageContent() {
    const lastWeekButton = document.querySelector('#last-week-button');
    const scrollUpButton = document.querySelector('#scroll-up-button');

    const {
        scrollToLastElement,
        scrollToTop
    } = DomHandler();

    const addEvents = () => {
        if (lastWeekButton) {
            lastWeekButton.addEventListener('click', (event) => {
                setTimeout(() => {
                    scrollToLastElement(event, 'week');
                }, 300);
            });
        }

        scrollToTop(scrollUpButton);
    };

    return {
        addEvents
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const pageContent = PageContent();
    pageContent.addEvents();
});
