import { DomHandler } from "./module/utility.js";

function PageContent() {
    const { scrollToLastElement } = DomHandler();
    const lastWeekButton = document.querySelector('#last-week-button');

    const addEvents = () => {
        if (lastWeekButton) {
            lastWeekButton.addEventListener('click', (event) => {
                setTimeout(() => {
                    scrollToLastElement(event, 'week');
                }, 300);
            });
        }
    };

    return {
        addEvents
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const pageContent = PageContent();
    pageContent.addEvents();
});
