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

    // Create a chapter for learning section
    const createChapterElement = ({
        image, title, tasks
    }) => {
        // Create content wrapper for chapter
        const chapterWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['row']
        });

        // Create image wrapper
        const imageWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxxl-6', 'col-xxl-5', 'col-md-5', 'my-auto']
        });

        // Create Chapter Image
        const imageElement = domUtility.createDOMElement({
            elementTag: 'img',
            elementClass: ['img-fluid', 'rounded-7', 'shadow-3-strong', 'mb-md-0', 'mb-4'],
            elementAttributes: {
                'alt': image.name || 'Web development',
                'src': image.source ? `img/${image.source}` : 'img/webDev.webp'
            }
        });

        imageWrapper.appendChild(imageElement);

        // Create list wrapper
        const listWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxxl-6', 'col-xxl-7', 'col-md-7']
        });

        // Create Chapter title
        const chapterTitle = domUtility.createDOMElement({
            elementTag: 'h5',
            elementClass: ['sub-title-small', 'text-center', 'mb-3'],
            elementText: title
        });

        listWrapper.appendChild(chapterTitle);

        // Create the task list
        const taskList = domUtility.createList({
            itemClass: ['text', 'px-4'],
            itemsWithIcon: tasks.map((task) => ({
                text: task.name,
                iconClass: domUtility.getStatusIconClass(task.status)
            }))
        });

        listWrapper.appendChild(taskList);

        chapterWrapper.appendChild(imageWrapper);
        chapterWrapper.appendChild(listWrapper);

        return chapterWrapper;
    };

    // Create learning section
    const createLearningSection = (chapters) => {
        // Create wrapper
        const wrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxl-4', 'col-xl-7', 'col-lg-7', 'col-md-12', 'col-sm-10', 'col-12', 'mb-xxl-0', 'mb-5']
        });

        // Create title
        const title = domUtility.createDOMElement({
            elementTag: 'h4',
            elementClass: ['title-small', 'text-center', 'mb-md-5', 'mb-4'],
            elementText: 'Learning'
        });

        wrapper.appendChild(title);

        // Iterate through each chapter
        chapters.forEach((chapter) => {
            const chapterElement = createChapterElement(chapter);
            wrapper.appendChild(chapterElement);
        });

        return wrapper;
    };

    // Create card for projects section
    const createProjectElement = ({
        image,
        header,
        body
    }) => {
        const project = domUtility.buildCard({
            cardClass: ['card', 'border-0', 'rounded-0'],
            cardImage: {
                imageSource: image.source || 'img/backgrounds/bridge.jpg',
                imageName: image.name || 'Bridge',
                imageClass: image.class || 'card-img-top'
            },
            cardHeader: {
                headerClass: ['d-flex', 'align-items-center', 'justify-content-between', 'px-5'],
                headerTitleText: header.text || 'Project Name',
                headerTitleClass: header.class || '',
                headerIconClass: header.icon || ''
            },
            cardBody: body || {}
        });

        return project;
    };

    // Create projects section
    const createProjectsSection = (projects) => {
        // Create wrapper
        const wrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxl-3', 'col-xl-4', 'col-lg-5', 'col-md-6', 'col-sm-10', 'col-12', 'mb-xxl-0', 'mb-5']
        });

        // Create title
        const title = domUtility.createDOMElement({
            elementTag: 'h4',
            elementClass: ['title-small', 'text-center', 'mb-md-5', 'mb-4'],
            elementText: 'Projects'
        });

        wrapper.appendChild(title);

        projects.forEach((project) => {
            const projectElement = createProjectElement(project);
            wrapper.appendChild(projectElement);
        });

        return wrapper;
    };

    // Create `In-depth concepts section
    const createConceptsSection = (concepts) => {
        // Create wrapper
        const wrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxl-2', 'col-xl-4', 'col-md-6', 'col-sm-10', 'col-12', 'mb-xxl-0', 'mb-5']
        });

        // Create title
        const title = domUtility.createDOMElement({
            elementTag: 'h4',
            elementClass: ['title-small', 'text-center', 'mb-md-5', 'mb-4'],
            elementText: 'In-depth concepts'
        });

        // Create the task list
        const conceptList = domUtility.createList({
            itemClass: ['text', 'px-4'],
            itemsWithBadge: concepts.map((concept) => ({
                text: concept.name,
                badgeClass: ['badge-light', 'px-3', 'py-2'],
                badgeText: concept.technology
            }))
        });

        wrapper.appendChild(title);
        wrapper.appendChild(conceptList);

        return wrapper;
    };

    // Create `working time section
    const createWorkTimeSection = (days, hours) => {
        // Create wrapper
        const wrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxl-12', 'col-xl-6', 'col-lg-12', 'col-md-6', 'col-12']
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
            elementClass: ['row', 'row-cols-sm-2', 'row-cols-1', 'g-4', 'px-sm-0', 'px-5']
        });

        // Function to create a card element
        const createCardElement = (iconClass, iconTitle, text) => {
            // Create card
            const card = domUtility.createDOMElement({
                elementTag: 'div',
                elementClass: ['card']
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
                elementClass: [iconClass, 'fa-3x', 'me-sm-3', 'text-primary'],
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

            // Append icon and text to content container
            contentContainer.appendChild(iconElement);
            contentContainer.appendChild(textElement);

            // Append content container to card body
            cardBody.appendChild(contentContainer);

            // Append card body to card
            card.appendChild(cardBody);

            return card;
        };

        // Create Days Card
        const daysCard = createCardElement('fa-solid fa-calendar-days', 'Days worked', days);

        // Create Hours Card
        const hoursCard = createCardElement('fa-solid fa-clock', 'Hours worked', hours);

        // Append cards to work time row
        const daysColumn = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col']
        });
        daysColumn.appendChild(daysCard);

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

    // Create `technologies used `section
    const createTechnologiesUsedSection = (images) => {
        // Create wrapper
        const wrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxl-12', 'col-xl-6', 'col-lg-12', 'col-md-6']
        });

        // Create title
        const title = domUtility.createDOMElement({
            elementTag: 'h4',
            elementClass: ['title-small', 'text-center', 'mb-md-5', 'mb-4'],
            elementText: 'Technologies used'
        });

        // Create items wrapper
        const itemsWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['d-flex', 'flex-wrap', 'justify-content-center', 'align-items-center']
        });

        wrapper.appendChild(title);
        wrapper.appendChild(itemsWrapper);

        images.forEach((image) => {
            const item = domUtility.createDOMElement({
                elementTag: 'div',
                elementClass: ['p-2']
            });

            const imageElement = domUtility.createDOMElement({
                elementTag: 'img',
                elementClass: ['img-fluid'], // Optional: Add image class if needed
                elementAttributes: {
                    'alt': image.name || 'Technology',
                    'src': image.source || 'img/default-tech.png' // Fallback image
                }
            });

            item.appendChild(imageElement);
            itemsWrapper.appendChild(item);
        });

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

        // Build learning section
        const learningSection = createLearningSection(chapters);

        // Build projects section
        const projectsSection = createProjectsSection(projects);

        // Build `In-depth concepts` section 
        const conceptsSection = createConceptsSection(concepts);

        // Create overview wrapper
        const overViewWrapper = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxl-3', 'col-xl-8', 'col-lg-6', 'col-md-12', 'col-sm-10', 'col-12', 'mb-0']
        });

        const overViewRow = domUtility.createDOMElement({
            elementTag: 'div',
            elementClass: ['row', 'gy-5']
        });

        // Build `working time` section
        const workTimeSection = createWorkTimeSection(workTime.days, workTime.hours);

        // Build `technologies used` section
        const technologiesUsedSection = createTechnologiesUsedSection(technologies);

        weekContainer.appendChild(weekTitle);
        weekContainer.appendChild(weekTitleDivider);

        weekContainer.appendChild(learningSection);
        weekContainer.appendChild(projectsSection);
        weekContainer.appendChild(conceptsSection);

        overViewRow.appendChild(workTimeSection);
        overViewRow.appendChild(technologiesUsedSection);

        weekContainer.appendChild(overViewRow);

        return weekContainer;
    };

    const renderWeeks = () => {

    };

    return { renderWeeks };
}

export { WeekDataProvider, WeekDomManager };
