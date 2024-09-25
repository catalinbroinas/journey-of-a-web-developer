import { WeekDataProvider, WeekDomManager } from "./modules/weeks.js";
import { DomUtilityManager } from "./modules/utility.js";

async function MainDataProvider() {
    // Load weeks data
    const loadWeeksData = async () => {
        const dataProvider = await WeekDataProvider();
        const data = await dataProvider.loadWeeksData();
        const years = await dataProvider.loadYearsList();
        const lastYear = years[years.length - 1];
        const initialMonths = await dataProvider.loadMonthsListByYear(lastYear);
        const lastMonth = initialMonths[initialMonths.length - 1];

        return {
            dataProvider,
            data,
            years,
            lastYear,
            initialMonths,
            lastMonth
        };
    };

    return { loadWeeksData };
}

async function MainDomManager() {
    // DOM features
    const weekDomManager = WeekDomManager();
    const utilityDomManager = DomUtilityManager();

    // Data features
    const mainDataProvider = await MainDataProvider();
    const loadWeeksData = await mainDataProvider.loadWeeksData();

    // Load weekly data once and reuse for both weekly progress and navigation
    const loadAndRenderWeeklyData = async () => {
        try {
            // Load data
            const { data, years, lastYear, lastMonth, initialMonths } = loadWeeksData;

            // Render weekly progress
            weekDomManager.renderWeeks(data, lastYear, lastMonth);

            // Render navigation (years and months <select>)
            weekDomManager.renderNavigation(years, initialMonths);
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
        const { data } = loadWeeksData;

        // Update the weekly content based on selected year, month, and checkbox status
        const updateWeeksView = async () => {
            const selectedYear = parseInt(yearSelect.value);
            const selectedMonth = monthSelect.value;
            weekDomManager.renderWeeks(data, selectedYear, selectedMonth, allWeeksCheckbox.checked);
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

    // Initialize application events
    const initAppEvents = () => {
        const scrollButton = document.querySelector('#back-to-top');
        utilityDomManager.scrollToTop(scrollButton, 1000);
    };

    return { initWeeklyApp, initAppEvents };
}

document.addEventListener('DOMContentLoaded', async () => {
    const domManager = await MainDomManager();
    domManager.initWeeklyApp();
    domManager.initAppEvents();
});
