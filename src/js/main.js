import { WeekDataProvider, WeekDomManager } from "./modules/weeks.js";

async function MainDomManager() {
    // Load and render the data weekly
    const weeklyProgress = async () => {
        try {
            // Get weekly data
            const dataProvider = await WeekDataProvider();
            const data = await dataProvider.loadWeeksData();

            // Create the DOM manager and render the data
            const domManager = WeekDomManager();
            domManager.renderWeeks(data);
        } catch (error) {
            console.error('Weekly progress data are not available! Message:', error);
        }
    };

    return {
        weeklyProgress
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    const domManager = await MainDomManager();
    domManager.weeklyProgress();
});
