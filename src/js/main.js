import { WeekDataProvider, WeekDomManager } from "./modules/weeks.js";

async function MainDomManager() {
    // Load weeks data
    const loadWeeksData = async () => {
        const dataProvider = await WeekDataProvider();
        const data = await dataProvider.loadWeeksData();
        const years = await dataProvider.loadYearsList();
        const initialMonths = await dataProvider.loadMonthsListByYear(years[0]);
        const domManager = WeekDomManager();

        return {
            dataProvider,
            data,
            years,
            initialMonths,
            domManager
        };
    };

    // Load and render the data weekly
    const weeklyProgress = async () => {
        try {
            const { data, domManager } = await loadWeeksData();
            domManager.renderWeeks(data);
        } catch (error) {
            console.error('Weekly progress data are not available! Message:', error);
        }
    };

    // Load and render the data navigation (<select> years and months)
    const weeklyNavigation = async () => {
        try {
            const { years, initialMonths, domManager } = await loadWeeksData();
            domManager.renderNavigation(years, initialMonths);
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
