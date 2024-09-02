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

    const buildWeekElement = ({
        weekId,
        chapters,
        projects,
        concepts
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

        weekContainer.appendChild(weekTitle);
        weekContainer.appendChild(weekTitleDivider);

        weekContainer.appendChild(learningSection);
        weekContainer.appendChild(projectsSection);
        weekContainer.appendChild(conceptsSection);

        return weekContainer;
    };

    const renderWeeks = () => {

    };

    return { renderWeeks };
}

export { WeekDataProvider, WeekDomManager };
