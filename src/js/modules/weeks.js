import { DomUtilityManager, StringUtilityManager } from "./utility.js";

async function WeekDataProvider() {
    const loadWeeksData = async () => {
        try {
            const isGitHubPages = location.pathname.includes('/journey-of-a-web-developer/');
            const url = isGitHubPages
                ? `${location.pathname}src/data/weeks.json`  // GitHub Pages
                : '/src/data/weeks.json';                   // Local server
            const response = await fetch(url, { mode: "cors" });
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

    const loadYearsList = async () => {
        const data = await loadWeeksData();
        return data?.map(yearData => yearData.year) || [];
    };

    const loadMonthsListByYear = async (byYear) => {
        const data = await loadWeeksData();
        const selectedYearData = data.find(yearData => yearData.year === byYear);
        return selectedYearData ? selectedYearData.months.map(monthData => monthData.month.name) : [];
    };

    return {
        loadWeeksData,
        loadYearsList,
        loadMonthsListByYear
    };
}

function WeekDomManager() {
    const domUtility = DomUtilityManager();
    const stringUtility = StringUtilityManager();

    // Create a chapter for `learning` section
    const createChapterElement = ({
        image, title = '', tasks
    }) => {
        // Create content wrapper for chapter
        const chapterWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['row', 'chapter']
        });

        // Create image wrapper
        const imageWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-ultra-6', 'col-sm-5', 'col-12', 'text-center', 'my-auto']
        });

        // Create Chapter Image
        const imageElement = domUtility.createDOMElement({
            elementTag: 'img',
            elementClass: ['img-fluid', 'rounded-7', 'shadow-3-strong', 'mb-md-0', 'mb-4'],
            elementAttributes: {
                'alt': image.name || 'Web development',
                'src': image.source ? `img/logos/${image.source}` : 'img/webDev.webp'
            }
        });

        imageWrapper.appendChild(imageElement);

        // Create list wrapper
        const listWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-ultra-6', 'col-sm-7', 'col-12']
        });

        // Create Chapter title
        if (title) {
            const chapterTitle = domUtility.createDOMElement({
                elementTag: 'h5',
                elementClass: ['sub-title-small', 'text-center', 'mb-3'],
                elementText: title
            });

            listWrapper.appendChild(chapterTitle);
        }

        // Create the task list
        const taskList = domUtility.createList({
            itemClass: ['text', 'px-4'],
            itemsWithIcon: tasks.map((task) => ({
                text: task.name,
                iconClass: domUtility.getStatusIconClass(task.status),
                iconTitle: domUtility.getStatusIconText(task.status)
            }))
        });

        listWrapper.appendChild(taskList);

        chapterWrapper.appendChild(imageWrapper);
        chapterWrapper.appendChild(listWrapper);

        return chapterWrapper;
    };

    // Create `learning` section
    const createLearningSection = (chapters) => {
        // Create wrapper
        const wrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: [
                'col-xxxl-4', 'col-xxl-5', 'col-xl-6', 'col-lg-7',
                'col-12', 'order-1', 'mb-xxxl-0', 'mb-5'
            ]
        });

        // Create title
        const title = domUtility.createDOMElement({
            elementTag: 'h4',
            elementClass: ['title-small', 'text-center', 'mb-md-5', 'mb-4'],
            elementText: 'Learning'
        });
        wrapper.appendChild(title);

        // Check if chapter is available and has elements
        if (chapters?.length) {
            // Iterate through each chapter
            chapters.forEach((chapter) => {
                const chapterElement = createChapterElement(chapter);
                wrapper.appendChild(chapterElement);
            });
        } else {
            const alert = domUtility.createAlertElement({
                text: 'There is no added content for this week.',
                type: 'info',
                icon: true
            });
            wrapper.appendChild(alert);
        }

        return wrapper;
    };

    // Create card for `projects` section
    const createProjectElement = ({
        image_source,
        image_name,
        title,
        status,
        tasks
    }) => {
        const project = domUtility.buildCard({
            cardClass: ['border', 'border-0', 'rounded-0', 'px-3', 'card-project'],
            cardImage: {
                imageSource: `projects/${image_source}` || 'img/webDev.webp',
                imageName: image_name || 'Web development',
                imageClass: ['card-img-top', 'rounded-6', 'shadow-3-strong', 'mt-n3']
            },
            cardHeader: {
                headerClass: ['d-flex', 'align-items-center', 'p-3'],
                headerTitleText: title || 'Project Name',
                headerTitleClass: ['text-center', 'flex-grow-1', 'm-0'],
                headerIconClass: status ? domUtility.getStatusIconClass(status) : [],
                headerIconTitle: status ? domUtility.getStatusIconText(status) : ''
            },
            cardBody: tasks && tasks.length > 0 ? {
                bodyClass: ['py-0', 'px-3'],
                bodyListItemsClass: ['text'],
                bodyListItemsWithIcon: tasks.map((task) => ({
                    text: task.name,
                    iconClass: domUtility.getStatusIconClass(task.status),
                    iconTitle: domUtility.getStatusIconText(task.status)
                }))
            } : {}
        });

        return project;
    };

    // Create `projects` section
    const createProjectsSection = (projects) => {
        // Create wrapper
        const wrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: [
                'col-xxxl-3', 'col-xl-4', 'col-md-6', 'col-sm-10', 'col-12',
                'order-xxl-2', 'order-lg-3', 'order-2', 'mb-xxxl-0', 'mb-5'
            ]
        });

        // Create title
        const title = domUtility.createDOMElement({
            elementTag: 'h4',
            elementClass: ['title-small', 'text-center', 'mb-5'],
            elementText: 'Projects'
        });
        wrapper.appendChild(title);

        // Iterate through each project
        if (projects?.length) {
            projects.forEach((project) => {
                const projectElement = createProjectElement(project);
                wrapper.appendChild(projectElement);
            });
        } else {
            const alert = domUtility.createAlertElement({
                text: 'There is no added content for this week.',
                type: 'info',
                icon: true
            });
            wrapper.appendChild(alert);
        }

        return wrapper;
    };

    // Create `In-depth concepts` section
    const createConceptsSection = (concepts) => {
        // Create wrapper
        const wrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: [
                'col-ultra-2', 'col-xxl-3', 'col-xl-4', 'col-lg-5', 'col-md-6', 'col-sm-10',
                'col-12', 'order-xxl-3', 'order-lg-2', 'order-3', 'mb-xxxl-0', 'mb-5'
            ]
        });

        // Create title
        const title = domUtility.createDOMElement({
            elementTag: 'h4',
            elementClass: ['title-small', 'text-center', 'mb-md-5', 'mb-4'],
            elementText: 'In-depth concepts'
        });
        wrapper.appendChild(title);

        // Create the task list
        if (concepts?.length) {
            const conceptList = domUtility.createList({
                itemClass: ['flex-sm-nowrap', 'flex-wrap', 'text', 'px-4'],
                itemsWithBadge: concepts.map((concept) => ({
                    text: concept.name,
                    badgeClass: ['badge-light', 'px-3', 'py-2', 'ms-md-5', 'ms-3'],
                    badgeText: concept.technology
                }))
            });
            wrapper.appendChild(conceptList);
        } else {
            const alert = domUtility.createAlertElement({
                text: 'There is no added content for this week.',
                type: 'info',
                icon: true
            });
            wrapper.appendChild(alert);
        }

        return wrapper;
    };

    // Create `working time` section
    const createWorkTimeSection = (days, hours) => {
        // Create wrapper
        const wrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: [
                'col-xxxl-12', 'col-xxl-5', 'col-xl-8', 'col-lg-12',
                'col-md-6', 'col-12'
            ]
        });

        // Create title
        const title = domUtility.createDOMElement({
            elementTag: 'h4',
            elementClass: ['title-small', 'text-center', 'mb-md-5', 'mb-4'],
            elementText: 'Working time'
        });
        wrapper.appendChild(title);

        // Create work time row
        const workTimeRow = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: [
                'row', 'row-cols-ultra-2', 'row-cols-xxxl-1', 'row-cols-sm-2',
                'row-cols-1', 'g-4', 'px-sm-0', 'px-5'
            ]
        });

        // Create a card element
        const createCardElement = (iconClass, iconTitle, text) => {
            // Create card
            const card = domUtility.createDOMElement({
                elementTag: 'div',
                elementClass: ['card', 'card-work-time']
            });

            // Create card body
            const cardBody = domUtility.createDOMElement({
                elementTag: 'div',
                elementClass: ['card-body']
            });

            // Create content container
            const contentContainer = domUtility.createDOMElement({
                elementTag: 'div',
                elementClass: ['d-flex', 'justify-content-around', 'align-items-center', 'px-1']
            });

            // Create icon element
            const iconElement = domUtility.createDOMElement({
                elementTag: 'i',
                elementClass: ['fa-solid', iconClass, 'fa-3x', 'me-sm-3', 'icon-work-time'],
                elementAttributes: {
                    'data-mdb-tooltip-init': '',
                    'data-mdb-placement': 'bottom',
                    'title': iconTitle
                }
            });

            // Create text element
            const textElement = domUtility.createDOMElement({
                elementTag: 'h6',
                elementClass: ['sub-title-big', 'm-0'],
                elementText: text
            });

            contentContainer.appendChild(iconElement);
            contentContainer.appendChild(textElement);

            cardBody.appendChild(contentContainer);

            card.appendChild(cardBody);

            // Init tooltip
            const tooltipInstance = new mdb.Tooltip(iconElement);

            return card;
        };

        // Create Days Card
        const daysCard = createCardElement('fa-calendar-days', 'Days worked', days);

        // Create Hours Card
        const hoursCard = createCardElement('fa-clock', 'Hours worked', hours);

        // Create container and add Days Card
        const daysColumn = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col']
        });
        daysColumn.appendChild(daysCard);

        // Create container and add Hours Card
        const hoursColumn = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col']
        });
        hoursColumn.appendChild(hoursCard);

        workTimeRow.appendChild(daysColumn);
        workTimeRow.appendChild(hoursColumn);

        wrapper.appendChild(workTimeRow);

        return wrapper;
    };

    // Create `technologies used`section
    const createTechnologiesUsedSection = (icons) => {
        // Create wrapper
        const wrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxxl-12', 'col-xxl-7', 'col-xl-6', 'col-lg-12', 'col-md-6', 'col-12']
        });

        // Create title
        const title = domUtility.createDOMElement({
            elementTag: 'h4',
            elementClass: ['title-small', 'text-center', 'mb-md-5', 'mb-4'],
            elementText: 'Technologies used'
        });
        wrapper.appendChild(title);

        // Create items wrapper
        const itemsWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['d-flex', 'flex-wrap', 'justify-content-center', 'align-items-center']
        });
        wrapper.appendChild(itemsWrapper);

        // Check if icons is available and has elements
        if (icons?.length) {
            // Iterate through each elements and create it
            icons.forEach((icon) => {
                const item = domUtility.createDOMElement({
                    elementTag: 'div',
                    elementClass: ['p-2']
                });

                const imageElement = domUtility.createDOMElement({
                    elementTag: 'img',
                    elementClass: ['img-fluid', 'logo-icons'],
                    elementAttributes: {
                        'alt': icon.name,
                        'src': `img/icons/${icon.image}`,
                        'data-mdb-tooltip-init': '',
                        'data-mdb-placement': 'bottom',
                        'title': icon.name
                    }
                });

                // Init tooltip
                const tooltipInstance = new mdb.Tooltip(imageElement);

                item.appendChild(imageElement);
                itemsWrapper.appendChild(item);
            });
        } else {
            const alert = domUtility.createAlertElement({
                text: 'There is no added content for this week.',
                type: 'info',
                icon: true
            });
            wrapper.appendChild(alert);
        }

        return wrapper;
    };

    const buildWeekElement = ({
        weekId,
        chapters,
        projects,
        concepts,
        workTime,
        technologies
    }) => {
        // Create week container
        const weekContainer = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: [
                'row',
                'justify-content-xxxl-center', 'justify-content-xxl-start',
                'justify-content-xl-center', 'justify-content-md-start',
                'justify-content-center', 'week'
            ],
            elementId: `week-${weekId}`
        });

        // Create week heading
        const weekTitle = domUtility.createDOMElement({
            elementTag: 'h3',
            elementClass: ['title', 'text-center'],
            elementText: `Week ${weekId}`
        });
        weekContainer.appendChild(weekTitle);

        // Create week divider
        const weekTitleDivider = domUtility.createDOMElement({
            elementTag: 'hr',
            elementClass: ['hr', 'hr-blurry', 'mb-4']
        });
        weekContainer.appendChild(weekTitleDivider);

        // Build `learning` section
        if (chapters) {
            const learningSection = createLearningSection(chapters);
            weekContainer.appendChild(learningSection);
        }

        // Build `projects` section
        if (projects) {
            const projectsSection = createProjectsSection(projects);
            weekContainer.appendChild(projectsSection);
        }

        // Build `In-depth concepts` section 
        if (concepts) {
            const conceptsSection = createConceptsSection(concepts);
            weekContainer.appendChild(conceptsSection);
        }

        // Create overview wrapper
        const overviewWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: [
                'col-ultra-3', 'col-xxxl-2', 'col-xxl-10', 'col-xl-8', 'col-lg-6',
                'col-md-12', 'col-sm-10', 'col-12', 'order-4', 'mb-0'
            ]
        });

        // Create overview row
        const overviewRow = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['row', 'gy-5']
        });

        // Build `working time` section
        if (workTime) {
            const workTimeSection = createWorkTimeSection(workTime.days, workTime.hours);
            overviewRow.appendChild(workTimeSection);
        }

        // Build `technologies used` section
        if (technologies) {
            const technologiesUsedSection = createTechnologiesUsedSection(technologies);
            overviewRow.appendChild(technologiesUsedSection);
        }

        overviewWrapper.appendChild(overviewRow);
        weekContainer.appendChild(overviewWrapper);

        return weekContainer;
    };

    const renderWeeks = (
        data,
        selectedYear = null,
        selectedMonth = null,
        showAllWeeks = false
    ) => {
        const container = document.querySelector('#weekly-progress-content');
        domUtility.clearPageContent(container);

        // Check if data is available and has elements
        if (data?.length) {
            // Iterate through each year in the data
            data.forEach((yearData) => {
                const { year, months } = yearData;

                // Only render weeks for the selected year
                if (selectedYear && selectedYear !== year) {
                    return;
                }

                // Check if months are available and have elements
                if (months?.length) {
                    // Iterate through each month in the year
                    months.forEach((monthData) => {
                        const { month, weeks } = monthData;

                        // Only render weeks for the selected month unless "All weeks" is checked
                        if (selectedMonth && selectedMonth !== month.name && !showAllWeeks) {
                            return;
                        }

                        // Check if weeks are available and have elements
                        if (weeks?.length) {
                            // Iterate through each week in the month
                            weeks.forEach((weekData) => {
                                const { week, learning, projects, concepts, working_time, technologies } = weekData;

                                // Create and append the week element
                                const weekElement = buildWeekElement({
                                    weekId: week,
                                    chapters: learning,
                                    projects,
                                    concepts,
                                    workTime: working_time,
                                    technologies
                                });
                                container.appendChild(weekElement);
                            });
                        }
                    });
                }
            });
        }
    };

    const renderNavigation = async (years, initialMonths) => {
        if (!years?.length) {
            throw new Error('No years available for navigation.');
        }

        // Get year, month selects, and checkbox
        const yearSelect = document.querySelector('#years-select');
        const monthSelect = document.querySelector('#months-select');
        const allWeeksCheckbox = document.querySelector('#all-weeks');

        // Get weekly data
        const dataProvider = await WeekDataProvider();

        // Set placeholder option for year and month selects
        const placeholderMonth = 'Choose a month';
        const placeholderYear = 'Select a year';

        // Render initial year and month options
        const lastYear = years[years.length - 1];
        const lastMonth = initialMonths[initialMonths.length - 1];
        domUtility.updateSelectOptions(yearSelect, years, placeholderYear, lastYear);
        domUtility.updateSelectOptions(monthSelect, initialMonths, placeholderMonth, lastMonth);

        // Capitalize first word from each option
        stringUtility.capitalizeSelectOptions(yearSelect);
        stringUtility.capitalizeSelectOptions(monthSelect);

        // Update months when a year is selected
        yearSelect.addEventListener('change', async () => {
            const selectedYear = parseInt(yearSelect.value);
            const newMonths = await dataProvider.loadMonthsListByYear(selectedYear);

            domUtility.updateSelectOptions(monthSelect, newMonths, placeholderMonth);
            stringUtility.capitalizeSelectOptions(monthSelect);
        });

        allWeeksCheckbox.addEventListener('change', async () => {
            if (allWeeksCheckbox.checked) {
                monthSelect.classList.add('hidden-select');
            } else {
                monthSelect.classList.remove('hidden-select');
            }
        });
    };

    return {
        renderWeeks,
        renderNavigation
    };
}

export { WeekDataProvider, WeekDomManager };
