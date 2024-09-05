import { WeekDataProvider, WeekDomManager } from "./modules/weeks.js";

async function MainDomManager() {
    // Get weekly data
    const dataProvider = await WeekDataProvider();
    const data = await dataProvider.loadWeeksData();

    // Create the DOM manager to render the data
    const domManager = WeekDomManager();

    // Load and render the data weekly
    const weeklyProgress = async () => {
        try {
            domManager.renderWeeks(data);
        } catch (error) {
            console.error('Weekly progress data are not available! Message:', error);
        }
    };

    // Load and render the data for weekly navigation
    const weeklyNavigation = async () => {
        try {
            const yearData = [];
            const monthData = [];

            if (data?.length) {
                data.forEach(yearObj => {
                    const { year, months } = yearObj;
                    yearData.push(year);

                    if (months?.length) {
                        months.forEach((monthObj) => {
                            const { month } = monthObj;
                            monthData.push(month.name);
                        });
                    }
                });
            }

            domManager.renderNavigation(yearData, monthData);
        } catch (error) {
            console.error('Weekly navigation data are not available! Message:', error);
        }
    };

    return {
        weeklyProgress,
        weeklyNavigation
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    const domManager = await MainDomManager();
    domManager.weeklyProgress();
    domManager.weeklyNavigation();
});
