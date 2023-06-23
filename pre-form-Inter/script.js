// Initialize index
let index = 1;
let currentSlideIndex;
let nextSlideIndex;

// Get DOM elements
let preformContainer = document.getElementById('preform-container');
let computedStyle;
let preform;
let preformSlider;
let isEligibleMessage;
let isNotEligibleMessage;
let closePreform;

// HTML template for the form
const formHTML = `
    
`;

// Function to generate the preform
function generatePreform() {
    preformContainer.innerHTML = formHTML;
}

// Function to handle slide actions
function slideAction(id) {
    const buttonSlide = document.getElementById(`next-slide-${id}`);

    if (buttonSlide) {
        const currentSlideWidth = document.getElementById(`slide-${id}`).offsetWidth;
        nextSlideIndex = (parseInt(computedStyle.paddingRight) + currentSlideWidth) * index
        currentSlideIndex = (parseInt(computedStyle.paddingRight) + currentSlideWidth) * (index - 1)
        // Set onclick event for the slide button
        buttonSlide.onclick = function () {
            displaySlide(currentSlideIndex, nextSlideIndex);
        };
    }
}

// Function to display a slide
function displaySlide(removeTransformWidth, addTransformWidth) {
    index >= 1 ? preformSlider.style.cssText = `transform: translateX(-${removeTransformWidth}px)` : ""
    preformSlider.style.cssText = `transform: translateX(-${addTransformWidth}px)`

    index++;
    // Set up slide action for the next slide
    slideAction(index);
}

// Function to display the final message based on form inputs
function displayFinalMessage(e) {
    e.preventDefault();
    const englishLevelChoice = document.querySelector('input[name="english-level"]:checked');
    const isAwareAboutTuitionFees = document.querySelector('input[name="aware-abt-fees"]:checked');

    // Hide the form
    preform.classList.remove('flex');
    preform.classList.add('hidden');

    // Display appropriate message based on form inputs
    if (
        (englishLevelChoice.value === 'intermediate' || englishLevelChoice.value === 'advance' || englishLevelChoice.value === 'native')
        && isAwareAboutTuitionFees.value === 'aware'
    ) {
        isEligibleMessage.classList.remove('hidden');
        isEligibleMessage.classList.add('flex');
    } else {
        isNotEligibleMessage.classList.remove('hidden');
        isNotEligibleMessage.classList.add('flex');
    }
}

// Function to set up the preform and attach event handlers
window.onload = function () {
    // Generate the preform
    // generatePreform();

    // Get additional DOM elements
    preform = document.getElementById('preform');
    preformSlider = document.getElementById('preform-slider');
    isEligibleMessage = document.getElementById('slide-eligible');
    isNotEligibleMessage = document.getElementById('slide-not-eligible');
    closePreform = document.getElementById('close-preform');
    computedStyle = window.getComputedStyle(preform)

    if(innerWidth < 768) {
        const width = parseInt(computedStyle.width) - (parseInt(computedStyle.paddingRight) * 2)

        for (let i = 1; i <= 3; i++) {
            document.getElementById(`slide-${i}`).style.width = `${width}px`
        }
    } else {
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`slide-${i}`).style.cssText = ''
        }
    }

    // Set up slide action for the initial slide
    slideAction(index);

    // Event handler for closing the "not eligible" message
    closePreform.onclick = function () {
        isNotEligibleMessage.classList.remove('flex');
        isNotEligibleMessage.classList.add('hidden');
    };

    // Event handler for form submission
    preform.onsubmit = displayFinalMessage;
};

window.addEventListener('resize', () => {
    if(innerWidth < 768) {
        const width = parseInt(computedStyle.width) - (parseInt(computedStyle.paddingRight) * 2)

        for (let i = 1; i <= 3; i++) {
            document.getElementById(`slide-${i}`).style.width = `${width}px`
        }
    } else {
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`slide-${i}`).style.cssText = ''
        }
    }
    slideAction(index)
})
