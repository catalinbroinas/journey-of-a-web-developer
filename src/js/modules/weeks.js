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
    const buildWeekElement = () => {

    };

    const renderWeeks = () => {

    };

    return { renderWeeks };
}

export { WeekDataProvider, WeekDomManager };
