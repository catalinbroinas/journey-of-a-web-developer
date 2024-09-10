import { WeekDataProvider, WeekDomManager } from "./modules/weeks.js";

async function MainDomManager() {
    // Load weeks data
    const loadWeeksData = async () => {
        const dataProvider = await WeekDataProvider();
        const data = await dataProvider.loadWeeksData();
        const years = await dataProvider.loadYearsList();
        const lastYear = years[years.length - 1];
        const initialMonths = await dataProvider.loadMonthsListByYear(lastYear);
        const lastMonth = initialMonths[initialMonths.length - 1];
        const domManager = WeekDomManager();

        return {
            dataProvider,
            data,
            years,
            lastYear,
            initialMonths,
            lastMonth,
            domManager
        };
    };

    // Load and render the data weekly
    const weeklyProgress = async () => {
        try {
            const { data, lastYear, lastMonth, domManager } = await loadWeeksData();
            domManager.renderWeeks(data, lastYear, lastMonth);
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

    // Retrieves and process weekly data based on selected options
    const updateWeeklyContent = async () => {
        // Get year and month selects and checkbox
        const yearSelect = document.querySelector('#years-select');
        const monthSelect = document.querySelector('#months-select');
        const allWeeksCheckbox = document.querySelector('#all-weeks');

        // Get weekly data
        const { data, domManager } = await loadWeeksData();

        // Update the weekly content based on selected year, month, and checkbox status
        const updateWeeksView = async () => {
            const selectedYear = parseInt(yearSelect.value);
            const selectedMonth = monthSelect.value;
            domManager.renderWeeks(data, selectedYear, selectedMonth, allWeeksCheckbox.checked);
        };

        // Event listeners
        monthSelect.addEventListener('change', updateWeeksView);
        allWeeksCheckbox.addEventListener('change', updateWeeksView);
        yearSelect.addEventListener('change', async () => {
            if (allWeeksCheckbox.checked) {
                updateWeeksView();
            }
        });
    };

    return {
        weeklyProgress,
        weeklyNavigation,
        updateWeeklyContent
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    const domManager = await MainDomManager();
    domManager.weeklyProgress();
    domManager.weeklyNavigation();
    domManager.updateWeeklyContent();
});
