import { DomUtilityManager } from "./utility.js";

async function WeekDataProvider() {
    const loadWeeksData = async () => {
        try {
            const response = await fetch('/src/data/weeks.json', { mode: "cors" });
            if (!response.ok) {
                throw new Error(`Weekly progress data not found. Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error loading weekly data: ${error}`);
            throw new Error('Failed to load weekly data. Please try again later.');
        }
    };

    return { loadWeeksData };
}

function WeekDomManager() {
    const domUtility = DomUtilityManager();

    const buildWeekElement = ({
        weekId
    }) => {
        // Create week container
        const weekWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['row', 'justify-content-md-start', 'justify-content-center', 'week'],
            elementId: `week-${weekId}`
        });

        // Create week heading
        const weekTitle = domUtility.createDOMElement({
            elementTag: 'h3',
            elementClass: ['title', 'text-center'],
            elementText: `Week ${weekId}`
        });

        // Create week divider
        const weekTitleDivider = domUtility.createDOMElement({
            elementTag: 'hr',
            elementClass: ['hr', 'hr-blurry', 'mb-4']
        });

        weekWrapper.appendChild(weekTitle);
        weekWrapper.appendChild(weekTitleDivider);

        return weekWrapper;
    };

    const renderWeeks = () => {

    };

    return { renderWeeks };
}

export { WeekDataProvider, WeekDomManager };
