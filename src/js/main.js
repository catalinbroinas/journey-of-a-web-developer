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

    const weeklyNavigation = async () => {
        try {
            const years = await dataProvider.loadYearsList();
            const initialMonths = await dataProvider.loadMonthsListByYear(years[0]);

            domManager.renderNavigation(years, initialMonths, dataProvider.loadMonthsListByYear);
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
