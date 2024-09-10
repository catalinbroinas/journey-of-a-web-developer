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

    // Load weekly data once and reuse for both weekly progress and navigation
    const loadAndRenderWeeklyData = async () => {
        try {
            // Load data
            const { data, years, lastYear, lastMonth, initialMonths, domManager } = await loadWeeksData();

            // Render weekly progress
            domManager.renderWeeks(data, lastYear, lastMonth);

            // Render navigation (years and months <select>)
            domManager.renderNavigation(years, initialMonths);
        } catch (error) {
            console.error(`Failed to load and render weekly data. Error: ${error.message}`);
            throw new Error('Unable to load weekly data. Please try again later.');
        }
    };

    // Retrieves and process weekly data based on selected options
    const initWeeklyContentUpdate = async () => {
        // Get year and month selects and checkbox
        const yearSelect = document.querySelector('#years-select');
        const monthSelect = document.querySelector('#months-select');
        const allWeeksCheckbox = document.querySelector('#all-weeks');

        if (!yearSelect || !monthSelect || !allWeeksCheckbox) {
            console.error('Required elements are not found in the DOM');
            throw new Error('Critical DOM elements are missing.');
        }

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

    // Initialize weekly progress app and set up event listeners
    const initWeeklyApp = async () => {
        try {
            // Load and render data
            await loadAndRenderWeeklyData();

            // Set up event listeners
            await initWeeklyContentUpdate();
        } catch (error) {
            console.error('Error initializing weekly app:', error);
        }
    };

    return { initWeeklyApp };
}

document.addEventListener('DOMContentLoaded', async () => {
    const domManager = await MainDomManager();
    domManager.initWeeklyApp();
});
